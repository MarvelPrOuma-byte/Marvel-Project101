import photo1 from "../assets/photo1.JPG";
import photo2 from "../assets/photo2.JPG";
import photo3 from "../assets/photo3.JPG";
import photo4 from "../assets/photo4.JPG";

export type NewsStory = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string[];
  image: string;
};

export const newsStories: NewsStory[] = [
  {
    slug: "scouts-national-championship",
    title: "Scouts team win the National Championship",
    date: "August 5, 2026",
    category: "Scouts",
    excerpt:
      "Our Scouts team earned top honors at the National Inter-Patrol competition and will now represent the country at the East Africa level.",
    image: photo1,
    content: [
      "The Peacock Patrol delivered an outstanding performance at the national challenge finals, earning the top score in both teamwork and outdoor skills. Judges praised the team for their discipline, confidence, and calm handling of complex problem-solving tasks under pressure.",
      "The competition brought together schools from across the state, and our students stood out not only for their technical competence but also for their leadership and sportsmanship. Their preparation, backed by hours of training and mentorship from staff advisers, paid off in a visible and inspiring way.",
      "The team will now advance to the national championship, where they will compete against the best youth scouting groups in the East Africa Region. The school community is proud of their achievement and is rallying behind them as they prepare for the next stage of the journey.",
    ],
  },
  {
    slug: "blue-bells-regional-champions",
    title: "Blue Bells Emerge the 5th best Nationwide",
    date: "August 3, 2026",
    category: "Brass Band",
    excerpt:
      "The celebrated Blue Bells marched through the national competition with precision, energy, and confidence to claim the one of the top positions.",
    image: photo2,
    content: [
      "The Blue Bells brass band brought the school to life at the national competition held at Bungoma, delivering a polished performance that captivated judges and audiences alike. Their disciplined marching, vibrant sound, and strong stage presence earned them the 5th position nationwide.",
      "What stood out most was the sense of unity in the band. Every section worked with remarkable coordination, demonstrating the hours of rehearsal and commitment that have shaped the group into one of the school’s most admired performing ensembles.",
      "Their success is a reminder that arts education plays a major role in building confidence, collaboration, and school pride. The Blue Bells now look ahead to future performances, carrying the momentum of their regional victory with them.",
    ],
  },
  {
    slug: "girl-guides-nationals",
    title: "Girl Guides on Their Way to East Africa Level",
    date: "August 5, 2026",
    category: "Girl Guides",
    excerpt:
      "The Marigold Patrol secured a memorable win at the Nationals level and is preparing for the East Africa stage.",
    image: photo3,
    content: [
      "The Marigold Patrol of the Girl Guides made history for the school by winning a hard-fought national competition against strong opposition. Their achievement reflects the values of resilience, service, and teamwork that guide the program.",
      "The patrol’s performance combined practical skills, confidence, and thoughtful leadership. Their success was especially meaningful because it showed how young people can grow through structured challenge and shared responsibility.",
      "With the national title secured, the team is now preparing for the east africa level level, where they will represent their school with pride. Their journey has already inspired younger students to see the Girl Guides as a place where leadership and service can grow together.",
    ],
  },
  {
    slug: "website-launch",
    title: "Website Launch Celebrated by ICT Club",
    date: "August 7, 2026",
    category: "ICT Club",
    excerpt:
      "After months of coding, debugging, and design work, the ICT Club officially launched the school website for the community.",
    image: photo4,
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