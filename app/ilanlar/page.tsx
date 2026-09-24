import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Satın Alım İlanları – BUHARYEG",
  description: "BUHARYEG IPARD III LEADER Programı kapsamındaki satın alım ilanları.",
};

// İlan durumunu güncellediğinde bu tarihi de değiştir.
const SON_GUNCELLEME = "24 Eylül 2026";
const MAIL = "buharkentyeg@gmail.com";

const gecmisIlanlar = [
  { no:"BUHARYEG-2026-001", baslik:"Ofis Ekipmanı Satın Alımı", tarih:"13–20 Nisan 2026" },
];

export default function IlanlarPage() {
  return (
    <main style={{ paddingTop:68 }}>
      <div style={{ background:"linear-gradient(135deg,#0e2552 0%,#1B3F7A 60%,#2d5a1b 100%)", padding:"64px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, opacity:.05, backgroundImage:"radial-gradient(circle at 2px 2px,white 1px,transparent 0)", backgroundSize:"32px 32px" }} />
        <div style={{ maxWidth:1100, margin:"0 auto", position:"relative" }}>
          <div style={{ display:"inline-block", background:"rgba(90,158,26,.25)", border:"1px solid rgba(90,158,26,.5)", borderRadius:20, padding:"5px 16px", fontSize:11, color:"#86efac", letterSpacing:2, textTransform:"uppercase", marginBottom:20, fontWeight:600, animation:"fadeIn .8s ease both" }}>
            IPARD III – LEADER Programı
          </div>
          <h1 style={{ fontSize:"clamp(24px,4vw,46px)", fontWeight:900, color:"white", marginBottom:16, animation:"fadeUp .8s ease .1s both" }}>
            Satın Alım İlanları
          </h1>
          <p style={{ color:"rgba(255,255,255,.75)", fontSize:16, maxWidth:600, lineHeight:1.7, animation:"fadeUp .8s ease .2s both" }}>
            Dernek faaliyetleri kapsamındaki satın alım ilanları bu sayfada yayımlanır.
          </p>
        </div>
      </div>

      <div style={{ maxWidth:800, margin:"0 auto", padding:"56px 20px 80px" }}>
        <div style={{ background:"white", borderRadius:14, border:"1px solid #e8e4db", boxShadow:"0 4px 20px rgba(0,0,0,.06)", padding:"48px 32px", textAlign:"center", animation:"scaleIn .6s ease both" }}>
          <div style={{ fontSize:52, marginBottom:16 }}>📭</div>
          <h2 style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:800, color:"#1B3F7A", marginBottom:12 }}>
            Şu anda aktif bir satın alım ilanı bulunmamaktadır.
          </h2>
          <p style={{ fontSize:15, color:"#666", lineHeight:1.8, marginBottom:24 }}>
            Yeni ilanlar yayımlandığında bu sayfada duyurulacaktır.<br />
            Sorularınız için: <a href={`mailto:${MAIL}`} style={{ color:"#5A9E1A", textDecoration:"none", fontWeight:600 }}>{MAIL}</a>
          </p>
          <div style={{ display:"inline-block", background:"#f7f5f0", border:"1px solid #e8e4db", borderRadius:20, padding:"6px 18px", fontSize:13, color:"#6b6358" }}>
            🗓️ Son güncelleme: <strong>{SON_GUNCELLEME}</strong>
          </div>
        </div>

        {gecmisIlanlar.length > 0 && (
          <div style={{ marginTop:40 }}>
            <div style={{ fontWeight:700, color:"#1B3F7A", fontSize:15, marginBottom:14 }}>Tamamlanan İlanlar</div>
            {gecmisIlanlar.map(il => (
              <div key={il.no} style={{ background:"white", border:"1px solid #e8e4db", borderRadius:10, padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8, marginBottom:10 }}>
                <div>
                  <div style={{ fontWeight:600, fontSize:14, color:"#333" }}>{il.baslik}</div>
                  <div style={{ fontSize:12, color:"#999" }}>{il.no} · {il.tarih}</div>
                </div>
                <span style={{ background:"#f0ece4", color:"#6b6358", borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:700 }}>Kapandı</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
