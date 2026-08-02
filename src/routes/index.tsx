import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { BentoOverview, Curriculum, Faq, Footer, Highlights } from "@/components/site/Bento";

const title = "CyberSoomaali — Baro Cybersecurity af Soomaali";
const description =
  "Manhaj cybersecurity bilow ilaa xirfadle af Soomaali ah: networking, Linux, phishing, SIEM, threat detection, incident response iyo labs practical ah.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Highlights />
        <Curriculum />
        <BentoOverview />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
