type Project = {
  id: string;
  title: string;
  image: {
    id: string;
    url: string;
    alt: string | null;
  };
  description: string;
  link: string | null;
  githubLink: string | null;
};

type Education = {
  id: string;
  program: string;
  title: string;
  timespan: string;
  description: string;
};

type Skill = {
  id: string;
  title: string;
  detail: string;
};

type AboutPage = {
  heading: string;
  description: string;
  education: Array<Education>;
  skills: Array<Skill>;
};
