import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  Linkedin,
  Mail,
  Send,
  Server,
  Sparkles,
  X,
} from 'lucide-react';

type Direction = 'next' | 'prev';
type Role = 'center' | 'left' | 'right' | 'back';

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const IMAGES = [
  {
    src: assetPath('intro-figurine.png'),
    bg: '#F4845F',
    panel: '#F79B7F',
    label: 'Intro',
  },
  {
    src: assetPath('education-figurine.png'),
    bg: '#6BBF7A',
    panel: '#85CC92',
    label: 'Education',
  },
  {
    src: assetPath('experience-figurine.png'),
    bg: '#E882B4',
    panel: '#ED9DC4',
    label: 'Experience',
  },
  {
    src: assetPath('projects-figurine.png'),
    bg: '#6EB5FF',
    panel: '#8DC4FF',
    label: 'Projects',
  },
  {
    src: assetPath('skills-figurine.png'),
    bg: '#8B5CF6',
    panel: '#A78BFA',
    label: 'Skills',
  },
];

const heroSkills = ['Software Engineer', 'Full Stack Developer', 'AI Engineer'];

const education = [
  {
    degree: 'Master of Science',
    field: 'Computer Science',
    school: 'Texas State University',
    dates: 'Aug 2024 - May 2026',
  },
  {
    degree: 'Bachelor of Engineering',
    field: 'Computer Science and Engineering',
    school: 'Avinashilingam Institute',
    dates: 'Sep 2020 - May 2024',
  },
];

const experiences = [
  {
    role: 'Research Assistant',
    company: 'Texas State University',
    dates: 'Aug 2025 - Apr 2026',
    summary: 'Built mixed reality modules, AI/LLM pipelines, and performance-tested research systems.',
    details: [
      'Built Mixed Reality modules for electrical hazard awareness in Unity and C# for Magic Leap 2 using spatial mapping and depth sensing.',
      'Integrated REST APIs and AI/LLM services into real-time ETL pipelines with Python, Pandas, and SciPy, reducing inference latency by 20%.',
      'Improved MR module stability by 30% through profiling, structured logging, modular refactoring, and CI testing.',
      'Analyzed experimental data in SciPy and Jupyter Notebooks to derive actionable research insights.',
    ],
  },
  {
    role: 'Web Developer Intern',
    company: 'Gateway Software Solutions',
    dates: 'Jul 2023 - Dec 2023',
    summary: 'Delivered React, Node.js, MySQL microservices with REST APIs, CI/CD workflows, and Agile releases.',
    details: [
      'Developed a full-stack microservice application using React, Node.js, and MySQL.',
      'Built and maintained RESTful APIs and third-party integrations supporting scalable business workflows.',
      'Collaborated in Agile sprint cycles to reduce production defects by 30% and improve page-load performance by 20%.',
    ],
  },
  {
    role: 'Android Developer Intern',
    company: 'National Small Industries Corporation',
    dates: 'Jul 2022 - Dec 2022',
    summary: 'Created Java/Kotlin Firebase apps with secure data flows, logging, debugging, and performance improvements.',
    details: [
      'Developed Android apps in Java and Kotlin with Firebase authentication, real-time database, and analytics.',
      'Improved app stability by 25% through structured logging, error handling, and debugging workflows.',
      'Optimized API response times and feature adoption through targeted performance improvements.',
    ],
  },
];

