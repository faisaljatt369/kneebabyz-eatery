import Image from "next/image";
import CateringForm from "@/components/CateringForm";
import CurrentYear from "@/components/CurrentYear";
import HeaderNav from "@/components/HeaderNav";
import HeroLocation from "@/components/HeroLocation";
import LocationBanner from "@/components/LocationBanner";
import RevealOnScroll from "@/components/RevealOnScroll";
import Menu from "@/components/Menu";
import { faqs, gallery, highlights, packages, site, socials, spots, steps } from "@/lib/config";

export default function Home() {
  return (
    <>
      <RevealOnScroll />
      <LocationBanner />

      <header className="site-header">
        <div className="nav">
          <a className="brand" href="#top">
            {site.logo ? (
              <Image className="brand-logo" src={site.logo} alt="" width={44} height={44} />
            ) : (
              <span className="brand-mark" aria-hidden="true">
                K
              </span>
            )}
            {site.name}
          </a>
          <HeaderNav />
        </div>
      </header>

      <main id="top">
        <section className="hero">
          {site.heroImage && <Image className="hero-bg" src={site.heroImage} alt="" fill priority sizes="60vw" />}
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">{site.intro}</p>
              <h1>{site.name}</h1>
              <p className="hero-sub">{site.tagline}</p>
              <div className="btn-row">
                <a className="btn btn-red" href="#menu">
                  Order Now
                </a>
                <a className="btn btn-ghost" href="#catering">
                  Book Catering
                </a>
              </div>
              <HeroLocation />
            </div>
          </div>
        </section>

        <section className="stats" aria-label="Highlights">
          <div className="wrap stats-grid">
            {highlights.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="about">
          <div className="wrap split">
            {site.aboutImage ? (
              <Image className="photo" src={site.aboutImage} alt={`${site.name} food`} width={800} height={600} />
            ) : (
              <div className="photo placeholder" role="img" aria-label="Photo coming soon">
                Photo coming soon
              </div>
            )}
            <div>
              <p className="eyebrow">Who we are</p>
            <h2>What We Do</h2>
              <p>{site.about}</p>
              <p>
                <a className="btn btn-yellow" href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
                  Follow us on Instagram
                </a>
              </p>
            </div>
          </div>
        </section>

        <section id="spots" className="alt">
          <div className="wrap">
            <p className="eyebrow">Find us</p>
            <h2>Where to Find Us</h2>
            <p className="lead">We are a pop-up, so we move. Our regular spots are below, and the banner at the top shows where we are today.</p>
            <div className="spots">
              {spots.map((spot) => (
                <div key={spot.name} className="spot">
                  <h3>{spot.name}</h3>
                  <p className="when">{spot.when}</p>
                  <p className="muted">{spot.where}</p>
                  <a className="btn btn-ghost btn-sm" href={spot.mapUrl} target="_blank" rel="noopener noreferrer">
                    Get directions
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <p className="eyebrow">Simple ordering</p>
            <h2>How It Works</h2>
            <div className="steps">
              {steps.map((step, index) => (
                <div key={step.title} className="step">
                  <span className="step-num">{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p className="muted">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="menu" className="alt">
          <div className="wrap">
            <p className="eyebrow">Our food</p>
            <h2>Food Menu</h2>
            <p className="lead">Fresh and made to order. Sample prices are shown while the final menu is confirmed.</p>
            <Menu />
          </div>
        </section>

        <section aria-label="Photo gallery">
          <div className="wrap">
            <p className="eyebrow">Fresh off the grill</p>
            <h2>From Our Kitchen</h2>
            <p className="lead">A taste of what we are serving. More on our Instagram.</p>
            <div className="gallery">
              {gallery.map((item) => (
                <Image key={item.src} className="gallery-tile" src={item.src} alt={item.alt} width={562} height={562} />
              ))}
            </div>
            <p className="gallery-more">
              <a className="btn btn-ghost" href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
                See more on Instagram
              </a>
            </p>
          </div>
        </section>

        <section id="catering" className="alt">
          <div className="wrap">
            <p className="eyebrow">Events and parties</p>
            <h2>Catering</h2>
            <p className="lead">
              From small gatherings to big events. Tell us about yours and the chef will follow up with a quote and a
              call.
            </p>
            <div className="packages">
              {packages.map((pack) => (
                <div key={pack.name} className="package">
                  <h3>{pack.name}</h3>
                  <p className="size">{pack.size}</p>
                  <p className="muted">{pack.text}</p>
                </div>
              ))}
            </div>
            <div className="card form-card">
              <h3>Request a Quote</h3>
              <CateringForm />
            </div>
          </div>
        </section>

        <section id="faq">
          <div className="wrap faq-layout">
            <div>
              <p className="eyebrow">Good to know</p>
            <h2>Questions</h2>
              <p className="lead">Quick answers about ordering, catering and finding us.</p>
              <a className="btn btn-yellow" href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>
                Call {site.phone}
              </a>
            </div>
            <div className="faq-list">
              {faqs.map((item, index) => (
                <details key={item.q} className="faq" open={index === 0}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap cols">
          <div>
            <h3>{site.name}</h3>
            <p>{site.intro}</p>
          </div>
          <div>
            <h3>Follow Us</h3>
            <p>
              {socials.map((item) => (
                <span key={item.name}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div>
            <h3>Contact</h3>
            <p>
              <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>{site.phone}</a>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
          <div>
            <h3>Hours</h3>
            <p>{site.hours}</p>
          </div>
        </div>
        <p className="wrap copy">
          &copy; <CurrentYear /> {site.name}. All rights reserved.
        </p>
      </footer>
    </>
  );
}
