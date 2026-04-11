"use client";
import { useState, useEffect } from "react";

const teknolojikUrunler = [
  { no:1, kalem:"Dizüstü Bilgisayar (Tip 2)", ozellikler:"RAM: En az 8 GB · SSD: En az 256 GB · Ekran: ≥13,3\" · İşletim sistemi dahil", adet:1, tavanFiyat:26754.19 },
  { no:2, kalem:"Projeksiyon Cihazı", ozellikler:"LCD/DLP · Çözünürlük: ≥1280×720 · Ampul ömrü: ≥20.000 saat", adet:1, tavanFiyat:29165.83 },
  { no:3, kalem:"Projektör Perdesi", ozellikler:"Manuel storlu · Mat beyaz yüzey · ≥180×180 cm", adet:1, tavanFiyat:6365.83 },
  { no:4, kalem:"Lazer Yazıcı (All in One)", ozellikler:"Renkli lazer · ≥600×600 DPI · ≥12 sayfa/dk · Wi-Fi · Tarayıcı dahil", adet:1, tavanFiyat:43331.67 },
  { no:8, kalem:"Taşınabilir Ses Sistemi", ozellikler:"2 yollu şarjlı aktif kabin · ≥12\" · Mikrofonlu · ≥300W · Bluetooth · USB/SD kart", adet:1, tavanFiyat:20775.00 },
];

const ofisUrunleri = [
  { no:5,  kalem:"Ofis Masası (L Tipi)",       ozellikler:"Y: ≥70 cm · E: ≥50 cm · B: ≥100 cm · L modüllü · Suntalam/Ahşap/Metal", adet:1, tavanFiyat:11750.00 },
  { no:6,  kalem:"Ofis Yönetici Koltuğu",      ozellikler:"Metal profil/Polipropilen ayak · Kumaş/Sünger/Suni deri kaplama", adet:1, tavanFiyat:4205.45 },
  { no:7,  kalem:"Ofis Sandalyesi",            ozellikler:"Metal profil iskelet · Kumaş/Sünger/Suni deri kaplama", adet:2, tavanFiyat:4205.45 },
  { no:9,  kalem:"Örümcek Stand",              ozellikler:"En: ≥200 cm · Y: ≥180 cm · Alüminyum profil · ≥3 panel · Baskılı · Katlanır", adet:1, tavanFiyat:14368.75 },
  { no:10, kalem:"Tanıtım Standı",             ozellikler:"Genel Y: ≥180 cm · Laminat/Polistren · Baskılı · Katlanır", adet:1, tavanFiyat:8750.00 },
  { no:11, kalem:"Dolap Tip 2",                ozellikler:"Y: ≥120 cm · E: ≥30 cm · B: ≥80 cm · Suntalam/Ahşap/Metal", adet:1, tavanFiyat:10181.81 },
  { no:12, kalem:"Etajer",                     ozellikler:"Y: ≥55 cm · En: ≥35 cm · Boy: ≥40 cm · Çekmece: ≥3", adet:1, tavanFiyat:4908.53 },
  { no:13, kalem:"Sehpa",                      ozellikler:"Y: ≥45 cm · En: ≥45 cm · Boy: ≥45 cm", adet:1, tavanFiyat:4636.36 },
];

const MAIL = "buharkentyeg@gmail.com";

