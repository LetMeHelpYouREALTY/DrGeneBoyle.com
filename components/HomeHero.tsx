import Image from '@/components/Image'
import Link from '@/components/Link'

type HomeHeroProps = {
  imageSrc: string
  imageAlt: string
}

/**
 * Full-bleed home hero. Portrait stays visible on the light side of the frame;
 * gradients are bottom-weighted for type, not a full-face blackout.
 */
export default function HomeHero({ imageSrc, imageAlt }: HomeHeroProps) {
  return (
    <section className="page-hero relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          title={imageAlt}
          fill
          className="object-cover object-[62%_18%] sm:object-[58%_14%]"
          priority
          sizes="100vw"
        />
        <span className="sr-only">{imageAlt}</span>
        {/* Soft left wash for type — keep face readable on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-ink)]/68 via-[color:var(--color-ink)]/22 to-transparent" />
        {/* Bottom scrim for headline + CTAs — starts lower so the portrait stays clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)]/82 via-[color:var(--color-ink)]/18 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-6 pt-28 pb-14 sm:px-10 sm:pb-20">
        <p className="text-accent mb-4 text-xs font-semibold tracking-[0.22em] uppercase drop-shadow">
          Research & Insights · KLB Consultants
        </p>
        <h1 className="font-display max-w-4xl text-5xl leading-[1.05] font-semibold text-white drop-shadow-sm sm:text-6xl md:text-7xl">
          Eugene Boyle, Ph.D.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/92 drop-shadow-sm sm:text-xl">
          CTMT-2 attentional assessment dissertation and motherhood & SMI research—plus acquisition
          insight across California and Nevada.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/topics/ctmt-attention"
            className="bg-accent hover:bg-accent-dark rounded-md px-6 py-3 text-sm font-semibold text-[color:var(--color-ink)] transition"
          >
            Explore CTMT-2 research
          </Link>
          <Link
            href="/topics/motherhood-and-smi"
            className="rounded-md border border-white/55 bg-[color:var(--color-ink)]/25 px-6 py-3 text-sm font-semibold text-white backdrop-blur-[2px] transition hover:border-white hover:bg-white/10"
          >
            Motherhood & SMI
          </Link>
        </div>
      </div>
    </section>
  )
}
