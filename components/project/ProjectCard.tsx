import { Box, Heading, Link, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import imageStyles from '../../styles/project-card.module.css';

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
        className={imageStyles.image}
      />
    )}
    <Box p={4}>
      <Heading size="md" pb={2}>
        {project.title}
      </Heading>
      <Text>{project.description}</Text>

      {(project.link || project.githubLink) && (
        <>
          <Box my={4}>
            <hr />
          </Box>
          <Box>
            {project.link && (
              <Link href={project.link} isExternal>
                <Text>Link</Text>
              </Link>
            )}
            {project.githubLink && (
              <Link href={project.githubLink} isExternal>
                <Text>GitHub</Text>
              </Link>
            )}
          </Box>
        </>
      )}
    </Box>
  </Box>
);

export default ProjectCard;
