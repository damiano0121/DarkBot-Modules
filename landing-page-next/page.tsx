'use client';

import { useEffect, useRef, useState } from 'react';
import s from './landing.module.css';

// ── Types ──────────────────────────────────────────────────────────────────
interface FaqItem {
  q: string;
  a: string;
}

// ── Data ───────────────────────────────────────────────────────────────────
const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'Czy coaching jest w pełni online?',
    a: 'Tak, cały coaching odbywa się online. Komunikujemy się przez aplikację, e-mail oraz wideorozmowy. Nie masz ograniczeń geograficznych — możesz mieszkać gdziekolwiek na świecie.',
  },
  {
    q: 'Jak długo powinienem być na programie?',
    a: 'Minimalna długość to 3 miesiące. To czas potrzebny do zbudowania nawyków i zobaczenia realnych efektów. Większość klientów kontynuuje 6–12 miesięcy, bo wyniki motywują do dalszej pracy.',
  },
  {
    q: 'Czy potrzebuję siłowni, żeby zacząć?',
    a: 'Nie. Program dostosowuję do Twoich możliwości — możemy pracować na siłowni, w domu lub hybrydowo. Ważne jest Twoje zaangażowanie, reszta to moja robota.',
  },
  {
    q: 'Co jeśli nie będę widział efektów?',
    a: 'Monitorujemy postępy co tydzień i na bieżąco korygujemy plan. Jeśli coś nie działa, zmieniamy podejście. Moja skuteczność na poziomie 98% to efekt ciągłego dostosowywania.',
  },
  {
    q: 'Jak wygląda pierwszy krok?',
    a: 'Wypełnij formularz kontaktowy poniżej. Skontaktuję się w ciągu 24 godzin, umówimy bezpłatną konsultację, na której omówimy Twoje cele i dobierzemy optymalny program.',
  },
  {
    q: 'Czy mogę zrezygnować w dowolnym momencie?',
    a: 'Programy są miesięczne bez długoterminowych zobowiązań. Możesz zakończyć współpracę z miesięcznym wyprzedzeniem. Nie ma ukrytych opłat ani kar za rezygnację.',
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────
function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={s.faqItem}>
      <button
        className={s.faqQuestion}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{item.q}</span>
        <span className={`${s.faqIcon} ${open ? s.faqIconOpen : ''}`}>+</span>
      </button>
      <div
        ref={answerRef}
        className={s.faqAnswer}
        style={{ maxHeight: open ? answerRef.current?.scrollHeight : 0 }}
      >
        <p>{item.a}</p>
      </div>
    </div>
  );
}

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setSent(true);
  }

  return (
    <form className={s.form} onSubmit={handleSubmit} noValidate>
      <div className={s.formRow}>
        <div className={s.formGroup}>
          <label htmlFor="name">Imię i nazwisko</label>
          <input id="name" name="name" type="text" placeholder="Jan Kowalski" required />
        </div>
        <div className={s.formGroup}>
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" placeholder="jan@example.com" required />
        </div>
      </div>
      <div className={s.formGroup}>
        <label htmlFor="phone">Telefon (opcjonalnie)</label>
        <input id="phone" name="phone" type="tel" placeholder="+48 000 000 000" />
      </div>
      <div className={s.formGroup}>
        <label htmlFor="goal">Jaki jest Twój główny cel?</label>
        <select id="goal" name="goal" required defaultValue="">
          <option value="" disabled>Wybierz cel</option>
          <option value="reduction">Redukcja wagi</option>
          <option value="muscle">Budowanie masy mięśniowej</option>
          <option value="recomposition">Rekompozyja sylwetki</option>
          <option value="health">Poprawa zdrowia i kondycji</option>
          <option value="other">Inny cel</option>
        </select>
      </div>
      <div className={s.formGroup}>
        <label htmlFor="message">Powiedz coś o sobie (opcjonalnie)</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Opisz swój aktualny poziom aktywności, ewentualne kontuzje, oczekiwania..."
        />
      </div>
      {!sent ? (
        <button type="submit" className={`${s.btn} ${s.btnPrimary} ${s.btnFull}`} disabled={loading}>
          {loading ? (
            <svg className={s.spinner} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0110 10" strokeLinecap="round" />
            </svg>
          ) : (
            'Wyślij wiadomość'
          )}
        </button>
      ) : (
        <div className={s.formSuccess}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Dziękuję! Odezwę się w ciągu 24 godzin.
        </div>
      )}
    </form>
  );
}

