import React from 'react';
import { PORTFOLIO_CONFIG } from '../config/portfolio.ts';
import { ArrowUpRight, Github } from 'lucide-react';

export const Work: React.FC = () => {
  const { projects } = PORTFOLIO_CONFIG;

  return (
    <section
      id="work"
      className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 scroll-mt-20"
      aria-labelledby="work-heading"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-background-border gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-xs uppercase tracking-widest font-mono text-foreground-muted">
              Portfolio
            </span>
          </div>
          <h2
            id="work-heading"
            className="text-3xl md:text-4xl font-sans font-semibold tracking-tight text-foreground"
          >
            Selected Works
          </h2>
        </div>

        <p className="text-sm text-foreground-muted max-w-md font-normal leading-relaxed">
          Targeted implementations highlighting systems architecture, resilient APIs, and responsive frontends.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group relative flex flex-col justify-between rounded-xl border border-background-border bg-background-subtle/50 p-7 md:p-8 hover:border-background-borderHover hover:bg-background-card/80 transition-all duration-300"
          >
            <div>
              {/* Card Meta Top Bar */}
              <div className="flex items-center justify-between text-xs font-mono text-foreground-subtle mb-5">
                <span className="text-accent/90">{project.id}</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-[11px]">
                  {project.category}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-white transition-colors flex items-center justify-between">
                <span>{project.title}</span>
              </h3>

              <p className="mt-3 text-sm text-foreground-muted font-normal leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Bottom Tech Tags & Links */}
            <div className="mt-8 pt-5 border-t border-white/[0.04]">
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-foreground-subtle"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
                  aria-label={`View live repository for ${project.title}`}
                >
                  <span>Repository</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-foreground-muted hover:text-foreground transition-colors"
                  aria-label={`View code for ${project.title} on GitHub`}
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>Source</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
