export type NewsStory = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string[];
};

export const newsStories: NewsStory[] = [
  {
    slug: "scouts-national-championship",
    title: "Scouts Team Advances to National Championship",
    date: "July 15, 2026",
    category: "Scouts",
    excerpt:
      "Our Scouts team earned top honors at the regional competition and will now represent the county at the national level.",
    content: [
      "The King Solomon Comprehensive School Scouts team delivered an outstanding performance at the regional challenge finals, earning the top score in both teamwork and outdoor skills. Judges praised the team for their discipline, confidence, and calm handling of complex problem-solving tasks under pressure.",
      "The competition brought together schools from across the region, and our students stood out not only for their technical competence but also for their leadership and sportsmanship. Their preparation, backed by hours of training and mentorship from staff advisers, paid off in a visible and inspiring way.",
      "The team will now advance to the national championship, where they will compete against the best youth scouting groups in the country. The school community is proud of their achievement and is rallying behind them as they prepare for the next stage of the journey.",
    ],
  },
  {
    slug: "blue-bells-regional-champions",
    title: "Blue Bells Emerge Regional Champions",
    date: "July 8, 2026",
    category: "Brass Band",
    excerpt:
      "The celebrated Blue Bells marched through the regional competition with precision, energy, and confidence to claim the title.",
    content: [
      "The Blue Bells brass band brought the school to life at the regional music festival, delivering a polished performance that captivated judges and audiences alike. Their disciplined marching, vibrant sound, and strong stage presence earned them the championship title.",
      "What stood out most was the sense of unity in the band. Every section worked with remarkable coordination, demonstrating the hours of rehearsal and commitment that have shaped the group into one of the school’s most admired performing ensembles.",
      "Their success is a reminder that arts education plays a major role in building confidence, collaboration, and school pride. The Blue Bells now look ahead to future performances, carrying the momentum of their regional victory with them.",
    ],
  },
  {
    slug: "girl-guides-nationals",
    title: "Girl Guides on Their Way to National Level",
    date: "June 28, 2026",
    category: "Girl Guides",
    excerpt:
      "The Marigold Patrol secured a memorable win at the regional level and is preparing for the national stage.",
    content: [
      "The Marigold Patrol of the Girl Guides made history for the school by winning a hard-fought regional competition against strong opposition. Their achievement reflects the values of resilience, service, and teamwork that guide the program.",
      "The patrol’s performance combined practical skills, confidence, and thoughtful leadership. Their success was especially meaningful because it showed how young people can grow through structured challenge and shared responsibility.",
      "With the regional title secured, the team is now preparing for the national level, where they will represent their school with pride. Their journey has already inspired younger students to see the Girl Guides as a place where leadership and service can grow together.",
    ],
  },
  {
    slug: "website-launch",
    title: "Website Launch Celebrated by ICT Club",
    date: "June 10, 2026",
    category: "ICT Club",
    excerpt:
      "After months of coding, debugging, and design work, the ICT Club officially launched the school website for the community.",
    content: [
      "The ICT Club celebrated a major milestone this month with the official launch of the school website. The project began as a student-led idea and grew into a full digital platform that now serves families, students, and visitors.",
      "Students worked through many challenges, including testing layouts, refining content, and solving technical issues. Their persistence and collaboration transformed a concept into a practical school resource that highlights academic life, achievements, and upcoming events.",
      "The launch marks the beginning of a new chapter for digital engagement at the school. The ICT Club continues to build on the momentum by exploring new ways to share school stories, improve communication, and inspire creative technology learning.",
    ],
  },
];

export function getNewsStory(slug: string) {
  return newsStories.find((story) => story.slug === slug);
}
