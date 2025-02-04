import { getPosts } from "@/app/utils/utils";
import { Column, Grid } from "@/once-ui/components";
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
  return (
    <Column maxWidth="m">
      <Grid columns="3" gap="8">
        {sideProjects.projects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            className="group block overflow-hidden rounded-lg border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md"
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm">{project.description}</p>
            </div>
          </a>
        ))}
      </Grid>
    </Column>
  );
}
