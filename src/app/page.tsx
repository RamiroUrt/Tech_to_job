import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/sections/hero";
import { Talento } from "@/components/sections/talento";
import { Empresas } from "@/components/sections/empresas";
import { Tournaments } from "@/components/sections/tournaments";
import { Networking } from "@/components/sections/networking";
import { News } from "@/components/sections/news";
import { Testimonials } from "@/components/sections/testimonials";
import { Newsletter } from "@/components/sections/newsletter";
import { Closing } from "@/components/layout/closing";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <Hero />
        <Talento />
        <Empresas />
        <Tournaments />
        <Networking />
        <News />
        <Testimonials />
        <Newsletter />
      </main>
      <div className="reveal">
        <Closing />
        <Footer />
      </div>
    </div>
  );
}