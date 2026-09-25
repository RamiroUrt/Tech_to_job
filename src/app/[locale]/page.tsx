import { notFound } from "next/navigation";
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
import { getMessages, isLocale } from "@/messages";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const messages = getMessages(locale);

  return (
    <div id="top">
      <SiteHeader messages={messages} locale={locale} />
      <main>
        <Hero messages={messages} />
        <Talento messages={messages} />
        <Empresas messages={messages} />
        <Tournaments messages={messages} />
        <Networking messages={messages} />
        <News messages={messages} />
        <Testimonials messages={messages} />
        <Newsletter messages={messages} />
      </main>
      <div className="reveal">
        <Closing messages={messages} />
        <Footer messages={messages} />
      </div>
    </div>
  );
}
