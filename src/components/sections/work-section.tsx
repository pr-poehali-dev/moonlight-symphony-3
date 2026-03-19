import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"

const projects = [
  {
    number: "01",
    title: "Коттедж в Токсово",
    category: "Видеонаблюдение + Умный дом",
    year: "2025",
    direction: "left",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
  },
  {
    number: "02",
    title: "ЖК «Северная Долина»",
    category: "Домофония + Контроль доступа",
    year: "2025",
    direction: "right",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
  },
  {
    number: "03",
    title: "Загородный дом во Всеволожске",
    category: "Бесшовный Wi-Fi + Электромонтаж",
    year: "2024",
    direction: "left",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80",
  },
  {
    number: "04",
    title: "Таунхаус в Мурино",
    category: "Комплексная безопасность под ключ",
    year: "2024",
    direction: "right",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
]

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start flex-col justify-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
      onMouseMove={handleMouseMove}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Проекты
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Реализованные объекты</p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i}
              isVisible={isVisible}
              onHover={setHoveredIndex}
              isHovered={hoveredIndex === i}
            />
          ))}
        </div>
      </div>

      {hoveredIndex !== null && (
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
      className={`group flex items-center justify-between border-b border-foreground/10 py-6 transition-all duration-700 hover:border-foreground/20 md:py-8 ${getRevealClass()} cursor-pointer`}
      style={{
        transitionDelay: `${index * 150}ms`,
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "85%" : "90%",
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
          {project.number}
        </span>
        <div>
          <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-foreground/50 md:text-sm">{project.category}</p>
        </div>
      </div>
      <span className="font-mono text-xs text-foreground/30 md:text-sm">{project.year}</span>
    </div>
  )
}