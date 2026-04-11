"use client";
import { useState, useEffect } from "react";

const teknolojikUrunler = [
  { no: 1, kalem: "Dizüstü Bilgisayar (Tip 2)", ozellikler: "RAM: En az 8 GB · SSD: En az 256 GB · Ekran: ≥13,3\" · İşletim sistemi dahil", adet: 1, tavanFiyat: 26754.19 },
  { no: 2, kalem: "Projeksiyon Cihazı", ozellikler: "LCD/DLP · Çözünürlük: ≥1280×720 · Ampul ömrü: ≥20.000 saat", adet: 1, tavanFiyat: 29165.83 },
  { no: 3, kalem: "Projektör Perdesi", ozellikler: "Manuel storlu · Mat beyaz yüzey · ≥180×180 cm", adet: 1, tavanFiyat: 6365.83 },
  { no: 4, kalem: "Lazer Yazıcı (All in One)", ozellikler: "Renkli lazer · ≥600×600 DPI · ≥12 sayfa/dk · Wi-Fi · Tarayıcı dahil", adet: 1, tavanFiyat: 43331.67 },
  { no: 8, kalem: "Taşınabilir Ses Sistemi", ozellikler: "2 yollu şarjlı aktif kabin · ≥12\" · Mikrofonlu · ≥300W · Bluetooth · USB/SD kart", adet: 1, tavanFiyat: 20775.00 },
];

const ofisUrunleri = [
  { no: 5, kalem: "Ofis Masası (L Tipi)", ozellikler: "Y: ≥70 cm · E: ≥50 cm · B: ≥100 cm · L modüllü · Suntalam/Ahşap/Metal", adet: 1, tavanFiyat: 11750.00 },
  { no: 6, kalem: "Ofis Yönetici Koltuğu", ozellikler: "Metal profil/Polipropilen ayak · Kumaş/Sünger/Suni deri kaplama", adet: 1, tavanFiyat: 4205.45 },
  { no: 7, kalem: "Ofis Sandalyesi", ozellikler: "Metal profil iskelet · Kumaş/Sünger/Suni deri kaplama", adet: 2, tavanFiyat: 4205.45 },
  { no: 9, kalem: "Örümcek Stand", ozellikler: "En: ≥200 cm · Y: ≥180 cm · Alüminyum profil/Sert plastik · ≥3 panel · Baskılı · Katlanır", adet: 1, tavanFiyat: 14368.75 },
  { no: 10, kalem: "Tanıtım Standı", ozellikler: "Genel Y: ≥180 cm · Gövde: D:≥35 E:≥70 B:≥80 cm · Laminat/Polistren · Baskılı · Katlanır", adet: 1, tavanFiyat: 8750.00 },
  { no: 11, kalem: "Dolap Tip 2", ozellikler: "Y: ≥120 cm · E: ≥30 cm · B: ≥80 cm · Suntalam/Ahşap/Metal", adet: 1, tavanFiyat: 10181.81 },
  { no: 12, kalem: "Etajer", ozellikler: "Y: ≥55 cm · En: ≥35 cm · Boy: ≥40 cm · Suntalam/Ahşap/Metal · Çekmece: ≥3", adet: 1, tavanFiyat: 4908.53 },
  { no: 13, kalem: "Sehpa", ozellikler: "Y: ≥45 cm · En: ≥45 cm · Boy: ≥45 cm · Suntalam/Ahşap/Metal", adet: 1, tavanFiyat: 4636.36 },
];

