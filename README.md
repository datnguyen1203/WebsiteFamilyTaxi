# Taxi Gia Đình — Website Giới Thiệu Dịch Vụ

> **"Mỗi chuyến đi, một sự an tâm."**

Website tĩnh giới thiệu dịch vụ taxi cá nhân **Taxi Gia Đình** — phục vụ tại TP.HCM, Bình Dương và Bà Rịa – Vũng Tàu.

---

## 📋 Mục lục

1. [Cấu trúc dự án](#cấu-trúc-dự-án)
2. [Mở website local](#1-mở-website-local)
3. [Thay ảnh](#2-thay-ảnh)
4. [Đổi số điện thoại](#3-đổi-số-điện-thoại)
5. [Cập nhật khu vực hoạt động](#4-cập-nhật-khu-vực-hoạt-động)
6. [Cập nhật thông tin tài xế và xe](#5-cập-nhật-thông-tin-tài-xế-và-xe)
7. [Deploy Netlify](#6-deploy-netlify)
8. [Deploy GitHub Pages](#7-deploy-github-pages)
9. [Kết nối tên miền](#8-kết-nối-tên-miền)
10. [Thông tin cần cập nhật](#thông-tin-cần-cập-nhật)

---

## Cấu trúc dự án

```
taxi-gia-dinh/
├── index.html              ← Trang chính (toàn bộ nội dung)
├── style.css               ← Toàn bộ CSS
├── script.js               ← Toàn bộ JavaScript
├── assets/
│   ├── images/
│   │   ├── logo.svg        ← Logo thương hiệu
│   │   ├── hero-car.webp   ← Ảnh xe chính (hero section)
│   │   ├── driver.webp     ← Ảnh tài xế
│   │   ├── vehicle-exterior.webp  ← Ảnh ngoại thất xe
│   │   ├── vehicle-interior.webp  ← Ảnh nội thất xe
│   │   └── services/
│   │       ├── urban.webp     ← Ảnh dịch vụ nội thành
│   │       ├── highway.webp   ← Ảnh dịch vụ đường dài
│   │       ├── airport.webp   ← Ảnh dịch vụ sân bay
│   │       └── custom.webp    ← Ảnh dịch vụ theo yêu cầu
│   └── favicon.ico
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## 1. Mở website local

Chỉ cần mở file `index.html` trực tiếp bằng trình duyệt:

```
Nhấp đôi vào index.html
```

Hoặc dùng VS Code + Live Server extension để có hot-reload:

1. Mở thư mục `taxi-gia-dinh` bằng VS Code
2. Cài extension **Live Server** (nếu chưa có)
3. Nhấp chuột phải vào `index.html` → **Open with Live Server**

---

## 2. Thay ảnh

Chuẩn bị ảnh theo định dạng **WebP** (khuyến nghị) hoặc JPG/PNG.

| File cần thay | Kích thước khuyến nghị | Mô tả |
|---|---|---|
| `assets/images/hero-car.webp` | 1200×800px | Ảnh xe chính, nền sạch |
| `assets/images/driver.webp` | 800×1000px | Ảnh chân dung tài xế |
| `assets/images/vehicle-exterior.webp` | 960×640px | Ảnh ngoại thất xe |
| `assets/images/vehicle-interior.webp` | 960×640px | Ảnh nội thất xe |
| `assets/images/services/urban.webp` | 720×440px | Ảnh taxi nội thành |
| `assets/images/services/highway.webp` | 720×440px | Ảnh taxi đường dài |
| `assets/images/services/airport.webp` | 720×440px | Ảnh đưa đón sân bay |
| `assets/images/services/custom.webp` | 720×440px | Ảnh theo yêu cầu |
| `assets/images/logo.svg` | SVG vector | Logo thương hiệu |
| `assets/favicon.ico` | 32×32px | Icon tab trình duyệt |

**Cách chuyển ảnh sang WebP:**
- Online: [squoosh.app](https://squoosh.app) hoặc [convertio.co](https://convertio.co)
- Giữ nguyên tên file để không phải sửa code

---

## 3. Đổi số điện thoại

Mở file `script.js`, tìm đến đầu file (khoảng dòng 20):

```javascript
const TAXI_CONFIG = {
  brandName:    'Taxi Gia Đình',
  phone:        '0327267369',         // ← Thay bằng số thật (không có dấu chấm)
  phoneDisplay: '0327.267.369',       // ← Thay bằng định dạng hiển thị đẹp
  zaloUrl:      'https://zalo.me/0327267369', // ← Thay số sau zalo.me/
  workingHours: '05:00 – 23:00 hàng ngày',   // ← Cập nhật giờ làm việc
  serviceAreas: ['TP.HCM', 'Bình Dương', 'Bà Rịa – Vũng Tàu'],
};
```

**Ví dụ nếu số điện thoại là 0912 345 678:**

```javascript
const TAXI_CONFIG = {
  phone:        '0912345678',
  phoneDisplay: '0912.345.678',
  zaloUrl:      'https://zalo.me/0912345678',
  workingHours: '05:00 – 22:00 hàng ngày',
};
```

Script sẽ tự động cập nhật tất cả nút gọi trên toàn trang.

---

## 4. Cập nhật khu vực hoạt động

Mở `index.html`, tìm phần **SECTION 06: SERVICE AREA** (tìm text `service-area`).

Chỉnh sửa các thẻ `<li class="area-item">` trong từng khu vực để khớp với địa bàn thực tế bạn phục vụ.

**Thêm bản đồ Google Maps:**

1. Vào [Google Maps](https://maps.google.com) và tìm đến vị trí xuất phát của bạn
2. Nhấn **Share → Embed a map** → Copy `<iframe>`
3. Trong `index.html`, tìm phần `<!-- Uncomment and replace src when you have a real Google Maps embed URL:`
4. Bỏ comment và thay `src="..."` bằng URL bạn vừa copy

---

## 5. Cập nhật thông tin tài xế và xe

Trong `index.html`, tìm các placeholder sau và thay bằng thông tin thật:

| Placeholder | Vị trí | Thay bằng |
|---|---|---|
| `[Tên tài xế]` | Section About | Tên thật của tài xế |
| `[X]+ Năm kinh nghiệm` | Badge about | Số năm thực tế |
| `[X] năm lái xe chuyên nghiệp` | Driver info | Mô tả kinh nghiệm |
| `[Hãng xe – ví dụ: Toyota]` | Vehicle specs | Toyota / Kia / Hyundai... |
| `[Dòng xe – ví dụ: Vios / Innova]` | Vehicle specs | Vios / Innova / Morning... |
| `[X] chỗ ngồi` | Vehicle specs | 4 / 5 / 7 chỗ |
| `[Mô tả không gian hành lý]` | Vehicle specs | Cốp rộng X lít, phù hợp... |
| `[Nếu có]` | Amenities | Xóa nếu không có WiFi/USB |
| `[Chưa cập nhật...]` | Contact meta | Giờ làm việc thực tế |

---

## 6. Deploy Netlify

**Cách 1 — Kéo thả (không cần tài khoản GitHub):**

1. Truy cập [netlify.com](https://netlify.com) và đăng ký tài khoản miễn phí
2. Vào **Sites** → kéo thả **toàn bộ thư mục `taxi-gia-dinh`** vào vùng drop zone
3. Netlify sẽ deploy ngay lập tức và cấp domain `*.netlify.app`

**Cách 2 — Qua GitHub:**

1. Push thư mục `taxi-gia-dinh` lên GitHub repository
2. Vào Netlify → **Add new site → Import an existing project**
3. Kết nối GitHub → chọn repo
4. Build settings:
   - **Base directory:** để trống (hoặc `taxi-gia-dinh` nếu đặt trong subfolder)
   - **Build command:** để trống
   - **Publish directory:** `.` (thư mục gốc)
5. Nhấn **Deploy**

---

## 7. Deploy GitHub Pages

1. Push thư mục `taxi-gia-dinh` lên GitHub repository (nên đặt tên repo là `taxigiadinh`)
2. Vào **Settings → Pages**
3. **Source:** Deploy from a branch
4. **Branch:** `main` / `master` → thư mục `/` (root)
5. Nhấn **Save**
6. Website sẽ có tại: `https://<username>.github.io/<repo-name>/`

---

## 8. Kết nối tên miền

**Sau khi có domain (ví dụ: taxigiadinh.vn):**

**Với Netlify:**
1. Vào **Domain settings** của site
2. Nhấn **Add custom domain** → nhập tên miền
3. Trỏ DNS theo hướng dẫn Netlify (thêm CNAME record)
4. HTTPS được bật tự động qua Let's Encrypt

**Với GitHub Pages:**
1. Vào **Settings → Pages → Custom domain** → nhập tên miền
2. Tại nhà cung cấp domain, thêm CNAME record: `www` → `<username>.github.io`
3. Tick **Enforce HTTPS**

**Sau khi có tên miền chính thức, cập nhật trong `index.html`:**
```html
<link rel="canonical" href="https://taxigiadinh.vn/" />
<meta property="og:url" content="https://taxigiadinh.vn/" />
```

Và trong `sitemap.xml`:
```xml
<loc>https://taxigiadinh.vn/</loc>
```

---

## Thông tin cần cập nhật

Danh sách đầy đủ những gì cần bổ sung trước khi website chính thức:

### 🔴 Bắt buộc
- [ ] Số điện thoại thật (trong `TAXI_CONFIG` tại `script.js`)
- [ ] Ảnh xe thực tế (`hero-car.webp`, `vehicle-exterior.webp`, `vehicle-interior.webp`)
- [ ] Tên tài xế
- [ ] Hãng xe, dòng xe, số chỗ ngồi

### 🟡 Khuyến nghị
- [ ] Ảnh tài xế (`driver.webp`)
- [ ] Giờ làm việc thực tế
- [ ] Favicon thương hiệu (`.ico` với logo thật)
- [ ] Ảnh các dịch vụ (`services/*.webp`)
- [ ] Kinh nghiệm tài xế (số năm)
- [ ] Bản đồ Google Maps (vị trí xuất phát)
- [ ] URL Zalo chính xác

### 🟢 Sau khi có domain
- [ ] Canonical URL trong `index.html`
- [ ] OG URL trong `index.html`
- [ ] URL trong `sitemap.xml`
- [ ] URL trong JSON-LD structured data
- [ ] URL ảnh trong OG/Twitter meta tags

---

## Thông tin kỹ thuật

| Mục | Chi tiết |
|---|---|
| **Loại website** | Static HTML — không cần server |
| **Fonts** | Be Vietnam Pro (Google Fonts) |
| **Icons** | Lucide Icons (CDN) |
| **CSS Framework** | Không — CSS thuần |
| **JavaScript** | Vanilla ES6+ — không có dependencies |
| **Responsive** | Mobile-first, hỗ trợ 360px – 1920px |
| **SEO** | Semantic HTML, JSON-LD, OpenGraph, sitemap |
| **Performance** | Lazy loading, WebP, không build step |
| **Accessibility** | ARIA labels, keyboard navigation, focus states |

---

*© 2026 Taxi Gia Đình — Website phát triển bởi Senior Frontend Developer.*
