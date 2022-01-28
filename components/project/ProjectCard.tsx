import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Divider, Heading, Link, Text, Fade } from '@chakra-ui/react';
import NextImage from 'next/image';
import { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import imageStyles from '../../styles/project-card.module.css';

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  return (
    <Box
      borderRadius="md"
      shadow="sm"
      borderWidth={1}
      borderColor="gray.200"
      my={2}
    >
      {project.image.url && (
        <NextImage
          width="900px"
          height="456px"
          layout="responsive"
          src={project.image.url}
          alt={project.image.alt ?? 'Screenshot of project'}
          className={imageStyles.image}
        />
      )}

      <Box p={4}>
        <Fade in={isDisplayed}>
          <Heading size="md" pb={2} fontWeight="600">
            {project.title}
          </Heading>
          <Text>{project.description}</Text>

          <Waypoint
            onEnter={() => setIsDisplayed(true)}
            onLeave={() => setIsDisplayed(false)}
          />
          {(project.link || project.githubLink) && (
            <>
              <Box my={2}>
                <Divider w="50%" borderColor="gray.400" />
              </Box>
              <Box>
                {project.link && (
                  <Link href={project.link} isExternal>
                    <Text>
                      Link
                      <ExternalLinkIcon mx="4px" mb="4px" />
                    </Text>
                  </Link>
                )}
                {project.githubLink && (
                  <Link href={project.githubLink} isExternal>
                    <Text>
                      GitHub
                      <ExternalLinkIcon mx="4px" mb="4px" />
                    </Text>
                  </Link>
                )}
              </Box>
            </>
          )}
        </Fade>
      </Box>
    </Box>
  );
};

export default ProjectCard;
