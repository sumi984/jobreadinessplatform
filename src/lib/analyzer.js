
// Skill Dictionary
const SKILL_KEYWORDS = {
    "Core CS": ["DSA", "Data Structures", "Algorithms", "OOP", "Object Oriented Programming", "DBMS", "Database Management", "OS", "Operating Systems", "Computer Networks", "System Design", "Low Level Design", "High Level Design"],
    "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C++", "C#", "Go", "Rust", "Swift", "Kotlin", "PHP", "Ruby"],
    "Web": ["React", "React.js", "Next.js", "Node.js", "Express", "Vue", "Angular", "HTML", "CSS", "Tailwind", "Bootstrap", "Redux", "GraphQL", "REST API"],
    "Data": ["SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "NoSQL", "Data Modeling", "Big Data", "Spark", "Hadoop"],
    "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Jenkins", "Git", "Linux", "Bash", "Shell Scripting", "Terraform", "Ansible"],
    "Testing": ["Selenium", "Cypress", "Playwright", "Jest", "Mocha", "JUnit", "PyTest", "TestNG"],
    "AI/ML": ["Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "NLP", "Computer Vision", "Data Science", "Pandas", "NumPy"]
};

// Helper: Extract skills from text
const extractSkills = (text) => {
    const textLower = text.toLowerCase();
    const foundSkills = {};
    let totalSkillsFound = 0;

    for (const [category, skills] of Object.entries(SKILL_KEYWORDS)) {
        const matches = skills.filter(skill => textLower.includes(skill.toLowerCase()));
        if (matches.length > 0) {
            foundSkills[category] = matches;
            totalSkillsFound += matches.length;
        }
    }

    if (totalSkillsFound === 0) {
        foundSkills["General"] = ["General Freshers Stack (Aptitude, Basic Coding, Communication)"];
    }

    return foundSkills;
};

// Helper: Calculate Readiness Score
const calculateScore = (text, skills, company, role) => {
    let score = 35; // Base score

    // +5 per detected category present (max 30)
    const categoryCount = Object.keys(skills).filter(k => k !== "General").length;
    score += Math.min(30, categoryCount * 5);

    // +10 if company name provided
    if (company && company.trim().length > 1) score += 10;

    // +10 if role provided
    if (role && role.trim().length > 1) score += 10;

    // +10 if JD length > 800 chars
    if (text.length > 800) score += 10;

    // Cap at 100
    return Math.min(100, score);
};

// Helper: Generate 7-Day Plan
const generatePlan = (skills) => {
    const hasWeb = skills["Web"]?.length > 0;
    const hasData = skills["Data"]?.length > 0;
    const hasCloud = skills["Cloud/DevOps"]?.length > 0;
    const hasAI = skills["AI/ML"]?.length > 0;

    // Day 1-2: Always Basics
    const plan = [
        { day: "Day 1", title: "Strong Foundations", tasks: ["Revise Aptitude (Quant, Logical)", "Practice Basic Coding Problems", "Review OOP Concepts"] },
        { day: "Day 2", title: "Core CS Concepts", tasks: ["Deep dive into DBMS & OS", "Review Computer Networks basics", "Solve 5 Medium DSA Problems"] },
    ];

    // Day 3-4: Tech Stack specific
    let techTasks = ["Practice Advanced DSA (Graph, DP)", "System Design Basics"];
    if (hasWeb) techTasks.push("Build a small feature using detecting stack (React/Node)");
    if (hasData) techTasks.push("Practice complex SQL queries");
    if (hasAI) techTasks.push("Review ML Algorithms");

    plan.push({ day: "Day 3", title: "Advanced Coding & Stack", tasks: techTasks.slice(0, 3) });
    plan.push({ day: "Day 4", title: "Problem Solving Marathon", tasks: ["Solve 3 Hard LeetCode style problems", "Optimize previous solutions", "Mock Coding Test (1 hour)"] });

    // Day 5: Project
    plan.push({ day: "Day 5", title: "Project & Resume", tasks: ["Align Resume with JD keywords", "Prepare 'Tell me about yourself'", "Deep dive into 1 major project"] });

    // Day 6: Mock
    plan.push({ day: "Day 6", title: "Mock Interviews", tasks: ["Peer Mock Interview", "Behavioral Questions Prep (STAR Method)", "Revisit weak technical areas"] });

    // Day 7: Relax
    plan.push({ day: "Day 7", title: "Final Revision", tasks: ["Review saved notes", "Light revision of formulas/syntax", "Rest and mindset prep"] });

    return plan;
};

