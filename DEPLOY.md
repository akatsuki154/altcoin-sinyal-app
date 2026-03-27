# AltcoinSinyal — Deploy Rehberi

Telefon dahil her cihazdan erişilebilen, tamamen bulut tabanlı kurulum.

---

## Genel Mimari

```
Telefon (Tarayıcı)
       │
       ▼
Vercel (Frontend — Next.js)
       │  NEXT_PUBLIC_API_BASE_URL
       ▼
Render.com (Backend — FastAPI)
       │  ccxt
       ▼
Binance Public API
```

---

## ADIM 1 — Backend'i Render'a Deploy Et

### 1.1 GitHub'a yükle

GitHub hesabın yoksa https://github.com adresinden ücretsiz aç.

Projeyi yükle — sadece `backend/` klasörünü ayrı bir repo olarak push edebilirsin
ya da tek repo içinde `backend/` klasörü olarak bırakabilirsin.

```
altcoin-sinyal-backend/   ← Render bu klasörü deploy eder
├── app/
│   ├── main.py
│   ├── config.py
│   ├── routers/
│   └── services/
├── requirements.txt
├── Procfile
├── runtime.txt
└── .env.example
```

### 1.2 Render.com'da servis oluştur

1. https://render.com → Sign Up (ücretsiz)
2. Dashboard → **New** → **Web Service**
3. GitHub repo'nu bağla
4. Ayarlar:

| Alan | Değer |
|------|-------|
| Name | `altcoin-sinyal-api` |
| Region | Frankfurt (EU) |
| Branch | `main` |
| Root Directory | `backend` (monorepo ise) |
| Runtime | `Python 3` |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `gunicorn app.main:app -w 2 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT --timeout 120` |
| Instance Type | **Free** (başlangıç için yeterli) |

### 1.3 Environment Variables ekle

Render Dashboard → Environment:

```
APP_ENV          = production
LOG_LEVEL        = INFO
ENABLE_RATE_LIMIT= true
EXCHANGE_TIMEOUT = 10000
CORS_ORIGINS     = ["https://YOUR-FRONTEND.vercel.app"]
```

> CORS_ORIGINS'i şimdi boş bırak, frontend deploy sonrası geri gel ve güncelle.

### 1.4 Deploy et

"Create Web Service" butonuna bas. İlk deploy 3-5 dakika sürer.

Deploy bittikten sonra URL şu formatta gelir:
```
https://altcoin-sinyal-api.onrender.com
```

### 1.5 Test et

Tarayıcıda aç:
```
https://altcoin-sinyal-api.onrender.com/health
```

Şu yanıtı görmelisin:
```json
{"status": "ok", "uptime_seconds": 12.3, "service": "AltcoinSinyal API"}
```

Binance bağlantısını test et:
```
https://altcoin-sinyal-api.onrender.com/health/exchange
```

Ticker test:
```
https://altcoin-sinyal-api.onrender.com/api/ticker/BTCUSDT
```

---

## ADIM 2 — Frontend'i Vercel'e Deploy Et

### 2.1 Vercel hesabı aç

https://vercel.com → Sign Up → GitHub ile giriş yap (ücretsiz)

### 2.2 Projeyi import et

1. Vercel Dashboard → **New Project**
2. GitHub repo'nu seç
3. Framework: **Next.js** (otomatik algılanır)
4. Root Directory: `frontend` (monorepo ise)

### 2.3 Environment Variable ekle

"Environment Variables" bölümünde:

```
Name : NEXT_PUBLIC_API_BASE_URL
Value: https://altcoin-sinyal-api.onrender.com
```

> Sonundaki slash olmamalı. Render URL'sini buraya yapıştır.

### 2.4 Deploy et

"Deploy" butonuna bas. 2-3 dakikada tamamlanır.

Deploy sonrası URL:
```
https://altcoin-sinyal.vercel.app
```
(Vercel rastgele bir subdomain atar, istersen özelleştirebilirsin)

---

## ADIM 3 — CORS'u Güncelle

Frontend URL'si belli olduktan sonra Render'a geri dön:

1. Render Dashboard → altcoin-sinyal-api → **Environment**
2. `CORS_ORIGINS` değerini güncelle:

```
["https://altcoin-sinyal.vercel.app"]
```

3. Kaydet → Render otomatik yeniden deploy eder (1-2 dakika)

---

## ADIM 4 — Telefondan Aç

Vercel URL'sini telefonun tarayıcısında aç:
```
https://altcoin-sinyal.vercel.app
```

Bu kadar. Başka bir kurulum gerekmiyor.

- ✅ HTTPS otomatik (hem Vercel hem Render)
- ✅ CDN otomatik (Vercel global edge network)
- ✅ Her cihazdan erişilebilir

---

## Ücretsiz Plan Limitleri

### Render Free:
- Servis **15 dakika** hareketsizlik sonrası uyur
- İlk istek 30-60 saniye bekleyebilir (cold start)
- Ayda 750 saat ücretsiz (tek servis için yeterli)

Cold start sorununu çözmek için (opsiyonel):
Render Dashboard → altcoin-sinyal-api → **Settings** → **Health Check Path** → `/health`

Ya da UptimeRobot (ücretsiz) ile 5 dakikada bir ping at:
https://uptimerobot.com → New Monitor → HTTP → URL: `https://altcoin-sinyal-api.onrender.com/health`

### Vercel Free:
- Aylık 100GB bant genişliği
- Sınırsız deploy
- Custom domain desteği

---

## Sorun Giderme

### "Failed to fetch" hatası

1. `NEXT_PUBLIC_API_BASE_URL` Vercel'de set edildi mi? Kontrol et.
2. URL'nin sonunda `/` var mı? Olmamalı.
3. Backend uyanık mı? `https://YOUR-BACKEND.onrender.com/health` aç.

### CORS hatası (tarayıcı konsolu)

Render'da `CORS_ORIGINS` değerinin tam Vercel URL'sini içerip içermediğini kontrol et.
Güncelleme sonrası Render otomatik yeniden deploy eder.

### Render cold start

İlk istek yavaş geliyorsa UptimeRobot ile backend'i uyanık tut (yukarıda anlatıldı).

---

## Değişiklik Yaptığında

### Backend değişikliği:
GitHub'a push et → Render otomatik deploy eder (auto-deploy varsayılan açık)

### Frontend değişikliği:
GitHub'a push et → Vercel otomatik deploy eder

---

## Özet

| Bileşen | Platform | URL Formatı |
|---------|----------|-------------|
| Backend | Render.com | `https://altcoin-sinyal-api.onrender.com` |
| Frontend | Vercel | `https://altcoin-sinyal.vercel.app` |
| Veri | Binance Public API | Ücretsiz, API key gerekmez |

Toplam maliyet: **0₺** (her iki platform ücretsiz plan ile çalışır)
