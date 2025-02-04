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
import { resume, person, newsletter } from "@/app/resources/content";
import TableOfContents from "../components/about/TableOfContents";
import styles from "../components/about/about.module.scss";

export async function generateMetadata() {
  const title = resume.title;
  const description = resume.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(person.firstName)}%27s%20Portfolio`;

  return {
    title,
    description,
    openGraph: {
      title: `${person.firstName}'s Portfolio`,
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
      title: `${person.firstName}'s Portfolio`,
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
    {
      title: resume.work.title,
      display: resume.work.display,
      items: resume.work.experiences.map((experience) => experience.company),
    },
    {
      title: resume.studies.title,
      display: resume.studies.display,
      items: resume.studies.institutions.map((institution) => institution.name),
    },
    {
      title: resume.technical.title,
      display: resume.technical.display,
      items: resume.technical.skills.map((skill) => skill.title),
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
                url: `https://${baseURL}`,
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
        {resume.tableOfContent.display && (
            <Column
                left="0"
                style={{ top: "50%", transform: "translateY(-50%)" }}
                position="fixed"
                paddingLeft="24"
                gap="32"
                hide="s"
            >
              <TableOfContents structure={structure} about={resume} />
            </Column>
        )}
        <Flex fillWidth mobileDirection="column" horizontal="center">
          {resume.avatar.display && (
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

            {resume.work.display && (
                <>
                  <Heading as="h2" id={resume.work.title} variant="display-strong-s" marginBottom="m">
                    {resume.work.title}
                  </Heading>
                  <Column fillWidth gap="l" marginBottom="40">
                    {resume.work.experiences.map((experience, index) => (
                        <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                          <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="4">
                            <Text id={experience.company} variant="heading-strong-l">
                              {experience.company}
                            </Text>
                            <Text variant="heading-default-xs" onBackground="neutral-weak">
                              {experience.timeframe}
                            </Text>
                          </Flex>
                          <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                            {experience.role}
                          </Text>
                          <Column as="ul" gap="16">
                            {experience.achievements.map((achievement: JSX.Element, index: number) => (
                                <Text
                                    as="li"
                                    variant="body-default-m"
                                    key={`${experience.company}-${index}`}
                                >
                                  {achievement}
                                </Text>
                            ))}
                          </Column>
                          {experience.images.length > 0 && (
                              <Flex fillWidth paddingTop="m" paddingLeft="40" wrap>
                                {experience.images.map((image, index) => (
                                    <Flex
                                        key={index}
                                        border="neutral-medium"
                                        radius="m"
                                        //@ts-ignore
                                        minWidth={image.width}
                                        //@ts-ignore
                                        height={image.height}
                                    >
                                      <SmartImage
                                          enlarge
                                          radius="m"
                                          //@ts-ignore
                                          sizes={image.width.toString()}
                                          //@ts-ignore
                                          alt={image.alt}
                                          //@ts-ignore
                                          src={image.src}
                                      />
                                    </Flex>
                                ))}
                              </Flex>
                          )}
                        </Column>
                    ))}
                  </Column>
                </>
            )}

            {resume.studies.display && (
                <>
                  <Heading as="h2" id={resume.studies.title} variant="display-strong-s" marginBottom="m">
                    {resume.studies.title}
                  </Heading>
                  <Column fillWidth gap="l" marginBottom="40">
                    {resume.studies.institutions.map((institution, index) => (
                        <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                          <Text id={institution.name} variant="heading-strong-l">
                            {institution.name}
                          </Text>
                          <Text variant="heading-default-xs" onBackground="neutral-weak">
                            {institution.description}
                          </Text>
                        </Column>
                    ))}
                  </Column>
                </>
            )}

            {resume.technical.display && (
                <>
                  <Heading
                      as="h2"
                      id={resume.technical.title}
                      variant="display-strong-s"
                      marginBottom="40"
                  >
                    {resume.technical.title}
                  </Heading>
                  <Column fillWidth gap="l">
                    {resume.technical.skills.map((skill, index) => (
                        <Column key={`${skill}-${index}`} fillWidth gap="4">
                          <Text variant="heading-strong-l">{skill.title}</Text>
                          <Text variant="body-default-m" onBackground="neutral-weak">
                            {skill.description}
                          </Text>
                          {skill.images && skill.images.length > 0 && (
                              <Flex fillWidth paddingTop="m" gap="12" wrap>
                                {skill.images.map((image, index) => (
                                    <Flex
                                        key={index}
                                        border="neutral-medium"
                                        radius="m"
                                        //@ts-ignore
                                        minWidth={image.width}
                                        //@ts-ignore
                                        height={image.height}
                                    >
                                      <SmartImage
                                          enlarge
                                          radius="m"
                                          //@ts-ignore
                                          sizes={image.width.toString()}
                                          //@ts-ignore
                                          alt={image.alt}
                                          //@ts-ignore
                                          src={image.src}
                                      />
                                    </Flex>
                                ))}
                              </Flex>
                          )}
                        </Column>
                    ))}
                  </Column>
                </>
            )}
          </Column>
        </Flex>
      </Column>
  );
}
