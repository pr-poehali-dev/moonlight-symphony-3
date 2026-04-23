import { useReveal } from "@/hooks/use-reveal"

const services = [
  {
    title: "Видеонаблюдение",
    description: "IP-камеры и системы записи для дома и территории. Удалённый просмотр с телефона 24/7",
    direction: "top",
    image: "https://cdn.poehali.dev/projects/5e6b1d27-faaf-46d8-8fec-4a572cc8d6a7/files/dfcd0a80-c03e-4c18-aea3-6d89f404e338.jpg",
  },
  {
    title: "Электромонтаж",
    description: "Профессиональный монтаж электрики: щитки, розетки, освещение — под ключ с гарантией",
    direction: "right",
    image: "https://cdn.poehali.dev/projects/5e6b1d27-faaf-46d8-8fec-4a572cc8d6a7/files/e978d08e-5114-4fa7-8ec3-c1a3bf484a31.jpg",
  },
  {
    title: "Домофония и контроль доступа",
    description: "Видеодомофоны, электромагнитные замки и умные ключи для квартир и коттеджей",
    direction: "left",
    image: "https://cdn.poehali.dev/projects/5e6b1d27-faaf-46d8-8fec-4a572cc8d6a7/files/447ca33a-0deb-4e77-bb43-2df49ad853a8.jpg",
  },
  {
    title: "Бесшовный Wi-Fi",
    description: "Mesh-сети и точки доступа для полного покрытия дома без мёртвых зон",
    direction: "bottom",
    image: "https://cdn.poehali.dev/projects/5e6b1d27-faaf-46d8-8fec-4a572cc8d6a7/files/122f1ed0-aca1-465c-b7bf-e5b71f0f43d4.jpg",
  },
  {
    title: "Умный дом",
    description: "Автоматизация отопления, света, вентиляции и охраны — управление со смартфона",
    direction: "top",
    image: "https://cdn.poehali.dev/projects/5e6b1d27-faaf-46d8-8fec-4a572cc8d6a7/files/5a98adbb-0c32-4875-bb88-91e248df5dd1.jpg",
  },
  {
    title: "Техническое обслуживание",
    description: "Регулярное обслуживание и поддержка систем безопасности после установки",
    direction: "right",
    image: "https://cdn.poehali.dev/projects/5e6b1d27-faaf-46d8-8fec-4a572cc8d6a7/files/c8580955-18f6-43f4-a38e-c0fc56de69de.jpg",
  },
]

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <section
      ref={ref}
      className="flex min-h-screen w-full flex-col justify-center px-4 py-16 md:h-screen md:w-screen md:shrink-0 md:snap-start md:overflow-hidden md:px-12 md:py-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-6 transition-all duration-700 md:mb-10 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-1 font-sans text-3xl font-light tracking-tight text-foreground md:mb-2 md:text-5xl lg:text-6xl">
            Услуги
          </h2>
          <p className="font-mono text-xs text-foreground/60 md:text-base">/ Что мы устанавливаем</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:gap-5">
          {services.map((service, i) => (
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
  service: { title: string; description: string; direction: string; image: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left": return "-translate-x-10 opacity-0"
        case "right": return "translate-x-10 opacity-0"
        case "top": return "-translate-y-10 opacity-0"
        case "bottom": return "translate-y-10 opacity-0"
        default: return "translate-y-8 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-xl transition-all duration-700 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-2.5 md:p-4">
        <span className="mb-0.5 block font-mono text-[10px] text-white/50 md:text-xs">0{index + 1}</span>
        <h3 className="mb-0.5 font-sans text-xs font-medium leading-tight text-white md:mb-1 md:text-base lg:text-lg">
          {service.title}
        </h3>
        <p className="hidden text-xs leading-snug text-white/70 sm:block md:text-sm">
          {service.description}
        </p>
      </div>
    </div>
  )
}