const projects = [
  {
    title: 'ProArcade',
    organization: 'AI-Powered Gamified Productivity Platform',
    date: 'Jun 2026 - Present',
    image: assetPath('projects/proarcade.jpg'),
    description:
      'Cross-browser full-stack productivity platform with JWT authentication, persistent game sessions, personalized tasks, and game progression.',
    impact:
      'Integrated AWS S3, Amazon Bedrock, Prisma, PostgreSQL, CloudWatch monitoring, and documented REST APIs for support and future enhancements.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'AWS S3', 'Amazon Bedrock', 'CloudWatch'],
  },
  {
    title: 'AR E-Commerce Virtual Try-On',
    organization: 'Texas State University',
    date: 'Feb 2026 - May 2026',
    image: assetPath('projects/ar-ecommerce.jpg'),
    description:
      'AR-enabled full-stack e-commerce application supporting 100+ products with real-time product visualization and AI-powered virtual try-on.',
    impact:
      'Designed Supabase workflows for 1000+ records and integrated Hugging Face API, WebXR, Google Model Viewer, Cursor, and Codex.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Supabase', 'WebXR', 'Hugging Face'],
  },
  {
    title: 'Eye Tracker System',
    organization: 'Texas State University',
    date: 'Sep 2025 - Oct 2025',
    image: assetPath('projects/eye-tracker.jpeg'),
    description:
      'Real-time eye-tracking system using computer vision and gaze estimation for pupil detection and tracking across video streams.',
    impact:
      'Reached 25ms latency using C++, computer vision, CUDA/OpenCL acceleration, multithreading, and memory optimization.',
    technologies: ['C++', 'Computer Vision', 'Gaze Estimation', 'CUDA', 'OpenCL', 'Multithreading'],
  },
  {
    title: 'QAAsker',
    organization: 'Consistency Testing Framework',
    date: 'Aug 2025 - Dec 2025',
    image: assetPath('projects/qaasker.png'),
    description:
      'Consistency testing framework evaluating three NLP question-answering models across 1,000+ samples using metamorphic testing.',
    impact:
      'Built an end-to-end PyTest and GitHub Actions pipeline plus a weighted voting ensemble to improve answer reliability analysis.',
    technologies: ['Python', 'PyTest', 'GitHub Actions', 'NLP', 'Model Evaluation'],
  },
];

const skillGroups = [
  {
    icon: Code2,
    title: 'Languages',
    items: ['Python', 'TypeScript', 'Java', 'C++', 'C#', 'Kotlin'],
  },
  {
    icon: Server,
    title: 'Backend',
    items: ['Node.js', 'Express', 'FastAPI', 'Flask', 'Django', '.NET'],
  },
  {
    icon: Database,
    title: 'Data & Cloud',
    items: ['PostgreSQL', 'MySQL', 'Firebase', 'AWS', 'Docker', 'CI/CD'],
  },
  {
    icon: Sparkles,
    title: 'AI & XR',
    items: ['LLMs', 'RAG', 'PyTorch', 'TensorFlow', 'Unity', 'Magic Leap'],
  },
];

