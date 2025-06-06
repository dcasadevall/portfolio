import { getPosts } from "@/app/utils/utils";
import { Column } from "@/once-ui/components";
import { ProjectCard } from "@/components";
import { Metadata } from "@/types";

interface Post {
  slug: string;
  content: string;
  metadata: Metadata;
}

interface ProjectsProps {
  range?: [number, number?];
  source: string[];
  baseUrl: string;
}

export function Projects({ range, source, baseUrl }: ProjectsProps) {
  let allProjects = getPosts(source);

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`${baseUrl}/${post.slug}`}
          images={post.metadata.images}
          objectFit={post.metadata.objectFit}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
          textOverlays={post.metadata.textOverlays?.map(overlay => ({
            ...overlay,
            startTime: overlay.startTime || 0,
            duration: overlay.duration || 5000
          })) || []}
        />
      ))}
    </Column>
  );
}