// Helper: Generate Interview Questions
const generateQuestions = (skills) => {
    const questions = [];

    // Generic
    questions.push("Tell me about yourself and why you want this role?");
    questions.push("Explain one challenging bug you fixed recently.");

    // Category specific
    const flatSkills = Object.values(skills).flat();

    if (flatSkills.some(s => s.includes("React"))) questions.push("Explain the Virtual DOM and React Lifecycle methods.");
    if (flatSkills.some(s => s.includes("Node"))) questions.push("How does Node.js handle concurrency? Explain the Event Loop.");
    if (flatSkills.some(s => s.includes("SQL") || s.includes("Data"))) questions.push("Explain Indexing in databases. What is the difference between Clustered and Non-Clustered index?");
    if (flatSkills.some(s => s.includes("Java"))) questions.push("Explain memory management in Java and how Garbage Collection works.");
    if (flatSkills.some(s => s.includes("Python"))) questions.push("What are decorators and generators in Python?");
    if (flatSkills.some(s => s.includes("AWS") || s.includes("Cloud"))) questions.push("What is the difference between Vertical and Horizontal Scaling?");
    if (flatSkills.some(s => s.includes("Rest"))) questions.push("What are the key principles of REST API design?");

    // Fallback if not enough specific questions
    const genericTech = [
        "Explain the difference between Process and Thread.",
        "What happens when you type a URL in the browser?",
        "Explain different types of Joins in SQL.",
        "How would you design a URL shortening service?"
    ];

    while (questions.length < 10) {
        questions.push(genericTech[questions.length % genericTech.length]);
    }

    return questions.slice(0, 10);
};

// Helper: Generate Checklist
const generateChecklist = (skills) => {
    return {
        "Round 1: Aptitude & Basics": [
            "Quantitative Aptitude (Time & Work, PL, Speed)",
            "Logical Reasoning (Puzzles, Series)",
            "Verbal Ability (Communication Check)",
            "Basic Programming Syntax Check"
        ],
        "Round 2: DSA & Core CS": [
            "Data Structures (Arrays, Linked Lists, Trees)",
            "Algorithms (Sorting, Searching, DP)",
            "DBMS Normalization & SQL",
            "OS Concepts (Paging, Scheduling)"
        ],
        "Round 3: Tech Interview & Projects": [
            "Resume Deep Dive",
            `Tech Stack Questions (${Object.keys(skills).join(', ') || 'General'})`,
            "System Design / LLD (if applicable)",
            "Live Coding Challenge"
        ],
        "Round 4: Managerial & HR": [
            "Cultural Fit Check",
            "Salary Negotiation",
            "Strength & Weakness discussion",
            "Company Research Check"
        ]
    };
};

export const analyzeJobDescription = (text, company, role) => {
    const skills = extractSkills(text);
    const score = calculateScore(text, skills, company, role);
    const plan = generatePlan(skills);
    const questions = generateQuestions(skills);
    const checklist = generateChecklist(skills);

    return {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        company,
        role,
        jdText: text,
        extractedSkills: skills,
        plan,
        questions,
        checklist,
        readinessScore: score,
        baseScore: score, // Store initial score
        skillConfidenceMap: {} // Init empty map for skill toggles
    };
};

// Storage Utils
const HISTORY_KEY = 'jd_analyzer_history';

export const saveAnalysis = (data) => {
    try {
        const history = getHistory();
        // Check if exists, update if so (though usually this is for new items)
        const existingIndex = history.findIndex(h => h.id === data.id);

        let updatedHistory;
        if (existingIndex >= 0) {
            updatedHistory = [...history];
            updatedHistory[existingIndex] = data;
        } else {
            updatedHistory = [data, ...history].slice(0, 20); // Keep last 20
        }

        localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
        return true;
    } catch (e) {
        console.error("Failed to save analysis", e);
        return false;
    }
};

export const updateAnalysis = (id, updates) => {
    try {
        const history = getHistory();
        const index = history.findIndex(item => item.id === id);

        if (index === -1) return null;

        const updatedItem = { ...history[index], ...updates };
        history[index] = updatedItem;

        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        return updatedItem;
    } catch (e) {
        console.error("Failed to update analysis", e);
        return null;
    }
};

export const getHistory = () => {
    try {
        const data = localStorage.getItem(HISTORY_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("Failed to get history", e);
        return [];
    }
};

export const getAnalysisById = (id) => {
    const history = getHistory();
    return history.find(item => item.id === id);
};
