import A1 from "../assets/A1.png"
import A2 from "../assets/A2.png"
import A3 from "../assets/A3.png"
import A4 from "../assets/A4.png"
import AT1   from "../assets/AT1.png"
import AT2 from "../assets/AT2.png"
import AT3 from "../assets/AT3.png"



import {
  Users,
  BookOpen,
  Award,
  Globe,
  GraduationCap,
  Clock,
  Target,
  Eye,
  Heart,
} from "lucide-react";

export const counterTargets = {
  students: 200,
  courses: 45,
  successRate: 90,
  countries: 1,
  certificates: 12,
  support: 24,
};

export const statsMeta = [
  {
    key: "students",
    label: "Active Students",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
  },
  {
    key: "courses",
    label: "Courses",
    icon: BookOpen,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
  },
  {
    key: "successRate",
    label: "Success Rate",
    icon: Award,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
  },
  {
    key: "countries",
    label: "Countries",
    icon: Globe,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
  },
  {
    key: "certificates",
    label: "Certificates",
    icon: GraduationCap,
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50",
  },
  {
    key: "support",
    label: "Support",
    icon: Clock,
    color: "from-teal-500 to-green-500",
    bgColor: "bg-gradient-to-br from-teal-50 to-green-50",
  },
];

export const missionVisionValues =  [
  {
    type: "mission",
    icon: Target,
    title: "Our Mission",
    subtitle: "To simplify and organize student life.",
    description:
      "Created A Smart Learnining Management System And Also Cgpa Calculator And A daily To Do Manager Feature Is also Available.",
    dotLottie: "https://lottie.host/d4aed205-8352-4490-a20a-83e4b3b3e2f6/f3nl34gaEN.lottie",
    features: [
      "To simplify and organize student life.",
      "Track performance effortlessly",
      "Stay organized and productive",
      "Learn smarter from one platform",
    ],
    color: "from-blue-600 to-cyan-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-100",
  },
  {
    type: "vision",
    icon: Eye,
    title: "Our Vision",
    subtitle: "Learn smarter from one platform",
    description:
      "Our vision is to create a future where every student manages learning, performance, and productivity seamlessly through a single intelligent platform.",
    dotLottie: "https://lottie.host/591f8a0f-faba-495a-9a38-ff1bf44b5fad/W30zLs2vep.lottie",
    features: [
      "Simplify academic management",
      "Track performance effortlessly",
      "Stay organized and productive",
      "Learn smarter from one platform",
    ],
    color: "from-purple-600 to-pink-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-100",
  },
  {
  type: "values",
  icon: Heart,
  title: "Our Values",
  subtitle: "What Drives Us",
  description:
    "Our values guide how we build, improve, and deliver a meaningful academic experience for students and educators.",
  dotLottie: "https://lottie.host/4cf976d2-0a1a-4017-b021-c3fe2b0a4c18/ksM0OM58Dd.lottie",
  features: [
    "Students at the core",
    "Quality-driven learning",
    "Innovation with purpose",
    "Collaboration & growth",
  ],
  color: "from-green-600 to-emerald-600",
  bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
}

];
export const teamMembers = [
  {
    name: "Debadatta Parida",
    role: "Admin",
    image:A1,
    bio: "Vssut Cse - 2028",
    social: ["twitter", "linkedin", "github"],
  },
  {
    name: "Smruti Ranjan Sahu",
    role: "Admin",
    image:A2,
    bio: "Vssut Cse - 2028",
    social: ["twitter", "linkedin"],
  },
  {
    name: "Nityananda Giri",
    role: "Admin",
    image:A3,
    bio: "Vssut Cse - 2028",
    social: ["twitter", "linkedin", "dribbble"],
  },
  {
    name: "Saumya Ranjan Behera",
    role: "Admin",
    image:A4,
    bio: "Vssut Cse - 2028",
    social: ["twitter", "linkedin", "github"],
  },
];

export const values = [
  {
  title: "CGPA Calculator",
  description:
    "Calculate Your CGPA Easily Through Your Midsem And EndSem Marks Directly .",
  features: ["Midsem and Endsem Marks", "CGPA Calculation", "Easy Access"],
  color: "from-blue-500 to-cyan-500",
},
{
  title: "Learn Different Subjects",
  description:
    "Learn Different Subjects with Organised Manner and Built Different Type Of Skills.",
  features: ["Search Friendly", "Anywhere Access", "User-Friendly UI", "Organised Content"],
  features: ["Search Friendly", "Anywhere Access", "User-Friendly UI"],
  color: "from-purple-500 to-pink-500",
},
{
  title: "Track Your Attendance",
  description:
    "Track Your Attendance Subject Wise and Get Insights for Better Performance.",
  features: ["Attendance Tracking", "Progress Insights", "Goal Tracking"],
  color: "from-green-500 to-emerald-500",
},
{
  title: "Task & Time Management",
  description:
    "Upcoming Feature...Task & Time Management will Add Soon ....",
  features: ["Smart To-Do List", "Deadline Reminders", "Productivity Focused"],
  color: "from-orange-500 to-amber-500",
},

];

export const milestones = [
  {
    year: "2018",
    event: "LearnHub Founded",
    description: "Started with 10 courses and 500 students",
  },
  {
    year: "2019",
    event: "Mobile App Launch",
    description: "Released iOS and Android learning apps",
  },
  {
    year: "2020",
    event: "Global Expansion",
    description: "Expanded to 50+ countries worldwide",
  },
  {
    year: "2021",
    event: "AI Integration",
    description: "Implemented AI-powered learning paths",
  },
  {
    year: "2022",
    event: "1M Students",
    description: "Reached 1 million active learners",
  },
  {
    year: "2023",
    event: "Enterprise Launch",
    description: "Launched corporate training solutions",
  },
];

export const testimonials = [
  {
    name: "Alex Thompson",
    role: "Software Developer",
    image:AT1,
    text: "CourseCraft transformed my career. The courses are comprehensive and the support is exceptional.",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    role: "Data Scientist",
    image:AT2,
    text: "The quality of instruction and hands-on projects helped me land my dream job.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "UX Designer",
    image:AT3,
    text: "Best investment I've made in my professional development. Highly recommended!",
    rating: 5,
  },
];

// default export (optional)
export default {
  counterTargets,
  statsMeta,
  missionVisionValues,
  teamMembers,
  values,
  milestones,
  testimonials,
};