const grainSvg =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [hireForm, setHireForm] = useState({ name: '', email: '', message: '' });
  const [hireStatus, setHireStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === 'undefined' ? false : window.innerWidth < 640,
  );

  useEffect(() => {
    IMAGES.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const roles = useMemo(
    () => ({
      center: activeIndex,
      left: (activeIndex + IMAGES.length - 1) % IMAGES.length,
      right: (activeIndex + 1) % IMAGES.length,
    }),
    [activeIndex],
  );

  const navigate = (direction: Direction) => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    setActiveIndex((previousIndex) =>
      direction === 'next'
        ? (previousIndex + 1) % IMAGES.length
        : (previousIndex + IMAGES.length - 1) % IMAGES.length,
    );

    window.setTimeout(() => setIsAnimating(false), 650);
  };

  const handleHireSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHireStatus('sending');

    try {
      const response = await fetch('https://formsubmit.co/ajax/shreegayathrignana@gmail.com', {
        method: 'POST',
        body: new FormData(event.currentTarget),
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Unable to send message');
      }

      setHireStatus('sent');
      setHireForm({ name: '', email: '', message: '' });
      window.setTimeout(() => {
        setHireStatus('idle');
        setIsHireOpen(false);
      }, 1500);
    } catch {
      setHireStatus('error');
    }
  };

  const getRole = (index: number): Role => {
    if (roles.center === index) {
      return 'center';
    }

    if (roles.left === index) {
      return 'left';
    }

    if (roles.right === index) {
      return 'right';
    }

    return 'back';
  };

  const getItemStyle = (role: Role, imageIndex: number): CSSProperties => {
    const useIntroFigurineSize = imageIndex === 0 || imageIndex === 3 || imageIndex === 4;
    const isEducationFigurine = imageIndex === 1;
    const isExperienceFigurine = imageIndex === 2;
    const base: CSSProperties = {
      position: 'absolute',
      aspectRatio: '0.6 / 1',
      transform: 'translateX(-50%) scale(1)',
      transition:
        'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1)',
      willChange: 'transform, filter, opacity',
    };

    if (role === 'center') {
      return {
        ...base,
        transform: `translateX(-50%) scale(${isMobile ? (useIntroFigurineSize ? 1.02 : isExperienceFigurine ? 1.72 : isEducationFigurine ? 1.28 : 1.2) : useIntroFigurineSize ? 1.34 : isExperienceFigurine ? 2.52 : isEducationFigurine ? 1.72 : 1.62})`,
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 20,
        left: '50%',
        height: isMobile ? (useIntroFigurineSize ? '46%' : isExperienceFigurine ? '76%' : isEducationFigurine ? '58%' : '54%') : useIntroFigurineSize ? '74%' : isExperienceFigurine ? '128%' : isEducationFigurine ? '92%' : '86%',
        bottom: isMobile ? '23%' : 0,
      };
    }

    if (role === 'left' || role === 'right') {
      return {
        ...base,
        filter: 'blur(2px)',
        opacity: 0.72,
        zIndex: 10,
        left: role === 'left' ? (isMobile ? '18%' : '28%') : isMobile ? '82%' : '72%',
        height: isMobile ? (useIntroFigurineSize ? '12%' : isExperienceFigurine ? '22%' : isEducationFigurine ? '15%' : '14%') : useIntroFigurineSize ? '20%' : isExperienceFigurine ? '41%' : isEducationFigurine ? '27%' : '24%',
        bottom: isMobile ? '34%' : '10%',
      };
    }

    return {
      ...base,
      filter: 'blur(4px)',
      opacity: 0.5,
      zIndex: 5,
      left: '50%',
      height: isMobile ? (useIntroFigurineSize ? '10%' : isExperienceFigurine ? '20%' : isEducationFigurine ? '13%' : '12%') : useIntroFigurineSize ? '15%' : isExperienceFigurine ? '35%' : isEducationFigurine ? '21%' : '18%',
      bottom: isMobile ? '35%' : '11%',
    };
  };

  const renderGhostText = () => {
    if (activeIndex === 0) {
      return (
        <>
          <span>Shree Gayathri</span>
          <span>Gnanasekar</span>
        </>
      );
    }

    const labels = ['Education', 'Experience', 'Projects', 'Skills'];

    return <span>{labels[activeIndex - 1]}</span>;
  };

  return (
    <main
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <section className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
        <div
          className="pointer-events-none absolute inset-0 bg-repeat"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: grainSvg,
            backgroundSize: '200px 200px',
          }}
        />

        <div
          className="pointer-events-none absolute inset-x-0 flex select-none flex-col items-center justify-center text-center"
          style={{ zIndex: 2, top: activeIndex === 0 ? '12%' : '18%' }}
        >
          <div
            key={activeIndex}
            className="ghost-title flex flex-col uppercase text-white"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: activeIndex === 0 ? 'clamp(36px, 8.5vw, 128px)' : 'clamp(48px, 12vw, 172px)',
              fontWeight: 900,
              lineHeight: activeIndex === 0 ? 0.88 : 1,
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            {renderGhostText()}
          </div>
        </div>

        <header
          className="absolute left-4 right-4 top-5 flex items-center justify-between gap-3 text-white sm:left-8 sm:right-8"
          style={{ zIndex: 60 }}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 text-sm font-bold">
              SG
            </div>
            <a
              href="mailto:shreegayathrignana@gmail.com"
              className="flex items-center gap-2 text-xs font-semibold text-white opacity-90 sm:text-sm"
            >
              <Mail className="h-4 w-4" strokeWidth={2.25} />
              <span className="hidden sm:inline">shreegayathrignana@gmail.com</span>
            </a>
            <a
              href={assetPath('Shree_Gayathri_Gnanasekar_Resume.pdf')}
              download
              className="flex h-10 items-center gap-2 rounded-full border border-white/60 px-3 text-xs font-bold uppercase text-white transition-colors hover:bg-white/15 sm:px-4"
              style={{ letterSpacing: '0.08em' }}
            >
              <Download className="h-4 w-4" strokeWidth={2.25} />
              <span className="hidden sm:inline">Resume</span>
            </a>
          </div>
          <a
            href="https://www.linkedin.com/in/shree-gnanasekar"
            target="_blank"
            rel="noreferrer"
            className="flex h-10 items-center gap-2 rounded-full border border-white/50 px-3 text-xs font-semibold uppercase text-white transition-colors hover:bg-white/15 sm:px-4"
            style={{ letterSpacing: '0.08em' }}
          >
            <Linkedin className="h-4 w-4" strokeWidth={2.25} />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </header>

        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((image, index) => (
            <div key={`${image.src}-${image.label}`} style={getItemStyle(getRole(index), index)}>
              <img
                src={image.src}
                alt=""
                draggable={false}
                className="h-full w-full select-none object-contain"
                style={{ objectPosition: 'bottom center' }}
              />
            </div>
          ))}
        </div>

        {activeIndex === 0 && <IntroSlide isMobile={isMobile} />}
        {activeIndex === 1 && <EducationSlide />}
        {activeIndex === 2 && <ExperienceSlide />}
        {activeIndex === 3 && <ProjectsSlide />}
        {activeIndex === 4 && <SkillsSlide />}

        <div
          className="absolute left-4 flex items-center gap-3 sm:left-8"
          style={{ zIndex: 60, bottom: isMobile ? '1.25rem' : '2rem' }}
        >
          <button
            aria-label="Previous portfolio slide"
            type="button"
            onClick={() => navigate('prev')}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-transparent text-white transition-[transform,background-color] duration-150 hover:scale-[1.08] hover:bg-white/10 sm:h-14 sm:w-14"
          >
            <ArrowLeft size={24} strokeWidth={2.25} />
          </button>
          <button
            aria-label="Next portfolio slide"
            type="button"
            onClick={() => navigate('next')}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-transparent text-white transition-[transform,background-color] duration-150 hover:scale-[1.08] hover:bg-white/10 sm:h-14 sm:w-14"
          >
            <ArrowRight size={24} strokeWidth={2.25} />
          </button>
          <span className="hidden text-xs font-semibold uppercase text-white/85 sm:inline" style={{ letterSpacing: '0.16em' }}>
            {IMAGES[activeIndex].label}
          </span>
        </div>

        <div className="absolute right-4 sm:right-8" style={{ zIndex: 70, bottom: isMobile ? '1.5rem' : '2rem' }}>
              {isHireOpen && (
            <form
              onSubmit={handleHireSubmit}
              action="https://formsubmit.co/ajax/shreegayathrignana@gmail.com"
              method="POST"
              className="mb-4 w-[min(21rem,calc(100vw-2rem))] rounded-[8px] border border-white/45 bg-white/18 p-4 text-white shadow-2xl backdrop-blur-xl"
            >
              <input type="hidden" name="_subject" value="New portfolio hire inquiry" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_replyto" value={hireForm.email} />
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold">Start a conversation</h2>
                <button
                  type="button"
                  aria-label="Close hire form"
                  onClick={() => setIsHireOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/45 transition-colors hover:bg-white/15"
                >
                  <X className="h-4 w-4" strokeWidth={2.25} />
                </button>
              </div>
              <label className="mb-3 block text-xs font-bold uppercase" style={{ letterSpacing: '0.1em' }}>
                Name
                <input
                  required
                  name="name"
                  value={hireForm.name}
                  onChange={(event) => setHireForm((current) => ({ ...current, name: event.target.value }))}
                  className="mt-1 w-full rounded-[6px] border border-white/45 bg-white/15 px-3 py-2 text-sm font-medium text-white outline-none placeholder:text-white/60 focus:border-white"
                  placeholder="Your name"
                />
              </label>
              <label className="mb-3 block text-xs font-bold uppercase" style={{ letterSpacing: '0.1em' }}>
                Email
                <input
                  required
                  type="email"
                  name="email"
                  value={hireForm.email}
                  onChange={(event) => setHireForm((current) => ({ ...current, email: event.target.value }))}
                  className="mt-1 w-full rounded-[6px] border border-white/45 bg-white/15 px-3 py-2 text-sm font-medium text-white outline-none placeholder:text-white/60 focus:border-white"
                  placeholder="you@example.com"
                />
              </label>
              <label className="mb-4 block text-xs font-bold uppercase" style={{ letterSpacing: '0.1em' }}>
                Message
                <textarea
                  required
                  name="message"
                  rows={4}
                  value={hireForm.message}
                  onChange={(event) => setHireForm((current) => ({ ...current, message: event.target.value }))}
                  className="mt-1 w-full resize-none rounded-[6px] border border-white/45 bg-white/15 px-3 py-2 text-sm font-medium text-white outline-none placeholder:text-white/60 focus:border-white"
                  placeholder="Tell me about your project"
                />
              </label>
              <button
                type="submit"
                disabled={hireStatus === 'sending'}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/70 px-4 py-2 text-sm font-bold uppercase transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-70"
                style={{ letterSpacing: '0.08em' }}
              >
                {hireStatus === 'sending' ? 'Sending...' : 'Send Message'}
                <Send className="h-4 w-4" strokeWidth={2.25} />
              </button>
              {hireStatus === 'sent' && (
                <p className="mt-3 text-center text-xs font-semibold uppercase text-white/90" style={{ letterSpacing: '0.08em' }}>
                  Message sent
                </p>
              )}
              {hireStatus === 'error' && (
                <p className="mt-3 text-center text-xs font-semibold uppercase text-white/90" style={{ letterSpacing: '0.08em' }}>
                  Please try again
                </p>
              )}
            </form>
          )}
          <button
            type="button"
            onClick={() => setIsHireOpen((current) => !current)}
            className="flex items-center gap-2 uppercase text-white opacity-95 transition-opacity duration-200 hover:opacity-100"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(20px, 3.6vw, 48px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            Hire Me
            <ArrowRight className="h-5 w-5 sm:h-8 sm:w-8" strokeWidth={2.25} />
          </button>
        </div>
      </section>
    </main>
  );
}

