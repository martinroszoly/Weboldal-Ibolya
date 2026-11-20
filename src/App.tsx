import { FormEvent, ReactNode, useEffect, useState } from 'react'
import { informationCards, navigation, services, trustPoints, IconName, Service } from './data'

type PageKey = 'home' | 'about' | 'services' | 'information' | 'contact'

const pageMeta: Record<PageKey, { title: string; description: string }> = {
  home: {
    title: 'Ibolya Könyvelés | Megbízható szakmai támogatás',
    description:
      'Könyvelési, bérszámfejtési és ügyviteli támogatás átlátható, egyeztethető keretek között.',
  },
  about: {
    title: 'Rólam | Ibolya Könyvelés',
    description: 'Bemutatkozás és az együttműködés alapjai az Ibolya Könyvelés oldalán.',
  },
  services: {
    title: 'Szolgáltatások | Ibolya Könyvelés',
    description: 'Könyvelési, bérszámfejtési és ügyviteli támogatás áttekinthető szerkezetben.',
  },
  information: {
    title: 'Hasznos információk | Ibolya Könyvelés',
    description: 'Általános, közérthető támpontok vállalkozási adminisztrációhoz.',
  },
  contact: {
    title: 'Kapcsolat | Ibolya Könyvelés',
    description: 'Vedd fel a kapcsolatot az Ibolya Könyveléssel egy első egyeztetéshez.',
  },
}

function getPageKey(pathname: string): PageKey {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'

  if (normalizedPath === '/rolam') return 'about'
  if (normalizedPath === '/szolgaltatasok') return 'services'
  if (normalizedPath === '/informaciok') return 'information'
  if (normalizedPath === '/kapcsolat') return 'contact'
  return 'home'
}

function usePathname() {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return pathname
}

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (name) {
    case 'ledger':
      return (
        <svg {...commonProps}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2M8 18h8" />
        </svg>
      )
    case 'people':
      return (
        <svg {...commonProps}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M3.5 19c.4-3 2.3-5 5.5-5s5.1 2 5.5 5M14 15c2.8-.2 4.9 1.2 5.5 3.8" />
        </svg>
      )
    case 'workflow':
      return (
        <svg {...commonProps}>
          <rect x="3" y="4" width="7" height="6" rx="1.5" />
          <rect x="14" y="14" width="7" height="6" rx="1.5" />
          <path d="M10 7h2a3 3 0 0 1 3 3v4M14 17h-2a3 3 0 0 1-3-3v-4" />
        </svg>
      )
    case 'folder':
      return (
        <svg {...commonProps}>
          <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H9l2 2h7.5A2.5 2.5 0 0 1 21 8.5v8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5z" />
          <path d="M3.5 9h17" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...commonProps}>
          <path d="M12 3 20 6v5c0 5-3.2 8.3-8 10-4.8-1.7-8-5-8-10V6z" />
          <path d="m8.5 12 2.2 2.2 4.8-4.8" />
        </svg>
      )
    case 'sparkle':
      return (
        <svg {...commonProps}>
          <path d="m12 3 1.2 4.5L17.5 9l-4.3 1.5L12 15l-1.2-4.5L6.5 9l4.3-1.5z" />
          <path d="m18.5 14 .6 2.1 2 .7-2 .7-.6 2.1-.6-2.1-2-.7 2-.7zM5 15l.5 1.5L7 17l-1.5.5L5 19l-.5-1.5L3 17l1.5-.5z" />
        </svg>
      )
  }
}

function Logo() {
  return (
    <span className="brand" aria-label="Ibolya Könyvelés">
      <span className="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 42 42" role="presentation">
          <path d="M8 34C14 24 22 12 35 6c-4 10-12 18-24 23" />
          <path d="M17 27c3-1 8-1 12 1M22 20c3-1 6-1 9 0M27 14c2-.5 4-.3 6 .3" />
          <path d="M5 36c9-4 18-5 31-3" />
        </svg>
      </span>
      <span className="brand__text">
        <strong>Ibolya</strong>
        <span>Könyvelés</span>
      </span>
    </span>
  )
}

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <a className={`nav-link${active ? ' nav-link--active' : ''}`} href={href} aria-current={active ? 'page' : undefined} onClick={onClick}>
      {label}
    </a>
  )
}

