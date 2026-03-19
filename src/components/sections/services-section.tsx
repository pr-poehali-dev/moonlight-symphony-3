import { useReveal } from "@/hooks/use-reveal"

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-6 transition-all duration-700 md:mb-8 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Услуги
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Что мы устанавливаем</p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3 md:gap-x-12 md:gap-y-8 lg:gap-x-16">
          {[
            {
              title: "Видеонаблюдение",
              description: "IP-камеры и системы записи для дома и территории. Удалённый просмотр с телефона 24/7",
              direction: "top",
            },
            {
              title: "Электромонтаж",
              description: "Профессиональный монтаж электрики: щитки, розетки, освещение — под ключ с гарантией",
              direction: "right",
            },
            {
              title: "Домофония и контроль доступа",
              description: "Видеодомофоны, электромагнитные замки и умные ключи для квартир и коттеджей",
              direction: "left",
            },
            {
              title: "Бесшовный Wi-Fi",
              description: "Mesh-сети и точки доступа для полного покрытия дома без мёртвых зон",
              direction: "bottom",
            },
            {
              title: "Умный дом",
              description: "Автоматизация отопления, света, вентиляции и охраны — управление со смартфона",
              direction: "top",
            },
            {
              title: "Техническое обслуживание",
              description: "Регулярное обслуживание и поддержка систем безопасности после установки",
              direction: "right",
            },
          ].map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: { title: string; description: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
        <span className="font-mono text-xs text-foreground/60">0{index + 1}</span>
      </div>
      <h3 className="mb-1.5 font-sans text-lg font-light text-foreground md:text-xl lg:text-2xl">{service.title}</h3>
      <p className="text-xs leading-relaxed text-foreground/80 md:text-sm">{service.description}</p>
    </div>
  )
}