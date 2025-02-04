import React from "react";

import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  Column,
  Icon,
  Tag,
  IconButton, SmartImage
} from "@/once-ui/components";

import {baseURL, routes, social} from "@/app/resources";
import { home, resume, person, newsletter } from "@/app/resources/content";
import TableOfContents from "../components/about/TableOfContents";
import styles from "../components/about/about.module.scss";

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Home() {
  const structure = [
    {
      title: resume.intro.title,
      display: resume.intro.display,
      items: [],
    },
  ];
  return (
      <Column maxWidth="m">
        <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: person.name,
                jobTitle: person.role,
                description: resume.intro.description,
                url: `https://${baseURL}/about`,
                image: `${baseURL}/images/${person.avatar}`,
                sameAs: social
                    .filter((item) => item.link && !item.link.startsWith("mailto:")) // Filter out empty links and email links
                    .map((item) => item.link),
                worksFor: {
                  "@type": "Organization",
                  name: resume.work.experiences[0].company || "",
                },
              }),
            }}
        />
        <Flex fillWidth mobileDirection="column" horizontal="center">
          {home.avatar.display && (
              <Column
                  className={styles.avatar}
                  minWidth="160"
                  paddingX="l"
                  paddingBottom="xl"
                  gap="m"
                  flex={3}
                  horizontal="center"
              >
                <Avatar src={person.avatar} size="xl" />
                <Flex gap="8" vertical="center">
                  <Icon onBackground="accent-weak" name="globe" />
                  {person.location}
                </Flex>
                {person.languages.length > 0 && (
                    <Flex wrap gap="8">
                      {person.languages.map((language, index) => (
                          <Tag key={index} size="l">
                            {language}
                          </Tag>
                      ))}
                    </Flex>
                )}
              </Column>
          )}
          <Column className={styles.blockAlign} flex={9} maxWidth={40}>
            <Column
                id={resume.intro.title}
                fillWidth
                minHeight="160"
                vertical="center"
                marginBottom="32"
            >
              {resume.calendar.display && (
                  <Flex
                      fitWidth
                      border="brand-alpha-medium"
                      className={styles.blockAlign}
                      style={{
                        backdropFilter: "blur(var(--static-space-1))",
                      }}
                      background="brand-alpha-weak"
                      radius="full"
                      padding="4"
                      gap="8"
                      marginBottom="m"
                      vertical="center"
                  >
                    <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                    <Flex paddingX="8">Schedule a call</Flex>
                    <IconButton
                        href={resume.calendar.link}
                        data-border="rounded"
                        variant="secondary"
                        icon="chevronRight"
                    />
                  </Flex>
              )}
              <Heading className={styles.textAlign} variant="display-strong-xl">
                {person.name}
              </Heading>
              <Text
                  className={styles.textAlign}
                  variant="display-default-xs"
                  onBackground="neutral-weak"
              >
                {person.role}
              </Text>
              {social.length > 0 && (
                  <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" wrap horizontal="center" fitWidth>
                    {social.map(
                        (item) =>
                            item.link && (
                                <>
                                  <Button
                                      className="s-flex-hide"
                                      key={item.name}
                                      href={item.link}
                                      prefixIcon={item.icon}
                                      label={item.name}
                                      size="s"
                                      variant="secondary"
                                  />
                                  <IconButton
                                      className="s-flex-show"
                                      size="l"
                                      key={`${item.name}-icon`}
                                      href={item.link}
                                      icon={item.icon}
                                      variant="secondary"
                                  />
                                </>
                            ),
                    )}
                  </Flex>
              )}
            </Column>

            {resume.intro.display && (
                <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
                  {resume.intro.description}
                </Column>
            )}
          </Column>
        </Flex>
      </Column>
  );
}
