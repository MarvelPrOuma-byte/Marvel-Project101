export type BlogPost = {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  category: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "character-education-middle-school",
    title: "Why Character Education Matters in the Middle School Years",
    author: "Sarah Bennett, Dean of Students",
    date: "July 12, 2026",
    excerpt:
      "The early-teen years are a pivotal window for forming values. Here's how intentional character education shapes lifelong habits.",
    category: "Student Development",
    content: [
      "The middle school years are often the turning point when students begin to test independence, build friendships, and form opinions about who they want to be. At King Solomon Comprehensive School, we see that period as a powerful opportunity to teach character with the same seriousness we bring to academics.",
      "Character education is not a separate program that lives on the margins of the school day. It shows up in classrooms, clubs, assemblies, and everyday conversations. When students are encouraged to practice honesty, respect, responsibility, and perseverance, they begin to experience those values as habits instead of slogans.",
      "Our educators look for simple, consistent moments to reinforce these habits: how a student responds when they disagree, how they own a mistake, how they treat a classmate who is struggling. These moments shape confidence and community in ways that remain long after the school year ends.",
      "That is why character education matters so deeply in the middle school years. It gives young people language for their choices and a framework for growth. Over time, those habits become part of their identity and prepare them to lead with wisdom and purpose.",
    ],
  },
  {
    slug: "new-stem-partnership",
    title: "Inside Our New STEM Partnership",
    author: "Dr. Eleanor Vance, Head of School",
    date: "June 30, 2026",
    excerpt:
      "King Solomon Comprehensive School is partnering with a regional research lab to give upper school students hands-on research experience in engineering and biotech.",
    category: "Academics",
    content: [
      "We are excited to announce a new partnership with a regional research lab that will expand the learning opportunities available to our upper school students. The collaboration gives learners access to practical experiences in engineering, biotechnology, data analysis, and scientific communication.",
      "Students will work alongside mentors on authentic projects that connect classroom concepts with real-world problem solving. In doing so, they will not only strengthen their academic knowledge but also sharpen teamwork, curiosity, and resilience.",
      "This partnership reflects our belief that modern education should give students the chance to ask questions, test ideas, and see the impact of their work. As our school continues to grow, we are committed to creating pathways that prepare learners for the next stage of their academic and professional journeys.",
    ],
  },
  {
    slug: "choose-extracurriculars",
    title: "How to Choose the Right Extracurriculars",
    author: "Marcus Okafor, Academic Dean",
    date: "June 18, 2026",
    excerpt:
      "Depth over breadth: advice for students and families on building a meaningful, balanced schedule outside the classroom.",
    category: "Admissions",
    content: [
      "Extracurricular activities can enrich a student’s school experience, but the best choices are usually the ones that reflect both the student’s interests and their capacity. A well-chosen mix of activities can build confidence, create community, and support long-term growth.",
      "When families are choosing activities, it helps to ask a few guiding questions: What does the student genuinely enjoy? What skills do they want to develop? Is the schedule manageable alongside academic demands? A thoughtful approach usually beats a crowded calendar.",
      "We encourage students to explore with intention rather than pressure. A smaller number of meaningful commitments often produces stronger results than trying to do everything at once. Over time, those experiences help students discover where they thrive and how they want to contribute.",
    ],
  },
  {
    slug: "alumni-public-service",
    title: "Alumni Spotlight: Building a Career in Public Service",
    author: "David Chen, Director of Admissions",
    date: "May 28, 2026",
    excerpt:
      "A conversation with a school alumna about how her high school mentors shaped her path into policy and advocacy.",
    category: "Alumni",
    content: [
      "Our alumni continue to inspire current students by showing how the values learned at school can shape meaningful careers. One of our recent graduates shared how teachers and mentors helped her see public service as both a calling and a practical path forward.",
      "She spoke about the importance of listening, writing clearly, asking purposeful questions, and staying grounded in service. Those habits, developed during her years at school, became the foundation for her work in policy and advocacy.",
      "Her story reminds us that strong school communities do more than prepare students for exams. They also prepare them to contribute to society with empathy, discipline, and conviction.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
