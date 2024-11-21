export const NavbarMenu = [
  {
    id: 1,
    title: "Ask a Question",
    link: "/question",
  },
  {
    id: 2,
    title: "Room",
    link: "/room",
  },
  {
    id: 3,
    title: "Chat",
    link: "/chat",
  },
  {
    id: 4,
    title: "Payments",
    link: "/pricing",
  },
  {
    id: 5,
    title: "Projects",
    link: "projects",
  },
  {
    id: 6,
    title: "Profile",
    link: "/profile",
  },
];


export const Categories = [
  { id: "web-development", label: "Web Development" },
  { id: "backend-development", label: "Backend Development" },
  { id: "data-science", label: "Data Science" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "artificial-intelligence", label: "Artificial Intelligence" },
  { id: "cloud-computing", label: "Cloud Computing" },
  { id: "cyber-security", label: "Cyber Security" },
  { id: "mobile-development", label: "Mobile Development" },
  { id: "game-development", label: "Game Development" },
  { id: "software-engineering", label: "Software Engineering" },
];

export const developmentLanguages = [
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
  { id: "ruby", label: "Ruby" },
  { id: "java", label: "Java" },
  { id: "php", label: "PHP" },
  { id: "csharp", label: "C#" },
  { id: "swift", label: "Swift" },
  { id: "kotlin", label: "Kotlin" },
  { id: "dart", label: "Dart" },
  { id: "go", label: "Go" },
  { id: "rust", label: "Rust" },
  { id: "scala", label: "Scala" },
  { id: "c", label: "C" },
  { id: "c++", label: "C++" },
  { id: "bash", label: "Bash" },
  { id: "sql", label: "SQL" },
  { id: "graphql", label: "GraphQL" },
  { id: "ruby_on_rails", label: "Ruby on Rails" },
  { id: "nodejs", label: "Node.js" },
  { id: "react", label: "React" },
  { id: "vue", label: "Vue.js" },
  { id: "angular", label: "Angular" },
  { id: "flutter", label: "Flutter" },
  { id: "react_native", label: "React Native" },

];

export const qaFormControls = [
  {
    name: "title",
    label: "Question Title",
    placeholder: "Enter your question title",
    type: "text",
    componentType: "input",
    required: true,
  },
  {
    name: "description",
    label: "Question Description",
    placeholder: "Describe your question in detail",
    type: "textarea",
    componentType: "textarea",
    required: true,
  },
  {
    name: "category",
    label: "Category",
    placeholder: "Select a category",
    type: "text",
    componentType: "input", // Could be a dropdown or select component
  },
  {
    name: "tags",
    label: "Tags",
    placeholder: "Add relevant tags (e.g., JavaScript, React)",
    type: "text",
    componentType: "input",
    required: false, // Tags are optional
  },
  {
    name: "attachments",
    label: "Attachments",
    placeholder: "Add any related files",
    type: "file",
    componentType: "input", // This could allow multiple files
    required: false,
  },
  {
    name: "comment",
    label: "Add a Comment",
    placeholder: "Add a severity",
    type: "textarea",
    componentType: "textarea",
    required: false,
  },
];
export const initialQuestionData = [
  {
    title: "",
    description: "",
    category: "",
    tags: "",
    attachments: null,
    comment: "",
  },
];

export const SampleQuestionData = [
  {
    title: "How to implement a responsive navbar in React?",
    description:
      "I'm trying to build a responsive navbar in React, but I'm having trouble making it adapt to different screen sizes. What is the best way to implement a responsive navbar using React?",
    category: "Web Development",
    tags: ["React", "JavaScript", "CSS", "Frontend"],
    attachments: [], 
    comment: "", 
  },
  {
    title: "What is the difference between var, let, and const in JavaScript?",
    description:
      "I understand that var, let, and const are used for variable declarations in JavaScript, but I am confused about the differences between them. Could someone explain when to use each one?",
    category: "JavaScript",
    tags: ["JavaScript", "Programming", "Variables"],
    attachments:[],
    comment: "", 
  },
  
 
 
];
