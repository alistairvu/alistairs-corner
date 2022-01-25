type SiteItem = {
  link: string;
  title: string;
};

type SEOAttribute = {
  attributes: any;
  content: string | null;
  tag: any;
};

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
  keywords: string;
  seo: SEOAttribute[];
};

type ProjectPage = {
  projects: Array<Project>;
  keywords: string;
  seo: SEOAttribute[];
};

type ContactFormInput = {
  name: string;
  email: string;
  message: string;
};

type ContactPage = {
  heading: string;
  successHeading: string;
  successDescription: string;
  errorHeading: string;
  errorDescription: string;
  seo: SEOAttribute[];
};

type Site = {
  favicon: SEOAttribute[];
};

type HomePage = {
  heading: string;
  seo: SEOAttribute[];
};

type NotFoundPage = {
  heading: string;
  description: string;
  seo: SEOAttribute[];
};
