import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alınan Ekipmanlar – BUHARYEG",
  description: "BUHARYEG IPARD III LEADER Programı kapsamında satın alınan ofis ekipmanları.",
};

type Urun = { ad: string; marka?: string; ikon: string };
type Kategori = { baslik: string; ikon: string; tedarikci: string; tarih: string; renk: string; urunler: Urun[] };

// Yeni ekipman eklemek için ilgili kategorinin "urunler" dizisine bir öğe eklemen yeterli.
const kategoriler: Kategori[] = [
  {
    baslik: "Ofis Mobilyası",
    ikon: "🪑",
    tedarikci: "Çavuşoğlu Büro Mobilya",
    tarih: "30.06.2026",
    renk: "#1B3F7A",
    urunler: [
      { ad: "Ofis Masası (L Tipi)", ikon: "🗄️" },
      { ad: "Etajer", ikon: "📚" },
      { ad: "Sehpa", ikon: "🛋️" },
      { ad: "Dolap (Tip 2)", ikon: "🚪" },
      { ad: "Ofis Yönetici Koltuğu", ikon: "💺" },
      { ad: "Ofis Sandalyesi (2 adet)", ikon: "🪑" },
    ],
  },
  {
    baslik: "Teknolojik Ekipman",
    ikon: "💻",
    tedarikci: "MediaMarkt",
    tarih: "30.06.2026",
    renk: "#7c3aed",
    urunler: [
      { ad: "Projeksiyon Cihazı", marka: "XGIMI MoGo 4", ikon: "📽️" },
      { ad: "Projektör Perdesi", marka: "HAVIT PS84", ikon: "🖥️" },
      { ad: "Taşınabilir Ses Sistemi", marka: "LG XBOOM XL9T", ikon: "🔊" },
    ],
  },
  {
    baslik: "Klima & Buzdolabı",
    ikon: "❄️",
    tedarikci: "Yönet Ticaret",
    tarih: "29.06.2026",
    renk: "#059669",
    urunler: [
      { ad: "Duvar Tipi Klima", marka: "Finlux 18000 BTU", ikon: "🌬️" },
      { ad: "Büro Tipi Buzdolabı", marka: "Altus", ikon: "🧊" },
    ],
  },
];

export default function EkipmanlarPage() {
  const toplamAdet = kategoriler.reduce((a, k) => a + k.urunler.length, 0);

  return (
    <main style={{ paddingTop:68 }}>
      <div style={{ background:"linear-gradient(135deg,#0e2552 0%,#1B3F7A 60%,#2d5a1b 100%)", padding:"64px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, opacity:.05, backgroundImage:"radial-gradient(circle at 2px 2px,white 1px,transparent 0)", backgroundSize:"32px 32px" }} />
        <div style={{ maxWidth:1100, margin:"0 auto", position:"relative" }}>
          <div style={{ display:"inline-block", background:"rgba(90,158,26,.25)", border:"1px solid rgba(90,158,26,.5)", borderRadius:20, padding:"5px 16px", fontSize:11, color:"#86efac", letterSpacing:2, textTransform:"uppercase", marginBottom:20, fontWeight:600 }}>
            IPARD III – LEADER Programı
          </div>
          <h1 style={{ fontSize:"clamp(24px,4vw,46px)", fontWeight:900, color:"white", marginBottom:16 }}>
            📦 Alınan Ekipmanlar
          </h1>
          <p style={{ color:"rgba(255,255,255,.75)", fontSize:16, maxWidth:640, lineHeight:1.7 }}>
            Dernek ofisimiz için proje kapsamında temin edilen ekipman ve demirbaşların listesi aşağıda yer almaktadır.
          </p>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"48px 20px 80px" }}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:48 }}>
          <div style={{ background:"#f7f5f0", border:"1px solid #e8e4db", borderRadius:20, padding:"8px 20px", fontSize:13, color:"#6b6358", fontWeight:600 }}>
            🗂️ {kategoriler.length} kategori · {toplamAdet} kalem
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:28 }}>
          {kategoriler.map((k, i) => (
            <div key={i} style={{ background:"white", borderRadius:16, border:"1px solid #e8e4db", overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,.05)" }}>
              <div style={{ background:`linear-gradient(135deg, ${k.renk}, ${k.renk}dd)`, padding:"22px 24px", color:"white" }}>
                <div style={{ fontSize:32, marginBottom:8 }}>{k.ikon}</div>
                <div style={{ fontWeight:800, fontSize:18, marginBottom:4 }}>{k.baslik}</div>
                <div style={{ fontSize:12.5, color:"rgba(255,255,255,.8)" }}>
                  {k.tedarikci} · {k.tarih}
                </div>
              </div>
              <div style={{ padding:"18px 20px" }}>
                {k.urunler.map((u, j) => (
                  <div key={j} style={{
                    display:"flex", alignItems:"center", gap:12,
                    padding:"12px 0",
                    borderBottom: j < k.urunler.length - 1 ? "1px solid #f0ece4" : "none",
                  }}>
                    <div style={{ fontSize:22, flexShrink:0 }}>{u.ikon}</div>
                    <div>
                      <div style={{ fontWeight:600, fontSize:14.5, color:"#1a1a2e" }}>{u.ad}</div>
                      {u.marka && <div style={{ fontSize:12.5, color:"#888" }}>{u.marka}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
