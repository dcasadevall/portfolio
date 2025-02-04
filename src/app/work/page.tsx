import { Column, Grid } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person, work } from "@/app/resources/content";

export async function generateMetadata() {
  const title = work.title;
  const description = work.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/work/`,
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

export default function Work() {
  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            headline: work.title,
            description: work.description,
            url: `https://${baseURL}/work`,
            image: `${baseURL}/og?title=Game%20Projects`,
            author: {
              "@type": "Person",
              name: person.name,
            },
            hasPart: work.projects.map((project) => ({
              "@type": "MobileApplication",
              name: project.title,
              description: project.description,
              url: project.url,
              applicationCategory: "Game",
              author: {
                "@type": "Organization",
                name: project.company,
              },
            })),
          }),
        }}
      />
      <Grid columns="3" gap="8">
        {work.projects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            className="group block overflow-hidden rounded-lg border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md"
          >
            <div className="w-full h-[250px] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                width={250}
                height={250}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-500 text-sm mb-2">{project.company}</p>
              <p className="text-gray-600 text-sm">{project.description}</p>
            </div>
          </a>
        ))}
      </Grid>
    </Column>
  );
}
