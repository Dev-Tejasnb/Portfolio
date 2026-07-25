PERSONAL_INFO = {
    "name": "Tejas N B",
    "title": "Full Stack Developer",
    "email": "tejasnb03@gmail.com",
    "location": "Mangaluru, Dakshina Kannada, Karnataka, India",
    "bio": "Passionate Full Stack Developer with expertise in Python, FastAPI, JavaScript, and cloud technologies. I build scalable web applications, automation pipelines, and developer tools. Always exploring new technologies and contributing to open source.",
    "avatar": "/static/images/avatar.png",
    "github": "https://github.com/dev-tejasnb",
    "linkedin": "https://www.linkedin.com/in/tejasnb/",
    "twitter": "https://twitter.com/dev_tejasnb",
}

SKILLS = [
    {"name": "Python", "icon": "🐍", "category": "Backend", "proficiency": 100, "color": "#3776AB"},
    {"name": "FastAPI", "icon": "⚡", "category": "Backend", "proficiency": 95, "color": "#009688"},
    {"name": "JavaScript", "icon": "🟨", "category": "Frontend", "proficiency": 85, "color": "#F7DF1E"},
    {"name": "TypeScript", "icon": "📘", "category": "Frontend", "proficiency": 80, "color": "#3178C6"},
    {"name": "React", "icon": "⚛️", "category": "Frontend", "proficiency": 80, "color": "#61DAFB"},
    {"name": "Next.js", "icon": "▲", "category": "Frontend", "proficiency": 75, "color": "#000000"},
    {"name": "HTML/CSS", "icon": "🌐", "category": "Frontend", "proficiency": 85, "color": "#E34F26"},
    {"name": "Tailwind CSS", "icon": "🎨", "category": "Frontend", "proficiency": 70, "color": "#06B6D4"},
    {"name": "MongoDB", "icon": "🍃", "category": "Database", "proficiency": 85, "color": "#47A248"},
    {"name": "PostgreSQL", "icon": "🐘", "category": "Database", "proficiency": 75, "color": "#336791"},
    {"name": "AWS", "icon": "☁️", "category": "Cloud", "proficiency": 75, "color": "#FF9900"},
    {"name": "Docker", "icon": "🐳", "category": "DevOps", "proficiency": 80, "color": "#2496ED"},
    {"name": "Git & GitHub", "icon": "📦", "category": "DevOps", "proficiency": 90, "color": "#F05032"},
    {"name": "Linux", "icon": "🐧", "category": "DevOps", "proficiency": 65, "color": "#FCC624"},
    {"name": "Node.js", "icon": "🟢", "category": "Backend", "proficiency": 70, "color": "#339933"},
    {"name": "VS Code", "icon": "💻", "category": "Tools", "proficiency": 95, "color": "#007ACC"},
    {"name": "Postman", "icon": "📮", "category": "Tools", "proficiency": 90, "color": "#FF6C37"},
    {"name": "Nginx", "icon": "🔧", "category": "DevOps", "proficiency": 70, "color": "#009639"},
    {"name": "Figma", "icon": "🎨", "category": "Design", "proficiency": 60, "color": "#F24E1E"},
    {"name": "OpenAPI/Swagger", "icon": "📋", "category": "Tools", "proficiency": 85, "color": "#85EA2D"},
    {"name": "Hugging Face", "icon": "🤗", "category": "AI/ML", "proficiency": 65, "color": "#FFC107"},
]

CATEGORY_ORDER = ["Backend", "Frontend", "Database", "DevOps", "Cloud", "Tools", "Design", "AI/ML"]

EXPLORING_TECHS = ["Rust", "GraphQL", "Kubernetes", "WebAssembly", "eBPF", "Temporal"]

