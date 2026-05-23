import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"

const projects = [
  {
    number: "01",
    title: "Коттедж в Токсово",
    category: "Видеонаблюдение + Умный дом",
    year: "2025",
    direction: "left",
    image: "https://cdn.poehali.dev/projects/5e6b1d27-faaf-46d8-8fec-4a572cc8d6a7/files/fa107ef4-5b74-418e-a1f5-8cf9a1689a0c.jpg",
  },
  {
    number: "02",
    title: "ЖК «Северная Долина»",
    category: "Домофония + Контроль доступа",
    year: "2025",
    direction: "right",
    image: "https://cdn.poehali.dev/projects/5e6b1d27-faaf-46d8-8fec-4a572cc8d6a7/files/f3b9021d-3468-40ea-a7c3-0306983fe57f.jpg",
  },
  {
    number: "03",
    title: "Загородный дом во Всеволожске",
    category: "Бесшовный Wi-Fi + Электромонтаж",
    year: "2024",
    direction: "left",
    image: "https://cdn.poehali.dev/projects/5e6b1d27-faaf-46d8-8fec-4a572cc8d6a7/files/eaeeab48-3b69-473a-8c16-0402481f06dd.jpg",
  },
  {
    number: "04",
    title: "Таунхаус в Мурино",
    category: "Комплексная безопасность под ключ",
    year: "2024",
    direction: "right",
    image: "https://cdn.poehali.dev/projects/5e6b1d27-faaf-46d8-8fec-4a572cc8d6a7/files/1df4a06f-ab02-4e3d-9056-0ad458521557.jpg",
  },
  {
    number: "05",
    title: "КП «Репинская усадьба»",
    category: "Видеонаблюдение + Домофония + Wi-Fi",
    year: "2025",
    direction: "left",
    image: "https://cdn.poehali.dev/projects/5e6b1d27-faaf-46d8-8fec-4a572cc8d6a7/files/92d6ff8c-df05-48ee-9513-002fb516c398.jpg",
  },
  {
    number: "06",
    title: "КП «Репино парк»",
    category: "Охрана периметра + Wi-Fi + Видеонаблюдение + Домофония",
    year: "2025",
    direction: "right",
    image: "https://cdn.poehali.dev/projects/5e6b1d27-faaf-46d8-8fec-4a572cc8d6a7/files/3e371ba0-d5b1-4ff1-9325-f27941facb59.jpg",
  },
]

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isTouchDevice) {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
  }

  return (
    <section
      ref={ref}
      className="flex min-h-screen w-full flex-col justify-center px-4 py-20 md:h-screen md:w-screen md:shrink-0 md:snap-start md:overflow-hidden md:px-12 md:py-0 lg:px-16"
      onMouseMove={handleMouseMove}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-6 transition-all duration-700 md:mb-6 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-1 font-sans text-3xl font-light tracking-tight text-foreground md:mb-2 md:text-4xl lg:text-5xl">
            Проекты
          </h2>
          <p className="font-mono text-xs text-foreground/60 md:text-base">/ Реализованные объекты</p>
        </div>

        <div className="space-y-0 md:space-y-4">
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i}
              isVisible={isVisible}
              onHover={isTouchDevice ? () => {} : setHoveredIndex}
              isHovered={hoveredIndex === i}
            />
          ))}
        </div>
      </div>

      {!isTouchDevice && hoveredIndex !== null && (
        <div
          className="pointer-events-none fixed z-50 h-40 w-60 overflow-hidden rounded-xl shadow-2xl transition-opacity duration-200"
          style={{
            left: mousePos.x + 20,
            top: mousePos.y - 80,
          }}
        >
          <img
            src={projects[hoveredIndex].image}
            alt={projects[hoveredIndex].title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isVisible,
  onHover,
  isHovered,
}: {
  project: { number: string; title: string; category: string; year: string; direction: string; image: string }
  index: number
  isVisible: boolean
  onHover: (i: number | null) => void
  isHovered: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group flex w-full items-center justify-between border-b border-foreground/10 py-3 transition-all duration-700 hover:border-foreground/20 md:py-4 ${getRevealClass()} cursor-pointer`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-3 md:gap-8">
        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg md:hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <span className="hidden shrink-0 font-mono text-xs text-foreground/30 transition-colors group-hover:text-foreground/50 md:block md:text-base">
          {project.number}
        </span>
        <div className="min-w-0">
          <h3 className="mb-0.5 truncate font-sans text-base font-light text-foreground transition-transform duration-300 group-hover:translate-x-1 md:mb-1 md:text-2xl md:group-hover:translate-x-2 lg:text-3xl">
            {project.title}
          </h3>
          <p className="truncate font-mono text-xs text-foreground/50">{project.category}</p>
        </div>
      </div>
      <span className="ml-3 shrink-0 font-mono text-xs text-foreground/30 md:text-sm">{project.year}</span>
    </div>
  )
}