import es from "@/messages/es.json";
import { Reveal } from "@/components/ui/reveal";
import { LogoSymbol } from "@/components/ui/logo-symbol";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function News() {
  return (
    <section className="section bg-teal-light" id="noticias" aria-labelledby="news-title">
      <div className="container">
        <Reveal stagger={0.12}>
          <span className="section-eyebrow">{es.news.eyebrow}</span>
          <h2 id="news-title" className="section-title">
            {es.news.title}
          </h2>
        </Reveal>

        <Reveal stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {es.news.items.map((item, i) => (
            <article key={i} className="card bg-white flex flex-col relative">
              <LogoSymbol className="absolute top-3 right-3 w-5 h-5" />
              <span className="inline-flex self-start px-3 py-1 rounded-full bg-teal text-dark text-xs font-bold uppercase tracking-wide">
                [{item.category}]
              </span>
              <h3 className="text-base font-bold mt-2">{item.title}</h3>
              <time className="text-xs text-dark mt-1 block" dateTime={item.date}>
                {formatDate(item.date)}
              </time>
              <p className="text-sm text-dark leading-relaxed mt-3 flex-1">
                {item.summary}
              </p>
            </article>
          ))}
        </Reveal>

        <div className="mt-10">
          <a href="#noticias" className="btn btn-outline">
            {es.news.readMore}
          </a>
        </div>
      </div>
    </section>
  );
}
