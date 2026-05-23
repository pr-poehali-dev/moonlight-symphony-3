import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function PrivacyPolicy() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-20">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 font-mono text-xs text-foreground/50 transition-colors hover:text-foreground/90"
        >
          ← Назад
        </button>

        <h1 className="mb-2 font-sans text-3xl font-light tracking-tight text-foreground md:text-5xl">
          Политика конфиденциальности
        </h1>
        <p className="mb-10 font-mono text-xs text-foreground/50">E-Home Systems / Последнее обновление: май 2026</p>

        <div className="space-y-8 font-sans text-sm leading-relaxed text-foreground/80 md:text-base">

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground md:text-lg">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки персональных данных пользователей сайта <strong>e-homesystems.ru</strong>, принадлежащего E-Home Systems (далее — «Оператор»).
            </p>
            <p className="mt-3">
              Политика разработана в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных».
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground md:text-lg">2. Какие данные мы собираем</h2>
            <p>При заполнении формы обратной связи мы собираем следующие персональные данные:</p>
            <ul className="mt-3 space-y-1.5 pl-4">
              <li className="list-disc">Имя</li>
              <li className="list-disc">Номер телефона</li>
              <li className="list-disc">Адрес электронной почты</li>
              <li className="list-disc">Текст сообщения, оставленного в форме</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground md:text-lg">3. Цели обработки данных</h2>
            <p>Персональные данные обрабатываются исключительно в следующих целях:</p>
            <ul className="mt-3 space-y-1.5 pl-4">
              <li className="list-disc">Обратная связь с пользователем по его запросу</li>
              <li className="list-disc">Предоставление консультаций об услугах компании</li>
              <li className="list-disc">Заключение и исполнение договоров на оказание услуг</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground md:text-lg">4. Основания обработки</h2>
            <p>
              Обработка персональных данных осуществляется на основании согласия субъекта персональных данных (ст. 6, ч. 1, п. 1 Федерального закона № 152-ФЗ), которое выражается путём заполнения и отправки формы на сайте.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground md:text-lg">5. Хранение и защита данных</h2>
            <p>
              Оператор принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного доступа, изменения, раскрытия или уничтожения.
            </p>
            <p className="mt-3">
              Персональные данные не передаются третьим лицам, за исключением случаев, предусмотренных действующим законодательством РФ.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground md:text-lg">6. Срок хранения</h2>
            <p>
              Персональные данные хранятся в течение срока, необходимого для достижения целей обработки, но не более 3 (трёх) лет с момента их получения, либо до отзыва согласия субъектом персональных данных.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground md:text-lg">7. Права субъекта персональных данных</h2>
            <p>Вы имеете право:</p>
            <ul className="mt-3 space-y-1.5 pl-4">
              <li className="list-disc">Получить информацию об обработке ваших персональных данных</li>
              <li className="list-disc">Потребовать уточнения, блокирования или уничтожения персональных данных</li>
              <li className="list-disc">Отозвать согласие на обработку персональных данных в любой момент</li>
              <li className="list-disc">Обжаловать действия Оператора в Роскомнадзор</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground md:text-lg">8. Контактные данные оператора</h2>
            <p>По вопросам обработки персональных данных обращайтесь:</p>
            <div className="mt-3 space-y-1">
              <p><span className="text-foreground/50">Компания:</span> E-Home Systems</p>
              <p><span className="text-foreground/50">Email:</span> <a href="mailto:info@ssb.spb.ru" className="underline underline-offset-2 hover:text-foreground transition-colors">info@ssb.spb.ru</a></p>
              <p><span className="text-foreground/50">Телефон:</span> <a href="tel:+79533555693" className="underline underline-offset-2 hover:text-foreground transition-colors">+7 953 355-56-93</a></p>
              <p><span className="text-foreground/50">Регион:</span> Санкт-Петербург и Ленинградская область</p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-foreground md:text-lg">9. Изменения политики</h2>
            <p>
              Оператор оставляет за собой право вносить изменения в настоящую Политику. Актуальная версия всегда доступна на странице <strong>e-homesystems.ru/privacy</strong>.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
