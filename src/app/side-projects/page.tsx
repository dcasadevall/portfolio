import { getPosts } from "@/app/utils/utils";
import { Column } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { baseURL } from "@/app/resources";
import { person, sideProjects } from "@/app/resources/content";

export async function generateMetadata() {
  const title = sideProjects.title;
  const description = sideProjects.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/side-projects/`,
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

export default function SideProjects() {
  let allProjects = getPosts(["src", "app", "side-projects", "projects"]);

  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            headline: sideProjects.title,
            description: sideProjects.description,
            url: `https://${baseURL}/side-projects`,
            image: `${baseURL}/og?title=Side%20Projects`,
            author: {
              "@type": "Person",
              name: person.name,
            },
            hasPart: allProjects.map((project) => ({
              "@type": "CreativeWork",
              headline: project.metadata.title,
              description: project.metadata.summary,
              url: `https://${baseURL}/side-projects/${project.slug}`,
              image: `${baseURL}/${project.metadata.image}`,
            })),
          }),
        }}
      />
      <Projects source={["src", "app", "side-projects", "projects"]} baseUrl="side-projects" />
    </Column>
  );
}
