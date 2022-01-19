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

type AboutPage = {
  education: Array<Education>;
  heading: string;
  description: string;
};
