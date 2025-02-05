"use client";

import {
  AvatarGroup,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@/once-ui/components";
import { Carousel } from "@/components/Carousel";
import { useState } from "react";

interface TextOverlay {
  title?: string;
  subtitle?: string;
  duration: number;   // in seconds
}

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  textOverlays?: TextOverlay[];  // new prop for timed overlays
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  textOverlays = [],
}) => {
  console.log('ProjectCard render - received textOverlays:', textOverlays);  // Check if props are received
  const [activeOverlay, setActiveOverlay] = useState<TextOverlay | null>(null);

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    console.log('Video element:', video);  // Check if video element is valid
    const currentTime = video.currentTime;

    console.log('-------- Time Update Event --------');
    console.log('Video currentTime:', currentTime);
    console.log('Video duration:', video.duration);
    console.log('Video readyState:', video.readyState);
    console.log('Video paused:', video.paused);
    console.log('Video duration:', video.duration);

    const overlay = textOverlays.find(overlay => {
      const start = overlay.startTime;
      const end = overlay.startTime + overlay.duration;

      console.log('Overlay duration:', overlay.duration);
      console.log('Overlay start:', start);
      console.log('Overlay end:', end);

      const isActive = currentTime >= start && currentTime <= end;
      console.log(`Overlay timing check:
        start: ${start}
        end: ${end}
        currentTime: ${currentTime}
        isActive: ${isActive}
      `);
      return isActive;
    });

    console.log('Setting activeOverlay to:', overlay);
    setActiveOverlay(overlay || null);
  };

  // Add a log when activeOverlay changes
  console.log('Current activeOverlay:', activeOverlay);

  return (
    <Column fillWidth gap="m">
      <div style={{ position: 'relative' }}>
        <Carousel
          sizes="(max-width: 960px) 100vw, 960px"
          images={images.map((image) => ({
            src: image,
            alt: title,
            onTimeUpdate: image.endsWith('.mp4') ? handleTimeUpdate : undefined,
          }))}
        />
        {activeOverlay && (
          <Flex
            direction="column"
            gap="s"
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '2rem',
              right: '2rem',
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {activeOverlay.title && (
              <Heading as="h3" variant="heading-strong-l">
                {activeOverlay.title}
              </Heading>
            )}
            {activeOverlay.subtitle && (
              <Text variant="body-default-m">
                {activeOverlay.subtitle}
              </Text>
            )}
          </Flex>
        )}
      </div>
      <Flex
        mobileDirection="column"
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            <Flex gap="24" wrap>
              {content?.trim() && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: "0", width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s">Project Details</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s">Product Page</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