PROJECTS = [
    {
        "id": "1",
        "title": "FastAPI Microservices Boilerplate",
        "description": "Production-ready FastAPI boilerplate with authentication, database migrations, testing, and CI/CD.",
        "longDescription": "A comprehensive FastAPI project template featuring JWT authentication, PostgreSQL with SQLAlchemy, Alembic migrations, pytest testing suite, Docker configuration, GitHub Actions CI/CD, and OpenAPI documentation.",
        "techStack": ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic", "Docker", "GitHub Actions", "Pytest"],
        "image": "/static/images/projects/fastapi-boilerplate.png",
        "githubUrl": "https://github.com/dev-tejasnb/fastapi-microservices-boilerplate",
        "liveUrl": "https://fastapi-boilerplate.tejasnb.dev",
        "featured": True,
        "category": "Backend",
    },
    {
        "id": "2",
        "title": "Automation Pipeline Framework",
        "description": "Flexible automation framework for building data pipelines, ETL processes, and scheduled tasks.",
        "longDescription": "A Python-based automation framework supporting DAG-based workflows, parallel execution, retry logic, monitoring, and alerting.",
        "techStack": ["Python", "AsyncIO", "Redis", "Celery", "Docker", "AWS", "Prometheus"],
        "image": "/static/images/projects/automation-pipeline.png",
        "githubUrl": "https://github.com/dev-tejasnb/automation-pipeline",
        "liveUrl": "",
        "featured": True,
        "category": "DevOps",
    },
    {
        "id": "3",
        "title": "Portfolio Website (This Project)",
        "description": "Modern, interactive developer portfolio built with FastAPI, Three.js, and animations.",
        "longDescription": "A cutting-edge portfolio featuring 3D graphics with Three.js, smooth animations, glassmorphism UI, terminal emulator, AI chatbot, GitHub contribution graph, and fully responsive design.",
        "techStack": ["FastAPI", "Python", "Three.js", "JavaScript", "Tailwind CSS", "HTML/CSS"],
        "image": "/static/images/projects/portfolio.png",
        "githubUrl": "https://github.com/dev-tejasnb/portfolio",
        "liveUrl": "https://tejasnb.dev",
        "featured": True,
        "category": "Full Stack",
    },
    {
        "id": "4",
        "title": "REST API Testing Tool",
        "description": "Lightweight API testing CLI tool with support for environments, collections, and automated testing.",
        "longDescription": "A command-line API testing tool inspired by Postman but lightweight and scriptable.",
        "techStack": ["Python", "Click", "Requests", "Jinja2", "Rich", "Pytest"],
        "image": "/static/images/projects/api-testing-tool.png",
        "githubUrl": "https://github.com/dev-tejasnb/api-testing-tool",
        "liveUrl": "",
        "featured": False,
        "category": "Tools",
    },
    {
        "id": "5",
        "title": "Real-time Collaborative Editor",
        "description": "Real-time collaborative code editor with operational transformation and conflict resolution.",
        "longDescription": "A collaborative text editor supporting multiple users editing simultaneously with operational transformation for conflict resolution.",
        "techStack": ["Node.js", "WebSockets", "React", "TypeScript", "Redis", "Docker"],
        "image": "/static/images/projects/collaborative-editor.png",
        "githubUrl": "https://github.com/dev-tejasnb/collaborative-editor",
        "liveUrl": "",
        "featured": False,
        "category": "Full Stack",
    },
    {
        "id": "6",
        "title": "ML Model Serving Platform",
        "description": "Scalable platform for deploying and serving ML models with A/B testing and monitoring.",
        "longDescription": "A platform for deploying machine learning models as REST APIs with built-in A/B testing, canary deployments, and metrics collection.",
        "techStack": ["Python", "FastAPI", "Docker", "Kubernetes", "MLflow", "Prometheus", "Grafana", "Redis"],
        "image": "/static/images/projects/ml-serving.png",
        "githubUrl": "https://github.com/dev-tejasnb/ml-serving-platform",
        "liveUrl": "",
        "featured": False,
        "category": "AI/ML",
    },
]

EXPERIENCE = [
    {
        "id": "1",
        "company": "Freelance / Open Source",
        "position": "Full Stack Developer",
        "location": "Remote",
        "startDate": "2024-01",
        "current": True,
        "description": [
            "Building production-grade web applications and APIs using Python/FastAPI and React/Next.js",
            "Developing automation pipelines and DevOps tooling for CI/CD and infrastructure management",
            "Contributing to open source projects in the Python and JavaScript ecosystems",
            "Consulting on system architecture, database design, and cloud infrastructure",
        ],
        "technologies": ["Python", "FastAPI", "React", "Next.js", "PostgreSQL", "MongoDB", "AWS", "Docker", "GitHub Actions"],
    },
    {
        "id": "2",
        "company": "Self-Learning & Projects",
        "position": "Software Developer",
        "location": "Bengaluru, India",
        "startDate": "2023-06",
        "endDate": "2023-12",
        "current": False,
        "description": [
            "Completed intensive self-study program covering full stack development",
            "Built multiple portfolio projects including REST APIs, web applications, and CLI tools",
            "Learned cloud fundamentals with AWS and containerization with Docker",
            "Practiced system design, data structures, and algorithms",
        ],
        "technologies": ["Python", "JavaScript", "HTML/CSS", "Git", "Linux", "VS Code", "Postman"],
    },
]

