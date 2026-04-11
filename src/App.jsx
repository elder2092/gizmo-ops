import { useState, useEffect, useRef } from "react";

const NAVY = "#1e2b5e";
const RED = "#c8102e";
const GOLD = "#e8b84b";
const DARK = "#111827";
const MUTED = "#5a6580";
const PALE = "#eaedf8";
const WHITE = "#ffffff";
const BANNER_H = 40;
const NAV_H = 72;

function UrgencyBanner({ onDismiss }) {
  return (
    <div style={{ background: DARK, padding: "0 16px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "fixed", top: 0, left: 0, right: 0, zIndex: 1001, height: BANNER_H, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 300, letterSpacing: 0.2, fontFamily: "'DM Sans', sans-serif", margin: 0, lineHeight: 1.3 }}>
        <strong style={{ color: GOLD, fontWeight: 600 }}>Founding client spots are limited.</strong>
        {" "}Launch pricing locked in permanently.{" "}
        <a href="#testimonials" onClick={(e) => { e.preventDefault(); document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: WHITE, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3, marginLeft: 4, fontSize: 12, letterSpacing: 0.5, textTransform: "uppercase" }}>Apply &rarr;</a>
      </p>
      <button onClick={onDismiss} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", fontSize: 18, lineHeight: 1, padding: "4px 6px" }} aria-label="Dismiss banner">&times;</button>
    </div>
  );
}

// NAV: always navy - no transparent/scrolled state
function Nav({ activeSection, bannerVisible }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const topOffset = bannerVisible ? BANNER_H : 0;

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const links = [
    { id: "home", label: "Home" }, { id: "about", label: "About" },
    { id: "services", label: "Services" }, { id: "pricing", label: "Pricing" },
    { id: "testimonials", label: "Founding" }, { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <nav style={{ position: "fixed", top: topOffset, left: 0, right: 0, zIndex: 1000, background: "rgba(30,43,94,0.98)", backdropFilter: "blur(12px)", transition: "top 0.3s ease", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: NAV_H }}>
        <div onClick={() => scrollTo("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: WHITE, letterSpacing: -0.5 }}>GIZMO</span>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: RED, letterSpacing: -0.5 }}>OPERATIONS</span>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }} className="nav-desktop">
          {links.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: activeSection === l.id ? RED : "rgba(255,255,255,0.6)", letterSpacing: 0.5, textTransform: "uppercase", transition: "color 0.3s", padding: 0 }}>{l.label}</button>
          ))}
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ background: RED, border: "none", color: WHITE, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, padding: "6px 18px", cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 20px rgba(200,16,46,0.4)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>Book Demo</button>
          <a href="https://app.gizmo-ops.com/auth/signup" target="_blank" rel="noopener noreferrer" style={{ background: WHITE, color: NAVY, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, padding: "7px 20px", letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap", textDecoration: "none", display: "inline-block" }}>Start Trial</a>
          <a href="https://app.gizmo-ops.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)", textDecoration: "none", letterSpacing: 0.5, textTransform: "uppercase", border: "1.5px solid rgba(255,255,255,0.45)", padding: "5px 18px", transition: "all 0.3s", display: "inline-block", whiteSpace: "nowrap" }} onMouseEnter={(e) => { e.target.style.borderColor = WHITE; e.target.style.color = WHITE; e.target.style.background = "rgba(255,255,255,0.06)"; }} onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.45)"; e.target.style.color = "rgba(255,255,255,0.8)"; e.target.style.background = "transparent"; }}>Sign In</a>
        </div>
        <button className="nav-mobile-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "8px", flexShrink: 0 }} aria-label="Toggle menu">
          <div style={{ width: 24, height: 2, background: WHITE, marginBottom: 5, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: WHITE, marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
          <div style={{ width: 24, height: 2, background: WHITE, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: "rgba(20,30,70,0.99)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "16px 20px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
          {links.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, color: activeSection === l.id ? RED : "rgba(255,255,255,0.75)", textAlign: "left", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{l.label}</button>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
            <a href="https://app.gizmo-ops.com/auth/signup" target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: RED, color: WHITE, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, padding: "12px 20px", textDecoration: "none", textAlign: "center", letterSpacing: 0.5, textTransform: "uppercase" }}>Start Trial</a>
            <a href="https://app.gizmo-ops.com" target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: "transparent", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, padding: "12px 20px", textDecoration: "none", textAlign: "center", letterSpacing: 0.5, textTransform: "uppercase" }}>Sign In</a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Section({ id, children, bg = WHITE, style = {} }) {
  return <section id={id} style={{ background: bg, position: "relative", overflow: "hidden", ...style }}>{children}</section>;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>{children}</div>;
}

function StatCard({ number, label, accent = RED }) {
  return (
    <div style={{ textAlign: "center", padding: "24px 16px" }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 42, color: accent, lineHeight: 1, marginBottom: 8 }}>{number}</div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, maxWidth: 200, margin: "0 auto" }}>{label}</div>
    </div>
  );
}

