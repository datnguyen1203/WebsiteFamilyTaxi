"""
Generate SVG placeholder images for Taxi Gia Dinh website.
These are shown until real photos are provided.
"""
import os, struct, zlib, base64

ASSETS = r"e:\Website Taxi Già đình\taxi-gia-dinh\assets\images"
SERVICES = os.path.join(ASSETS, "services")

def make_svg(w, h, bg, text, sub, icon_path=""):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{bg}"/>
      <stop offset="100%" stop-color="{shade(bg)}"/>
    </linearGradient>
  </defs>
  <rect width="{w}" height="{h}" fill="url(#g)"/>
  <!-- Grid pattern -->
  <pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  </pattern>
  <rect width="{w}" height="{h}" fill="url(#p)"/>
  <!-- Center content -->
  <text x="{w//2}" y="{h//2 - 16}" text-anchor="middle" font-family="'Be Vietnam Pro',Arial,sans-serif"
        font-size="22" font-weight="700" fill="rgba(255,255,255,0.9)">{text}</text>
  <text x="{w//2}" y="{h//2 + 18}" text-anchor="middle" font-family="'Be Vietnam Pro',Arial,sans-serif"
        font-size="13" fill="rgba(255,255,255,0.6)">{sub}</text>
  <!-- Camera icon -->
  <g transform="translate({w//2 - 20}, {h//2 + 32})">
    <rect x="0" y="4" width="40" height="28" rx="4" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <circle cx="20" cy="18" r="8" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <rect x="12" y="0" width="16" height="6" rx="2" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
  </g>
  <text x="{w//2}" y="{h - 16}" text-anchor="middle" font-family="Arial,sans-serif"
        font-size="11" fill="rgba(255,255,255,0.4)">Thay bằng ảnh thực tế</text>
</svg>'''

def shade(hex_color):
    """Darken a hex color slightly."""
    h = hex_color.lstrip('#')
    r, g, b = int(h[0:2],16), int(h[2:4],16), int(h[4:6],16)
    r, g, b = max(0,r-40), max(0,g-40), max(0,b-40)
    return f"#{r:02X}{g:02X}{b:02X}"

images = [
    # (path, w, h, bg_color, main_text, sub_text)
    (os.path.join(ASSETS, "hero-car.webp"),           1200, 800,  "#1E3A5F", "Xe Taxi Gia Đình",        "Hình ảnh xe chính – thay bằng ảnh thực tế"),
    (os.path.join(ASSETS, "driver.webp"),              800, 1000, "#1A4E6B", "Tài xế",                  "Ảnh tài xế – thay bằng ảnh thực tế"),
    (os.path.join(ASSETS, "vehicle-exterior.webp"),    960, 640,  "#2563EB", "Ngoại thất xe",           "Ảnh xe bên ngoài – thay bằng ảnh thực tế"),
    (os.path.join(ASSETS, "vehicle-interior.webp"),    960, 640,  "#1D4ED8", "Nội thất xe",             "Ảnh nội thất xe – thay bằng ảnh thực tế"),
    (os.path.join(SERVICES, "urban.webp"),             720, 440,  "#0F3460", "Taxi Nội Thành",          "Đưa đón trong thành phố"),
    (os.path.join(SERVICES, "highway.webp"),           720, 440,  "#16213E", "Taxi Đường Dài",          "Chuyến đi liên tỉnh"),
    (os.path.join(SERVICES, "airport.webp"),           720, 440,  "#0A3D62", "Đưa Đón Sân Bay",         "Sân bay Tân Sơn Nhất"),
    (os.path.join(SERVICES, "custom.webp"),            720, 440,  "#1B4F72", "Đưa Đón Theo Yêu Cầu",   "Linh hoạt theo lịch của bạn"),
]

for path, w, h, bg, text, sub in images:
    # Save as SVG (browsers can display SVG files even with .webp extension isn't ideal,
    # so we save proper SVG with .svg extension and also an SVG-based placeholder)
    svg_path = path.replace(".webp", "_placeholder.svg")
    svg_content = make_svg(w, h, bg, text, sub)
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Created: {os.path.basename(svg_path)}")

print("\nAll placeholder SVGs created successfully.")
print("NOTE: The .webp files need real photos. SVG placeholders are for reference.")