// ── Reveal hook ────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* NAV */}
      <nav className={`${s.nav} ${navScrolled ? s.navScrolled : ''}`}>
        <div className={`${s.container} ${s.navInner}`}>
          <a href="#" className={s.navLogo}>
            DK<span className={s.accent}>.</span>
          </a>
          <button
            className={`${s.navBurger} ${menuOpen ? s.navBurgerOpen : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
          <ul className={`${s.navLinks} ${menuOpen ? s.navLinksOpen : ''}`}>
            <li><a href="#przemiany" onClick={closeMenu}>Przemiany</a></li>
            <li><a href="#oferta" onClick={closeMenu}>Oferta</a></li>
            <li><a href="#opinie" onClick={closeMenu}>Opinie</a></li>
            <li><a href="#faq" onClick={closeMenu}>FAQ</a></li>
            <li>
              <a href="#kontakt" onClick={closeMenu} className={`${s.btn} ${s.btnOutline}`}>
                Zacznij teraz
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className={s.hero} id="hero">
        <div className={s.heroBg}>
          <div className={s.heroGradient} />
          <div className={s.heroGrid} />
        </div>
        <div className={`${s.container} ${s.heroInner}`}>
          <div className={s.heroBadge} data-reveal>
            <span className={s.badgeDot} />
            Premium Fitness Coaching
          </div>
          <h1 className={s.heroTitle} data-reveal>
            Zmień ciało.<br />
            <span className={s.accent}>Zmień życie.</span>
          </h1>
          <p className={s.heroSub} data-reveal>
            Indywidualny program treningowy i dietetyczny stworzony dla Ciebie.<br />
            Bez szablonów. Bez kompromisów. Tylko wyniki.
          </p>
          <div className={s.heroCta} data-reveal>
            <a href="#kontakt" className={`${s.btn} ${s.btnPrimary}`}>Rozpocznij przemianę</a>
            <a href="#przemiany" className={`${s.btn} ${s.btnGhost}`}>Zobacz efekty</a>
          </div>
          <div className={s.heroStats} data-reveal>
            {[
              { num: '500+', label: 'Zadowolonych klientów' },
              { num: '8+', label: 'Lat doświadczenia' },
              { num: '98%', label: 'Skuteczność programów' },
            ].map((stat, i) => (
              <>
                {i > 0 && <div key={`d${i}`} className={s.statDivider} />}
                <div key={stat.label} className={s.stat}>
                  <span className={s.statNum}>{stat.num}</span>
                  <span className={s.statLabel}>{stat.label}</span>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className={s.heroScroll}>
          <div className={s.scrollLine} />
          <span>Scroll</span>
        </div>
      </section>

      {/* PRZEMIANY */}
      <section className={s.section} id="przemiany">
        <div className={s.container}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionLabel}>Efekty</span>
            <h2 className={s.sectionTitle}>Przemiany klientów</h2>
            <p className={s.sectionSub}>Prawdziwe rezultaty. Prawdziwi ludzie. Bez filtrów.</p>
          </div>
          <div className={`${s.transformations} ${s.revealGrid}`} data-reveal>
            {[
              { name: 'Marcin, 34 lata', result: '−18 kg w 4 miesiące', quote: '"Nigdy nie myślałem, że w tym wieku mogę wyglądać lepiej niż za 20-tki."' },
              { name: 'Agnieszka, 29 lat', result: '−12 kg w 3 miesiące', quote: '"Program był prosty, dieta nie była torturą. Wyniki mówią same za siebie."' },
              { name: 'Tomasz, 41 lat', result: '+8 kg masy mięśniowej', quote: '"Budowanie masy po 40-tce brzmi jak mit. Damian udowodnił, że to możliwe."' },
            ].map((t) => (
              <div key={t.name} className={s.transformCard}>
                <div className={s.transformImages}>
                  <div className={s.transformBefore}>
                    <div className={s.transformPlaceholder}>
                      <PersonIcon />
                    </div>
                    <span className={s.transformTag}>Przed</span>
                  </div>
                  <div className={s.transformAfter}>
                    <div className={`${s.transformPlaceholder} ${s.transformPlaceholderAfter}`}>
                      <PersonIcon />
                    </div>
                    <span className={`${s.transformTag} ${s.transformTagAfter}`}>Po</span>
                  </div>
                </div>
                <div className={s.transformInfo}>
                  <div className={s.transformName}>{t.name}</div>
                  <div className={s.transformResult}>
                    <span className={s.accent}>{t.result.split(' ')[0]}</span>
                    {' ' + t.result.split(' ').slice(1).join(' ')}
                  </div>
                  <p className={s.transformQuote}>{t.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section className={`${s.section} ${s.sectionDark}`} id="oferta">
        <div className={s.container}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionLabel}>Programy</span>
            <h2 className={s.sectionTitle}>Wybierz swoją ścieżkę</h2>
            <p className={s.sectionSub}>Każdy program jest w pełni personalizowany pod Twoje cele i możliwości.</p>
          </div>
          <div className={`${s.offers} ${s.revealGrid}`} data-reveal>
            {/* Starter */}
            <div className={s.offerCard}>
              <div className={s.offerHeader}>
                <BoltIcon />
                <h3 className={s.offerName}>Starter</h3>
                <div className={s.offerPrice}>
                  <span className={s.priceAmount}>497</span>
                  <span className={s.priceCurrency}>zł/mies.</span>
                </div>
              </div>
              <ul className={s.offerList}>
                {['Indywidualny plan treningowy', 'Plan żywieniowy', 'Cotygodniowy check-in', 'Dostęp do aplikacji'].map((f) => (
                  <li key={f}><span className={s.check}>✓</span>{f}</li>
                ))}
                {['Dedykowany czat 24/7', 'Analiza składu ciała'].map((f) => (
                  <li key={f} className={s.inactive}><span>—</span>{f}</li>
                ))}
              </ul>
              <a href="#kontakt" className={`${s.btn} ${s.btnOutline} ${s.offerBtn}`}>Zacznij teraz</a>
            </div>

            {/* Premium */}
            <div className={`${s.offerCard} ${s.offerCardFeatured}`}>
              <div className={s.offerBadge}>Najpopularniejszy</div>
              <div className={s.offerHeader}>
                <StarIcon />
                <h3 className={s.offerName}>Premium</h3>
                <div className={s.offerPrice}>
                  <span className={s.priceAmount}>897</span>
                  <span className={s.priceCurrency}>zł/mies.</span>
                </div>
              </div>
              <ul className={s.offerList}>
                {['Indywidualny plan treningowy', 'Plan żywieniowy', 'Cotygodniowy check-in', 'Dostęp do aplikacji', 'Dedykowany czat 24/7', 'Analiza składu ciała'].map((f) => (
                  <li key={f}><span className={s.check}>✓</span>{f}</li>
                ))}
              </ul>
              <a href="#kontakt" className={`${s.btn} ${s.btnPrimary} ${s.offerBtn}`}>Zacznij teraz</a>
            </div>

            {/* Elite VIP */}
            <div className={s.offerCard}>
              <div className={s.offerHeader}>
                <TrophyIcon />
                <h3 className={s.offerName}>Elite VIP</h3>
                <div className={s.offerPrice}>
                  <span className={s.priceAmount}>1 497</span>
                  <span className={s.priceCurrency}>zł/mies.</span>
                </div>
              </div>
              <ul className={s.offerList}>
                {['Wszystko z Premium', '2x sesja online/tydzień', 'Priorytetowe wsparcie', 'Suplementacja na miarę', 'Raport miesięczny', 'Dostęp do społeczności VIP'].map((f) => (
                  <li key={f}><span className={s.check}>✓</span>{f}</li>
                ))}
              </ul>
              <a href="#kontakt" className={`${s.btn} ${s.btnOutline} ${s.offerBtn}`}>Zacznij teraz</a>
            </div>
          </div>
        </div>
      </section>

      {/* OPINIE */}
      <section className={s.section} id="opinie">
        <div className={s.container}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionLabel}>Referencje</span>
            <h2 className={s.sectionTitle}>Co mówią klienci</h2>
            <p className={s.sectionSub}>Opinie prosto od ludzi, którzy zmienili swoje życie.</p>
          </div>
          <div className={`${s.reviews} ${s.revealGrid}`} data-reveal>
            {[
              { init: 'MK', name: 'Michał K.', meta: 'Program Premium, 5 miesięcy', text: '"Damian to nie tylko trener — to mentor. Jego podejście jest indywidualne i holistyczne. W 5 miesięcy straciłem 22 kg i odzyskałem pewność siebie."' },
              { init: 'KW', name: 'Katarzyna W.', meta: 'Program Starter, 3 miesiące', text: '"Próbowałam wielu coachów, ale żaden nie podszedł tak poważnie do mojego celu. Plan diety był smaczny, treningi wyzywające, a wyniki przeszły moje oczekiwania."' },
              { init: 'PJ', name: 'Piotr J.', meta: 'Program Elite VIP, 4 miesiące', text: '"Jako menedżer z napiętym grafikiem bałem się, że nie dam rady. Damian dostosował wszystko do mojego trybu życia. Polecam każdemu zapracowanemu."' },
              { init: 'AO', name: 'Anna O.', meta: 'Program Premium, 6 miesięcy', text: '"Zaczęłam dla sylwetki, zostałam dla energii i zdrowia. Damian zmienił moje postrzeganie fitnessu i jedzenia na zawsze."' },
            ].map((r) => (
              <div key={r.name} className={s.reviewCard}>
                <div className={s.reviewStars}>★★★★★</div>
                <p className={s.reviewText}>{r.text}</p>
                <div className={s.reviewAuthor}>
                  <div className={s.reviewAvatar}>{r.init}</div>
                  <div>
                    <div className={s.reviewName}>{r.name}</div>
                    <div className={s.reviewMeta}>{r.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${s.section} ${s.sectionDark}`} id="faq">
        <div className={s.container}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionLabel}>Pytania</span>
            <h2 className={s.sectionTitle}>Najczęściej zadawane pytania</h2>
          </div>
          <div className={s.faqList} data-reveal>
            {FAQ_ITEMS.map((item) => (
              <FaqRow key={item.q} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`${s.ctaSection} ${s.reveal}`} data-reveal>
        <div className={s.ctaBg} />
        <div className={`${s.container} ${s.ctaInner}`}>
          <h2 className={s.ctaTitle}>
            Twoja przemiana<br /><span className={s.accent}>zaczyna się dziś</span>
          </h2>
          <p className={s.ctaSub}>
            Dołącz do setek osób, które już zmieniły swoje życie.<br />
            Bezpłatna konsultacja — bez zobowiązań.
          </p>
          <a href="#kontakt" className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`}>
            Zarezerwuj bezpłatną konsultację
          </a>
        </div>
      </section>

      {/* KONTAKT */}
      <section className={s.section} id="kontakt">
        <div className={s.container}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionLabel}>Kontakt</span>
            <h2 className={s.sectionTitle}>Zacznijmy razem</h2>
            <p className={s.sectionSub}>Wypełnij formularz, a skontaktuję się z Tobą w ciągu 24 godzin.</p>
          </div>
          <div className={`${s.contact} ${s.reveal}`} data-reveal>
            <div className={s.contactInfo}>
              <ContactItem icon={<EmailIcon />} label="E-mail" value="kontakt@damiankonarski.pl" />
              <ContactItem icon={<PhoneIcon />} label="Telefon" value="+48 500 000 000" />
              <ContactItem icon={<InstaIcon />} label="Instagram" value="@damiankonarski" />
              <div className={s.guarantee}>
                <div className={s.guaranteeIcon}><ShieldIcon /></div>
                <div>
                  <div className={s.guaranteeTitle}>Gwarancja efektów</div>
                  <div className={s.guaranteeText}>
                    Jeśli stosujesz się do planu i nie widzisz efektów w 30 dni — zwracam pieniądze.
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={s.footer}>
        <div className={`${s.container} ${s.footerInner}`}>
          <div className={s.footerLogo}>DK<span className={s.accent}>.</span></div>
          <p className={s.footerCopy}>© 2026 Damian Konarski. Wszelkie prawa zastrzeżone.</p>
          <div className={s.footerLinks}>
            <a href="#">Polityka prywatności</a>
            <a href="#">Regulamin</a>
          </div>
        </div>
      </footer>
    </>
  );
}

// ── Small icon components ──────────────────────────────────────────────────
function PersonIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" /><path d="M6 20v-2a6 6 0 0112 0v2" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function TrophyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 9H4.5a2.5 2.5 0 010-5H6" /><path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
      <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0012 0V2z" />
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.66A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.94a16 16 0 006.15 6.15l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
function InstaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className={s.contactItem}>
      <div className={s.contactIcon}>{icon}</div>
      <div>
        <div className={s.contactLabel}>{label}</div>
        <div className={s.contactValue}>{value}</div>
      </div>
    </div>
  );
}
