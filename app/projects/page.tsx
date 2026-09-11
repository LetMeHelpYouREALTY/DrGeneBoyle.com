import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import SectionBlock from '@/components/SectionBlock'

export const metadata = genPageMetadata({
  title: 'Projects',
  description:
    'Placeholder projects page from the starter template — not part of the research content graph.',
  robots: { index: false, follow: false },
})

export default function Projects() {
  return (
    <>
      <SectionBlock
        id="projects-note"
        title="Projects page (not indexed)"
        answer="This starter projects template is retained for layout compatibility and is excluded from search indexing; prefer Topics, Publications, and Blog for research citations."
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
