import es from "@/messages/es.json";
import { GlueBalls } from "@/components/ui/glue-balls";
import { Reveal } from "@/components/ui/reveal";

export function Closing() {
  return (
    <section className="section relative bg-dark text-white" aria-labelledby="closing-title">
      <GlueBalls />
      <div className="container relative z-10 text-center max-w-[700px]">
        <Reveal stagger={0.12}>
          <span className="section-eyebrow text-white justify-center">{es.closing.eyebrow}</span>
          <h2 id="closing-title" className="section-title text-white mx-auto">
            {es.closing.title}
          </h2>
          <p className="section-description text-teal mx-auto">
            {es.closing.description}
          </p>
          <a
            href="https://discord.gg/h9FFgKdkRd"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-discord mt-8"
          >
            {es.closing.discordButton}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
