import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconPlay } from "@/components/ui/icons";

/**
 * Featured project video block. No real footage exists for any service
 * page yet (see the `videoSrc: null` comment in content/services.ts) — per
 * CLAUDE.md, a missing video must show an intentional coming-soon state,
 * never a player with a broken source or an active fake play button. When
 * a real `videoSrc` is supplied later, this renders a real, accessible
 * `<video>` element instead (native controls, playsInline, no autoplay,
 * optional captions track) with no other code changes needed.
 */
export function ServiceVideo({
  heading,
  body,
  poster,
  videoSrc,
  captionsSrc,
}: {
  heading: string;
  body: string;
  poster: { src: string; alt: string };
  videoSrc: string | null;
  captionsSrc?: string;
}) {
  return (
    <section className="border-t border-white/10 bg-navy-deep py-20 sm:py-28">
      <Container className="max-w-4xl">
        <Reveal>
          <div className="text-center">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.2] text-white">{heading}</h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/60">{body}</p>
          </div>

          <div className="relative mx-auto mt-9 aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-navy">
            {videoSrc ? (
              <video controls playsInline preload="metadata" poster={poster.src} className="h-full w-full object-cover">
                <source src={videoSrc} />
                {captionsSrc && <track kind="captions" src={captionsSrc} />}
              </video>
            ) : (
              <>
                <Image src={poster.src} alt={poster.alt} fill sizes="(min-width: 1024px) 896px, 92vw" className="object-cover opacity-40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy-deep/40">
                  <span
                    aria-hidden="true"
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/50"
                  >
                    <IconPlay className="scale-[2]" />
                  </span>
                  <span className="rounded-full bg-navy-deep/85 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white/70">
                    Video coming soon
                  </span>
                </div>
              </>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
