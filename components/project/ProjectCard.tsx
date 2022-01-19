import { Box, Heading, Link, Text } from '@chakra-ui/react';
import NextImage from 'next/image';

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => (
  <Box
    borderRadius="md"
    shadow="sm"
    borderWidth={1}
    borderColor="gray.10"
    my={2}
  >
    {project.image.url && (
      <NextImage
        width="800px"
        height="400px"
        layout="responsive"
        src={project.image.url}
        alt={project.image.alt ?? 'Screenshot of project'}
      />
    )}
    <Box p={4}>
      <Heading size="md" pb={2}>
        {project.title}
      </Heading>
      <Text>{project.description}</Text>

      {(project.link || project.githubLink) && (
        <Box mt={2}>
          {project.link && (
            <Link href={project.link}>
              <Text>Link</Text>
            </Link>
          )}
          {project.githubLink && (
            <Link href={project.githubLink}>
              <Text>GitHub</Text>
            </Link>
          )}
        </Box>
      )}
    </Box>
  </Box>
);

export default ProjectCard;