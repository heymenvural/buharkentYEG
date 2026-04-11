import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BUHARYEG – Buharkent Yerel Eylem Grubu Derneği",
  description: "IPARD III LEADER Programı kapsamında faaliyet gösteren Buharkent Yerel Eylem Grubu Derneği resmi web sitesi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: "rgba(18, 45, 92, 0.95)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(90,158,26,0.3)",
      padding: "0 24px",
      height: 68,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="BUHARYEG Logo" style={{ height: 42, width: "auto", objectFit: "contain" }} />
      </a>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {[
          { href: "/", label: "Ana Sayfa" },
          { href: "/#hakkimizda", label: "Hakkımızda" },
          { href: "/#faaliyetler", label: "Faaliyetler" },
          { href: "/ilanlar", label: "İlanlar", vurgulu: true },
          { href: "/#iletisim", label: "İletişim" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              color: item.vurgulu ? "#5A9E1A" : "rgba(255,255,255,0.85)",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: item.vurgulu ? 700 : 500,
              padding: "8px 14px",
              borderRadius: 6,
              border: item.vurgulu ? "1px solid #5A9E1A" : "1px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "#0e2552",
      color: "rgba(255,255,255,0.7)",
      padding: "48px 24px 32px",
      marginTop: 0,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, marginBottom: 40 }}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="BUHARYEG" style={{ height: 48, marginBottom: 16, filter: "brightness(0) invert(1)" }} />
            <p style={{ fontSize: 13, lineHeight: 1.7 }}>
              Buharkent Yerel Eylem Grubu Derneği<br />
              IPARD III – LEADER Programı
            </p>
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Hızlı Linkler</div>
            {[
              { href: "/", label: "Ana Sayfa" },
              { href: "/#hakkimizda", label: "Hakkımızda" },
              { href: "/ilanlar", label: "Satın Alım İlanları" },
              { href: "/#iletisim", label: "İletişim" },
            ].map(l => (
              <div key={l.href} style={{ marginBottom: 8 }}>
                <a href={l.href} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 13 }}>{l.label}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 700, marginBottom: 16, fontSize: 15 }}>İletişim</div>
            <p style={{ fontSize: 13, lineHeight: 2 }}>
              📧 buharkentyeg@gmail.com<br />
              📍 Buharkent, Aydın<br />
              🌐 www.buharyeg.org
            </p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, textAlign: "center", fontSize: 12 }}>
          © 2025 BUHARYEG Derneği. IPARD III – LEADER Programı kapsamında faaliyet göstermektedir.
        </div>
      </div>
    </footer>
  );
}