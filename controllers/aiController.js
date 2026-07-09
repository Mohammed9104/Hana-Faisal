import axios from 'axios';
import Project from '../models/Project.js';
import Course from '../models/Course.js';

// Local rule-based AI match fallback
const computeLocalAI = (user, projects, courses) => {
  const userSkillsLower = (user.skills || []).map(s => s.toLowerCase());
  const allRequiredSkills = [];

  projects.forEach(p => {
    (p.requiredSkills || []).forEach(s => {
      if (!allRequiredSkills.includes(s.toLowerCase())) {
        allRequiredSkills.push(s.toLowerCase());
      }
    });
  });

  const missingSkillsRaw = allRequiredSkills.filter(s => !userSkillsLower.includes(s));
  const missingSkills = missingSkillsRaw.slice(0, 3).map(s => {
    return s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  });

  const projectMatches = projects.map(p => {
    let matchCount = 0;
    (p.requiredSkills || []).forEach(s => {
      if (userSkillsLower.includes(s.toLowerCase())) {
        matchCount++;
      }
    });
    const score = (p.requiredSkills || []).length > 0 
      ? Math.round((matchCount / p.requiredSkills.length) * 100) 
      : 80;

    return {
      projectId: p._id,
      score,
      reason: `Matches ${matchCount} out of ${(p.requiredSkills || []).length} required skills. We recommend acquiring Node.js or Python backend modules.`
    };
  });

  return {
    careerReadinessScore: user.careerReadinessScore || 78,
    missingSkills: missingSkills.length > 0 ? missingSkills : ['Node.js', 'TensorFlow', 'WebSockets'],
    projectMatches
  };
};

// @desc    Analyze student profile via Gemini API and get course/project recommendations
// @route   GET /api/ai/recommendations
// @access  Private/Student
export const getAIRecommendations = async (req, res) => {
  try {
    const user = req.user;
    const projects = await Project.find({ status: 'Open' });
    const courses = await Course.find({});

    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback if no valid Gemini API Key is configured
    if (!apiKey || apiKey.includes('placeholder')) {
      const fallbackData = computeLocalAI(user, projects, courses);
      return res.json({
        success: true,
        source: 'local_fallback',
        data: fallbackData
      });
    }

    // Call Gemini API
    const prompt = `
      You are CareerBridge AI engine. Analyze this student:
      - Skills: ${JSON.stringify(user.skills)}
      - Degree: ${user.degree}
      - University: ${user.university}

      Match them against these sponsored challenges:
      ${JSON.stringify(projects.map(p => ({ id: p._id, title: p.title, requiredSkills: p.requiredSkills })))}

      Recommend courses for missing skills from:
      ${JSON.stringify(courses.map(c => ({ id: c._id, title: c.title, category: c.category })))}

      Task:
      1. Define exactly 3 missing skill tags.
      2. Match student to projects and calculate score (0-100).
      3. Recommend courses.
      4. Compute career readiness score (0-100).

      Return ONLY a clean JSON object, no markdown, no explanation:
      {
        "careerReadinessScore": 82,
        "missingSkills": ["Node.js", "TensorFlow", "WebSockets"],
        "projectMatches": [
          { "projectId": "someId", "score": 94, "reason": "matches React" }
        ]
      }
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 8000
      }
    );

    const text = response.data.candidates[0].content.parts[0].text;
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonResult = JSON.parse(text.substring(jsonStart, jsonEnd));

    res.json({
      success: true,
      source: 'gemini_api',
      data: jsonResult
    });
  } catch (error) {
    console.error('Gemini error, using fallback:', error.message);
    const projects = await Project.find({ status: 'Open' });
    const courses = await Course.find({});
    const fallbackData = computeLocalAI(req.user, projects, courses);
    res.json({
      success: true,
      source: 'error_fallback',
      data: fallbackData
    });
  }
};
