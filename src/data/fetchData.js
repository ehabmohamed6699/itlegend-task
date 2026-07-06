// Data fetching functions that simulate API calls and return JSON objects

export const fetchCourseData = async () => {
  // Simulates API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    id: 'course-101',
    title: 'Starting SEO as your Home',
    description: 'Advanced story telling techniques for writers: Personas, Characters & Plots',
    breadcrumb: ['Home', 'Courses', 'Course Details'],
    video: {
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop',
      duration: '45:30',
      moreCount: 3
    }
  };
};

export const fetchCourseMaterials = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return [
    { id: 1, duration: '3 weeks', lessons: 8, enrolled: 65, language: 'English' },
    { id: 2, duration: '3 weeks', lessons: 8, enrolled: 65, language: 'English' },
  ];
};

export const fetchCurriculum = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return [
    {
      id: 'week-1-4',
      title: 'Week 1-4',
      description: 'Advanced story telling techniques for writers: Personas, Characters & Plots',
      lessons: [
        { id: 'l1', title: 'Introduction', isCompleted: true, isLocked: false, questions: 0, minutes: 0 },
        { id: 'l2', title: 'Course Overview', isCompleted: true, isLocked: false, questions: 0, minutes: 0 },
        { id: 'l3', title: 'Course Overview', isCompleted: true, isLocked: false, questions: 0, minutes: 10 },
        { id: 'l4', title: 'Course Exercise / Reference Files', isCompleted: true, isLocked: false, questions: 0, minutes: 0 },
        { id: 'l5', title: 'Code Editor Installation (Optional if you have one)', isCompleted: true, isLocked: false, questions: 0, minutes: 0 },
        { id: 'l6', title: 'Embedding PHP in HTML', isCompleted: false, isLocked: true, questions: 0, minutes: 0 },
      ]
    },
    {
      id: 'week-5-8',
      title: 'Week 5-8',
      description: 'Advanced story telling techniques for writers: Personas, Characters & Plots',
      lessons: [
        { id: 'l7', title: 'Defining Functions', isCompleted: false, isLocked: true, questions: 0, minutes: 0 },
        { id: 'l8', title: 'Function Parameters', isCompleted: false, isLocked: true, questions: 0, minutes: 0 },
        { id: 'l9', title: 'Return Values From Functions', isCompleted: false, isLocked: true, questions: 2, minutes: 15 },
        { id: 'l10', title: 'Global Variable and Scope', isCompleted: false, isLocked: true, questions: 0, minutes: 0 },
        { id: 'l11', title: 'Newer Way of creating a Constant', isCompleted: false, isLocked: true, questions: 0, minutes: 0 },
        { id: 'l12', title: 'Constants', isCompleted: false, isLocked: true, questions: 0, minutes: 0 },
      ]
    },
    {
      id: 'week-9-12',
      title: 'Week 9-12',
      description: 'Advanced story telling techniques for writers: Personas, Characters & Plots',
      lessons: [
        { id: 'l13', title: 'Defining Functions', isCompleted: false, isLocked: true, questions: 0, minutes: 0 },
        { id: 'l14', title: 'Function Parameters', isCompleted: false, isLocked: true, questions: 0, minutes: 0 },
        { id: 'l15', title: 'Return Values From Functions', isCompleted: false, isLocked: true, questions: 2, minutes: 15 },
        { id: 'l16', title: 'Global Variable and Scope', isCompleted: false, isLocked: true, questions: 0, minutes: 0 },
        { id: 'l17', title: 'Newer Way of creating a Constant', isCompleted: false, isLocked: true, questions: 0, minutes: 0 },
        { id: 'l18', title: 'Constants', isCompleted: false, isLocked: true, questions: 0, minutes: 0 },
      ]
    }
  ];
};

