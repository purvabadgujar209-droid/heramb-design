# Heramb Designing & Printing — Website Guide (No Coding Needed)

Your website has 5 pages that all share one look:

| File            | Page                |
|------------------|----------------------|
| index.html       | Home                |
| profile.html     | Profile / About      |
| projects.html    | Recent Projects      |
| reviews.html     | Customer Reviews     |
| payment.html     | Payment & Enquiry    |

Two more files run the design behind the scenes — you won't need to touch these:
`styles.css` (colors/layout) and `script.js` (menu, filters, form).
The `images` folder holds your logo (already made transparent for you).

---

## 1. Put it online for FREE in 2 minutes (Netlify)

1. Go to **https://app.netlify.com/drop**
2. Drag your whole `heramb-website` folder into the box on that page.
3. Netlify gives you a live link instantly (like `heramb-design.netlify.app`).
4. To use your own domain name later (e.g. herambdesigning.com), go to
   **Site settings → Domain management → Add a custom domain** and follow the prompts.

That's it — your site is live and anyone can visit it.

---

## 2. How to edit text (no coding)

1. Open the folder, right-click the page you want to edit (e.g. `index.html`),
   and choose **Open with → Notepad** (Windows) or **TextEdit** (Mac, then
   turn off rich text: Format → Make Plain Text).
2. Use **Find** (Ctrl+F / Cmd+F) to locate the sentence you want to change.
3. Type your new text between the same `<` `>` tags — don't delete the tags themselves.
4. Save the file and refresh your browser to preview.

**Example** — to change the phone number, search for `9579480187` in every page
and replace it with your number. It appears in the footer of every page and
in the WhatsApp links (`https://wa.me/91...`).

---

## 3. Things you should personalize before going live

- [ ] **Bank details** — open `payment.html`, search for `XXXX` and replace
      with your real account number, IFSC code, and bank/branch name.
- [ ] **UPI ID** — already set to `9421990387@ybl` in `payment.html` and
      `script.js`. If it ever changes, search both files for `9421990387@ybl`
      and replace every occurrence, and also update `UPI_ID` in `backend/.env`.
- [ ] **Social media links** — search for `href="#"` next to the Instagram
      and Facebook icons (in every page's footer) and replace `#` with your
      real profile links.
- [ ] **Project photos** — in `projects.html`, each project has a colored
      block instead of a photo. Save your photos into the `images` folder,
      then replace a block like:
      `<div class="project-thumb t1"><span class="tag">Branding</span></div>`
      with:
      `<div class="project-thumb" style="background:url('images/your-photo.jpg') center/cover;"><span class="tag">Branding</span></div>`
- [ ] **Reviews** — swap the sample names/quotes in `reviews.html` and
      `index.html` for real customer feedback whenever you have it.

---

## 4. Payment page — now live and connected to your UPI account

`payment.html` now shows a **real, scannable QR code** generated straight
from your UPI ID (`9421990387@ybl`). Anyone who scans it — or taps
**"Pay Now via UPI App"** on their phone — is taken straight to their UPI
app with your account already filled in as the payee. Money goes directly
into your bank account the normal UPI way; this site never touches or holds
the money itself.

If a customer types an amount into the box above the QR code, that amount
gets pre-filled in their UPI app too (they can still edit it before paying).

## 5. Backend — stores every customer's details for you

The "Send Us an Enquiry" form on `payment.html` now saves each submission
(name, phone, service, amount, message) into a small database, which you can
view any time at `admin.html` on your site, protected by a password only you
know.

**This needs one extra step you (or I) do once**: deploying the small
`backend` folder so it's live on the internet. See `backend/DEPLOY.md` for
step-by-step instructions (free, takes about 5 minutes on Render). After
that, you just edit one line in `config.js` to point the website at it.

Until the backend is deployed, the enquiry form will show a friendly
"couldn't reach the server" message and customers should be directed to
WhatsApp instead — nothing breaks.

---

## 6. Need changes later?

Just come back and tell me what you'd like adjusted (new colors, new
sections, real project photos added, the enquiry form connected to email,
etc.) — I can update the files for you any time.
