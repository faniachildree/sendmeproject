# Send Me Project — Website

A multi-page website for the Send Me Project humanitarian nonprofit, with a built-in content manager.

## How to put this online with GitHub Pages

1. **Create a free account** at [github.com](https://github.com).
2. Click the **+** (top-right) → **New repository**. Name it `send-me-project`, set it **Public**, and click **Create repository**.
3. On the new repo page, click **Add file → Upload files**.
4. Drag **everything inside this folder** into the upload box — including `index.html`, all the `.jsx` files, `styles.css`, `image-slot.js`, the `assets` folder, and the hidden `.nojekyll` file. Then click **Commit changes**.
5. Go to **Settings → Pages**. Under **Branch**, choose **main** and **/ (root)**, then **Save**.
6. Wait 1–2 minutes, refresh the Pages settings page, and your live link will appear:
   `https://<your-username>.github.io/send-me-project/`

Share that link with anyone — donors, board candidates, partners.

## Editing content (the CMS)
- Add `#/admin` to the end of your site link to open the **Content Manager**
  (e.g. `https://<username>.github.io/send-me-project/#/admin`).
- Edit any page's text, team members, regions, products, and photos with simple forms.
- Changes save automatically **in that browser**. Use **Export** to download a backup
  file, and **Import** on another computer to load the same content.
- **Bookmark the `#/admin` link** — there is no visible "edit" button on the public site,
  so visitors never see the editor.

## To update the site later
Re-upload the changed file(s) in the repo (or use the edit pencil). The live site refreshes within a minute or two.

## Good to know
- An internet connection is required to view the site (it loads React, Babel, and Google Fonts from public CDNs).
- The contact, get-involved, give, and shop forms are **prototype-only** — they show a confirmation but don't send, store, or charge anything yet.
- The "Tweaks" design panel stays hidden on the public site; it's an editing tool, not a public feature.

## File overview
- `index.html` — the entry page (loads everything)
- `app.jsx` — routing + theming
- `content.jsx` — all editable site content (the CMS reads/writes this)
- `cms.jsx` — the Content Manager at `#/admin`
- `pages-*.jsx` — one file per page (home, about, board, projects, involved, donate, financials, contact, shop, pictures)
- `components.jsx`, `pages-common.jsx`, `emblem.jsx`, `icons.jsx`, `i18n.jsx`, `worldmap-data.jsx` — shared building blocks
- `styles.css` — brand styles (navy + gold)
- `assets/` — logos, board headshots, hero/story images
