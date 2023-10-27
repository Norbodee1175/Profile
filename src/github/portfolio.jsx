const about = {
    // all the properties are optional - can be left empty or deleted
    name: 'Norabodee Chok-amnuaydej',
    role: 'Robotics and AI Engineer student at KMITL',
    description:
    <div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I am a student from Robotics and AI Engineering, so I have coding and AI skill that is C/C++, Python3, ReactJS, NodeJS, JavaScript and Yolov7. I also have skills in database such as SQL, MongoDB and Oracle.<br/><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I am good at the English language. I am a responsible person, work hard and have good teamwork. I love acquiring new knowledge, especially in areas related to Full-Stack, Frontend, Backend, Big Data, AI, and Machine Learning..<br/><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I was an intern and coop at Seagate for 6 months. I wrote a website for production line by using React JS as frontend, Flask as backend and Oracle as database<br/><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I joined the work and travel program (USA) after finishing my studies, and it allowed me to practice English language skills as well as various soft skills such as patience, diligence, adaptability, problem-solving, and gained many experiences.

    </div>,
    resume: 'https://example.com',
    social: {
      linkedin: 'https://linkedin.com/in/win-norabodee',
      github: 'https://github.com/Norbodee1175',
    },
}

const project = [
  // projects can be added an removed
  // if there are no projects, Projects section won't show up
  {
    name: 'Project Intern at Seagate',
    description:
      <div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I wrote a website for production line at Seagate Company by using React JS as frontend, Flask as backend and Oracle as database. I will list the function of my project<br/><br/>
        - User id management, limiting access to various pages of each roles id by retrieving user information from backenda and database. Admin Profile page for add, edit, delete any user id.<br/><br/>
        - Master Data is the pages to enter various information to be used on other pages such as product name, machine number, component name, button cooldown time and acceptable value.<br/><br/>
        - 4 Steps of filling information (If you don't understand, you can see flowchart below.)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. Fill start step 1 information, waiting for cooldown time from Master Data and fill end step 1 information.<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Fill start step 2 information, waiting for cooldown time from Master Data, fill end step 2 information, check 'X' value from end step 2 if it less than acceptable value from Master Data it will Pass but if 'X' value more than acceptable value it will Fail.<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Informtion that Fail from step 2 will be here for retest again but if it Fail again, it will have to restart process that is go to step 1 again.<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. If Informtion that Pass from step 2,3 and component is 'A' it will be here but if information that Pass and component isn't 'A' it will finish from step 2 or 3. Step 4 will have to fill start step 4 infromation, waiting for 24 hours, fill end step 4 inforamtion, check 'Y' value from end step 4 if it less than acceptable value from Master Data it will Pass but if 'Y' value more than acceptable value it will Fail and have to restart process.<br/><br/>
        - Dashboard to show performance of each product and machine number presented in the form of 6 charts.<br/><br/>
        - Missing Activity for remind production line doesn't forget to fill out the information. If any infromation not active for 2 days it will show on this page such as finish step 1 for 2 days but doesn't finish step 2 yet.<br/><br/>
        - Report Table for filter data and export as CSV. Filter data consist of product, machine number, component, Pass or Fail or All, period of time.<br/><br/>
      </div>,
    stack: ['React JS', 'Flask', 'Oracle', 'React-Router-Dom', 'SQLAlchemy', 'Axios'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
  },
]

const projects = [
    // projects can be added an removed
    // if there are no projects, Projects section won't show up
    {
      name: 'Project 1',
      description:
        'Make a robot follow a line by using Fusion360 to design, Arduino to code and use IR Sensor for making the robot run on the line.',
      stack: ['Arduino', 'Autodesk Fusion360'],
      sourceCode: 'https://github.com',
      livePreview: 'https://github.com',
    },
    {
      name: 'Project 2',
      description:
        'Sony hand detection project by using YOLOv5 to train model, Python3 to divide the sequence and JavaScript CSS to do GUI.',
      stack: ['Python3', 'YOLOv5', 'JavaScript', 'HTML', 'CSS'],
      sourceCode: 'https://github.com',
      livePreview: 'https://github.com',
    },
    {
      name: 'Project 3',
      description:
        'Make a basic game by using Fusion360 and SketchUp to create a maze and other environments then import to unity to control the character.',
      stack: ['Unity', 'Autodesk Fusion360', 'SketchUp'],
      sourceCode: 'https://github.com',
      livePreview: 'https://github.com',
    },
    {
      name: 'Project 4',
      description:
        'Set up and use Turtlebot3 to scan maps and use Python3 to navigate to the point that we set.',
      stack: ['Linux Ubuntu', 'Turtlebot3', 'Raspberry Pi'],
      sourceCode: 'https://github.com',
      livePreview: 'https://github.com',
    },
    {
      name: 'Project 5',
      description:
        'Using YOLOv7 to train AI to distinguish 3 dog breeds between German Shepherd, Golden Retriever and Siberian Husky by using Transfer learning techniques',
      stack: ['YOLOv7', 'Roboflow', 'Machine Learning'],
      sourceCode: 'https://github.com',
      livePreview: 'https://github.com',
    },
    {
      name: 'Project 6',
      description:
        'The final project of my group is to create a chatbot for Q&A related to our faculty, using ChatGPT 4 for training and ReactJS, Python 3, and MySQL for full-stack development.',
      stack: ['ChatGPT4', 'Python3', 'ReactJS', 'MySQL'],
      sourceCode: 'https://github.com',
      livePreview: 'https://github.com',
    },
]

const skills = [
    // skills can be added or removed
    // if there are no skills, Skills section won't show up
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'React JS',
    'Node JS',
    'Material UI',
    'Axios',
    'SQLAlchemy',
    'Flask',
    'Python 3',
    'YOLOv7',
    'Roboflow',
    'ChatGPT4',
    'Linux Ubuntu',
    'Arduino',
    'Oracle',
    'MongoDB',
    'MySQL',
    'Autodesk Fusion360',
    'Unity',
    'SketchUp',
    '3ds Max',
    'Blender',
]

const contact = {
    // email is optional - if left empty Contact section won't show up
    email: 'winnbdz@gmail.com',
}

export { about, project, projects, skills, contact }