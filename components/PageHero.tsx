import Image from '@/components/Image'
import Link from '@/components/Link'

type Cta = {
  href: string
  label: string
  primary?: boolean
}

type PageHeroProps = {
  eyebrow?: string
  title: string
  summary: string
  imageSrc: string
  imageAlt: string
  priority?: boolean
  ctas?: Cta[]
}

export default function PageHero({
  eyebrow,
  title,
  summary,
  imageSrc,
  imageAlt,
  priority = false,
  ctas = [],
}: PageHeroProps) {
  return (
    <section className="page-hero relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          title={imageAlt}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, 1100px"
        />
        <span className="sr-only">{imageAlt}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-ink)]/92 via-[color:var(--color-ink)]/78 to-[color:var(--color-ink)]/35" />
      </div>
      <div className="relative z-10 flex min-h-[22rem] flex-col justify-end px-6 py-10 sm:min-h-[26rem] sm:px-10 sm:py-14">
        {eyebrow ? (
          <p className="font-display text-accent mb-3 text-sm tracking-[0.18em] uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display max-w-3xl text-4xl leading-tight font-semibold text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">{summary}</p>
        {ctas.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {ctas.map((cta) => (
              <Link
                key={cta.href + cta.label}
                href={cta.href}
                className={
                  cta.primary
                    ? 'bg-accent hover:bg-accent-dark rounded-md px-5 py-2.5 text-sm font-semibold text-[color:var(--color-ink)] transition'
                    : 'rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10'
                }
              >
                {cta.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