export default function IlanlarPage() {
  const [tab, setTab]           = useState<"teknoloji"|"ofis">("teknoloji");
  const [fiyatlar, setFiyatlar] = useState<Record<number,string>>({});
  const [hatalar,  setHatalar]  = useState<Record<number,boolean>>({});
  const [form, setForm]         = useState({ firmaAdi:"", vergiNo:"", yetkili:"", telefon:"", email:"", adres:"", mensei:"", notlar:"" });
  const [gonderildi, setGonderildi] = useState(false);
  const [loading, setLoading]   = useState(false);

  const urunler = tab === "teknoloji" ? teknolojikUrunler : ofisUrunleri;

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleFiyat = (no:number, val:string, tavan:number) => {
    const n = parseFloat(val.replace(",","."));
    setHatalar(p => ({ ...p, [no]: val !== "" && !isNaN(n) && n > tavan }));
    setFiyatlar(p => ({ ...p, [no]: val }));
  };

  const toplam = urunler.reduce((a,u) => {
    const f = parseFloat((fiyatlar[u.no]||"0").replace(",","."));
    return a + (isNaN(f) ? 0 : f * u.adet);
  }, 0);

  const hataVar = Object.values(hatalar).some(Boolean);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const gonder = () => {
    if (hataVar || !form.firmaAdi || !form.email || !form.telefon) return;
    setLoading(true);
    const kat = tab === "teknoloji" ? "Teknolojik Ürünler" : "Ofis Mobilya & Ekipman";
    const satirlar = urunler.map(u => {
      const b = fiyatlar[u.no] || "Girilmedi";
      const n = parseFloat((fiyatlar[u.no]||"0").replace(",","."));
      const t = isNaN(n) ? "-" : (n*u.adet).toLocaleString("tr-TR",{minimumFractionDigits:2})+" TL";
      return `${u.no}. ${u.kalem}\n   Adet: ${u.adet} | Birim: ${b} TL | Toplam: ${t} | Tavan: ${u.tavanFiyat.toLocaleString("tr-TR")} TL`;
    }).join("\n\n");

    const body = encodeURIComponent(
`BUHARYEG OFİS EKİPMANI SATIN ALIM TEKLİFİ
Kategori: ${kat}
İlan No: BUHARYEG-2026-001 | Açılış: 13 Nisan 2026
==========================================

FİRMA BİLGİLERİ
Firma      : ${form.firmaAdi}
Vergi/TC   : ${form.vergiNo}
Yetkili    : ${form.yetkili}
Adres      : ${form.adres}
Telefon    : ${form.telefon}
E-posta    : ${form.email}
Menşe      : ${form.mensei}

KALEM BAZLI TEKLİF FİYATLARI (KDV Hariç)
------------------------------------------
${satirlar}

GENEL TOPLAM TEKLİF: ${toplam.toLocaleString("tr-TR",{minimumFractionDigits:2})} TL

EK NOTLAR:
${form.notlar}

KURALLAR:
- Fiyatlar KDV hariç TL
- Teklif geçerlilik süresi en az 90 gün
- DDP (Yerinde Teslim) esasına göre`);

    setTimeout(() => {
      window.location.href = `mailto:${MAIL}?subject=${encodeURIComponent(`BUHARYEG Teklif - ${kat} - ${form.firmaAdi}`)}&body=${body}`;
      setLoading(false);
      setGonderildi(true);
    }, 600);
  };

  const inp: React.CSSProperties = { width:"100%", padding:"11px 14px", border:"1.5px solid #ddd", borderRadius:8, fontSize:14, outline:"none", fontFamily:"inherit", transition:"border-color .2s" };

  return (
    <main style={{ paddingTop:68 }}>

      {/* ── HERO ── */}
      <div style={{ background:"linear-gradient(135deg,#0e2552 0%,#1B3F7A 60%,#2d5a1b 100%)", padding:"64px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, opacity:.05, backgroundImage:"radial-gradient(circle at 2px 2px,white 1px,transparent 0)", backgroundSize:"32px 32px" }} />
        <div style={{ maxWidth:1100, margin:"0 auto", position:"relative" }}>
          <div style={{ display:"inline-block", background:"rgba(90,158,26,.25)", border:"1px solid rgba(90,158,26,.5)", borderRadius:20, padding:"5px 16px", fontSize:11, color:"#86efac", letterSpacing:2, textTransform:"uppercase", marginBottom:20, fontWeight:600, animation:"fadeIn .8s ease both" }}>
            📢 Aktif İlan — No: BUHARYEG-2026-001
          </div>
          <h1 style={{ fontSize:"clamp(24px,4vw,46px)", fontWeight:900, color:"white", marginBottom:16, animation:"fadeUp .8s ease .1s both" }}>
            Ofis Ekipmanı Satın Alım İlanı
          </h1>
          <p style={{ color:"rgba(255,255,255,.75)", fontSize:16, maxWidth:600, lineHeight:1.7, marginBottom:32, animation:"fadeUp .8s ease .2s both" }}>
            IPARD III – LEADER Programı kapsamında dernek ofisimiz için ekipman temini yapılacaktır.
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:16, animation:"fadeUp .8s ease .3s both" }}>
            {[{ l:"İlan Açılışı", d:"13 Nisan 2026" },{ l:"Son Başvuru", d:"20 Nisan 2026" },{ l:"İlan No", d:"BUHARYEG-2026-001" },{ l:"Program", d:"IPARD III LEADER" }].map((b,i)=>(
              <div key={i} style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.15)", borderRadius:10, padding:"10px 18px" }}>
                <div style={{ fontSize:10, color:"rgba(255,255,255,.55)", marginBottom:3, textTransform:"uppercase", letterSpacing:1 }}>{b.l}</div>
                <div style={{ color:"white", fontWeight:700, fontSize:14 }}>{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"48px 20px" }}>

        {/* ── TKDK Kuralları ── */}
        <div className="reveal" style={{ background:"#fffbeb", border:"1px solid #fbbf24", borderLeft:"5px solid #f59e0b", borderRadius:10, padding:"20px 24px", marginBottom:40 }}>
          <div style={{ fontWeight:700, color:"#92400e", marginBottom:12, fontSize:15 }}>⚠️ TKDK Teklif Alma Kuralları</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:10 }}>
            {["Teklifler KDV hariç TL olarak verilmelidir.","Her kalemin birim fiyatı ayrı belirtilmelidir.","Referans tavan fiyatı hiçbir şekilde aşılamaz.","Malların menşei AB, AB aday veya IPA ülkelerinden biri olmalıdır.","Teklif DDP (Yerinde Teslim) esasına göre hazırlanmalıdır. Nakliye, paketleme, sigorta ve kurulum giderleri fiyata dahil edilmemeli, ayrıca belirtilmelidir.","Teklif geçerlilik süresi en az 90 gün olmalıdır."].map((k,i)=>(
              <div key={i} style={{ display:"flex", gap:8, fontSize:13, color:"#78350f" }}>
                <span style={{ color:"#f59e0b", flexShrink:0 }}>•</span><span>{k}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tab ── */}
        <div className="reveal" style={{ marginBottom:28, display:"flex", gap:12, flexWrap:"wrap" }}>
          {[{ id:"teknoloji" as const, label:"💻 Teknolojik Ürünler", n:teknolojikUrunler.length },{ id:"ofis" as const, label:"🪑 Ofis Mobilya & Ekipman", n:ofisUrunleri.length }].map(t=>(
            <button key={t.id} onClick={()=>{ setTab(t.id); setFiyatlar({}); setHatalar({}); }} style={{ padding:"12px 24px", borderRadius:10, border:tab===t.id?"2px solid #1B3F7A":"2px solid #e8e4db", background:tab===t.id?"#1B3F7A":"white", color:tab===t.id?"white":"#555", fontWeight:700, fontSize:15, cursor:"pointer", transition:"all .25s", display:"flex", alignItems:"center", gap:10 }}>
              {t.label}
              <span style={{ background:tab===t.id?"rgba(255,255,255,.2)":"#f0ece4", borderRadius:20, padding:"2px 10px", fontSize:13 }}>{t.n} kalem</span>
            </button>
          ))}
        </div>

        {/* ── Tablo ── */}
        <div className="reveal" style={{ background:"white", borderRadius:14, border:"1px solid #e8e4db", overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,.06)", marginBottom:40 }}>
          <div style={{ padding:"18px 24px", borderBottom:"1px solid #e8e4db", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
            <div style={{ fontWeight:700, fontSize:17, color:"#1B3F7A" }}>{tab==="teknoloji"?"💻 Teknolojik Ürünler":"🪑 Ofis Mobilya & Ekipman"}</div>
            <div style={{ fontSize:12, color:"#999" }}>Fiyatlar KDV hariç TL — tavan fiyatı geçemezsiniz</div>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13.5 }}>
              <thead>
                <tr style={{ background:"#1B3F7A", color:"white" }}>
                  <th style={{ padding:"11px 12px", textAlign:"left", width:40 }}>No</th>
                  <th style={{ padding:"11px 12px", textAlign:"left" }}>Kalem</th>
                  <th className="hide-mobile" style={{ padding:"11px 12px", textAlign:"left" }}>Teknik Özellikler</th>
                  <th style={{ padding:"11px 12px", textAlign:"center", width:55 }}>Adet</th>
                  <th style={{ padding:"11px 12px", textAlign:"right", width:140 }}>Tavan (TL)</th>
                  <th style={{ padding:"11px 12px", textAlign:"right", width:170 }}>Birim Teklifiniz (TL)</th>
                  <th style={{ padding:"11px 12px", textAlign:"right", width:130 }}>Toplam (TL)</th>
                </tr>
              </thead>
              <tbody>
                {urunler.map((u,i)=>{
                  const f = parseFloat((fiyatlar[u.no]||"").replace(",","."));
                  const top = isNaN(f)||!fiyatlar[u.no] ? null : f*u.adet;
                  const asiyor = hatalar[u.no];
                  return (
                    <tr key={u.no} style={{ background:i%2===0?"#f9f8f5":"white", borderBottom:"1px solid #e8e4db", transition:"background .2s" }}
                      onMouseEnter={e=>(e.currentTarget.style.background="#eef3fb")}
                      onMouseLeave={e=>(e.currentTarget.style.background=i%2===0?"#f9f8f5":"white")}>
                      <td style={{ padding:"11px 12px", fontWeight:700, color:"#1B3F7A" }}>{u.no}</td>
                      <td style={{ padding:"11px 12px", fontWeight:600, fontSize:13 }}>{u.kalem}</td>
                      <td className="hide-mobile" style={{ padding:"11px 12px", color:"#666", fontSize:12 }}>{u.ozellikler}</td>
                      <td style={{ padding:"11px 12px", textAlign:"center" }}>{u.adet}</td>
                      <td style={{ padding:"11px 12px", textAlign:"right", fontWeight:700, color:"#1B3F7A", whiteSpace:"nowrap" }}>{u.tavanFiyat.toLocaleString("tr-TR",{minimumFractionDigits:2})}</td>
                      <td style={{ padding:"8px 12px" }}>
                        <input type="number" min="0" step="0.01" placeholder="0,00" value={fiyatlar[u.no]||""}
                          onChange={e=>handleFiyat(u.no,e.target.value,u.tavanFiyat)}
                          style={{ width:"100%", padding:"8px 10px", textAlign:"right", border:`1.5px solid ${asiyor?"#ef4444":"#ddd"}`, borderRadius:6, fontSize:14, fontFamily:"inherit", background:asiyor?"#fef2f2":"white", outline:"none", transition:"border-color .2s" }}
                          onFocus={e=>{ if(!asiyor) e.target.style.borderColor="#1B3F7A"; }}
                          onBlur={e=>{ if(!asiyor) e.target.style.borderColor="#ddd"; }}
                        />
                        {asiyor && <div style={{ color:"#ef4444", fontSize:11, marginTop:3, textAlign:"right" }}>Tavan aşıldı!</div>}
                      </td>
                      <td style={{ padding:"11px 12px", textAlign:"right", fontWeight:600, color:asiyor?"#ef4444":"#1B3F7A", whiteSpace:"nowrap" }}>
                        {top!==null ? top.toLocaleString("tr-TR",{minimumFractionDigits:2}) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ background:"#f0f7e6", borderTop:"2px solid #5A9E1A" }}>
                  <td colSpan={6} style={{ padding:"14px 12px", textAlign:"right", fontWeight:700, color:"#1B3F7A", fontSize:14 }}>TOPLAM TEKLİF (KDV Hariç):</td>
                  <td style={{ padding:"14px 12px", textAlign:"right", fontWeight:800, color:"#1B3F7A", fontSize:16, whiteSpace:"nowrap" }}>
                    {toplam>0 ? toplam.toLocaleString("tr-TR",{minimumFractionDigits:2})+" TL" : "—"}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* ── FORM ── */}
        <div className="reveal" style={{ background:"white", borderRadius:14, border:"1px solid #e8e4db", boxShadow:"0 4px 20px rgba(0,0,0,.06)", overflow:"hidden" }}>
          <div style={{ background:"linear-gradient(135deg,#1B3F7A,#122d5c)", padding:"24px 32px" }}>
            <div style={{ color:"white", fontWeight:800, fontSize:20 }}>📧 Firma Bilgileri ve Teklif Gönder</div>
            <div style={{ color:"rgba(255,255,255,.7)", fontSize:14, marginTop:6 }}>
              Formu doldurun — girdiğiniz fiyatlar e-postaya otomatik eklenir, mail uygulamanız açılır.
            </div>
          </div>
          <div style={{ padding:"32px 28px" }}>
            {gonderildi ? (
              <div style={{ background:"#f0fdf4", border:"1px solid #86efac", borderRadius:10, padding:"32px", textAlign:"center", color:"#166534" }}>
                <div style={{ fontSize:52, marginBottom:12 }}>✅</div>
                <div style={{ fontWeight:700, fontSize:18, marginBottom:8 }}>Mail uygulamanız açıldı!</div>
                <div style={{ fontSize:14, marginBottom:20 }}>Hazırlanan e-postayı kontrol edip gönderin. Tüm kalem fiyatları otomatik eklenmiştir.</div>
                <button onClick={()=>{ setGonderildi(false); setFiyatlar({}); setHatalar({}); }} style={{ padding:"10px 28px", borderRadius:8, border:"1px solid #166534", background:"transparent", color:"#166534", cursor:"pointer", fontWeight:600, fontSize:14 }}>
                  Yeni Teklif Gir
                </button>
              </div>
            ) : (
              <>
                <div className="form-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
                  {[
                    { label:"Firma / Şahıs Adı *", name:"firmaAdi", placeholder:"Firma ünvanı veya ad soyad" },
                    { label:"Vergi No / TC Kimlik No *", name:"vergiNo", placeholder:"Vergi numarası" },
                    { label:"Yetkili Kişi *", name:"yetkili", placeholder:"İletişim kurulacak kişi" },
                    { label:"Telefon *", name:"telefon", placeholder:"0XXX XXX XX XX" },
                    { label:"E-posta *", name:"email", placeholder:"firma@email.com" },
                  ].map(f=>(
                    <div key={f.name}>
                      <label style={{ display:"block", fontSize:13, fontWeight:600, marginBottom:7, color:"#333" }}>{f.label}</label>
                      <input name={f.name} value={(form as any)[f.name]} onChange={handleChange} placeholder={f.placeholder} style={inp}
                        onFocus={e=>e.target.style.borderColor="#1B3F7A"} onBlur={e=>e.target.style.borderColor="#ddd"} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display:"block", fontSize:13, fontWeight:600, marginBottom:7, color:"#333" }}>Menşe Ülkesi *</label>
                    <select name="mensei" value={form.mensei} onChange={handleChange} style={{ ...inp, background:"white" }}>
                      <option value="">Seçiniz...</option>
                      <option>Türkiye</option>
                      <option>AB Üyesi Ülke</option>
                      <option>AB Aday Ülke</option>
                      <option>IPA Faydalanıcısı Ülke</option>
                      <option>Karma Menşe</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom:18 }}>
                  <label style={{ display:"block", fontSize:13, fontWeight:600, marginBottom:7, color:"#333" }}>Firma Adresi *</label>
                  <input name="adres" value={form.adres} onChange={handleChange} placeholder="Tam adres" style={inp}
                    onFocus={e=>e.target.style.borderColor="#1B3F7A"} onBlur={e=>e.target.style.borderColor="#ddd"} />
                </div>

                <div style={{ marginBottom:24 }}>
                  <label style={{ display:"block", fontSize:13, fontWeight:600, marginBottom:7, color:"#333" }}>Teklif Notları</label>
                  <textarea name="notlar" value={form.notlar} onChange={handleChange} rows={4}
                    placeholder="Teslim süresi, garanti koşulları, teklif geçerlilik süresi vb..."
                    style={{ ...inp, resize:"vertical" }} />
                </div>

                {toplam>0 && (
                  <div style={{ background:"#f0f7e6", border:"1px solid #5A9E1A", borderRadius:8, padding:"14px 18px", marginBottom:18, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8, animation:"scaleIn .4s ease both" }}>
                    <span style={{ fontWeight:600, color:"#1B3F7A" }}>Girilen Toplam Teklif:</span>
                    <span style={{ fontWeight:800, fontSize:20, color:"#1B3F7A" }}>{toplam.toLocaleString("tr-TR",{minimumFractionDigits:2})} TL</span>
                  </div>
                )}

                {hataVar && (
                  <div style={{ background:"#fef2f2", border:"1px solid #fca5a5", borderRadius:8, padding:"12px 16px", marginBottom:18, fontSize:13, color:"#b91c1c" }}>
                    ❌ Tavan fiyatını aşan kalemler var. Lütfen kontrol edin.
                  </div>
                )}

                <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8, padding:"12px 16px", marginBottom:24, fontSize:13, color:"#1e40af" }}>
                  📎 Gönder butonuna basınca <strong>mail uygulamanız açılacak</strong>. Girdiğiniz tüm fiyatlar e-postaya otomatik eklenecektir.
                </div>

                <button onClick={gonder}
                  disabled={loading || !form.firmaAdi || !form.email || !form.telefon || hataVar}
                  style={{
                    background: (loading || !form.firmaAdi || !form.email || !form.telefon || hataVar) ? "#9ca3af" : "linear-gradient(135deg,#1B3F7A,#122d5c)",
                    color:"white", border:"none", borderRadius:8, padding:"15px 40px",
                    fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
                    transition:"all .2s", boxShadow:"0 4px 16px rgba(27,63,122,.3)",
                    width:"100%", maxWidth:360,
                  }}>
                  {loading ? "⏳ Hazırlanıyor..." : "📧 Mail Uygulamasını Aç ve Gönder"}
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}