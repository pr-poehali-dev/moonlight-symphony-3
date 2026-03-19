import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex min-h-screen w-full flex-col justify-center px-4 py-20 md:h-screen md:w-screen md:shrink-0 md:snap-start md:overflow-hidden md:px-12 md:py-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-4 transition-all duration-700 md:mb-8 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-1 font-sans text-3xl font-light tracking-tight text-foreground md:mb-2 md:text-5xl lg:text-6xl">
            Услуги
          </h2>
          <p className="font-mono text-xs text-foreground/60 md:text-base">/ Что мы устанавливаем</p>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-12 md:gap-y-8 lg:gap-x-16">
          {[
            {
              title: "Видеонаблюдение",
              description: "IP-камеры и системы записи для дома и территории. Удалённый просмотр с телефона 24/7",
              direction: "top",
              icon: "Camera",
            },
            {
              title: "Электромонтаж",
              description: "Профессиональный монтаж электрики: щитки, розетки, освещение — под ключ с гарантией",
              direction: "right",
              icon: "Zap",
            },
            {
              title: "Домофония и контроль доступа",
              description: "Видеодомофоны, электромагнитные замки и умные ключи для квартир и коттеджей",
              direction: "left",
              icon: "DoorOpen",
            },
            {
              title: "Бесшовный Wi-Fi",
              description: "Mesh-сети и точки доступа для полного покрытия дома без мёртвых зон",
              direction: "bottom",
              icon: "Wifi",
            },
            {
              title: "Умный дом",
              description: "Автоматизация отопления, света, вентиляции и охраны — управление со смартфона",
              direction: "top",
              icon: "Home",
            },
            {
              title: "Техническое обслуживание",
              description: "Регулярное обслуживание и поддержка систем безопасности после установки",
              direction: "right",
              icon: "Wrench",
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
  service: { title: string; description: string; direction: string; icon: string }
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
      className={`group flex items-start gap-3 border-b border-foreground/10 py-3 transition-all duration-700 sm:block sm:border-0 sm:py-0 md:gap-0 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="mb-0 flex shrink-0 items-center gap-3 sm:mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/10 text-foreground/70 transition-all duration-300 group-hover:bg-foreground/20 group-hover:text-foreground sm:h-9 sm:w-9">
          <Icon name={service.icon} size={16} />
        </div>
        <span className="font-mono text-xs text-foreground/60 sm:block">0{index + 1}</span>
      </div>
      <div>
        <h3 className="mb-0.5 font-sans text-base font-light text-foreground sm:mb-1.5 md:text-xl lg:text-2xl">{service.title}</h3>
        <p className="text-xs leading-relaxed text-foreground/80 md:text-sm">{service.description}</p>
      </div>
    </div>
  )
}