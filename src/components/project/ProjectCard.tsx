import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Divider, Heading, Link, Text } from '@chakra-ui/react';
import { Image as DatoImage } from 'react-datocms';
import { Fade as Reveal } from 'react-awesome-reveal';
import imageStyles from '../../styles/project-card.module.css';

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const processedLinks =
    project.links?.filter((link) => link.title && link.href) || [];

  return (
    <Box rounded="md" shadow="lg" my={2}>
      {project.image.responsiveImage && (
        <DatoImage
          data={project.image.responsiveImage}
          className={imageStyles.image}
        />
      )}

      <Box p={4}>
        <Reveal triggerOnce>
          <Heading size="lg" pb={2} fontWeight="600">
            {project.title}
          </Heading>

          <Text>{project.description}</Text>

          {processedLinks.length > 0 && (
            <Box>
              <Box my={2}>
                <Divider w="50%" borderColor="gray.400" />
              </Box>
              <Box>
                {processedLinks.map(({ title, href }) => (
                  <Link href={href} isExternal key={`${title}${href}`}>
                    <Text>
                      {title}
                      <ExternalLinkIcon mx="4px" mb="4px" />
                    </Text>
                  </Link>
                ))}
              </Box>
            </Box>
          )}
        </Reveal>
      </Box>
    </Box>
  );
};

export default ProjectCard;