function Header({ pageKey }: { pageKey: PageKey }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand-link" href="/" onClick={() => setMenuOpen(false)}>
          <Logo />
        </a>

        <div className="brand-divider" aria-hidden="true" />
        <p className="brand-tagline">KÖNYVELÉS <span>•</span> BÉRSZÁMFEJTÉS <span>•</span> ÜGYVITEL</p>

        <button
          className="menu-toggle"
          type="button"
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Navigáció bezárása' : 'Navigáció megnyitása'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="main-navigation" className={`main-navigation${menuOpen ? ' main-navigation--open' : ''}`} aria-label="Fő navigáció">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} label={item.label} active={getPageKey(item.href) === pageKey} onClick={() => setMenuOpen(false)} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function SectionHeading({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      <div className="section-heading__title-row">
        <span className="heading-rule" aria-hidden="true" />
        <h2>{title}</h2>
        <span className="heading-rule" aria-hidden="true" />
      </div>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </div>
  )
}

function ButtonLink({ href, children, variant = 'primary' }: { href: string; children: ReactNode; variant?: 'primary' | 'outline' | 'light' }) {
  return <a className={`button button--${variant}`} href={href}>{children}</a>
}

function HeroIllustration() {
  const keys = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '+']

  return (
    <div className="hero-illustration" aria-hidden="true">
      <div className="hero-illustration__glow" />
      <div className="paper-stack paper-stack--back">
        <span className="paper-line paper-line--wide" />
        <span className="paper-line" />
        <span className="paper-line paper-line--short" />
        <div className="paper-chart"><i /><i /><i /><i /><i /></div>
      </div>
      <div className="paper-stack paper-stack--front">
        <span className="paper-label">Havi áttekintés</span>
        <span className="paper-line paper-line--wide" />
        <span className="paper-line" />
        <div className="paper-bars"><i /><i /><i /><i /></div>
      </div>
      <div className="calculator">
        <div className="calculator__top"><span /><span /><span /></div>
        <div className="calculator__screen">12 480<span>,00</span></div>
        <div className="calculator__keys">
          {keys.map((key, index) => <span key={`${key}-${index}`}>{key}</span>)}
          <span className="calculator__key--gold">=</span>
        </div>
      </div>
      <div className="gold-leaf gold-leaf--one" />
      <div className="gold-leaf gold-leaf--two" />
    </div>
  )
}

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Az együttműködés alapjai">
      <div className="container trust-grid">
        {trustPoints.map((point) => (
          <div className="trust-item" key={point.title}>
            <span className="trust-item__icon"><Icon name={point.icon} size={31} /></span>
            <span>
              <strong>{point.title}</strong>
              <small>{point.text}</small>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="service-card">
      <div className="service-card__topline">
        <span className="service-icon"><Icon name={service.icon} size={28} /></span>
        <span className="service-card__index">{service.id === 'konyvelesi-tamogatas' ? '01' : service.id === 'berszamfejtes' ? '02' : service.id === 'ugyviteli-adminisztracio' ? '03' : '04'}</span>
      </div>
      <h3>{service.title}</h3>
      <p className="service-card__lead">{service.shortDescription}</p>
      <p>{service.description}</p>
      <a className="text-link" href={`/szolgaltatasok#${service.id}`}>Részletek megtekintése</a>
    </article>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-curve hero-curve--one" aria-hidden="true" />
        <div className="hero-curve hero-curve--two" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Szakmai támogatás <b>•</b> rendezett háttér <b>•</b> emberi egyeztetés</p>
            <h1>Átláthatóbb háttér a <em>vállalkozásodhoz</em></h1>
            <p className="hero-lede">Könyvelési, bérszámfejtési és ügyviteli támogatás olyan keretek között, amelyekhez könnyebb kapcsolódni és igazodni.</p>
            <div className="button-row">
              <ButtonLink href="/kapcsolat">Kapcsolatfelvétel</ButtonLink>
              <ButtonLink href="/szolgaltatasok" variant="outline">Szolgáltatások</ButtonLink>
            </div>
            <p className="hero-note"><span className="hero-note__dot" /> A pontos együttműködés minden esetben előzetes egyeztetéssel indul.</p>
          </div>
          <HeroIllustration />
        </div>
      </section>

      <TrustStrip />

      <section className="section section--cream intro-section">
        <div className="container split-layout split-layout--intro">
          <div>
            <p className="eyebrow eyebrow--green">A mindennapi működésed mellé</p>
            <h2 className="display-title">Legyen helyed a fontos döntésekre is.</h2>
          </div>
          <div className="intro-copy">
            <p>A vállalkozás adminisztrációja akkor támogat igazán, ha követhető, rendezett és a saját működésedhez illeszkedik. Az Ibolya Könyvelés oldala ennek a közös munkának ad átlátható kiindulópontot.</p>
            <p className="muted-copy">A honlapon szereplő szolgáltatások és helyőrzők a végleges ügyféladatok, a pontos vállalási kör és az elérhetőségek megadásával finomíthatók.</p>
            <ButtonLink href="/rolam" variant="light">Bemutatkozás megtekintése</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionHeading eyebrow="Amiben számíthatsz rám" title="Szolgáltatásaink" intro="A feladatkörök könnyen szerkeszthető adatstruktúrából jelennek meg, így a későbbi pontosítás egyszerűen átvezethető." />
          <div className="service-grid service-grid--home">
            {services.map((service) => <ServiceCard service={service} key={service.id} />)}
          </div>
          <div className="center-actions"><ButtonLink href="/szolgaltatasok" variant="light">Az összes szolgáltatás</ButtonLink></div>
        </div>
      </section>

      <section className="section section--green home-cta">
        <div className="container cta-panel">
          <div>
            <p className="eyebrow">Első lépés</p>
            <h2>Beszéljük át, mire van szükséged.</h2>
            <p>A kapcsolatfelvételhez a honlap jelenlegi változatában még néhány ügyféladat hiányzik. A helyőrzők kitöltése után a folyamat készen áll az élesítésre.</p>
          </div>
          <ButtonLink href="/kapcsolat">Kapcsolatfelvétel</ButtonLink>
        </div>
      </section>
    </>
  )
}

function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="page-hero">
      <div className="page-hero__ornament" aria-hidden="true" />
      <div className="container page-hero__inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Rólam" title="Rendezett háttér, közös gondolkodás." intro="A bemutatkozás és az együttműködés keretei egy helyen, közérthetően." />
      <section className="section section--cream">
        <div className="container about-grid">
          <div className="profile-card">
            <div className="profile-card__leaf" aria-hidden="true"><Logo /></div>
            <p className="profile-card__label">Bemutatkozó helyőrző</p>
            <h2>[NÉV / BEMUTATKOZÁS HELYE]</h2>
            <p>Ide kerülhet egy rövid, személyes bemutatkozás arról, hogyan dolgozol és milyen ügyfeleknek szeretnél segítséget nyújtani.</p>
            <span className="placeholder-badge">Kitöltendő ügyféladat</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow eyebrow--green">A szemlélet alapjai</p>
            <h2 className="display-title">A jó együttműködés az egyeztetéssel kezdődik.</h2>
            <p>Az Ibolya Könyvelés weboldalának célja, hogy a könyvelési és ügyviteli feladatokhoz olyan kapcsolódási pontot adjon, ahol a teendők, kérdések és következő lépések átláthatóbbá válhatnak.</p>
            <p>Az oldalon szándékosan csak olyan állítások szerepelnek, amelyekhez nem szükséges kitalált végzettséget, tapasztalati évet, ügyfélvéleményt vagy jogszabályi ígéretet hozzáadni. A végleges szakmai bemutatkozás helye elkülönítve maradt.</p>
            <div className="feature-list">
              <div><Icon name="sparkle" size={22} /><span><strong>Közérthető kommunikáció</strong><small>A teendők és kérdések egyszerűen átbeszélhetők.</small></span></div>
              <div><Icon name="workflow" size={22} /><span><strong>Rendezett munkamenet</strong><small>A közösen rögzített keretekhez könnyebb igazodni.</small></span></div>
              <div><Icon name="shield" size={22} /><span><strong>Körültekintő ügykezelés</strong><small>Az adatok és dokumentumok kezelése figyelmet igényel.</small></span></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--white">
        <div className="container narrow-content">
          <SectionHeading eyebrow="Együttműködés" title="Így indulhatunk el" />
          <div className="steps-grid">
            <div className="step-card"><span>01</span><h3>Megismerjük a helyzetet</h3><p>Röviden áttekintjük, milyen feladatokkal és kérdésekkel érkezel.</p></div>
            <div className="step-card"><span>02</span><h3>Kijelöljük a kereteket</h3><p>Egyeztetjük, mi tartozik az együttműködésbe, és mihez kell még adat.</p></div>
            <div className="step-card"><span>03</span><h3>Rendezetté tesszük a folyamatot</h3><p>A következő lépések és a kapcsolattartás rendje egyértelművé válik.</p></div>
          </div>
        </div>
      </section>
    </>
  )
}

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Szolgáltatások" title="A vállalkozásod háttérfeladataihoz." intro="A szolgáltatási kör alapja egy szerkeszthető, egyértelműen bővíthető lista. A pontos vállalás minden esetben előzetes egyeztetés tárgya." />
      <section className="section section--cream">
        <div className="container">
          <div className="service-list">
            {services.map((service) => (
              <article className="service-detail" id={service.id} key={service.id}>
                <div className="service-detail__icon"><Icon name={service.icon} size={30} /></div>
                <div className="service-detail__body">
                  <p className="eyebrow eyebrow--green">Egyeztethető feladatkör</p>
                  <h2>{service.title}</h2>
                  <p className="service-detail__lead">{service.shortDescription}</p>
                  <p>{service.description}</p>
                  <ul>
                    {service.details.map((detail) => <li key={detail}><span aria-hidden="true">+</span>{detail}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className="notice notice--gold">
            <Icon name="sparkle" size={25} />
            <div><strong>A szolgáltatási kör még pontosítható.</strong><p>A gazdasági társaságok könyvelését a honlap jelenlegi változata nem jelöli biztosan vállalt feladatként. A vállalható kör és a feltételek későbbi ügyfélegyeztetéssel egészíthetők ki.</p></div>
          </div>
        </div>
      </section>
    </>
  )
}

function InformationPage() {
  return (
    <>
      <PageHero eyebrow="Hasznos információk" title="Egyszerű támpontok a rendezettebb működéshez." intro="Általános gondolatok és előkészítő lépések – konkrét jogszabályi állítások és egyedi tanácsadás nélkül." />
      <section className="section section--cream">
        <div className="container">
          <div className="info-grid">
            {informationCards.map((card) => (
              <article className="info-card" key={card.title}>
                <span className="info-card__icon"><Icon name={card.icon} size={27} /></span>
                <h2>{card.title}</h2>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--white">
        <div className="container narrow-content">
          <SectionHeading eyebrow="Rövid útmutató" title="Mielőtt egyeztetünk" intro="Egy első beszélgetéshez nem kell mindent előre tudnod. Néhány alapinformáció azonban segít a közös kiindulópont kialakításában." />
          <div className="faq-list">
            <details open>
              <summary>Mit érdemes előkészíteni?</summary>
              <p>A vállalkozás alapadatait, a jelenlegi működés rövid leírását, a legfontosabb kérdéseidet és azokat a dokumentumokat, amelyekről már tudod, hogy kapcsolódnak a feladathoz.</p>
            </details>
            <details>
              <summary>Mi történik az első egyeztetésen?</summary>
              <p>Átbeszéljük a helyzetet, a feladatkört és a kapcsolattartás praktikus részleteit. A konkrét együttműködés feltételei csak a szükséges adatok megismerése után pontosíthatók.</p>
            </details>
            <details>
              <summary>Adhat ez az oldal személyre szabott tanácsot?</summary>
              <p>Nem. Ezek az anyagok általános támpontok. Az aktuális szabályok és az egyedi helyzetek értékelése minden esetben külön egyeztetést igényel.</p>
            </details>
          </div>
          <div className="notice notice--soft"><Icon name="shield" size={25} /><p><strong>Fontos:</strong> az itt olvasható tartalom nem minősül adó-, számviteli vagy jogi tanácsadásnak, és nem helyettesíti az aktuális szabályok szakmai ellenőrzését.</p></div>
        </div>
      </section>
    </>
  )
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageHero eyebrow="Kapcsolat" title="Induljunk egy rövid egyeztetéssel." intro="Írd le röviden, miben keresel támogatást. A tényleges elérhetőségek és az űrlap küldési beállítása még ügyféladatként pótolandó." />
      <section className="section section--cream">
        <div className="container contact-grid">
          <div className="contact-panel">
            <p className="eyebrow eyebrow--green">Elérhetőségek</p>
            <h2>Beszéljünk a következő lépésről.</h2>
            <p>Az alábbi adatok helyőrzők. A véglegesítés után innen közvetlenül elérhetővé válhat a telefonos, e-mailes vagy személyes kapcsolatfelvétel.</p>
            <address className="contact-details">
              <div><span className="contact-details__icon"><Icon name="people" size={21} /></span><span><small>Név</small><strong>[NÉV HELYE]</strong></span></div>
              <div><span className="contact-details__icon"><Icon name="workflow" size={21} /></span><span><small>Telefon</small><strong>[TELEFONSZÁM HELYE]</strong></span></div>
              <div><span className="contact-details__icon"><Icon name="folder" size={21} /></span><span><small>E-mail</small><strong>[E-MAIL-CÍM HELYE]</strong></span></div>
              <div><span className="contact-details__icon"><Icon name="shield" size={21} /></span><span><small>Működési hely</small><strong>[TELEPÜLÉS / CÍM HELYE]</strong></span></div>
            </address>
            <div className="contact-note"><Icon name="sparkle" size={21} /><span>Élesítés előtt az adatkezelési tájékoztató és az űrlap tényleges címzettje is pótlandó.</span></div>
          </div>
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-card__heading"><p className="eyebrow eyebrow--green">Üzenetküldés</p><h2>Vedd fel a kapcsolatot</h2></div>
            <div className="form-row">
              <label htmlFor="name">Név <span>*</span></label>
              <input id="name" name="name" type="text" placeholder="A neved" required />
            </div>
            <div className="form-row">
              <label htmlFor="email">E-mail cím <span>*</span></label>
              <input id="email" name="email" type="email" placeholder="nev@email.hu" required />
            </div>
            <div className="form-row">
              <label htmlFor="topic">Miben keresel segítséget?</label>
              <select id="topic" name="topic" defaultValue="">
                <option value="" disabled>Válassz témát</option>
                <option value="konyveles">Könyvelési támogatás</option>
                <option value="berszamfejtes">Bérszámfejtési támogatás</option>
                <option value="ugyvitel">Ügyviteli adminisztráció</option>
                <option value="egyeb">Egyéb egyeztetési kérdés</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="message">Üzenet <span>*</span></label>
              <textarea id="message" name="message" rows={5} placeholder="Írd le röviden, miben szeretnél egyeztetni." required />
            </div>
            <label className="checkbox-row"><input type="checkbox" required /><span>Elolvastam az adatkezelési tájékoztatót. <em>[LINK HELYE]</em></span></label>
            <button className="button button--primary button--full" type="submit">Üzenet ellenőrzése</button>
            {submitted && <p className="form-status" role="status">A bemutató űrlap ellenőrizte a mezőket. Éles küldéshez a címzett e-mail-címét és az adatkezelési beállításokat még hozzá kell adni.</p>}
          </form>
        </div>
      </section>
    </>
  )
}

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><Logo /><p>Könyvelési, bérszámfejtési és ügyviteli támogatás átlátható keretek között.</p></div>
        <div><h2>Oldalak</h2><ul>{navigation.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul></div>
        <div><h2>Kapcsolat</h2><ul><li>[TELEFONSZÁM HELYE]</li><li>[E-MAIL-CÍM HELYE]</li><li>[TELEPÜLÉS HELYE]</li></ul></div>
      </div>
      <div className="container footer-bottom"><span>© {year} Ibolya Könyvelés</span><span>Az oldal tartalma előzetes egyeztetéshez készült.</span></div>
    </footer>
  )
}

function App() {
  const pathname = usePathname()
  const pageKey = getPageKey(pathname)
  const meta = pageMeta[pageKey]

  useEffect(() => {
    document.title = meta.title
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', meta.description)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [meta.description, meta.title, pathname])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Ugrás a tartalomhoz</a>
      <Header pageKey={pageKey} />
      <main id="main-content">
        {pageKey === 'home' && <HomePage />}
        {pageKey === 'about' && <AboutPage />}
        {pageKey === 'services' && <ServicesPage />}
        {pageKey === 'information' && <InformationPage />}
        {pageKey === 'contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  )
}

export default App