export default function IlanlarPage() {
  const [aktifTab, setAktifTab] = useState<"teknoloji" | "ofis">("teknoloji");
  const [form, setForm] = useState({ firmaAdi: "", vergiNo: "", yetkili: "", telefon: "", email: "", adres: "", mensei: "", notlar: "" });
  const [gonderildi, setGonderildi] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setLoading(true);
    const liste = (aktifTab === "teknoloji" ? teknolojikUrunler : ofisUrunleri)
      .map(m => `${m.no}. ${m.kalem} (${m.adet} adet) — Tavan: ${m.tavanFiyat.toLocaleString("tr-TR")} TL`)
      .join("\n");

    const kategori = aktifTab === "teknoloji" ? "Teknolojik Ürünler" : "Ofis Mobilyaları";

    const body = encodeURIComponent(
      `BUHARYEG OFİS EKİPMANI SATIN ALIM TEKLİFİ\n` +
      `Kategori: ${kategori}\n` +
      `İlan No: BUHARYEG-2025-001 | Açılış: 13 Nisan 2025\n` +
      `==========================================\n\n` +
      `FİRMA BİLGİLERİ\n` +
      `Firma: ${form.firmaAdi}\n` +
      `Vergi/TC No: ${form.vergiNo}\n` +
      `Yetkili: ${form.yetkili}\n` +
      `Adres: ${form.adres}\n` +
      `Telefon: ${form.telefon}\n` +
      `E-posta: ${form.email}\n` +
      `Menşe: ${form.mensei}\n\n` +
      `KALEMLER\n` +
      `---------\n${liste}\n\n` +
      `EK NOTLAR:\n${form.notlar}\n\n` +
      `ÖNEMLİ KURALLAR:\n` +
      `- Teklifler KDV hariç TL olarak verilmeli\n` +
      `- Birim ve toplam fiyat ayrı belirtilmeli\n` +
      `- Referans tavan fiyatı aşılamaz\n` +
      `- Teklif geçerlilik süresi en az 90 gün\n` +
      `- DDP (Yerinde Teslim) esasına göre hazırlanmalı\n`
    );
    setTimeout(() => {
      window.location.href = `mailto:buharkentyeg@gmail.com?subject=BUHARYEG%20Teklif%20-%20${encodeURIComponent(kategori)}%20-%20${encodeURIComponent(form.firmaAdi)}&body=${body}`;
      setLoading(false);
      setGonderildi(true);
    }, 800);
  };

  const aktifUrunler = aktifTab === "teknoloji" ? teknolojikUrunler : ofisUrunleri;

  return (
    <main style={{ paddingTop: 68 }}>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #0e2552 0%, #1B3F7A 60%, #2d5a1b 100%)",
        padding: "64px 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.05,
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{
            display: "inline-block", background: "rgba(90,158,26,0.25)", border: "1px solid rgba(90,158,26,0.5)",
            borderRadius: 20, padding: "5px 16px", fontSize: 11, color: "#86efac",
            letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 20, fontWeight: 600,
          }}>📢 Aktif İlan — No: BUHARYEG-2025-001</div>
          <h1 style={{ fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 900, color: "white", marginBottom: 16 }}>
            Ofis Ekipmanı Satın Alım İlanı
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, maxWidth: 600, lineHeight: 1.7, marginBottom: 32 }}>
            IPARD III – LEADER Programı kapsamında dernek ofisimiz için ekipman temini yapılacaktır.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 20 }}>
            {[
              { label: "İlan Açılışı", deger: "13 Nisan 2025" },
              { label: "Son Başvuru", deger: "28 Nisan 2025" },
              { label: "İlan No", deger: "BUHARYEG-2025-001" },
              { label: "Program", deger: "IPARD III LEADER" },
            ].map((b, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 10,
                padding: "12px 20px",
              }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginBottom: 4, textTransform: "uppercase" as const, letterSpacing: 1 }}>{b.label}</div>
                <div style={{ color: "white", fontWeight: 700, fontSize: 15 }}>{b.deger}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>

        {/* TKDK Kuralları */}
        <div className="reveal" style={{
          background: "#fffbeb", border: "1px solid #fbbf24",
          borderLeft: "5px solid #f59e0b", borderRadius: 10,
          padding: "20px 24px", marginBottom: 40,
        }}>
          <div style={{ fontWeight: 700, color: "#92400e", marginBottom: 12, fontSize: 15 }}>
            ⚠️ TKDK Teklif Alma Kuralları — Dikkat Edilmesi Gerekenler
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
            {[
              "Teklifler KDV hariç TL olarak verilmelidir.",
              "Her kalemin birim ve toplam fiyatı ayrı belirtilmelidir.",
              "Referans tavan fiyatı hiçbir şekilde aşılamaz.",
              "Malların menşei AB, AB aday veya IPA ülkelerinden biri olmalıdır.",
              "Teklif DDP (Yerinde Teslim) esasına göre hazırlanmalıdır.",
              "Teklif geçerlilik süresi en az 90 gün olmalıdır.",
            ].map((k, i) => (
              <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "#78350f" }}>
                <span style={{ color: "#f59e0b", flexShrink: 0 }}>•</span>
                <span>{k}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Seçici */}
        <div className="reveal" style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
            {[
              { id: "teknoloji" as const, label: "💻 Teknolojik Ürünler", sayi: teknolojikUrunler.length },
              { id: "ofis" as const, label: "🪑 Ofis Mobilya & Ekipman", sayi: ofisUrunleri.length },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setAktifTab(t.id)}
                style={{
                  padding: "12px 28px",
                  borderRadius: 10,
                  border: aktifTab === t.id ? "2px solid #1B3F7A" : "2px solid #e8e4db",
                  background: aktifTab === t.id ? "#1B3F7A" : "white",
                  color: aktifTab === t.id ? "white" : "#555",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                  transition: "all 0.25s",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {t.label}
                <span style={{
                  background: aktifTab === t.id ? "rgba(255,255,255,0.2)" : "#f0ece4",
                  borderRadius: 20,
                  padding: "2px 10px",
                  fontSize: 13,
                }}>{t.sayi} kalem</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tablo */}
        <div className="reveal" style={{
          background: "white", borderRadius: 14,
          border: "1px solid #e8e4db", overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 48,
        }}>
          <div style={{
            padding: "20px 28px",
            borderBottom: "1px solid #e8e4db",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#1B3F7A" }}>
              {aktifTab === "teknoloji" ? "💻 Teknolojik Ürünler" : "🪑 Ofis Mobilya & Ekipman"}
            </div>
            <div style={{ fontSize: 13, color: "#888" }}>Fiyatlar KDV hariç TL</div>
          </div>
          <div style={{ overflowX: "auto" as const }}>
            <table className="ilan-table">
              <thead>
                <tr>
                  <th style={{ width: 48, textAlign: "center" }}>No</th>
                  <th>Harcama Kalemi</th>
                  <th>Teknik Özellikler</th>
                  <th style={{ textAlign: "center", width: 70 }}>Adet</th>
                  <th style={{ textAlign: "right", width: 160 }}>Tavan Birim Fiyat</th>
                </tr>
              </thead>
              <tbody>
                {aktifUrunler.map((m, i) => (
                  <tr key={m.no}>
                    <td style={{ textAlign: "center", fontWeight: 700, color: "#1B3F7A" }}>{m.no}</td>
                    <td style={{ fontWeight: 600 }}>{m.kalem}</td>
                    <td style={{ color: "#666", fontSize: 12.5 }}>{m.ozellikler}</td>
                    <td style={{ textAlign: "center" }}>{m.adet}</td>
                    <td style={{ textAlign: "right", fontWeight: 700, color: "#1B3F7A" }}>
                      {m.tavanFiyat.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Teklif Formu */}
        <div className="reveal" style={{
          background: "white", borderRadius: 14,
          border: "1px solid #e8e4db",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}>
          <div style={{
            background: "linear-gradient(135deg, #1B3F7A, #122d5c)",
            padding: "24px 32px",
          }}>
            <div style={{ color: "white", fontWeight: 800, fontSize: 20 }}>📧 Teklif Başvuru Formu</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, marginTop: 6 }}>
              Formu doldurun, hazırlanan e-posta açılacaktır. Teklifinizi PDF/Excel eki olarak ekleyip gönderin.
            </div>
          </div>

          <div style={{ padding: "32px" }}>
            {gonderildi ? (
              <div style={{
                background: "#f0fdf4", border: "1px solid #86efac",
                borderRadius: 10, padding: "32px", textAlign: "center", color: "#166534",
              }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Mail uygulamanız açıldı!</div>
                <div style={{ fontSize: 14 }}>Hazırlanan e-postaya teklifinizi ekleyip gönderin.</div>
                <button onClick={() => setGonderildi(false)} style={{
                  marginTop: 20, padding: "10px 24px", borderRadius: 8,
                  border: "1px solid #166534", background: "transparent",
                  color: "#166534", cursor: "pointer", fontWeight: 600,
                }}>Yeni Teklif</button>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                  {[
                    { label: "Firma / Şahıs Adı *", name: "firmaAdi", placeholder: "Firma ünvanı veya ad soyad" },
                    { label: "Vergi No / TC Kimlik No *", name: "vergiNo", placeholder: "Vergi numarası" },
                    { label: "Yetkili Kişi *", name: "yetkili", placeholder: "İletişim kurulacak kişi" },
                    { label: "Telefon *", name: "telefon", placeholder: "0XXX XXX XX XX" },
                    { label: "E-posta *", name: "email", placeholder: "firma@email.com" },
                  ].map(f => (
                    <div key={f.name}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 7, color: "#333" }}>{f.label}</label>
                      <input name={f.name} value={(form as any)[f.name]} onChange={handleChange} placeholder={f.placeholder}
                        style={{
                          width: "100%", padding: "11px 14px", border: "1.5px solid #ddd",
                          borderRadius: 8, fontSize: 14, outline: "none",
                          transition: "border-color 0.2s", fontFamily: "inherit",
                        }}
                        onFocus={e => e.target.style.borderColor = "#1B3F7A"}
                        onBlur={e => e.target.style.borderColor = "#ddd"}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 7, color: "#333" }}>Menşe Ülkesi *</label>
                    <select name="mensei" value={form.mensei} onChange={handleChange} style={{
                      width: "100%", padding: "11px 14px", border: "1.5px solid #ddd",
                      borderRadius: 8, fontSize: 14, background: "white", fontFamily: "inherit",
                    }}>
                      <option value="">Seçiniz...</option>
                      <option value="Türkiye">Türkiye</option>
                      <option value="AB Üyesi Ülke">AB Üyesi Ülke</option>
                      <option value="AB Aday Ülke">AB Aday Ülke</option>
                      <option value="IPA Faydalanıcısı Ülke">IPA Faydalanıcısı Ülke</option>
                      <option value="Karma Menşe">Karma Menşe</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 7, color: "#333" }}>Firma Adresi *</label>
                  <input name="adres" value={form.adres} onChange={handleChange} placeholder="Tam adres"
                    style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #ddd", borderRadius: 8, fontSize: 14, fontFamily: "inherit" }}
                  />
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 7, color: "#333" }}>Teklif Notları</label>
                  <textarea name="notlar" value={form.notlar} onChange={handleChange} rows={4}
                    placeholder="Teslim süresi, garanti koşulları, teklif geçerlilik süresi vb..."
                    style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #ddd", borderRadius: 8, fontSize: 14, resize: "vertical", fontFamily: "inherit" }}
                  />
                </div>

                <div style={{
                  background: "#eff6ff", border: "1px solid #bfdbfe",
                  borderRadius: 8, padding: "14px 18px", marginBottom: 24, fontSize: 13, color: "#1e40af",
                }}>
                  📎 Bu formu gönderdikten sonra açılan e-postaya teklifinizi <strong>kalem bazlı fiyat tablosu (PDF veya Excel)</strong> olarak ekleyiniz.
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.firmaAdi || !form.email || !form.telefon}
                  className="btn-primary"
                  style={{ fontSize: 16, padding: "15px 40px", opacity: (!form.firmaAdi || !form.email) ? 0.5 : 1 }}
                >
                  {loading ? "⏳ Hazırlanıyor..." : "📧 Teklif E-postasını Gönder"}
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}