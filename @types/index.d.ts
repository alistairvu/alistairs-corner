type SiteItem = {
  link: string;
  title: string;
};

type SEOAttribute = {
  attributes: any;
  content: string | null;
  tag: any;
};

type ResponsiveImage = {
  srcSet: string;
  webpSrcSet: string;
  sizes: string;
  src: string;
  width: number;
  height: number;
  aspectRatio: number;
  bgColor: string;
  base64: string;
  alt: string;
  title: string;
};

type ProjectLink = {
  title?: string;
  href?: string;
};

type Project = {
  id: string;
  title: string;
  image: {
    id: string;
    alt: string | null;
    responsiveImage: ResponsiveImage;
  };
  description: string;
  links?: Array<ProjectLink>;
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

type BannerProject = {
  backgroundColor: { hex: string };
  title: string;
  subtitle: string;
  link: string;
  image: {
    url: string;
    responsiveImage: ResponsiveImage;
  };
  textLight: boolean;
  id: string;
};

type HomePage = {
  heading: string;
  bannerProjects: BannerProject[];
  seo: SEOAttribute[];
  greeting: string;
  subtitle: string;
};

type NotFoundPage = {
  heading: string;
  description: string;
  seo: SEOAttribute[];
};

type BlogPost = {
  content: {
    value: any;
  };
  createdAt: string;
  seo: SEOAttribute[];
  description: string;
  title: string;
  createdAt: string;
  blocks: any;
};

type BlogRecord = {
  __typename: string;
  id: string;
} & {
  [prop: string]: unknown;
};

type BlogImage = {
  image: {
    responsiveImage: ResponsiveImage;
  };
  caption?: string;
};

interface BlogImageRecord extends BlogRecord {
  __typename: 'BlogImageRecord';
  image: {
    responsiveImage: ResponsiveImage;
  };
  caption?: string;
}