function Hero() {
  return (
    <Section id="home" bg={NAVY} style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div style={{ position: "absolute", right: -80, top: -60, fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "45vw", color: "rgba(255,255,255,0.02)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>G</div>
      <div style={{ position: "absolute", left: 0, top: 0, width: 4, height: "100%", background: RED }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "160px 24px 80px", position: "relative", zIndex: 1, width: "100%" }}>
        <FadeIn><div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: RED, marginBottom: 24 }}>Proprietary CRM &middot; Managed Revenue Operations</div></FadeIn>
        <FadeIn delay={0.1}><h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4.2vw, 52px)", color: WHITE, lineHeight: 1.1, maxWidth: 720, marginBottom: 28, letterSpacing: -1 }}>The CRM built for{" "}<span style={{ color: RED }}>relationship-driven businesses.</span></h1></FadeIn>
        <FadeIn delay={0.2}><p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 600, marginBottom: 14, fontWeight: 300 }}>Gizmo is a purpose-built CRM platform &mdash; not a generic tool, not someone else&apos;s software we configure. Built for businesses where relationships drive revenue. Use it yourself, or let our team build and run it for you every month.</p></FadeIn>
        <FadeIn delay={0.25}><p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 36, fontWeight: 300, letterSpacing: 0.2 }}><strong style={{ color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>14-day free trial included.</strong>{" "}No credit card required. Need more? Our managed service team handles everything.</p></FadeIn>
        <FadeIn delay={0.3}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ background: RED, color: WHITE, border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, padding: "16px 36px", cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(200,16,46,0.4)"; }} onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>Book Demo &rarr;</button>
            <a href="https://app.gizmo-ops.com/auth/signup" target="_blank" rel="noopener noreferrer" style={{ background: WHITE, color: NAVY, border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, padding: "16px 36px", cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap", textDecoration: "none", display: "inline-block" }}>Start Trial &rarr;</a>
          </div>
        </FadeIn>
        <FadeIn delay={0.35}><p style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", marginTop: 14, fontWeight: 300 }}>Free for 14 days &nbsp;&middot;&nbsp; No credit card required &nbsp;&middot;&nbsp; Cancel anytime</p></FadeIn>
        <FadeIn delay={0.5} style={{ marginTop: 64 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <StatCard number="78%" label="of customers buy from the first business to respond" />
            <StatCard number="14-day" label="free trial &mdash; pre-configured and ready to use" accent={GOLD} />
            <StatCard number="$8.71" label="returned for every $1 spent on CRM when properly managed" />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

function ProblemStrip() {
  return (
    <div style={{ background: RED, padding: "36px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
        <span style={{ fontSize: 28, flexShrink: 0, marginTop: 3 }}>&#x26A1;</span>
        <div style={{ flex: 1, minWidth: 280 }}>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.92)", lineHeight: 1.7, fontWeight: 300, marginBottom: 14 }}><strong style={{ color: WHITE, fontWeight: 600 }}>76% of sales teams don&apos;t use most of their CRM&apos;s features</strong>{" "}&mdash; not because the software is bad, but because nobody&apos;s running it. Gizmo was built with that reality in mind: a proprietary CRM designed to actually be used, and a managed service team to run it for you every month.</p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, fontWeight: 300, borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 14 }}><strong style={{ color: WHITE, fontWeight: 500 }}>Try it free for 14 days</strong>{" "}and see the difference a purpose-built system makes. If you need more &mdash; <strong style={{ color: WHITE, fontWeight: 500 }}>our managed service team</strong>{" "}will build, configure, and run it for you every month.</p>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <Section id="about" bg={WHITE}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: RED, marginBottom: 16 }}>The Gizmo CRM</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 40px)", color: NAVY, lineHeight: 1.15, letterSpacing: -0.5, maxWidth: 680, margin: "0 auto 16px" }}>Built by operators. For operators.</h2>
            <p style={{ fontSize: 16, color: MUTED, maxWidth: 580, margin: "0 auto", fontWeight: 300, lineHeight: 1.7 }}>Most CRMs are built by engineers for everyone. Gizmo was built by revenue operations specialists &mdash; with a decade of enterprise sales experience at Bitdefender and HID Global &mdash; for the industries where relationships are the product.</p>
          </div>
        </FadeIn>
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 0, marginBottom: 72, border: "1px solid rgba(30,43,94,0.1)" }}>
            {[
              { icon: "&#x1F3D7;&#xFE0F;", title: "Proprietary platform", body: "You're not getting a login to someone else's CRM. Gizmo is built and owned by us &mdash; the managed service is baked into the software itself." },
              { icon: "&#x2699;&#xFE0F;", title: "Managed for you", body: "We don't configure it and walk away. We run it every month &mdash; automations, pipeline health, staff onboarding, reporting. All of it." },
              { icon: "&#x1F3AF;", title: "Built for your industry", body: "Real estate, aesthetics, mortgage, law &mdash; your Gizmo build is configured for your specific workflow. Not a generic template you have to adapt to." },
            ].map((item, i) => (
              <div key={i} className="platform-strip-item" style={{ padding: "28px 24px", borderRight: i < 2 ? "1px solid rgba(30,43,94,0.08)" : "none", background: i === 1 ? PALE : WHITE }}>
                <div style={{ fontSize: 24, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: item.icon }} />
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: NAVY, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.65, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: item.body }} />
              </div>
            ))}
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 64, alignItems: "center" }} className="about-grid">
          <FadeIn>
            <div style={{ borderRadius: 4, overflow: "hidden", boxShadow: "0 24px 80px rgba(30,43,94,0.15), 0 4px 16px rgba(30,43,94,0.08)", border: "1px solid rgba(30,43,94,0.08)" }}>
              <div style={{ background: NAVY, padding: "10px 16px", display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                <div style={{ marginLeft: 8, fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.5 }}>app.gizmo-ops.com</div>
              </div>
              <div style={{ background: NAVY, minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>Dashboard preview</span>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {[
                { icon: "&#x25CE;", title: "Built for your vertical", desc: "Whether you're running a real estate brokerage, an aesthetics clinic, or a mortgage operation &mdash; the Gizmo CRM comes pre-configured for how your business actually closes deals." },
                { icon: "&#x26A1;", title: "Automations that actually run", desc: "60-second SMS lead response, missed call text-back, visual workflow builder, nurture sequences &mdash; all built in and maintained monthly." },
                { icon: "&rarr;", title: "Use it yourself or hand it to us", desc: "Start a free 14-day trial and run it yourself. Or let our managed service team build, configure, and operate everything for you every month." },
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, color: RED, flexShrink: 0, marginTop: 2, width: 32 }} dangerouslySetInnerHTML={{ __html: f.icon }} />
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: NAVY, marginBottom: 8, letterSpacing: -0.2 }}>{f.title}</div>
                    <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: f.desc }} />
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ background: RED, color: WHITE, border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, padding: "12px 24px", cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>Book a Demo &rarr;</button>
                <a href="https://app.gizmo-ops.com/auth/signup" target="_blank" rel="noopener noreferrer" style={{ background: "transparent", color: NAVY, border: `1px solid ${NAVY}`, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, padding: "12px 24px", letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap", textDecoration: "none", display: "inline-block" }}>Start Free Trial</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}

function Services() {
  const builds = [
    { title: "60-Second SMS Lead Response", desc: "Automated SMS sent to every inbound lead within 60 seconds &mdash; before any competitor has seen the notification." },
    { title: "Missed Call Text-Back", desc: "If a prospect calls and you can't answer, an automatic SMS fires within seconds. No lead falls through a missed call." },
    { title: "Visual Workflow Builder", desc: "Create multi-step automations with a drag-and-drop interface &mdash; triggers, actions, delays, all configured without code." },
    { title: "Connected Lead Sources", desc: "Every portal, form, and ad feed connected into one unified pipeline via Zapier (6,000+ apps), webhooks, and native integrations." },
    { title: "Nurture Sequences", desc: "New leads, long-term sphere, past clients, and dormant databases &mdash; all contacted systematically via email and SMS." },
    { title: "Owner Dashboard", desc: "Real-time pipeline visibility, team performance, and communication analytics &mdash; all in one place." },
  ];
  const manages = [
    { title: "All Automations", desc: "Monitored, tested, and optimised every month. Nothing goes stale." },
    { title: "Staff Onboarding", desc: "New agents, practitioners, or staff operational within 48 hours &mdash; we handle it." },
    { title: "Monthly Report", desc: "Clear, specific, actionable reporting on pipeline health and performance." },
    { title: "Strategy Call", desc: "Monthly review of pipeline health, wins, and next priorities with your operations team." },
    { title: "Database Campaigns", desc: "Reactivation of dormant contacts on a rolling basis &mdash; turning old data into new revenue." },
  ];
  return (
    <Section id="services" bg="#f8f9fc">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <FadeIn><div style={{ textAlign: "center", marginBottom: 64 }}><div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: RED, marginBottom: 16 }}>What We Do</div><h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 40px)", color: NAVY, lineHeight: 1.15, letterSpacing: -0.5 }}>Build it. Train it. Run it. Every month.</h2></div></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="services-grid">
          <FadeIn>
            <div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14, textTransform: "uppercase", letterSpacing: 2, color: NAVY, paddingBottom: 12, borderBottom: `3px solid ${RED}`, marginBottom: 24 }}>What We Build</h3>
              {builds.map((item, i) => (<div key={i} style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "flex-start" }}><span style={{ color: RED, fontSize: 14, marginTop: 2, flexShrink: 0 }}>&rarr;</span><div><div style={{ fontWeight: 500, color: DARK, fontSize: 15, marginBottom: 4 }}>{item.title}</div><div style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: item.desc }} /></div></div>))}
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14, textTransform: "uppercase", letterSpacing: 2, color: NAVY, paddingBottom: 12, borderBottom: `3px solid ${RED}`, marginBottom: 24 }}>What We Manage Monthly</h3>
              {manages.map((item, i) => (<div key={i} style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "flex-start" }}><span style={{ color: RED, fontSize: 14, marginTop: 2, flexShrink: 0 }}>&rarr;</span><div><div style={{ fontWeight: 500, color: DARK, fontSize: 15, marginBottom: 4 }}>{item.title}</div><div style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: item.desc }} /></div></div>))}
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.25} style={{ marginTop: 72 }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(24px, 3vw, 32px)", color: NAVY, textAlign: "center", marginBottom: 48, letterSpacing: -0.5 }}>How It Works</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="how-grid">
            {[
              { num: "01", title: "Free Demo", body: "30-minute walkthrough of the Gizmo CRM for your vertical. See exactly how it works.", color: NAVY },
              { num: "02", title: "Build", body: "Complete system built and configured within 14 days. All lead sources connected. All automations tested.", color: NAVY },
              { num: "03", title: "Train", body: "We train you and your team with live sessions and a Loom walkthrough library. New staff onboarded in 48 hours.", color: NAVY },
              { num: "04", title: "Manage", body: "We run the system every month. You get results and a monthly report. We handle everything operational.", color: RED },
            ].map((step, i) => (
              <div key={i} style={{ padding: "28px 24px", background: WHITE, borderTop: `4px solid ${step.color}` }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, color: "rgba(30,43,94,0.1)", lineHeight: 1, marginBottom: 12 }}>{step.num}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: NAVY, marginBottom: 10 }}>{step.title}</div>
                <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, fontWeight: 300 }}>{step.body}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

