"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal,.reveal-left,.reveal-right").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main>
      <Hero />
      <Hakkimizda />
      <Bolge />
      <Faaliyetler />
      <IlanCagri />
      <Iletisim />
    </main>
  );
}

function Hero() {
  return (
    <section style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0e2552 0%,#1B3F7A 45%,#14532d 100%)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", paddingTop:68 }}>
      <div style={{ position:"absolute", inset:0, opacity:.06, backgroundImage:"radial-gradient(circle at 2px 2px,white 1px,transparent 0)", backgroundSize:"40px 40px" }} />
      <div style={{ position:"absolute", bottom:-100, right:-100, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(90,158,26,.25) 0%,transparent 70%)", animation:"float 6s ease-in-out infinite" }} />
      <div style={{ position:"absolute", top:50, left:-80, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(27,63,122,.4) 0%,transparent 70%)", animation:"float 8s ease-in-out infinite reverse" }} />

      <div style={{ maxWidth:900, padding:"0 20px", textAlign:"center", position:"relative", zIndex:1, width:"100%" }}>
        <div style={{ animation:"scaleIn 1s ease both" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="BUHARYEG" className="hero-logo" style={{ height:120, marginBottom:36, filter:"drop-shadow(0 8px 32px rgba(90,158,26,.4))" }} />
        </div>
        <div style={{ animation:"fadeUp .9s ease .2s both" }}>
          <div style={{ display:"inline-block", background:"rgba(90,158,26,.2)", border:"1px solid rgba(90,158,26,.4)", borderRadius:20, padding:"6px 18px", fontSize:12, color:"#86efac", letterSpacing:2, textTransform:"uppercase", marginBottom:24, fontWeight:600 }}>
            IPARD III – LEADER Programı
          </div>
        </div>
        <div style={{ animation:"fadeUp .9s ease .35s both" }}>
          <h1 className="hero-h1" style={{ fontSize:"clamp(28px,5vw,58px)", fontWeight:900, color:"white", lineHeight:1.15, marginBottom:24 }}>
            Buharkent Yerel<br /><span className="gradient-text">Eylem Grubu</span><br />Derneği
          </h1>
        </div>
        <div style={{ animation:"fadeUp .9s ease .5s both" }}>
          <p style={{ fontSize:"clamp(14px,2vw,18px)", color:"rgba(255,255,255,.75)", lineHeight:1.8, marginBottom:40, maxWidth:600, margin:"0 auto 40px" }}>
            Buharkent İlçesi'nin sosyo-kültürel ve ekonomik kalkınması için kamu, sivil toplum ve özel sektör iş birliğiyle çalışıyoruz.
          </p>
        </div>
        <div className="hero-btns" style={{ animation:"fadeUp .9s ease .65s both", display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <a href="#hakkimizda" className="btn-green">Hakkımızda →</a>
          <a href="/ilanlar" className="btn-primary" style={{ background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.3)" }}>📢 Satın Alım İlanları</a>
        </div>
      </div>

      <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", animation:"float 2s ease-in-out infinite", color:"rgba(255,255,255,.5)", fontSize:24, cursor:"pointer" }}
        onClick={() => document.getElementById("hakkimizda")?.scrollIntoView({ behavior:"smooth" })}>↓</div>
    </section>
  );
}

function Hakkimizda() {
  return (
    <section id="hakkimizda" className="section-pad" style={{ padding:"100px 24px", background:"white" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }}>
          <div className="reveal-left">
            <div className="section-title" style={{ marginBottom:32 }}>Biz Kimiz?</div>
            <p style={{ fontSize:15, lineHeight:1.9, color:"#444", marginBottom:20 }}>
              <strong style={{ color:"#1B3F7A" }}>Buharkent Yerel Eylem Grubu (BUHARYEG) Derneği</strong>, Tarım Reformu Genel Müdürlüğü uhdesinde sürdürülen <strong>IPARD-LEADER Programı</strong> kapsamında Aydın İli Buharkent İlçesi'nde kurulmuştur.
            </p>
            <p style={{ fontSize:15, lineHeight:1.9, color:"#444", marginBottom:20 }}>
              Aydın Valiliği'ne <strong>21.03.2025</strong> tarihinde kaydedilmiş olup <strong>09-024-196</strong> onay numarasıyla resmi statüsünü kazanmıştır.
            </p>
            <p style={{ fontSize:15, lineHeight:1.9, color:"#444" }}>
              Yönetim Kurulu; 3 kamu, 2 dernek temsilcisi ve 2 gerçek kişi (genç + kadın) olmak üzere toplam <strong>7 üyeden</strong> oluşmaktadır.
            </p>
          </div>
          <div className="reveal-right">
            <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {[
                { ikon:"🏛️", baslik:"Kamu", aciklama:"Belediye, SYDV, Esnaf Odası" },
                { ikon:"🤝", baslik:"STK", aciklama:"2 aktif dernek temsilcisi" },
                { ikon:"👩", baslik:"Kadın & Genç", aciklama:"2 gerçek kişi üye" },
                { ikon:"🌿", baslik:"IPARD III", aciklama:"AB & TC destekli program" },
              ].map((k,i) => (
                <div key={i} className="card-hover" style={{ background:"#f7f5f0", borderRadius:12, padding:"22px 18px", border:"1px solid #e8e4db" }}>
                  <div style={{ fontSize:30, marginBottom:10 }}>{k.ikon}</div>
                  <div style={{ fontWeight:700, color:"#1B3F7A", marginBottom:6, fontSize:15 }}>{k.baslik}</div>
                  <div style={{ fontSize:13, color:"#666" }}>{k.aciklama}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="reveal vizyon-pad" style={{ marginTop:56, background:"linear-gradient(135deg,#1B3F7A,#0e2552)", borderRadius:16, padding:"40px 48px", color:"white", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", right:-20, top:-20, width:200, height:200, borderRadius:"50%", background:"rgba(90,158,26,.15)" }} />
          <div style={{ fontSize:12, color:"#86efac", letterSpacing:2, textTransform:"uppercase", marginBottom:14 }}>Vizyonumuz</div>
          <p style={{ fontSize:17, lineHeight:1.8, maxWidth:700, position:"relative" }}>
            Buharkent tarımını, turizmini ve ilçede yaşayan kadın ve gençlerin istihdamını desteklemek; ilçe tarihi ve kültürünü yaşatmak.
          </p>
        </div>
      </div>
    </section>
  );
}

function Bolge() {
  return (
    <section className="section-pad" style={{ padding:"100px 24px", background:"#f7f5f0" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="reveal" style={{ textAlign:"center", marginBottom:64 }}>
          <div className="section-title">Buharkent Hakkında</div>
          <p style={{ fontSize:16, color:"#666", maxWidth:600, margin:"24px auto 0" }}>Ege Bölgesi'nin doğusunda, tarihi ve doğal zenginlikleriyle öne çıkan ilçemiz.</p>
        </div>
        <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:24 }}>
          {[
            { ikon:"🫐", baslik:"Taze İncirin Başkenti", metin:"Türkiye'nin en kaliteli taze sarılop incirinin yetiştiği bölge. Taze incir pazarının %70'ine hakimdir.", renk:"#5A9E1A" },
            { ikon:"♨️", baslik:"Jeotermal Merkezi", metin:"Türkiye'nin önemli jeotermal enerji merkezlerinden biri. Sağlık turizmi ve enerji üretiminde kritik konumda.", renk:"#e05c1a" },
            { ikon:"🏭", baslik:"Organize Sanayi Bölgesi", metin:"Jeotermal enerji kaynaklarına yakın, yenilenebilir enerji temelli üretim altyapısıyla OSB.", renk:"#1B3F7A" },
            { ikon:"🎓", baslik:"Meslek Yüksekokulu", metin:"Adnan Menderes Üniversitesi bünyesinde 4 bölüm, 571 öğrenci ile eğitim veren yüksekokul.", renk:"#7c3aed" },
            { ikon:"🌳", baslik:"Millet Bahçesi", metin:"Aydın'ın ilk millet bahçesi Buharkent'te. 25.000 m² yeşil yaşam alanı.", renk:"#059669" },
            { ikon:"🐪", baslik:"Kültürel Etkinlikler", metin:"Her yıl düzenlenen Deve Güreşi Festivali, Tırmanma Yarışı ve Taze İncir Festivali.", renk:"#d97706" },
          ].map((k,i) => (
            <div key={i} className="card-hover reveal" style={{ background:"white", borderRadius:14, padding:"26px 22px", border:"1px solid #e8e4db", borderTop:`4px solid ${k.renk}` }}>
              <div style={{ fontSize:34, marginBottom:12 }}>{k.ikon}</div>
              <div style={{ fontWeight:700, fontSize:15, color:"#1B3F7A", marginBottom:10 }}>{k.baslik}</div>
              <p style={{ fontSize:13, color:"#666", lineHeight:1.75 }}>{k.metin}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faaliyetler() {
  return (
    <section id="faaliyetler" className="section-pad" style={{ padding:"100px 24px", background:"white" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="reveal" style={{ textAlign:"center", marginBottom:64 }}>
          <div className="section-title">Çalışma Temalarımız</div>
          <p style={{ fontSize:16, color:"#666", maxWidth:600, margin:"24px auto 0" }}>IPARD-LEADER Programı kapsamında 4 ana tema ile kırsal kalkınmaya katkı sağlıyoruz.</p>
        </div>
        <div className="grid-4" style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:24 }}>
          {[
            { no:"Tema 1", baslik:"Kırsal Ekonomi", aciklama:"Kırsal ürünlerin katma değerini artırmak, kısa tedarik zincirleri ve el sanatlarını desteklemek.", ikon:"🌾" },
            { no:"Tema 2", baslik:"Kırsal Turizm", aciklama:"Yerel, doğal ve kültürel kaynakları kullanarak kırsal turizm ürünleri geliştirmek.", ikon:"🧭" },
            { no:"Tema 3", baslik:"Toplumsal Kalkınma", aciklama:"Kadın girişimciler dahil STK'ları desteklemek ve sosyal yaşamı güçlendirmek.", ikon:"👐" },
            { no:"Tema 6", baslik:"YEG Ağı", aciklama:"İyi uygulama örneklerini paylaşmak ve IPARD programını yaygınlaştırmak.", ikon:"🔗" },
          ].map((t,i) => (
            <div key={i} className="reveal card-hover" style={{ background:"linear-gradient(160deg,#1B3F7A 0%,#0e2552 100%)", borderRadius:14, padding:"28px 22px", color:"white", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, right:0, background:"rgba(90,158,26,.15)", width:90, height:90, borderRadius:"0 14px 0 100%" }} />
              <div style={{ fontSize:10, letterSpacing:2, color:"#86efac", marginBottom:8, fontWeight:600 }}>{t.no.toUpperCase()}</div>
              <div style={{ fontSize:34, marginBottom:14 }}>{t.ikon}</div>
              <div style={{ fontWeight:700, fontSize:16, marginBottom:10 }}>{t.baslik}</div>
              <p style={{ fontSize:13, lineHeight:1.75, color:"rgba(255,255,255,.8)" }}>{t.aciklama}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IlanCagri() {
  return (
    <section className="section-pad" style={{ padding:"80px 24px", background:"linear-gradient(135deg,#f0f7e6,#e8f4d9)", borderTop:"1px solid #d4edba" }}>
      <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
        <div className="reveal">
          <div style={{ display:"inline-block", background:"#5A9E1A", color:"white", borderRadius:20, padding:"6px 18px", fontSize:12, letterSpacing:2, textTransform:"uppercase", marginBottom:24, fontWeight:700 }}>🔔 Aktif İlan</div>
          <h2 style={{ fontSize:"clamp(22px,4vw,36px)", fontWeight:800, color:"#1B3F7A", marginBottom:20 }}>Ofis Ekipmanı Satın Alım İlanı</h2>
          <p style={{ fontSize:16, color:"#555", lineHeight:1.8, marginBottom:32 }}>
            IPARD III – LEADER Programı kapsamında dernek ofisimiz için teknolojik cihazlar ve ofis mobilyaları temin edilecektir.<br />
            <strong>İlan açılışı: 13 Nisan 2026</strong>
          </p>
          <a href="/ilanlar" className="btn-green" style={{ fontSize:16, padding:"16px 40px" }}>İlanları Görüntüle →</a>
        </div>
      </div>
    </section>
  );
}

function Iletisim() {
  return (
    <section id="iletisim" className="section-pad" style={{ padding:"100px 24px", background:"#f7f5f0" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="reveal" style={{ textAlign:"center", marginBottom:64 }}>
          <div className="section-title">İletişim</div>
        </div>
        <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:24 }}>
          {[
            { ikon:"👤", baslik:"Müdür", deger:"Harun Eymen Vural", link:null },
            { ikon:"📞", baslik:"Telefon", deger:"+90 554 441 11 67", link:"tel:+905544411167" },
            { ikon:"📧", baslik:"E-posta", deger:"buharkentyeg@gmail.com", link:"mailto:buharkentyeg@gmail.com" },
          ].map((k,i) => (
            <div key={i} className="card-hover reveal" style={{ background:"white", borderRadius:14, padding:"32px", textAlign:"center", border:"1px solid #e8e4db" }}>
              <div style={{ fontSize:40, marginBottom:16 }}>{k.ikon}</div>
              <div style={{ fontWeight:700, color:"#1B3F7A", marginBottom:8, fontSize:15 }}>{k.baslik}</div>
              {k.link ? (
                <a href={k.link} style={{ color:"#5A9E1A", fontSize:14, textDecoration:"none", wordBreak:"break-all" }}>{k.deger}</a>
              ) : (
                <div style={{ color:"#555", fontSize:14 }}>{k.deger}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}