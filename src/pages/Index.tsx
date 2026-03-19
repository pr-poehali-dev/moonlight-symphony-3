import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"
import Icon from "@/components/ui/icon"

const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768

export default function Index() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobile, setMobile] = useState(isMobile())
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number>()

  useEffect(() => {
    const onResize = () => setMobile(isMobile())
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) clearInterval(intervalId)
    }, 100)

    const fallbackTimer = setTimeout(() => setIsLoaded(true), 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (!scrollContainerRef.current) return
    if (mobile) {
      const sections = scrollContainerRef.current.querySelectorAll("section")
      sections[index]?.scrollIntoView({ behavior: "smooth" })
    } else {
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({ left: sectionWidth * index, behavior: "smooth" })
    }
    setCurrentSection(index)
    setMobileMenuOpen(false)
  }

  // Touch swipe — only for horizontal desktop mode
  useEffect(() => {
    if (mobile) return

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      const deltaX = touchStartX.current - e.changedTouches[0].clientX
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < 4) scrollToSection(currentSection + 1)
        else if (deltaY < 0 && currentSection > 0) scrollToSection(currentSection - 1)
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }
    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection, mobile])

  // Wheel scroll — desktop horizontal only
  useEffect(() => {
    if (mobile) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        if (!scrollContainerRef.current) return
        scrollContainerRef.current.scrollBy({ left: e.deltaY, behavior: "instant" })
        const sectionWidth = scrollContainerRef.current.offsetWidth
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth)
        if (newSection !== currentSection) setCurrentSection(newSection)
      }
    }

    const container = scrollContainerRef.current
    if (container) container.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      if (container) container.removeEventListener("wheel", handleWheel)
    }
  }, [currentSection, mobile])

  // Scroll tracker — desktop
  useEffect(() => {
    if (mobile) return

    const handleScroll = () => {
      if (scrollThrottleRef.current) return
      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) { scrollThrottleRef.current = undefined; return }
        const sectionWidth = scrollContainerRef.current.offsetWidth
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth)
        if (newSection !== currentSection && newSection >= 0 && newSection <= 4) setCurrentSection(newSection)
        scrollThrottleRef.current = undefined
      })
    }

    const container = scrollContainerRef.current
    if (container) container.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      if (container) container.removeEventListener("scroll", handleScroll)
      if (scrollThrottleRef.current) cancelAnimationFrame(scrollThrottleRef.current)
    }
  }, [currentSection, mobile])

  // Scroll tracker — mobile vertical
  useEffect(() => {
    if (!mobile) return

    const handleScroll = () => {
      if (scrollThrottleRef.current) return
      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) { scrollThrottleRef.current = undefined; return }
        const sections = scrollContainerRef.current.querySelectorAll("section")
        let closest = 0
        let minDist = Infinity
        sections.forEach((sec, i) => {
          const dist = Math.abs(sec.getBoundingClientRect().top)
          if (dist < minDist) { minDist = dist; closest = i }
        })
        if (closest !== currentSection) setCurrentSection(closest)
        scrollThrottleRef.current = undefined
      })
    }

    const container = scrollContainerRef.current
    if (container) container.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      if (container) container.removeEventListener("scroll", handleScroll)
      if (scrollThrottleRef.current) cancelAnimationFrame(scrollThrottleRef.current)
    }
  }, [currentSection, mobile])

  const navItems = ["Главная", "Работы", "Услуги", "О нас", "Контакты"]

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#1275d8"
            colorB="#e19136"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#0066ff"
            upColor="#0066ff"
            downColor="#d1d1d1"
            leftColor="#e19136"
            rightColor="#e19136"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col justify-center bg-background/95 px-8 backdrop-blur-xl md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(index)}
                className="block w-full py-4 text-left font-sans text-3xl font-light text-foreground transition-opacity hover:opacity-70"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <MagneticButton variant="primary" size="lg" onClick={() => scrollToSection(4)}>
              Вызвать мастера
            </MagneticButton>
          </div>
        </div>
      )}

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4 transition-opacity duration-700 md:px-12 md:py-6 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25 md:h-10 md:w-10">
            <span className="font-sans text-lg font-bold text-foreground">С</span>
          </div>
          <span className="hidden font-sans text-sm font-light text-foreground/90 sm:block">СтражДом</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`font-mono text-xs transition-all duration-300 ${
                currentSection === index
                  ? "text-foreground"
                  : "text-foreground/50 hover:text-foreground/80"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+79533555693"
            className="flex h-9 items-center gap-1.5 rounded-lg bg-foreground/10 px-3 backdrop-blur-md transition-all hover:bg-foreground/20 md:hidden"
          >
            <span className="font-mono text-xs text-foreground">+7 953 355-56-93</span>
          </a>

          <div className="hidden md:block">
            <MagneticButton size="default" variant="secondary" onClick={() => scrollToSection(4)}>
              Вызвать мастера
            </MagneticButton>
          </div>

          {/* Mobile burger */}
          <button
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg bg-foreground/10 backdrop-blur-md md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`h-px w-4 bg-foreground transition-all ${mobileMenuOpen ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-foreground transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px w-4 bg-foreground transition-all ${mobileMenuOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* MOBILE: vertical scroll */}
      {mobile ? (
        <div
          ref={scrollContainerRef}
          className={`relative z-10 h-screen overflow-y-auto overflow-x-hidden transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Hero */}
          <section className="flex min-h-screen w-full flex-col justify-end px-4 pb-16 pt-24">
            <div className="max-w-3xl">
              <div className="mb-3 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-3 py-1.5 backdrop-blur-md">
                <p className="font-mono text-xs text-foreground/90">Профессиональная установка под ключ</p>
              </div>
              <h1 className="mb-4 font-sans text-4xl font-light leading-[1.1] tracking-tight text-foreground">
                Комфорт в ваш дом
              </h1>
              <p className="mb-6 text-base leading-relaxed text-foreground/90">
                Видеонаблюдение, умный дом и безопасность для загородных домов и квартир. Установка «под ключ» — без лишних хлопот.
              </p>
              <div className="flex flex-col gap-3">
                <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection(4)}>
                  Получить консультацию
                </MagneticButton>
                <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(2)}>
                  Наши услуги
                </MagneticButton>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">Листайте вниз</p>
              <Icon name="ChevronDown" size={14} className="text-foreground/80 animate-bounce" />
            </div>
          </section>

          <WorkSection />
          <ServicesSection />
          <AboutSection scrollToSection={scrollToSection} />
          <ContactSection />
        </div>
      ) : (
        /* DESKTOP: horizontal scroll */
        <div
          ref={scrollContainerRef}
          data-scroll-container
          className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Hero Section */}
          <section className="flex min-h-screen w-screen shrink-0 flex-col justify-end px-4 pb-12 pt-20 md:px-12 md:pb-24 md:pt-24">
            <div className="max-w-3xl">
              <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-3 py-1.5 backdrop-blur-md duration-700 md:px-4">
                <p className="font-mono text-xs text-foreground/90">Профессиональная установка под ключ</p>
              </div>
              <h1 className="mb-4 animate-in fade-in slide-in-from-bottom-8 font-sans text-4xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 sm:text-5xl md:mb-6 md:text-7xl lg:text-8xl">
                <span className="text-balance">Комфорт в ваш дом</span>
              </h1>
              <p className="mb-6 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-base leading-relaxed text-foreground/90 duration-1000 delay-200 md:mb-8 md:text-xl">
                <span className="text-pretty">
                  Видеонаблюдение, умный дом и безопасность для загородных домов и квартир. Установка «под ключ» — без лишних хлопот.
                </span>
              </p>
              <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-3 duration-1000 delay-300 sm:flex-row sm:items-center sm:gap-4">
                <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection(4)}>
                  Получить консультацию
                </MagneticButton>
                <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(2)}>
                  Наши услуги
                </MagneticButton>
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500 md:bottom-8">
              <div className="flex items-center gap-2">
                <p className="font-mono text-xs text-foreground/80">Листайте вправо</p>
                <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
                </div>
              </div>
            </div>
          </section>

          <WorkSection />
          <ServicesSection />
          <AboutSection scrollToSection={scrollToSection} />
          <ContactSection />
        </div>
      )}

      {/* Section dots indicator */}
      <div className="fixed bottom-4 right-4 z-40 flex gap-1.5 md:hidden">
        {navItems.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentSection === i ? "w-4 bg-foreground" : "w-1.5 bg-foreground/40"
            }`}
          />
        ))}
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </main>
  )
}