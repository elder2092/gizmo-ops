import { useState, useEffect, useRef } from "react";

// ─── CONSTANTS ───
const NAVY = "#1e2b5e";
const RED = "#c8102e";
const GOLD = "#e8b84b";
const DARK = "#111827";
const MUTED = "#5a6580";
const PALE = "#eaedf8";
const WHITE = "#ffffff";

// ─── NAVIGATION ───
function Nav({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "pricing", label: "Pricing" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(30,43,94,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.4s ease",
        borderBottom: scrolled ? `1px solid rgba(255,255,255,0.08)` : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        <div
          onClick={() => scrollTo("home")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, marginRight: 32 }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: WHITE,
              letterSpacing: -0.5,
            }}
          >
            GIZMO
          </span>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: RED,
              letterSpacing: -0.5,
            }}
          >
            OPERATIONS
          </span>
        </div>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            gap: 24,
            alignItems: "center",
          }}
          className="nav-desktop"
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: activeSection === l.id ? RED : "rgba(255,255,255,0.6)",
                letterSpacing: 0.5,
                textTransform: "uppercase",
                transition: "color 0.3s",
                padding: 0,
              }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: RED,
              border: "none",
              color: WHITE,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              padding: "4px 20px",
              cursor: "pointer",
              letterSpacing: 0.5,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 6px 20px rgba(200,16,46,0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Book Demo
          </button>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            <a
            href="https://app.gizmo-ops.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: WHITE,
              border: "none",
              color: NAVY,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              padding: "7px 24px",
              cursor: "pointer",
              letterSpacing: 0.5,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 6px 20px rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Start Trial
          </a>
          
           <a 
          href="https://app.gizmo-ops.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(255,255,255,0.8)",
              textDecoration: "none",
              letterSpacing: 0.5,
              textTransform: "uppercase",
              border: "1.5px solid rgba(255,255,255,0.45)",
              padding: "4px 20px",
              transition: "all 0.3s",
              cursor: "pointer",
              whiteSpace: "nowrap",
              textAlign: "center",
              lineHeight: 1.2,
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = WHITE;
              e.target.style.color = WHITE;
              e.target.style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.45)";
              e.target.style.color = "rgba(255,255,255,0.8)";
              e.target.style.background = "transparent";
            }}
          >
            Sign In
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
          }}
        >
          <div style={{ width: 24, height: 2, background: WHITE, marginBottom: 6, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: WHITE, marginBottom: 6, opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
          <div style={{ width: 24, height: 2, background: WHITE, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            background: "rgba(30,43,94,0.98)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                fontWeight: 500,
                color: activeSection === l.id ? RED : "rgba(255,255,255,0.7)",
                textAlign: "left",
                padding: "8px 0",
              }}
            >
              {l.label}
            </button>
          ))}
          
        <a    
          href="https://app.gizmo-ops.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              fontWeight: 500,
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              padding: "8px 0",
            }}
          >
            Sign In
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── SECTION WRAPPER ───
function Section({ id, children, bg = WHITE, style = {} }) {
  return (
    <section
      id={id}
      style={{
        background: bg,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

// ─── ANIMATE ON SCROLL ───
function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── STAT CARD ───
function StatCard({ number, label, accent = RED }) {
  return (
    <div style={{ textAlign: "center", padding: "24px 16px" }}>
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 42,
          color: accent,
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.5,
          maxWidth: 200,
          margin: "0 auto",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── HERO ───
function Hero() {
  return (
    <Section
      id="home"
      bg={NAVY}
      style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      {/* Background G watermark */}
      <div
        style={{
          position: "absolute",
          right: -80,
          top: -60,
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "45vw",
          color: "rgba(255,255,255,0.02)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        G
      </div>

      {/* Red accent line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 4,
          height: "100%",
          background: RED,
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "140px 24px 80px",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        <FadeIn>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 4,
              color: RED,
              marginBottom: 24,
            }}
          >
            CRM Software · Managed Revenue Operations
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4.2vw, 52px)",
              color: WHITE,
              lineHeight: 1.1,
              maxWidth: 720,
              marginBottom: 28,
              letterSpacing: -1,
            }}
          >
            The CRM built for{" "}
            <span style={{ color: RED }}>relationship-driven businesses.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: 600,
              marginBottom: 14,
              fontWeight: 300,
            }}
          >
            Built for businesses where relationships drive revenue — real
            estate, aesthetics, financial services, and beyond. Use it
            yourself, or let our team build and run it for you.
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
              marginBottom: 36,
              fontWeight: 300,
              letterSpacing: 0.2,
            }}
          >
            <strong style={{ color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
              14-day free trial included.
            </strong>{" "}
            No credit card required. Need more? Our managed service team will
            handle everything.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                background: RED,
                color: WHITE,
                border: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                padding: "16px 36px",
                cursor: "pointer",
                letterSpacing: 0.5,
                textTransform: "uppercase",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 30px rgba(200,16,46,0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Book Demo →
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                background: WHITE,
                color: NAVY,
                border: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                padding: "16px 36px",
                cursor: "pointer",
                letterSpacing: 0.5,
                textTransform: "uppercase",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 30px rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Start Trial →
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.28)",
              marginTop: 14,
              fontWeight: 300,
            }}
          >
            Free for 14 days&nbsp;&nbsp;·&nbsp;&nbsp;No credit card required&nbsp;&nbsp;·&nbsp;&nbsp;Cancel anytime
          </p>
        </FadeIn>

        {/* Stat bar */}
        <FadeIn delay={0.5} style={{ marginTop: 64 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <StatCard
              number="78%"
              label="of customers buy from the first business to respond"
            />
            <StatCard
              number="14-day"
              label="free trial — fully configured, no credit card required"
              accent={GOLD}
            />
            <StatCard
              number="$8.71"
              label="returned for every $1 spent on CRM when properly managed"
            />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

// ─── PROBLEM STRIP ───
function ProblemStrip() {
  return (
    <div style={{ background: RED, padding: "28px 24px" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 28, flexShrink: 0 }}>⚡</span>
        <p
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.65,
            fontWeight: 300,
            flex: 1,
            minWidth: 280,
          }}
        >
          <strong style={{ color: WHITE, fontWeight: 500 }}>
            The problem every relationship-driven business has:
          </strong>{" "}
          You pay for CRM software every month. 50% of implementations fail. 76%
          of teams ignore most features. Your leads wait hours — not seconds —
          for a response. The revenue is there. The system just isn't catching it.
        </p>
      </div>
    </div>
  );
}

// ─── ABOUT ───
function About() {
  return (
    <Section id="about" bg={WHITE}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "100px 24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
          className="about-grid"
        >
          <FadeIn>
            <div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 4,
                  color: RED,
                  marginBottom: 16,
                }}
              >
                About Gizmo Operations
              </div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  color: NAVY,
                  lineHeight: 1.15,
                  marginBottom: 24,
                  letterSpacing: -0.5,
                }}
              >
                We are not a software company.
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: MUTED,
                  lineHeight: 1.75,
                  marginBottom: 20,
                  fontWeight: 300,
                }}
              >
                We are the managed service layer that makes your CRM actually
                work. We build the system, connect your lead sources, configure
                the automations, train your team, and manage everything ongoing —
                so you get the results the software always promised but never
                delivered.
              </p>
              <p
                style={{
                  fontSize: 16,
                  color: MUTED,
                  lineHeight: 1.75,
                  fontWeight: 300,
                }}
              >
                Founded by Greg and Kezia Elder, Gizmo Operations serves
                relationship-driven businesses across the US and UK — from real
                estate brokerages to aesthetics clinics. We don't sell software.
                We deliver the results that software is capable of producing when
                properly built, configured, and managed.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div
              style={{
                background: PALE,
                padding: 40,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 4,
                  height: "100%",
                  background: NAVY,
                }}
              />
              {[
                { num: "$8.71", text: "return for every $1 spent on CRM — when used properly" },
                { num: "29%", text: "average sales revenue increase with managed CRM" },
                { num: "34%", text: "improvement in sales productivity" },
                { num: "5-10hrs", text: "saved per employee per week" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: i < 3 ? 28 : 0,
                    paddingBottom: i < 3 ? 28 : 0,
                    borderBottom: i < 3 ? "1px solid rgba(30,43,94,0.1)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: 28,
                      color: RED,
                      lineHeight: 1,
                      marginBottom: 6,
                    }}
                  >
                    {s.num}
                  </div>
                  <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.5 }}>
                    {s.text}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}

// ─── SERVICES ───
function Services() {
  const builds = [
    { title: "60-Second Lead Response", desc: "Automated, personalised response to every inbound lead — 24/7, regardless of staff availability." },
    { title: "Connected Lead Sources", desc: "Every portal, form, and ad feed connected into one unified pipeline. Nothing falls through the cracks." },
    { title: "Nurture Sequences", desc: "New leads, long-term sphere, past clients, and dormant databases — all contacted systematically." },
    { title: "Owner Dashboard", desc: "Weekly performance digest delivered to your inbox. Every metric that matters, in real time." },
    { title: "Recall & Retention", desc: "Patients, past clients, and referral partners contacted at the right interval, automatically." },
  ];

  const manages = [
    { title: "All Automations", desc: "Monitored, tested, and optimised every month. Nothing goes stale." },
    { title: "Staff Onboarding", desc: "New agents, practitioners, or staff operational within 48 hours — we handle it." },
    { title: "Monthly Report", desc: "Clear, specific, actionable reporting on pipeline health and performance." },
    { title: "Strategy Call", desc: "Monthly review of pipeline health, wins, and next priorities with your operations team." },
    { title: "Database Campaigns", desc: "Reactivation of dormant contacts on a rolling basis — turning old data into new revenue." },
  ];

  return (
    <Section id="services" bg="#f8f9fc">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 4,
                color: RED,
                marginBottom: 16,
              }}
            >
              What We Do
            </div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px, 3.5vw, 40px)",
                color: NAVY,
                lineHeight: 1.15,
                letterSpacing: -0.5,
              }}
            >
              Build it. Train it. Run it. Every month.
            </h2>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
          }}
          className="services-grid"
        >
          <FadeIn>
            <div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 14,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  color: NAVY,
                  paddingBottom: 12,
                  borderBottom: `3px solid ${RED}`,
                  marginBottom: 24,
                }}
              >
                What We Build
              </h3>
              {builds.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    marginBottom: 20,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: RED, fontSize: 14, marginTop: 2, flexShrink: 0 }}>→</span>
                  <div>
                    <div style={{ fontWeight: 500, color: DARK, fontSize: 15, marginBottom: 4 }}>
                      {item.title}
                    </div>
                    <div style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, fontWeight: 300 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 14,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  color: NAVY,
                  paddingBottom: 12,
                  borderBottom: `3px solid ${RED}`,
                  marginBottom: 24,
                }}
              >
                What We Manage Monthly
              </h3>
              {manages.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    marginBottom: 20,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: RED, fontSize: 14, marginTop: 2, flexShrink: 0 }}>→</span>
                  <div>
                    <div style={{ fontWeight: 500, color: DARK, fontSize: 15, marginBottom: 4 }}>
                      {item.title}
                    </div>
                    <div style={{ color: MUTED, fontSize: 14, lineHeight: 1.6, fontWeight: 300 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* How it works */}
        <FadeIn delay={0.25} style={{ marginTop: 72 }}>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(24px, 3vw, 32px)",
              color: NAVY,
              textAlign: "center",
              marginBottom: 48,
              letterSpacing: -0.5,
            }}
          >
            How It Works
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }}
            className="how-grid"
          >
            {[
              { num: "01", title: "Free Audit", body: "30-minute review of your current system. We identify what's working, what's broken, and what's costing you.", color: NAVY },
              { num: "02", title: "Build", body: "Complete system built and configured within 14 days. All lead sources connected. All automations tested.", color: NAVY },
              { num: "03", title: "Train", body: "We train you and your team with live sessions and a Loom walkthrough library. New staff onboarded in 48 hours.", color: NAVY },
              { num: "04", title: "Manage", body: "We run the system every month. You get results and a monthly report. We handle everything operational.", color: RED },
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  padding: "28px 24px",
                  background: WHITE,
                  borderTop: `4px solid ${step.color}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 36,
                    fontWeight: 800,
                    color: "rgba(30,43,94,0.1)",
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    color: NAVY,
                    marginBottom: 10,
                  }}
                >
                  {step.title}
                </div>
                <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, fontWeight: 300 }}>
                  {step.body}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

// ─── ROI BAND ───
function RoiBand() {
  return (
    <div style={{ background: NAVY, padding: "48px 24px" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 0,
        }}
      >
        {[
          { num: "50%", label: "Of all CRM implementations fail — primarily due to poor adoption and no operational management layer." },
          { num: "76%", label: "Of sales teams don't use most of their CRM features. The software works. The operation doesn't." },
          { num: "100x", label: "More likely to convert a lead contacted within 5 minutes vs 30 minutes." },
        ].map((r, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div
              style={{
                textAlign: "center",
                padding: "24px 32px",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
              className="roi-item"
            >
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 40,
                  fontWeight: 800,
                  color: WHITE,
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {r.num}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.5,
                  maxWidth: 280,
                  margin: "0 auto",
                }}
              >
                {r.label}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

// ─── PRICING ───
function Pricing() {
  const managedTiers = [
    {
      name: "Starter",
      price: "$750",
      period: "/mo",
      setup: "Setup from $1,500",
      note: "Core automations, connected lead sources, and monthly performance reporting. Ideal for solo operators and individual realtors.",
      featured: false,
    },
    {
      name: "Growth",
      price: "$999–$1,250",
      period: "/mo",
      setup: "Setup from $2,000–$3,000",
      note: "Full system including sequence management, staff onboarding, database reactivation campaigns, and a monthly strategy call.",
      featured: true,
    },
    {
      name: "Full Operations",
      price: "$1,500",
      period: "/mo",
      setup: "Setup from $3,000–$4,000",
      note: "Gizmo as your outsourced revenue operations team. Full system management, custom reporting, priority support, and quarterly growth reviews.",
      featured: false,
    },
  ];

  const crmTiers = [
    {
      name: "Individual",
      price: "$49",
      period: "/mo",
      note: "For solo realtors and operators. Full CRM access, up to 500 contacts, pipeline management, and mobile app access.",
    },
    {
      name: "Business",
      price: "$299",
      period: "/mo",
      note: "For team leaders and brokerages. Unlimited contacts, team management, performance dashboards, sequences and campaigns.",
    },
  ];

  return (
    <Section id="pricing" bg={WHITE}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 4,
                color: RED,
                marginBottom: 16,
              }}
            >
              Pricing
            </div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px, 3.5vw, 40px)",
                color: NAVY,
                lineHeight: 1.15,
                letterSpacing: -0.5,
                marginBottom: 16,
              }}
            >
              Simple, transparent pricing.
            </h2>
            <p style={{ fontSize: 16, color: MUTED, maxWidth: 560, margin: "0 auto", fontWeight: 300, lineHeight: 1.7 }}>
              Use the Gizmo CRM yourself, or let us run it for you. No hidden fees. No long-term contracts.
            </p>
          </div>
        </FadeIn>

        {/* Managed Services Tiers */}
        <FadeIn>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 3,
            color: MUTED,
            marginBottom: 20,
          }}>
            Managed Services — We Run It For You
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            marginBottom: 48,
          }}
          className="pricing-grid"
        >
          {managedTiers.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                style={{
                  padding: "36px 32px",
                  background: t.featured ? NAVY : WHITE,
                  border: t.featured ? "none" : "1px solid rgba(212,216,234,0.8)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    color: t.featured ? "rgba(255,255,255,0.35)" : MUTED,
                    marginBottom: 12,
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 28,
                    color: t.featured ? GOLD : RED,
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {t.price}
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: t.featured ? "rgba(255,255,255,0.3)" : MUTED,
                    }}
                  >
                    {t.period}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: t.featured ? "rgba(255,255,255,0.3)" : MUTED,
                    marginBottom: 16,
                  }}
                >
                  {t.setup}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: t.featured ? "rgba(255,255,255,0.5)" : MUTED,
                    lineHeight: 1.6,
                    fontWeight: 300,
                    flex: 1,
                  }}
                >
                  {t.note}
                </div>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{
                    marginTop: 24,
                    width: "100%",
                    padding: "14px",
                    background: t.featured ? RED : "transparent",
                    color: t.featured ? WHITE : NAVY,
                    border: t.featured ? "none" : `1px solid ${NAVY}`,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: 0.5,
                    transition: "all 0.3s",
                  }}
                >
                  Book Free Audit
                </button>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CRM Self-Serve Tiers */}
        <FadeIn>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 3,
            color: MUTED,
            marginBottom: 20,
          }}>
            Gizmo CRM — Self-Serve Access
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
          }}
          className="pricing-grid"
        >
          {crmTiers.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                style={{
                  padding: "32px",
                  background: WHITE,
                  border: "1px solid rgba(212,216,234,0.8)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    color: MUTED,
                    marginBottom: 12,
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 28,
                    color: RED,
                    lineHeight: 1,
                    marginBottom: 16,
                  }}
                >
                  {t.price}
                  <span style={{ fontSize: 14, fontWeight: 400, color: MUTED }}>
                    {t.period}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: MUTED,
                    lineHeight: 1.6,
                    fontWeight: 300,
                    flex: 1,
                  }}
                >
                  {t.note}
                </div>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{
                    marginTop: 24,
                    width: "100%",
                    padding: "14px",
                    background: "transparent",
                    color: NAVY,
                    border: `1px solid ${NAVY}`,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: 0.5,
                    transition: "all 0.3s",
                  }}
                >
                  Get Started
                </button>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p style={{
            textAlign: "center",
            fontSize: 13,
            color: MUTED,
            marginTop: 32,
            fontWeight: 300,
          }}>
            All managed service plans include access to the Gizmo CRM at no additional cost.
          </p>
        </FadeIn>

      </div>
    </Section>
  );
}

// ─── TESTIMONIALS ───
function Testimonials() {
  return (
    <Section id="testimonials" bg="#f8f9fc">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 4,
                color: RED,
                marginBottom: 16,
              }}
            >
              Testimonials
            </div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px, 3.5vw, 40px)",
                color: NAVY,
                lineHeight: 1.15,
                letterSpacing: -0.5,
                marginBottom: 16,
              }}
            >
              What our clients say.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            style={{
              maxWidth: 640,
              margin: "0 auto",
              textAlign: "center",
              padding: "48px 40px",
              background: WHITE,
              border: `1px solid rgba(30,43,94,0.08)`,
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 72,
                color: "rgba(30,43,94,0.06)",
                lineHeight: 1,
                position: "absolute",
                top: 16,
                left: 32,
              }}
            >
              "
            </div>
            <p
              style={{
                fontSize: 16,
                color: MUTED,
                lineHeight: 1.75,
                fontStyle: "italic",
                fontWeight: 300,
                marginBottom: 24,
              }}
            >
              We're currently onboarding our founding clients. This section will
              feature real testimonials from businesses who've experienced the
              Gizmo difference. In the meantime — book a free audit and see the
              results for yourself.
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                background: RED,
                color: WHITE,
                border: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                padding: "12px 28px",
                cursor: "pointer",
                letterSpacing: 0.5,
              }}
            >
              Become a Founding Client →
            </button>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

// ─── CONTACT ───
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    industry: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Gizmo Ops Enquiry — ${form.business}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nBusiness: ${form.business}\nIndustry: ${form.industry}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:greg.elder@gizmo-ops.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid rgba(30,43,94,0.15)",
    background: WHITE,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    color: DARK,
    outline: "none",
    transition: "border-color 0.3s",
  };

  return (
    <Section id="contact" bg={WHITE}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
          }}
          className="contact-grid"
        >
          <FadeIn>
            <div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 4,
                  color: RED,
                  marginBottom: 16,
                }}
              >
                Get Started
              </div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 3.5vw, 40px)",
                  color: NAVY,
                  lineHeight: 1.15,
                  letterSpacing: -0.5,
                  marginBottom: 24,
                }}
              >
                Book a Free 30-Minute CRM Audit
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: MUTED,
                  lineHeight: 1.75,
                  fontWeight: 300,
                  marginBottom: 40,
                }}
              >
                No pitch. No obligation. We look at your current system, tell you
                exactly what's working and what's costing you — and you walk away
                with a clear picture regardless of whether we work together.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Email", value: "greg.elder@gizmo-ops.com" },
                  { label: "Email", value: "kezia.elder@gizmo-ops.com" },
                  { label: "Web", value: "gizmo-ops.com" },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 12 }}>
                    <span
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        color: MUTED,
                        minWidth: 50,
                        paddingTop: 2,
                      }}
                    >
                      {c.label}
                    </span>
                    <span style={{ fontSize: 15, color: NAVY, fontWeight: 500 }}>
                      {c.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            {submitted ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div style={{ fontSize: 48 }}>✓</div>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: 24,
                    color: NAVY,
                  }}
                >
                  Thanks for reaching out.
                </h3>
                <p style={{ fontSize: 15, color: MUTED, textAlign: "center" }}>
                  We'll be in touch within 24 hours to schedule your free audit.
                </p>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Business name"
                    value={form.business}
                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                    style={inputStyle}
                  />
                  <select
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    style={{
                      ...inputStyle,
                      color: form.industry ? DARK : MUTED,
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%235a6580' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                    }}
                  >
                    <option value="" disabled>
                      Select your industry
                    </option>
                    <option>Real Estate (US)</option>
                    <option>Estate Agency (UK)</option>
                    <option>Aesthetics / Medical Clinic</option>
                    <option>Mortgage Broker</option>
                    <option>Home Services</option>
                    <option>Personal Injury Law</option>
                    <option>Financial Advisory</option>
                    <option>Other</option>
                  </select>
                  <textarea
                    placeholder="Tell us about your current CRM situation..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
                  />
                  <button
                    onClick={handleSubmit}
                    style={{
                      width: "100%",
                      padding: "16px",
                      background: RED,
                      color: WHITE,
                      border: "none",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                      letterSpacing: 0.5,
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 8px 30px rgba(200,16,46,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    Request Free CRM Audit →
                  </button>
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer style={{ background: DARK, padding: "48px 24px" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 18,
                color: WHITE,
              }}
            >
              GIZMO
            </span>
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 18,
                color: RED,
              }}
            >
              OPERATIONS
            </span>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
            Managed Revenue Operations · US & UK
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>
            <span style={{ color: GOLD, fontWeight: 500 }}>gizmo-ops.com</span>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            greg.elder@gizmo-ops.com · kezia.elder@gizmo-ops.com
          </div>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1200,
          margin: "32px auto 0",
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          fontSize: 12,
          color: "rgba(255,255,255,0.2)",
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} Gizmo Operations. All rights reserved.
      </div>
    </footer>
  );
}

// ─── MAIN APP ───
export default function GizmoOps() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = ["home", "about", "services", "pricing", "testimonials", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; font-weight: 300; -webkit-font-smoothing: antialiased; }

        ::selection { background: #c8102e; color: #fff; }

        input:focus, textarea:focus, select:focus {
          border-color: #1e2b5e !important;
          box-shadow: 0 0 0 3px rgba(30,43,94,0.08);
        }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
          .about-grid,
          .services-grid,
          .contact-grid,
          .pricing-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .how-grid { grid-template-columns: 1fr 1fr !important; }
          .roi-item { border-right: none !important; }
        }

        @media (max-width: 480px) {
          .how-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Nav activeSection={activeSection} />
      <Hero />
      <ProblemStrip />
      <About />
      <Services />
      <RoiBand />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