function IntroSlide({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <div
        className="absolute left-4 right-4 text-white sm:left-10 sm:right-auto sm:max-w-[360px]"
        style={{ zIndex: 60, bottom: isMobile ? '9.5rem' : '9rem' }}
      >
        <p className="mb-3 text-sm font-bold uppercase opacity-95 sm:text-[18px]" style={{ letterSpacing: '0.12em' }}>
          You can call me, Shree
        </p>
        <div className="flex flex-wrap gap-2">
          {heroSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/55 px-3 py-1 text-[11px] font-semibold uppercase"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)', letterSpacing: '0.08em' }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div
        className="absolute right-4 top-[54%] max-w-[350px] -translate-y-1/2 text-white sm:right-10"
        style={{ zIndex: 60 }}
      >
        <p className="mb-2 text-xs font-bold uppercase opacity-75" style={{ letterSpacing: '0.14em' }}>
          About me
        </p>
        <p className="text-sm font-medium opacity-90 sm:text-base" style={{ lineHeight: 1.65 }}>
          I build full-stack applications, REST APIs, AI-powered systems, and data pipelines with
          maintainable code, automated testing, and product-focused execution.
        </p>
      </div>
    </>
  );
}

function EducationSlide() {
  return (
    <div className="absolute inset-x-4 top-[32%] grid gap-8 text-white sm:inset-x-10 sm:top-[43%] sm:grid-cols-[minmax(0,360px)_1fr_minmax(0,360px)]">
      {education.map((item, index) => (
        <article
          key={item.degree}
          className={`p-0 ${
            index === 0 ? 'sm:col-start-1 sm:translate-x-14' : 'sm:col-start-3'
          }`}
          style={{ zIndex: 60 }}
        >
          {index === 0 ? (
            <img
              src={assetPath('texas-state-seal.png')}
              alt="Texas State University seal"
              className="mb-4 h-8 w-8 rounded-full object-contain"
            />
          ) : (
            <img
              src={assetPath('bachelor-logo.png')}
              alt="Avinashilingam Institute logo"
              className="mb-4 h-8 w-8 rounded-full bg-white object-contain"
            />
          )}
          <p className="text-xs font-bold uppercase opacity-80" style={{ letterSpacing: '0.14em' }}>
            {index === 0 ? 'Masters' : 'Bachelor'}
          </p>
          <h2 className="mt-2 text-2xl font-bold leading-tight">{item.degree}</h2>
          <p className="mt-1 text-sm font-semibold opacity-90">{item.field}</p>
          <p className="mt-4 text-sm opacity-85">{item.school}</p>
          <p className="mt-1 text-xs font-semibold uppercase opacity-70" style={{ letterSpacing: '0.1em' }}>
            {item.dates}
          </p>
        </article>
      ))}
    </div>
  );
}

function ExperienceSlide() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : experiences[selectedIndex];

  return (
    <div className="absolute inset-x-4 top-[18%] grid gap-4 text-white sm:inset-x-10 sm:top-[38%] sm:grid-cols-[minmax(0,320px)_1fr_minmax(0,420px)]" style={{ zIndex: 60 }}>
      <div className="relative self-start space-y-3 pl-5 before:absolute before:bottom-5 before:left-0 before:top-5 before:w-0.5 before:bg-white/45 sm:col-start-1">
        {experiences.map((item, index) => (
          <button
            key={item.company}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`relative block w-full rounded-[8px] border p-4 text-left backdrop-blur-md transition-all ${
              selectedIndex === index
                ? 'border-white bg-white/24 shadow-2xl'
                : 'border-white/35 bg-white/12 hover:bg-white/18'
            }`}
          >
            <span className="absolute -left-[30px] top-5 h-3 w-3 rounded-full border-2 border-white bg-white" />
            <div className="mb-2 flex items-start gap-3">
              <BriefcaseBusiness className="mt-1 h-5 w-5 shrink-0" strokeWidth={2.25} />
              <div className="flex flex-1 items-center justify-between gap-3">
                <h2 className="text-base font-bold leading-tight">{item.role}</h2>
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              </div>
            </div>
          </button>
        ))}
      </div>
      {selected && (
        <article className="max-h-[38vh] overflow-y-auto rounded-[8px] border border-white/45 bg-white/18 p-4 backdrop-blur-xl sm:col-start-3 sm:max-h-[46vh] sm:p-5">
          <p className="mb-2 text-xs font-bold uppercase opacity-75" style={{ letterSpacing: '0.14em' }}>
            Selected experience
          </p>
          <h2 className="text-2xl font-bold leading-tight">{selected.role}</h2>
          <p className="mt-1 text-xs font-semibold uppercase opacity-75" style={{ letterSpacing: '0.08em' }}>
            {selected.company} | {selected.dates}
          </p>
          <ul className="mt-4 space-y-3 text-sm opacity-90" style={{ lineHeight: 1.55 }}>
            {selected.details.map((detail) => (
              <li key={detail} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </article>
      )}
    </div>
  );
}

function ProjectsSlide() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : projects[selectedIndex];

  return (
    <div className="absolute inset-x-4 top-[15%] grid gap-4 text-white sm:inset-x-10 sm:top-[25%] sm:grid-cols-[minmax(0,460px)_1fr_minmax(0,320px)]" style={{ zIndex: 60 }}>
      {selected && (
        <article className="max-h-[58vh] overflow-y-auto rounded-[8px] border border-white/45 bg-white/18 p-4 backdrop-blur-xl sm:col-start-1 sm:p-5">
          <img
            src={selected.image}
            alt={`${selected.title} project preview`}
            className="mb-4 aspect-[16/9] w-full rounded-[6px] object-cover"
          />
          <p className="mb-2 text-[11px] font-bold uppercase opacity-75" style={{ letterSpacing: '0.12em' }}>
            {selected.organization} | {selected.date}
          </p>
          <h2 className="text-2xl font-bold leading-tight">{selected.title}</h2>
          <p className="mt-3 text-sm opacity-90" style={{ lineHeight: 1.55 }}>
            {selected.description}
          </p>
          <p className="mt-3 text-sm opacity-80" style={{ lineHeight: 1.55 }}>
            {selected.impact}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {selected.technologies.map((technology) => (
              <span key={technology} className="rounded-full border border-white/35 px-2.5 py-1 text-[11px] font-semibold">
                {technology}
              </span>
            ))}
          </div>
        </article>
      )}
      <div className="space-y-3 sm:col-start-3">
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`block w-full rounded-[8px] border p-4 text-left backdrop-blur-md transition-all ${
              selectedIndex === index
                ? 'border-white bg-white/24 shadow-2xl'
                : 'border-white/35 bg-white/12 hover:bg-white/18'
            }`}
          >
            <p className="text-xs font-bold uppercase opacity-70" style={{ letterSpacing: '0.1em' }}>
              {project.organization}
            </p>
            <h3 className="mt-1 flex items-center gap-2 text-base font-bold leading-tight">
              <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              {project.title}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
}

function SkillsSlide() {
  return (
    <div className="absolute inset-x-4 top-[24%] grid gap-3 text-white sm:inset-x-10 sm:top-[34%] sm:grid-cols-[minmax(0,330px)_1fr_minmax(0,330px)]" style={{ zIndex: 60 }}>
      {skillGroups.map(({ icon: Icon, title, items }, index) => (
        <article
          key={title}
          className={`rounded-[8px] border border-white/40 bg-white/14 p-4 backdrop-blur-md ${
            index < 2 ? 'sm:col-start-1' : 'sm:col-start-3'
          } ${
            index === 0 || index === 2 ? 'sm:row-start-1' : 'sm:row-start-2'
          }`}
        >
          <div className="mb-3 flex items-center gap-3">
            <Icon className="h-6 w-6" strokeWidth={2.25} />
            <h2 className="text-lg font-bold">{title}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <span key={item} className="rounded-full border border-white/35 px-2.5 py-1 text-[11px] font-semibold">
                {item}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export default App;
