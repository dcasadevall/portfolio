import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Daniel",
  lastName: "Casadevall Pino",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Staff Software Engineer",
  avatar: "/images/avatar.png",
  location: "Europe/Barcelona", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Spanish", "English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/dcasadevall",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/dcasadevall/",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:dcasadevall@me.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}`,
  description: `Hi, I'm ${person.name}, a ${person.role} from ${person.location}.`,
  avatar: {
    display: true,
  },
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /home route
}

const resume = {
  label: "Resume",
  title: `${person.name}`,
  description: `Meet ${person.name}, ${person.role} at Niantic.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        A full-stack engineer with a passion for clean, maintainable, and testable code, seamlessly blending software
        engineering with a deep love for gaming and multiplayer technologies. Driven by a commitment to robust
        architecture and scalable design, each project is an opportunity to refine systems, enhance player experiences,
        and push the boundaries of online interaction.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Niantic",
        timeframe: "2018 - Present",
        role: "Staff Software Engineer",
        achievements: [
          <>
            Redesigned and implemented the <span className="highlight">AR Multiplayer Services</span> backend, achieving 99.9% uptime
            and 80%+ test coverage
          </>,
          <>
            Created a <span className="highlight">React</span> <span className="highlight">A-Frame</span> Multiplayer Game Engine that interfaces with Niantic's AR Multiplayer Backend,
            providing features such as <span className="highlight">transform interpolation</span> and <span className="highlight">clock synchronization</span>
          </>,
          <>
            Developed a multiplayer <span className="highlight">FPS</span> prototype in <span className="highlight">Unity</span>, using <span className="highlight">client prediction</span> techniques like
            <span className="highlight"> dead reckoning</span> to ensure smooth gameplay even with 100ms RTT latency
          </>,
          <>
            Designed and implemented Niantic's standard <span className="highlight">gRPC</span> API, reducing boilerplate code by over 50%
          </>,
        ],
        images: [],
      },
      {
        company: "Apple",
        timeframe: "2017 - 2018",
        role: "Software Engineer",
        achievements: [
          <>
            Improved <span className="highlight">multithreading QoS</span>, achieving up to 20% faster response times
          </>,
          <>
            Led a refactor of the <span className="highlight">iCloud</span> and <span className="highlight">CalDAV</span> sync layer, reducing dependencies and improving test coverage
          </>,
        ],
        images: [],
      },
      {
        company: "Storm8",
        timeframe: "2014 - 2017",
        role: "Staff Engineer",
        achievements: [
          <>
            Migrated <span className="highlight">JSON</span> serialization to <span className="highlight">Protobuf</span>, reducing deserialization time by 60%
          </>,
          <>
            Developed object placement <span className="highlight">heuristics</span> for Bakery Story 2, improving D7 retention by 5%
          </>,
          <>
            Architected the <span className="highlight">Unity</span> game client for Bingo, leveraging <span className="highlight">dependency injection</span>
          </>,
        ],
        images: [],
      },
      {
        company: "Market Motive",
        timeframe: "2010 - 2014",
        role: "Lead Developer",
        achievements: [
          <>
            Developed a secure <span className="highlight">video streaming</span> platform that reduced piracy to 0%
          </>,
          <>
            Built mobile and desktop versions of an <span className="highlight">HTML5</span> video player with
            <span className="highlight"> custom encryption</span>
          </>,
          <>
            Designed a one-page shopping cart that increased conversion rates from 0.75% to 1.2%
          </>,
        ],
        images: [],
      },
      {
        company: "CADT S.A.",
        timeframe: "Summers 2008 - 2009",
        role: "Software Engineer",
        achievements: [
          <>
            Implemented a <span className="highlight">multi-threaded</span> repository sync system similar to Dropbox and Google Drive
          </>,
          <>
            Developed an <span className="highlight">AJAX</span>-based chat system
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "Universitat Autonoma de Barcelona (UAB)",
        description: <>B.S. in Computer Science (2011) with scholarship at University of California, Santa Cruz (2008-2009)</>,
      },
      {
        name: "Universitat Autonoma de Barcelona (UAB)",
        description: <>B.S. in Radiowaves and Remote Communications (2006)</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Backend Development",
        description: <>Extensive experience with <span className="highlight">GoLang</span>, <span className="highlight">Java</span>, and <span className="highlight">gRPC</span> for high-performance backend services</>,
        images: [],
      },
      {
        title: "Game Development",
        description: <>Proficient in <span className="highlight">Unity</span> and <span className="highlight">C#</span> with focus on multiplayer systems, client prediction, and AR technologies</>,
        images: [],
      },
      {
        title: "Infrastructure",
        description: <>Experience with <span className="highlight">Kubernetes</span>, <span className="highlight">Bazel</span>, and distributed systems architecture</>,
        images: [],
      },
      {
        title: "Frontend Development",
        description: <>Skilled in <span className="highlight">React</span> and <span className="highlight">JavaScript</span> for building responsive web applications</>,
        images: [],
      },
    ],
  },
};

const work = {
  label: "Dev & Games",
  title: "Dev & Games",
  description: `Game and dev projects by ${person.name}`,
};

const sideProjects = {
  label: "Side Projects",
  title: "Side Projects",
  description: `Side projects by ${person.name}`,
};

export { person, social, newsletter, resume, home, work, sideProjects };
