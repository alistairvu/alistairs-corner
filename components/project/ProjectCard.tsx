import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Divider, Heading, Link, Text, SlideFade } from '@chakra-ui/react';
import { Image as DatoImage } from 'react-datocms';
import { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import imageStyles from '../../styles/project-card.module.css';

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isTitleDisplayed, setIsTitleDisplayed] = useState(false);
  const [isDescriptionDisplayed, setIsDescriptionDisplayed] = useState(false);
  const [isLinkDisplayed, setIsLinkDisplayed] = useState(false);

  return (
    <Box
      borderRadius="md"
      shadow="sm"
      borderWidth={1}
      borderColor="gray.200"
      my={2}
    >
      {project.image.responsiveImage && (
        <DatoImage
          data={project.image.responsiveImage}
          className={imageStyles.image}
        />
      )}

      <Box p={4}>
        <SlideFade in={isTitleDisplayed}>
          <Heading size="md" pb={2} fontWeight="600">
            {project.title}
          </Heading>
          <Waypoint
            onEnter={() => setIsTitleDisplayed(true)}
            onLeave={() => setIsTitleDisplayed(false)}
          />
        </SlideFade>

        <SlideFade in={isDescriptionDisplayed}>
          <Text>{project.description}</Text>
          <Waypoint
            onEnter={() => setIsDescriptionDisplayed(true)}
            onLeave={() => setIsDescriptionDisplayed(false)}
          />
        </SlideFade>

        {(project.link || project.githubLink) && (
          <SlideFade in={isLinkDisplayed}>
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

            <Waypoint
              onEnter={() => setIsLinkDisplayed(true)}
              onLeave={() => setIsLinkDisplayed(false)}
            />
          </SlideFade>
        )}
      </Box>
    </Box>
  );
};

export default ProjectCard;