EDUCATION = [
    {
        "id": "1",
        "institution": "Self-Taught / Online Certifications",
        "degree": "Full Stack Development",
        "field": "Computer Science",
        "location": "Online",
        "startDate": "2023",
        "endDate": "2024",
        "description": [
            "Completed comprehensive full stack development curriculum",
            "Focus on Python backend development with FastAPI/Django",
            "Frontend development with React, Next.js, and TypeScript",
            "Cloud and DevOps with AWS, Docker, and CI/CD pipelines",
        ],
    },
]

CERTIFICATES = [
    {
        "id": "1",
        "name": "Python for Everybody",
        "issuer": "University of Michigan (Coursera)",
        "date": "2023",
        "url": "https://coursera.org/verify/xxx",
        "image": "/static/images/certificates/python-for-everybody.png",
        "skills": ["Python", "Data Structures", "Web Scraping", "Databases"],
    },
    {
        "id": "2",
        "name": "AWS Cloud Practitioner Essentials",
        "issuer": "Amazon Web Services",
        "date": "2024",
        "url": "https://aws.amazon.com/verification/xxx",
        "image": "/static/images/certificates/aws-cloud-practitioner.png",
        "skills": ["AWS", "Cloud Computing", "EC2", "S3", "Lambda", "RDS"],
    },
    {
        "id": "3",
        "name": "Docker & Kubernetes: The Practical Guide",
        "issuer": "Udemy",
        "date": "2024",
        "url": "https://ude.my/xxx",
        "image": "/static/images/certificates/docker-kubernetes.png",
        "skills": ["Docker", "Kubernetes", "Containers", "Orchestration"],
    },
]

TIMELINES = [
    {"id": "1", "date": "2023 Q3", "title": "Started Programming Journey", "description": "Began learning Python fundamentals and computer science basics", "type": "learning", "icon": "🐍", "color": "#3776AB"},
    {"id": "2", "date": "2023 Q4", "title": "First Web Project", "description": "Built a personal portfolio website with HTML, CSS, and JavaScript", "type": "project", "icon": "🌐", "color": "#F7DF1E"},
    {"id": "3", "date": "2024 Q1", "title": "Backend Development with FastAPI", "description": "Learned FastAPI, SQLAlchemy, PostgreSQL, and built REST APIs", "type": "learning", "icon": "⚡", "color": "#009688"},
    {"id": "4", "date": "2024 Q2", "title": "Frontend with React & Next.js", "description": "Mastered React hooks, Next.js App Router, TypeScript, and Tailwind CSS", "type": "learning", "icon": "⚛️", "color": "#61DAFB"},
    {"id": "5", "date": "2024 Q3", "title": "Cloud & DevOps", "description": "AWS fundamentals, Docker containerization, CI/CD with GitHub Actions", "type": "learning", "icon": "☁️", "color": "#FF9900"},
    {"id": "6", "date": "2024 Q4", "title": "Open Source Contributions", "description": "Started contributing to Python and JavaScript open source projects", "type": "achievement", "icon": "📦", "color": "#F05032"},
    {"id": "7", "date": "2025", "title": "Full Stack Developer", "description": "Building end-to-end solutions with modern tech stack", "type": "work", "icon": "💼", "color": "#3B82F6"},
]

SOCIAL_LINKS = [
    {"label": "GitHub", "url": "https://github.com/dev-tejasnb", "icon": "github"},
    {"label": "LinkedIn", "url": "https://www.linkedin.com/in/tejasnb/", "icon": "linkedin"},
    {"label": "Twitter", "url": "https://twitter.com/dev_tejasnb", "icon": "twitter"},
    {"label": "Email", "url": "mailto:tejasnb03@gmail.com", "icon": "mail"},
]

NAV_ITEMS = [
    {"label": "About", "href": "#about"},
    {"label": "Skills", "href": "#skills"},
    {"label": "Projects", "href": "#projects"},
    {"label": "Timeline", "href": "#timeline"},
    {"label": "GitHub", "href": "#github"},
]

HEADLINES = [
    "Full Stack Developer",
    "Python & FastAPI Enthusiast",
    "Cloud & DevOps Explorer",
    "Open Source Contributor",
    "Problem Solver",
]

PARTICLE_CONFIG = {"count": 50, "size": {"min": 1, "max": 3}, "speed": {"min": 0.1, "max": 0.5}, "color": "#3B82F6", "opacity": {"min": 0.1, "max": 0.5}}
GRID_CONFIG = {"size": 60, "color": "#3B82F6", "opacity": 0.03, "animationSpeed": 0.5}

def get_categorized_skills():
    cats = {}
    for s in SKILLS:
        cats.setdefault(s["category"], []).append(s)
    return {c: cats[c] for c in CATEGORY_ORDER if c in cats}
