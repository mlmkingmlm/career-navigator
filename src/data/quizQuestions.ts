export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const quizQuestions: Record<string, QuizQuestion[]> = {
  'Senior Software Engineer': [
    {
      id: 1,
      question: 'Which principle is most closely associated with SOLID design?',
      options: [
        'Single Responsibility Principle',
        'Multiple Inheritance Principle',
        'Global State Principle',
        'Direct Dependency Principle',
      ],
      correctAnswer: 'Single Responsibility Principle',
    },
    {
      id: 2,
      question: 'Which data structure follows the LIFO principle?',
      options: ['Queue', 'Stack', 'Linked List', 'Heap'],
      correctAnswer: 'Stack',
    },
    {
      id: 3,
      question: 'What is the primary purpose of a database index?',
      options: [
        'Encrypt database records',
        'Speed up data retrieval',
        'Create database backups',
        'Validate user input',
      ],
      correctAnswer: 'Speed up data retrieval',
    },
    {
      id: 4,
      question: 'Which HTTP status code indicates a successful request?',
      options: ['301', '400', '200', '500'],
      correctAnswer: '200',
    },
    {
      id: 5,
      question: 'Which pattern is commonly used to notify multiple objects when one object changes?',
      options: ['Observer', 'Factory', 'Builder', 'Adapter'],
      correctAnswer: 'Observer',
    },
    {
      id: 6,
      question: 'What does horizontal scaling typically mean?',
      options: [
        'Adding more resources to one server',
        'Adding more servers or instances',
        'Reducing database size',
        'Increasing code complexity',
      ],
      correctAnswer: 'Adding more servers or instances',
    },
    {
      id: 7,
      question: 'Which practice helps prevent SQL injection?',
      options: [
        'Using parameterized queries',
        'Using longer table names',
        'Disabling indexes',
        'Increasing server memory',
      ],
      correctAnswer: 'Using parameterized queries',
    },
    {
      id: 8,
      question: 'What is the main purpose of unit tests?',
      options: [
        'Test individual pieces of code',
        'Deploy applications',
        'Monitor servers',
        'Design database schemas',
      ],
      correctAnswer: 'Test individual pieces of code',
    },
    {
      id: 9,
      question: 'Which concept describes hiding implementation details behind a public interface?',
      options: ['Abstraction', 'Inheritance', 'Compilation', 'Serialization'],
      correctAnswer: 'Abstraction',
    },
    {
      id: 10,
      question: 'What is a common benefit of using caching?',
      options: [
        'Increase repeated data retrieval speed',
        'Remove the need for databases',
        'Prevent all application errors',
        'Replace authentication',
      ],
      correctAnswer: 'Increase repeated data retrieval speed',
    },
  ],

  'Full Stack Developer': [
    {
      id: 1,
      question: 'Which technology is primarily used to structure web pages?',
      options: ['HTML', 'CSS', 'SQL', 'Docker'],
      correctAnswer: 'HTML',
    },
    {
      id: 2,
      question: 'Which technology is primarily responsible for styling web pages?',
      options: ['HTML', 'CSS', 'Node.js', 'MongoDB'],
      correctAnswer: 'CSS',
    },
    {
      id: 3,
      question: 'Which JavaScript runtime is commonly used for backend development?',
      options: ['Node.js', 'React', 'Tailwind CSS', 'Vite'],
      correctAnswer: 'Node.js',
    },
    {
      id: 4,
      question: 'Which HTTP method is commonly used to create a resource?',
      options: ['GET', 'POST', 'DELETE', 'HEAD'],
      correctAnswer: 'POST',
    },
    {
      id: 5,
      question: 'Which database is a document-oriented NoSQL database?',
      options: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite'],
      correctAnswer: 'MongoDB',
    },
    {
      id: 6,
      question: 'What is REST primarily used for?',
      options: [
        'Designing APIs',
        'Styling components',
        'Compiling JavaScript',
        'Managing Git branches',
      ],
      correctAnswer: 'Designing APIs',
    },
    {
      id: 7,
      question: 'Which React hook is commonly used to manage component state?',
      options: ['useState', 'useEffect', 'useMemo', 'useRef'],
      correctAnswer: 'useState',
    },
    {
      id: 8,
      question: 'Which HTTP status code means "Not Found"?',
      options: ['200', '201', '404', '500'],
      correctAnswer: '404',
    },
    {
      id: 9,
      question: 'What is middleware commonly used for in backend applications?',
      options: [
        'Processing requests between client and server logic',
        'Styling HTML elements',
        'Creating database tables only',
        'Compressing images',
      ],
      correctAnswer: 'Processing requests between client and server logic',
    },
    {
      id: 10,
      question: 'Which tool is commonly used for version control?',
      options: ['Git', 'Figma', 'Postman', 'Webpack'],
      correctAnswer: 'Git',
    },
  ],

  'Frontend Engineer': [
    {
      id: 1,
      question: 'Which language is used to define the structure of a web page?',
      options: ['HTML', 'CSS', 'JavaScript', 'SQL'],
      correctAnswer: 'HTML',
    },
    {
      id: 2,
      question: 'Which CSS property controls the space inside an element?',
      options: ['margin', 'padding', 'gap', 'border'],
      correctAnswer: 'padding',
    },
    {
      id: 3,
      question: 'Which React hook is used to manage state?',
      options: ['useState', 'useEffect', 'useMemo', 'useCallback'],
      correctAnswer: 'useState',
    },
    {
      id: 4,
      question: 'Which React hook is commonly used for side effects?',
      options: ['useState', 'useEffect', 'useRef', 'useContext'],
      correctAnswer: 'useEffect',
    },
    {
      id: 5,
      question: 'What does responsive design aim to achieve?',
      options: [
        'Layouts that adapt to different screen sizes',
        'Faster database queries',
        'Server-side authentication',
        'Automatic code generation',
      ],
      correctAnswer: 'Layouts that adapt to different screen sizes',
    },
    {
      id: 6,
      question: 'Which CSS layout system is designed for one-dimensional layouts?',
      options: ['Flexbox', 'SQL', 'Grid only', 'SVG'],
      correctAnswer: 'Flexbox',
    },
    {
      id: 7,
      question: 'Which JavaScript method creates a new array by transforming elements?',
      options: ['map()', 'find()', 'push()', 'includes()'],
      correctAnswer: 'map()',
    },
    {
      id: 8,
      question: 'What is accessibility in web development primarily concerned with?',
      options: [
        'Making websites usable by people with different abilities',
        'Increasing database storage',
        'Reducing server memory',
        'Managing Git branches',
      ],
      correctAnswer:
        'Making websites usable by people with different abilities',
    },
    {
      id: 9,
      question: 'Which attribute provides alternative text for an image?',
      options: ['alt', 'title', 'src', 'href'],
      correctAnswer: 'alt',
    },
    {
      id: 10,
      question: 'Which tool is commonly used to inspect and debug frontend applications?',
      options: ['Browser DevTools', 'Docker', 'PostgreSQL', 'Redis'],
      correctAnswer: 'Browser DevTools',
    },
  ],

  'Backend Developer': [
    {
      id: 1,
      question: 'Which HTTP method is commonly used to retrieve data?',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      correctAnswer: 'GET',
    },
    {
      id: 2,
      question: 'Which HTTP method is commonly used to delete a resource?',
      options: ['GET', 'POST', 'DELETE', 'PATCH'],
      correctAnswer: 'DELETE',
    },
    {
      id: 3,
      question: 'Which status code indicates an internal server error?',
      options: ['200', '201', '404', '500'],
      correctAnswer: '500',
    },
    {
      id: 4,
      question: 'What is authentication used for?',
      options: [
        "Verifying a user's identity",
        'Styling a web page',
        'Optimizing CSS',
        'Creating UI animations',
      ],
      correctAnswer: "Verifying a user's identity",
    },
    {
      id: 5,
      question: 'What is authorization used for?',
      options: [
        'Determining what an authenticated user can access',
        'Checking whether an email is valid',
        'Rendering HTML',
        'Compressing files',
      ],
      correctAnswer:
        'Determining what an authenticated user can access',
    },
    {
      id: 6,
      question: 'Which database language is commonly used to query relational databases?',
      options: ['SQL', 'HTML', 'CSS', 'Bash'],
      correctAnswer: 'SQL',
    },
    {
      id: 7,
      question: 'What is an API primarily used for?',
      options: [
        'Allowing software systems to communicate',
        'Styling web pages',
        'Creating images',
        'Managing monitor brightness',
      ],
      correctAnswer: 'Allowing software systems to communicate',
    },
    {
      id: 8,
      question: 'Which data format is commonly used in REST APIs?',
      options: ['JSON', 'PSD', 'MP3', 'EXE'],
      correctAnswer: 'JSON',
    },
    {
      id: 9,
      question: 'What is database normalization mainly intended to reduce?',
      options: [
        'Data redundancy',
        'Network bandwidth',
        'CPU temperature',
        'Image resolution',
      ],
      correctAnswer: 'Data redundancy',
    },
    {
      id: 10,
      question: 'Which practice helps protect passwords in a backend system?',
      options: [
        'Password hashing',
        'Plain-text storage',
        'Sharing passwords in logs',
        'Using the username as the password',
      ],
      correctAnswer: 'Password hashing',
    },
  ],

  'DevOps Engineer': [
    {
      id: 1,
      question: 'What does CI/CD primarily help automate?',
      options: [
        'Building, testing, and deploying software',
        'Designing UI components',
        'Writing database queries',
        'Creating graphics',
      ],
      correctAnswer: 'Building, testing, and deploying software',
    },
    {
      id: 2,
      question: 'Which tool is commonly used to containerize applications?',
      options: ['Docker', 'Figma', 'React', 'Postman'],
      correctAnswer: 'Docker',
    },
    {
      id: 3,
      question: 'Which platform is commonly used for container orchestration?',
      options: ['Kubernetes', 'Photoshop', 'Webpack', 'Jest'],
      correctAnswer: 'Kubernetes',
    },
    {
      id: 4,
      question: 'What is infrastructure as code?',
      options: [
        'Managing infrastructure through configuration/code',
        'Writing frontend CSS',
        'Creating UI mockups',
        'Manually configuring every server',
      ],
      correctAnswer: 'Managing infrastructure through configuration/code',
    },
    {
      id: 5,
      question: 'Which command shows the current Git working tree status?',
      options: ['git status', 'git push', 'git clone', 'git merge'],
      correctAnswer: 'git status',
    },
    {
      id: 6,
      question: 'What is the main purpose of monitoring in production?',
      options: [
        'Detecting system health and performance issues',
        'Writing application features',
        'Designing logos',
        'Creating database schemas',
      ],
      correctAnswer: 'Detecting system health and performance issues',
    },
    {
      id: 7,
      question: 'What does containerization provide?',
      options: [
        'A consistent application runtime environment',
        'A replacement for source control',
        'A UI design system',
        'A database query language',
      ],
      correctAnswer: 'A consistent application runtime environment',
    },
    {
      id: 8,
      question: 'What is a load balancer commonly used for?',
      options: [
        'Distributing traffic across multiple servers',
        'Encrypting passwords',
        'Writing application code',
        'Managing CSS',
      ],
      correctAnswer: 'Distributing traffic across multiple servers',
    },
    {
      id: 9,
      question: 'What is a deployment rollback used for?',
      options: [
        'Returning to a previous working version',
        'Deleting all source code',
        'Creating a new programming language',
        'Increasing screen resolution',
      ],
      correctAnswer: 'Returning to a previous working version',
    },
    {
      id: 10,
      question: 'Which practice helps keep secrets out of source code?',
      options: [
        'Environment variables or secret management',
        'Hardcoding passwords',
        'Committing API keys',
        'Putting secrets in README files',
      ],
      correctAnswer: 'Environment variables or secret management',
    },
  ],
};