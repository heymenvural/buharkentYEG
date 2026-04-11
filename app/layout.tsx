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
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        background:"rgba(18,45,92,0.96)", backdropFilter:"blur(12px)",
        WebkitBackdropFilter:"blur(12px)",
        borderBottom:"1px solid rgba(90,158,26,0.3)",
        padding:"0 24px", height:68,
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <a href="/" style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="BUHARYEG" style={{ height:42, width:"auto", objectFit:"contain" }} />
        </a>

        {/* Desktop menü */}
        <div className="nav-desktop" style={{ display:"flex", gap:4, alignItems:"center" }}>
          {[
            { href:"/", label:"Ana Sayfa" },
            { href:"/#hakkimizda", label:"Hakkımızda" },
            { href:"/#faaliyetler", label:"Faaliyetler" },
            { href:"/#iletisim", label:"İletişim" },
          ].map(item => (
            <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
          ))}
          <a href="/ilanlar" className="nav-link nav-link-active" style={{ marginLeft:8 }}>📢 İlanlar</a>
        </div>

        {/* Mobil hamburger butonu */}
        <button
          id="hamburger-btn"
          className="nav-mobile-btn"
          aria-label="Menü"
          style={{
            display:"none", flexDirection:"column", gap:5, padding:8,
            background:"transparent", border:"none", cursor:"pointer",
          }}
        >
          <span style={{ display:"block", width:24, height:2, background:"white", borderRadius:2 }} />
          <span style={{ display:"block", width:24, height:2, background:"white", borderRadius:2 }} />
          <span style={{ display:"block", width:24, height:2, background:"white", borderRadius:2 }} />
        </button>
      </nav>

      {/* Mobil menü - başlangıçta gizli */}
      <div
        id="mobile-menu"
        style={{
          position:"fixed", top:68, left:0, right:0, zIndex:999,
          background:"rgba(14,37,82,0.98)", backdropFilter:"blur(12px)",
          padding:"16px 24px", flexDirection:"column", gap:4,
          borderBottom:"1px solid rgba(90,158,26,0.3)",
          display:"none",
        }}
      >
        {[
          { href:"/", label:"Ana Sayfa" },
          { href:"/#hakkimizda", label:"Hakkımızda" },
          { href:"/#faaliyetler", label:"Faaliyetler" },
          { href:"/#iletisim", label:"İletişim" },
          { href:"/ilanlar", label:"📢 İlanlar" },
        ].map(item => (
          <a key={item.href} href={item.href} className="mobile-menu-link" style={{
            color:"rgba(255,255,255,.85)", textDecoration:"none", fontSize:16,
            fontWeight:500, padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,.08)",
            display:"block",
          }}>{item.label}</a>
        ))}
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var btn = document.getElementById('hamburger-btn');
          var menu = document.getElementById('mobile-menu');
          var open = false;
          if (btn && menu) {
            btn.addEventListener('click', function(e) {
              e.stopPropagation();
              open = !open;
              menu.style.display = open ? 'flex' : 'none';
            });
            document.addEventListener('click', function() {
              if (open) { open = false; menu.style.display = 'none'; }
            });
            menu.addEventListener('click', function() {
              open = false; menu.style.display = 'none';
            });
          }
        })();
      ` }} />
    </>
  );
}

function Footer() {
  return (
    <footer style={{ background:"#0e2552", color:"rgba(255,255,255,.7)", padding:"48px 24px 32px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:40, marginBottom:40 }}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="BUHARYEG" style={{ height:44, marginBottom:16, filter:"brightness(0) invert(1)" }} />
            <p style={{ fontSize:13, lineHeight:1.7 }}>Buharkent Yerel Eylem Grubu Derneği<br />IPARD III – LEADER Programı</p>
          </div>
          <div>
            <div style={{ color:"white", fontWeight:700, marginBottom:16, fontSize:15 }}>Hızlı Linkler</div>
            {[
              { href:"/", label:"Ana Sayfa" },
              { href:"/#hakkimizda", label:"Hakkımızda" },
              { href:"/ilanlar", label:"Satın Alım İlanları" },
              { href:"/#iletisim", label:"İletişim" },
            ].map(l => (
              <div key={l.href} style={{ marginBottom:8 }}>
                <a href={l.href} style={{ color:"rgba(255,255,255,.65)", textDecoration:"none", fontSize:13 }}>{l.label}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color:"white", fontWeight:700, marginBottom:16, fontSize:15 }}>İletişim</div>
            <p style={{ fontSize:13, lineHeight:2.2 }}>
              👤 Harun Eymen Vural<br />
              📞 <a href="tel:+905544411167" style={{ color:"rgba(255,255,255,.65)", textDecoration:"none" }}>+90 554 441 11 67</a><br />
              📧 <a href="mailto:buharkentyeg@gmail.com" style={{ color:"rgba(255,255,255,.65)", textDecoration:"none" }}>buharkentyeg@gmail.com</a><br />
              📍 Buharkent, Aydın
            </p>
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.1)", paddingTop:20, textAlign:"center", fontSize:12 }}>
          © 2026 BUHARYEG Derneği. IPARD III – LEADER Programı kapsamında faaliyet göstermektedir.
        </div>
      </div>
    </footer>
  );
}