function LeadFlow() {
  const steps = [
    { num: "01", icon: "&#x1F4E5;", title: "Lead Comes In", desc: "From any source &mdash; portal, ad, form, referral. Every lead captured instantly.", time: "Instant capture" },
    { num: "02", icon: "&#x1F4F1;", title: "Auto SMS Response", desc: "Personalised SMS within 60 seconds. Before your competition has seen the notification.", time: "<60 sec response" },
    { num: "03", icon: "&#x1F504;", title: "Nurture Sequence", desc: "Multi-step follow-up runs automatically. Email, SMS, task reminders &mdash; nothing falls through.", time: "Days&ndash;weeks nurture" },
    { num: "04", icon: "&#x1F4CA;", title: "Pipeline Tracked", desc: "Every lead staged, scored, and visible. You see exactly where every opportunity stands.", time: "Always-on pipeline" },
    { num: "05", icon: "&#x1F3C6;", title: "Deal Closed", desc: "Revenue tracked. Client retained. Referral sequence triggered. The cycle continues.", time: "Ongoing retention" },
  ];
  return (
    <div style={{ background: DARK, padding: "72px 24px", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><div style={{ textAlign: "center", marginBottom: 56 }}><div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: RED, marginBottom: 14 }}>How the system works</div><h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(22px, 3vw, 32px)", color: WHITE, letterSpacing: -0.5, lineHeight: 1.2 }}>From first enquiry to <span style={{ color: RED }}>closed deal</span> &mdash; automatically.</h2></div></FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0 }} className="flow-grid">
            {steps.map((step, i) => (
              <div key={i} style={{ padding: "28px 20px", border: "1px solid rgba(255,255,255,0.06)", background: i === 4 ? "rgba(200,16,46,0.08)" : "rgba(255,255,255,0.02)", borderColor: i === 4 ? "rgba(200,16,46,0.2)" : "rgba(255,255,255,0.06)" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: i === 4 ? "rgba(200,16,46,0.5)" : "rgba(255,255,255,0.2)", marginBottom: 10 }}>Step {step.num}</div>
                <div style={{ fontSize: 22, marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: step.icon }} />
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: i === 4 ? RED : WHITE, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>{step.title}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, fontWeight: 300, marginBottom: 16 }} dangerouslySetInnerHTML={{ __html: step.desc }} />
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontWeight: 300, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.04)" }} dangerouslySetInnerHTML={{ __html: step.time }} />
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function RoiBand() {
  return (
    <div style={{ background: NAVY, padding: "48px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 0 }}>
        {[
          { num: "76%", label: "Of sales teams don't use most of their CRM features. Gizmo was built to fix that." },
          { num: "100x", label: "More likely to convert a lead contacted within 5 minutes vs 30 minutes." },
          { num: "$8.71", label: "Returned for every $1 spent on CRM &mdash; when properly built and managed." },
        ].map((r, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="roi-item" style={{ textAlign: "center", padding: "24px 32px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 800, color: WHITE, lineHeight: 1, marginBottom: 10 }}>{r.num}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.5, maxWidth: 280, margin: "0 auto" }} dangerouslySetInnerHTML={{ __html: r.label }} />
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function MidCta() {
  return (
    <div style={{ background: RED, padding: "64px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 180, color: "rgba(255,255,255,0.04)", lineHeight: 1, pointerEvents: "none" }}>&rarr;</div>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>Ready to see it in action?</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(22px, 3vw, 34px)", color: WHITE, lineHeight: 1.15, letterSpacing: -0.5 }}>This is your pipeline.<br />Let&apos;s build it properly.</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", marginTop: 10, fontWeight: 300, lineHeight: 1.6 }}>30 minutes. No pitch. We show you exactly how Gizmo works for your business &mdash; on our platform, configured for your vertical.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start", flexShrink: 0 }}>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ background: WHITE, color: RED, border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, padding: "16px 36px", cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>Book a Free Demo &rarr;</button>
          <a href="https://app.gizmo-ops.com/auth/signup" target="_blank" rel="noopener noreferrer" style={{ background: "transparent", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, padding: "12px 28px", letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap", textDecoration: "none", display: "inline-block" }}>Start Free Trial</a>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>14-day free trial &middot; No credit card required</span>
        </div>
      </div>
    </div>
  );
}

function Pricing() {
  const [tab, setTab] = useState("self-serve");
  const selfServePlans = [
    {
      name: "Individual", price: "$49", period: "/mo", users: "1&ndash;10 users",
      target: "For independent operators and solo practitioners.",
      features: [
        "Full Gizmo CRM access",
        "Contacts, leads, deals & tasks",
        "Pipeline & deal management",
        "Two-way SMS inbox (via Twilio)",
        "Email sending (via Resend)",
        "Click-to-call & call logging",
        "Zapier integration (6,000+ apps)",
        "Mobile-responsive dashboard",
        "Standard reporting",
        "Guided onboarding wizard",
      ],
      cta: "Start Free Trial", href: "https://app.gizmo-ops.com/auth/signup", featured: false,
    },
    {
      name: "Business", price: "$299", period: "/mo", users: "10&ndash;50 users",
      target: "For growing teams that need automation and collaboration.",
      features: [
        "Everything in Individual",
        "Unlimited contacts",
        "Team management & permissions",
        "Visual workflow builder",
        "Email & SMS automation sequences",
        "Missed call text-back",
        "Database reactivation campaigns",
        "LinkedIn Lead Gen Forms",
        "Territory management & auto-assignment",
        "Call recording & playback",
        "Custom fields & advanced reporting",
        "Performance dashboards",
        "Data migration (CSV, Excel, API)",
        "AI-powered lead insights",
      ],
      cta: "Start Free Trial", href: "https://app.gizmo-ops.com/auth/signup", featured: true,
    },
  ];
  const managedPlans = [
    {
      name: "Starter", price: "$750", period: "/mo", setup: "Setup from $1,500", users: "Up to 5 seats",
      target: "Core automations, connected lead sources, and monthly performance reporting.",
      features: [
        "Full Gizmo CRM (all Business features)",
        "14-day custom platform build",
        "All lead sources connected",
        "60-second SMS lead response",
        "Missed call text-back",
        "Twilio & Resend setup handled by us",
        "Monthly management & updates",
        "Monthly performance report",
        "Staff onboarding within 48hrs",
      ],
      cta: "Book Free Demo", featured: false,
    },
    {
      name: "Growth", price: "$999&ndash;$1,250", period: "/mo", setup: "Setup from $2,000&ndash;$3,000", users: "Up to 15 seats",
      target: "Full system management &mdash; sequences, reactivation campaigns, and monthly strategy call.",
      features: [
        "Everything in Starter",
        "Advanced sequence management",
        "Database reactivation campaigns",
        "Referral partner automation",
        "Territory management setup",
        "Custom reporting & forecasting",
        "Monthly strategy call",
        "Priority support",
        "Direct founder access",
      ],
      cta: "Book Free Demo", featured: true, badge: "Most Popular",
    },
  ];
  const tabBtn = (id, label, sub, isDark) => {
    const active = tab === id;
    return <button onClick={() => setTab(id)} style={{ background: active ? (isDark ? NAVY : WHITE) : "transparent", color: active ? (isDark ? WHITE : NAVY) : MUTED, border: "none", borderRadius: 6, padding: "10px 28px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: 0.3, transition: "all 0.2s", boxShadow: active ? "0 2px 8px rgba(30,43,94,0.12)" : "none", whiteSpace: "nowrap" }}>{label}<span style={{ display: "block", fontSize: 11, fontWeight: 400, marginTop: 1, color: active ? (isDark ? "rgba(255,255,255,0.45)" : MUTED) : "rgba(90,101,128,0.55)" }}>{sub}</span></button>;
  };
  return (
    <Section id="pricing" bg={WHITE}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: RED, marginBottom: 16 }}>Pricing</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 40px)", color: NAVY, lineHeight: 1.15, letterSpacing: -0.5, marginBottom: 16 }}>Simple, transparent pricing.</h2>
            <p style={{ fontSize: 16, color: MUTED, maxWidth: 560, margin: "0 auto 10px", fontWeight: 300, lineHeight: 1.7 }}>Use the Gizmo CRM yourself, or let us build and run it for you. Every plan runs on our proprietary platform. No hidden fees. No long-term contracts.</p>
            <p style={{ fontSize: 13, color: MUTED, maxWidth: 560, margin: "0 auto 32px", fontWeight: 300, lineHeight: 1.6 }}>SMS and calling require a Twilio account. Email requires a Resend account. Self-serve users set these up themselves &mdash; on managed plans, we handle it all for you.</p>
            <div style={{ display: "inline-flex", background: PALE, borderRadius: 8, padding: 4, gap: 4 }}>
              {tabBtn("self-serve", "Self-Serve", "From $49/mo", false)}
              {tabBtn("managed", "Fully Managed", "We run it for you", true)}
            </div>
          </div>
        </FadeIn>

        {tab === "self-serve" && (
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 20 }} className="pricing-grid">
              {selfServePlans.map((plan, i) => (
                <div key={i} style={{ padding: "36px 32px", background: plan.featured ? NAVY : WHITE, border: plan.featured ? "none" : "1px solid rgba(212,216,234,0.8)", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: plan.featured ? "rgba(255,255,255,0.35)" : MUTED, marginBottom: 12 }}>{plan.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}><span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 36, color: plan.featured ? GOLD : RED, lineHeight: 1 }}>{plan.price}</span><span style={{ fontSize: 14, fontWeight: 400, color: plan.featured ? "rgba(255,255,255,0.3)" : MUTED }}>{plan.period}</span></div>
                  <div style={{ display: "inline-block", marginBottom: 12, background: plan.featured ? "rgba(232,184,75,0.15)" : PALE, borderRadius: 100, padding: "3px 10px", fontSize: 12, fontWeight: 600, color: plan.featured ? GOLD : MUTED }} dangerouslySetInnerHTML={{ __html: plan.users }} />
                  <div style={{ fontSize: 13, color: plan.featured ? "rgba(255,255,255,0.45)" : MUTED, marginBottom: 20, lineHeight: 1.5, fontWeight: 300 }}>{plan.target}</div>
                  <div style={{ borderTop: `1px solid ${plan.featured ? "rgba(255,255,255,0.08)" : "rgba(212,216,234,0.8)"}`, paddingTop: 20, marginBottom: 24, flex: 1 }}>
                    {plan.features.map((f, j) => (<div key={j} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}><span style={{ color: GOLD, fontSize: 13, flexShrink: 0, marginTop: 1 }}>&#x2713;</span><span style={{ color: plan.featured ? "rgba(255,255,255,0.65)" : MUTED, fontSize: 13, lineHeight: 1.4, fontWeight: 300 }}>{f}</span></div>))}
                  </div>
                  <a href={plan.href} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", padding: "14px", textDecoration: "none", background: plan.featured ? RED : "transparent", color: plan.featured ? WHITE : NAVY, border: plan.featured ? "none" : `1px solid ${NAVY}`, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: 0.5 }}>{plan.cta}</a>
                </div>
              ))}
            </div>
            <div style={{ background: PALE, border: "1px solid rgba(30,43,94,0.1)", padding: "18px 24px", marginBottom: 16, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div style={{ fontSize: 22, flexShrink: 0 }}>&#x1F4E6;</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: NAVY, margin: "0 0 2px" }}>Already on another CRM?</p>
                <p style={{ color: MUTED, fontSize: 13, margin: 0, fontWeight: 300 }}>Import from Salesforce, HubSpot, Pipedrive, or any CSV/Excel file. Business tier includes full data migration tools.</p>
              </div>
            </div>
            <div style={{ background: NAVY, padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20, border: `1px solid rgba(232,184,75,0.2)` }}>
              <div><p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: WHITE, margin: "0 0 4px" }}>Want us to build and run it for you?</p><p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: 0, fontWeight: 300 }}>Switch to a fully managed plan &mdash; we handle everything from setup to ongoing operations every month.</p></div>
              <button onClick={() => setTab("managed")} style={{ background: GOLD, color: DARK, border: "none", padding: "12px 24px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0 }}>See Managed Plans &rarr;</button>
            </div>
            <p style={{ textAlign: "center", fontSize: 13, color: MUTED, marginTop: 20, fontWeight: 300 }}>14-day free trial on all self-serve plans. No credit card required.</p>
          </FadeIn>
        )}

        {tab === "managed" && (
          <FadeIn>
            <div style={{ background: NAVY, padding: "40px 32px", marginBottom: 24, border: `1px solid rgba(232,184,75,0.15)` }}>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: GOLD, marginBottom: 8 }}>Fully Managed Service</div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0, fontWeight: 300 }}>We build your Gizmo platform, configure it for your industry, and run it every month.<br />Twilio and Resend setup is handled by us. Full CRM access included at no extra cost.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }} className="pricing-grid">
                {managedPlans.map((plan, i) => (
                  <div key={i} style={{ padding: "36px 32px", background: plan.featured ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)", border: plan.featured ? `1px solid rgba(232,184,75,0.35)` : "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", position: "relative" }}>
                    {plan.badge && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: GOLD, color: DARK, fontSize: 10, fontWeight: 700, padding: "3px 12px", letterSpacing: "0.06em", whiteSpace: "nowrap", fontFamily: "'Syne', sans-serif", textTransform: "uppercase" }}>{plan.badge}</div>}
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>{plan.name}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}><span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: plan.featured ? GOLD : WHITE, lineHeight: 1 }} dangerouslySetInnerHTML={{ __html: plan.price }} /><span style={{ fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,0.25)" }}>{plan.period}</span></div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginBottom: 8, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: plan.setup }} />
                    <div style={{ display: "inline-block", marginBottom: 14, background: "rgba(232,184,75,0.1)", borderRadius: 100, padding: "3px 10px", fontSize: 12, fontWeight: 600, color: "rgba(232,184,75,0.7)" }}>{plan.users}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 20, lineHeight: 1.5, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: plan.target }} />
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20, marginBottom: 24, flex: 1 }}>
                      {plan.features.map((f, j) => (<div key={j} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}><span style={{ color: GOLD, fontSize: 13, flexShrink: 0, marginTop: 1 }}>&#x2713;</span><span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.4, fontWeight: 300 }}>{f}</span></div>))}
                    </div>
                    <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "14px", border: "none", background: plan.featured ? RED : "rgba(255,255,255,0.1)", color: WHITE, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: 0.5, cursor: "pointer", boxShadow: plan.featured ? "0 8px 24px rgba(200,16,46,0.35)" : "none" }}>{plan.cta}</button>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: WHITE, border: "1px solid rgba(212,216,234,0.8)", padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div><p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: NAVY, margin: "0 0 3px" }}>Prefer to self-manage?</p><p style={{ color: MUTED, fontSize: 13, margin: 0, fontWeight: 300 }}>Individual and Business plans start from $49/month with a 14-day free trial.</p></div>
              <button onClick={() => setTab("self-serve")} style={{ background: "transparent", color: NAVY, border: `1px solid rgba(30,43,94,0.2)`, padding: "10px 20px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: 0.3, whiteSpace: "nowrap", flexShrink: 0 }}>See Self-Serve Plans</button>
            </div>
            <p style={{ textAlign: "center", fontSize: 13, color: MUTED, marginTop: 20, fontWeight: 300 }}>All managed plans include full Gizmo CRM access. No long-term contracts.</p>
          </FadeIn>
        )}
      </div>
    </Section>
  );
}