export const fetchComments = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return [
    {
      id: 'c1',
      author: 'Student Name Goes Here',
      avatar: 'https://i.pravatar.cc/40?img=3',
      date: 'Oct 10, 2025',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 'c2',
      author: 'Student Name Goes Here',
      avatar: 'https://i.pravatar.cc/40?img=4',
      date: 'Oct 15, 2025',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 'c3',
      author: 'Student Name Goes Here',
      avatar: 'https://i.pravatar.cc/40?img=5',
      date: 'Oct 19, 2025',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];
};

export const fetchLeaderboard = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return [
    { rank: 1, name: 'Ahmed Ali', avatar: 'https://i.pravatar.cc/40?img=6', score: 950, badge: 1 },
    { rank: 2, name: 'Sara Hassan', avatar: 'https://i.pravatar.cc/40?img=7', score: 880, badge: 2 },
    { rank: 3, name: 'Mohamed Saleh', avatar: 'https://i.pravatar.cc/40?img=8', score: 820, badge: 3 },
    { rank: 4, name: 'Fatma Ahmed', avatar: 'https://i.pravatar.cc/40?img=9', score: 750, badge: 4 },
    { rank: 5, name: 'Omar Youssef', avatar: 'https://i.pravatar.cc/40?img=10', score: 700, badge: 5 },
    { rank: 6, name: 'Nour Mahdy', avatar: 'https://i.pravatar.cc/40?img=11', score: 680, badge: 6 },
    { rank: 7, name: 'Hassan Ibrahim', avatar: 'https://i.pravatar.cc/40?img=12', score: 650, badge: 7 },
    { rank: 8, name: 'Mona Farouk', avatar: 'https://i.pravatar.cc/40?img=13', score: 620, badge: 8 },
  ];
};

export const fetchExamData = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    id: 'exam-1',
    title: 'Week 1-4 Assessment',
    timeLimit: 600, // 10 minutes in seconds
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        text: 'Among the following status of India, which one has the oldest rock formations in the country?',
        options: [
          { id: 'a', text: 'Asam' },
          { id: 'b', text: 'Bahar' },
          { id: 'c', text: 'Kamaltake' },
          { id: 'd', text: 'Utter Pardesh' },
        ],
        correctAnswer: 'b'
      },
      {
        id: 'q2',
        text: 'What is the primary purpose of SEO?',
        options: [
          { id: 'a', text: 'To make websites look better' },
          { id: 'b', text: 'To improve search engine rankings' },
          { id: 'c', text: 'To increase page load speed' },
          { id: 'd', text: 'To create social media content' },
        ],
        correctAnswer: 'b'
      },
      {
        id: 'q3',
        text: 'Which of the following is a on-page SEO factor?',
        options: [
          { id: 'a', text: 'Backlinks' },
          { id: 'b', text: 'Meta tags' },
          { id: 'c', text: 'Social signals' },
          { id: 'd', text: 'Brand mentions' },
        ],
        correctAnswer: 'b'
      },
      {
        id: 'q4',
        text: 'What does URL stand for?',
        options: [
          { id: 'a', text: 'Universal Resource Locator' },
          { id: 'b', text: 'Uniform Resource Locator' },
          { id: 'c', text: 'Unified Resource Link' },
          { id: 'd', text: 'Universal Reference Locator' },
        ],
        correctAnswer: 'b'
      },
      {
        id: 'q5',
        text: 'Which heading tag carries the most SEO weight?',
        options: [
          { id: 'a', text: 'H3' },
          { id: 'b', text: 'H2' },
          { id: 'c', text: 'H1' },
          { id: 'd', text: 'H4' },
        ],
        correctAnswer: 'c'
      },
    ]
  };
};

export const fetchCourseProgress = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    overall: 63,
    currentWeek: 'Week 1-4',
    completedLessons: 5,
    totalLessons: 12,
    level: 'Intermediate',
    xp: 450,
    nextLevelXp: 700,
    achievements: [
      { id: 'a1', title: 'First Lesson', icon: '🎯', earned: true },
      { id: 'a2', title: 'Quick Learner', icon: '⚡', earned: true },
      { id: 'a3', title: 'Perfect Score', icon: '💯', earned: false },
    ]
  };
};
