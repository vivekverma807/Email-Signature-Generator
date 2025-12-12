# SigStudio

> **Create beautiful, professional email signatures — free and easy.**

**SigStudio** is a lightweight, browser-first web app for building and exporting responsive email signatures. Choose a template, add your details and social links, preview across desktop and mobile, then copy the HTML or download as an image.

---

## 🚀 Live Demo

> Add your project's GitHub Pages URL or a link to your deployed demo here.

---

## ✨ Features

* Multiple polished signature templates
* WYSIWYG editor: edit name, title, contact, socials, and logo/photo
* Responsive preview for desktop and mobile
* Export options: copy HTML, download as PNG, or download VCF (business card)
* Lightweight, dependency-free frontend (works as a static site)
* Email-client friendly HTML (table-based layout, inline styles)

---

## 📁 Project Structure

```
SigStudio/
├─ index.html            # Landing + editor UI
├─ templates/            # Signature HTML/CSS partial templates
├─ assets/
│  ├─ css/
│  ├─ js/
│  └─ images/
├─ scripts/
│  └─ export.js          # copy HTML, convert to PNG, VCF export
├─ README.md
└─ LICENSE
```

---

## 🛠 Tech Stack

* Vanilla HTML, CSS, JavaScript
* Optional: a small build step using Node.js if optimizing assets
* Client-side image export: `html2canvas` or `dom-to-image` (optional)

---

## 💻 Local Development

Follow these steps to run the project locally (works as a static site):

1. Clone the repo:

```bash
git clone https://github.com/vivekverma807/SigStudio.git
cd SigStudio
```

2. Open `index.html` in your browser, or run a local static server for nicer routing:

```bash
# using Python 3
python -m http.server 8000
# then open http://localhost:8000
```

3. Edit templates in `templates/` or customize styles in `assets/css/`.

---

## 🧩 How to Use (as a user)

1. Open SigStudio in your browser.
2. Pick a template.
3. Fill in your details: name, job title, phone, email, website, company, address.
4. Upload or paste a photo/logo.
5. Add social links (LinkedIn, Twitter, GitHub, etc.).
6. Preview on desktop and mobile.
7. Export: copy the HTML or download PNG / VCF.

**Tip:** Paste the exported HTML into your email client's signature editor, and verify that the images are hosted on a public URL or embedded as base64.

---

## 🔧 Implementation Notes (developer-oriented)

* **Email friendly HTML:** Use a table-based layout with inline CSS to ensure consistent rendering across clients like Outlook and Gmail.
* **Images:** Use absolute URLs or base64-encoded inline images. If you host images in the repo, serve them from a CDN or GitHub Pages.
* **Sanitization:** When accepting user input that becomes HTML, sanitize and escape to prevent injection issues.
* **Accessibility:** Provide `alt` text for images and maintain a clear color contrast for signature text.

---

## 📦 Export Examples

### Copyable HTML snippet (example template)

```html
<table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; font-size:14px; color:#222;">
  <tr>
    <td style="padding-right:12px; vertical-align:top;">
      <img src="https://example.com/photo.jpg" alt="Avatar" width="72" style="border-radius:8px; display:block;">
    </td>
    <td style="vertical-align:top;">
      <div style="font-weight:700; font-size:16px;">Vivek Kumar Verma</div>
      <div style="color:#666;">Frontend Developer</div>
      <div style="margin-top:8px;">
        <a href="tel:+911234567890" style="color:#1a73e8; text-decoration:none;">+91 12345 67890</a> |
        <a href="mailto:vivek@example.com" style="color:#1a73e8; text-decoration:none;">vivek@example.com</a>
      </div>
    </td>
  </tr>
</table>
```

---

## ✅ Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to your branch and open a PR

Please keep UI changes responsive and email-client compatible.

---

## 📝 Roadmap

* [ ] More templates (minimal, corporate, creative)
* [ ] Theme / color presets
* [ ] Team signatures & centralized management (Pro feature)
* [ ] Integration with Gravatar and image cropping tool
* [ ] Export to SVG and VCF improvements

---

## ⚖️ License

This project is released under the MIT License. See `LICENSE` for details.

---

## 📬 Contact

Created by **Vivek Kumar Verma**. For questions or feature requests, open an issue or contact: `vivekverma807@users.noreply.github.com`

---

If you want, I can also:

* Add a polished README badge section (build/status/license)
* Generate example screenshots and include them in the README
* Create a GitHub Pages deployment guide or CI workflow
