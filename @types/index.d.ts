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