function FoundingClients() {
  return (
    <Section id="testimonials" bg={NAVY} style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: -40, top: -40, fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 280, color: "rgba(255,255,255,0.02)", lineHeight: 1, pointerEvents: "none" }}>FC</div>
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="contact-grid">
          <FadeIn>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: GOLD, marginBottom: 16 }}>Founding Clients</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 40px)", color: WHITE, lineHeight: 1.15, letterSpacing: -0.5, marginBottom: 24 }}>Be one of our<br /><span style={{ color: GOLD }}>first 10 clients.</span></h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, fontWeight: 300, marginBottom: 20 }}>Gizmo Operations is in its founding phase. We&apos;re onboarding a small number of businesses now &mdash; and the clients who come in first get something the rest won&apos;t.</p>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, fontWeight: 300, marginBottom: 20 }}><strong style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>Launch pricing, locked in permanently.</strong> As our managed service rates increase with demand, your rate stays exactly where it started.</p>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontWeight: 300, marginBottom: 32, fontStyle: "italic" }}>The platform is new. The expertise isn&apos;t. Our founding team brings a decade of enterprise sales and RevOps experience &mdash; you get the operators, not an account manager.</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36, padding: "14px 18px", border: "1px solid rgba(232,184,75,0.25)", background: "rgba(232,184,75,0.05)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: GOLD, flexShrink: 0, animation: "pulse 2s infinite" }} />
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 300, margin: 0 }}>Currently onboarding founding clients &mdash; <strong style={{ color: GOLD, fontWeight: 500 }}>limited availability across all verticals.</strong></p>
              </div>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ background: RED, color: WHITE, border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, padding: "16px 36px", cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>Apply for a Founding Spot &rarr;</button>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: 40 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.3)" }}>What founding clients get</div>
                <div style={{ background: GOLD, color: DARK, fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, padding: "4px 10px" }}>Limited</div>
              </div>
              {[
                { title: "Launch pricing, locked permanently", desc: "Your monthly rate never increases as long as you remain a client. Guaranteed in writing." },
                { title: "Priority onboarding", desc: "Your system is built and live within 14 days. Founding clients go to the front of the queue." },
                { title: "Shape the product", desc: "Your feedback directly influences how the Gizmo CRM develops. First clients get first say on new features and verticals." },
                { title: "White-glove setup", desc: "Full system build, lead source connections, automation configuration, and team training &mdash; all handled for you end to end." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: i < 3 ? 24 : 0 }}>
                  <div style={{ color: GOLD, fontSize: 14, flexShrink: 0, marginTop: 2 }}>&#x2726;</div>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: WHITE, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 28, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 12, color: "rgba(255,255,255,0.25)", fontWeight: 300, lineHeight: 1.6 }}>No long-term contracts required. Cancel anytime. Founding pricing applies to your chosen plan tier and is honoured for the lifetime of your account.</div>
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", business: "", industry: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Gizmo Ops Enquiry - ${form.business}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nBusiness: ${form.business}\nIndustry: ${form.industry}\n\nMessage:\n${form.message}`);
    window.open(`mailto:greg.elder@gizmo-ops.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };
  const inputStyle = { width: "100%", padding: "14px 16px", border: "1px solid rgba(30,43,94,0.15)", background: WHITE, fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: DARK, outline: "none", transition: "border-color 0.3s", boxSizing: "border-box" };
  return (
    <Section id="contact" bg={WHITE}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="contact-grid">
          <FadeIn>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: RED, marginBottom: 16 }}>Get Started</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 40px)", color: NAVY, lineHeight: 1.15, letterSpacing: -0.5, marginBottom: 24 }}>Book a Free 30-Minute Demo</h2>
              <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.75, fontWeight: 300, marginBottom: 40 }}>No pitch. No obligation. We walk you through the Gizmo CRM, show you exactly how it works for your vertical, and map out what a managed setup would look like for your business.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[{ label: "Email", value: "greg.elder@gizmo-ops.com" }, { label: "Web", value: "gizmo-ops.com" }].map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 12 }}><span style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: MUTED, minWidth: 50, paddingTop: 2 }}>{c.label}</span><span style={{ fontSize: 15, color: NAVY, fontWeight: 500 }}>{c.value}</span></div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            {submitted ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: 16 }}>
                <div style={{ fontSize: 48 }}>&#x2713;</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, color: NAVY }}>Thanks for reaching out.</h3>
                <p style={{ fontSize: 15, color: MUTED, textAlign: "center" }}>We&apos;ll be in touch within 24 hours to schedule your free demo.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                <input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                <input type="text" placeholder="Business name" value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} style={inputStyle} />
                <select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} style={{ ...inputStyle, color: form.industry ? DARK : MUTED, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%235a6580' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
                  <option value="" disabled>Select your industry</option>
                  <option>Real Estate (US)</option><option>Estate Agency (UK)</option><option>Aesthetics / Medical Clinic</option><option>Mortgage Broker</option><option>Home Services</option><option>Personal Injury Law</option><option>Financial Advisory</option><option>Other</option>
                </select>
                <textarea placeholder="Tell us about your business and what you're looking for..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} />
                <button onClick={handleSubmit} style={{ width: "100%", padding: "16px", background: RED, color: WHITE, border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer", letterSpacing: 0.5 }}>Book Free Demo &rarr;</button>
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer style={{ background: DARK, padding: "48px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: WHITE }}>GIZMO</span><span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: RED }}>OPERATIONS</span></div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Proprietary CRM &middot; Managed Revenue Operations &middot; US &amp; UK</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}><span style={{ color: GOLD, fontWeight: 500 }}>gizmo-ops.com</span></div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>greg.elder@gizmo-ops.com</div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "32px auto 0", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 12, color: "rgba(255,255,255,0.2)", textAlign: "center" }}>&copy; {new Date().getFullYear()} Gizmo Operations. All rights reserved.</div>
    </footer>
  );
}

export default function GizmoOps() {
  const [activeSection, setActiveSection] = useState("home");
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    const sections = ["home", "about", "services", "pricing", "testimonials", "contact"];
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.3 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const totalOffset = (bannerVisible ? BANNER_H : 0) + NAV_H;

  return (
    <>
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; font-weight: 300; -webkit-font-smoothing: antialiased; }
        ::selection { background: #c8102e; color: #fff; }
        input:focus, textarea:focus, select:focus { border-color: #1e2b5e !important; box-shadow: 0 0 0 3px rgba(30,43,94,0.08); }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
          .about-grid, .services-grid, .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .pricing-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .how-grid { grid-template-columns: 1fr 1fr !important; }
          .flow-grid { grid-template-columns: 1fr !important; }
          .roi-item { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); }
          .platform-strip-item { border-right: none !important; border-bottom: 1px solid rgba(30,43,94,0.08); }
        }
        @media (max-width: 480px) { .how-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <div style={{ height: totalOffset }} />
      {bannerVisible && <UrgencyBanner onDismiss={() => setBannerVisible(false)} />}
      <Nav activeSection={activeSection} bannerVisible={bannerVisible} />
      <Hero />
      <ProblemStrip />
      <About />
      <Services />
      <LeadFlow />
      <RoiBand />
      <MidCta />
      <Pricing />
      <FoundingClients />
      <Contact />
      <Footer />
    </>
  );
}
