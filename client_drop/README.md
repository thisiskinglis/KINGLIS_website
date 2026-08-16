# KINGLIS Client Drop - README

This folder powers your remote client document POP system. No exe, no Supabase, no server to keep on. 100% GitHub Pages.

### How it works
1.  You commit files to `client_drop/files/CLIENTCODE/` via `admin.html`
2.  `admin.html` updates `manifest.json`
3.  GitHub Pages deploys (~60s)
4.  Client page `index.html?c=CLIENTCODE` polls `manifest.json` every 10s
5.  When new file appears, browser shows Windows notification: **"KINGLIS has sent you files"**

Client needs to open their link once and click "Enable POP Notifications". No install.

### Folder Structure
```
client_drop/
├── index.html          # Client-facing page - what clients open (?c=CLIENT001)
├── admin.html          # Your private drop page - you drag files here
├── manifest.json       # Auto-generated list of files per client
├── README.md           # This file
└── files/
    ├── CLIENT001/      # Files for CLIENT001
    ├── CLIENT002/      # Files for CLIENT002
    └── .gitkeep
```

### Setup (One-time)

1.  **Rename to lowercase** (important on GitHub Pages):
    - `index.html` (not Index.html)
    - `admin.html`
    - `manifest.json`

2.  **Enable GitHub Pages:**
    Repo > Settings > Pages > Branch: `main` / `/(root)` > Custom domain: `thisiskinglis.com` > Save

3.  **Create a Personal Access Token (PAT):**
    - Go to: https://github.com/settings/tokens/new
    - Note: `KINGLIS`
    - Expiration: 90 days
    - Select scope: Tick `repo`
    - Generate token > Copy `ghp_...`

4.  **Test:**
    - Open `https://thisiskinglis.com/client_drop/admin.html`
    - Paste PAT, Repo: `thisiskinglis/KINGLIS_website`, Client: `CLIENT001`
    - Drag a file > SEND
    - Check repo - you should see a new commit
    - Open incognito: `https://thisiskinglis.com/client_drop/?c=CLIENT001` > you should see the file

### How to add a new client

1.  In GitHub, go to `client_drop/files/` > Add file > Create new file > Name: `CLIENT002/.gitkeep` > Commit
2.  Send client their link: `https://thisiskinglis.com/client_drop/?c=CLIENT002`
    - Example: `?c=ABC123` or `?c=john@email.com` - any code you want, uppercase.

### How to send files (daily use)

1.  Open `https://thisiskinglis.com/client_drop/admin.html`
2.  Enter Client Code (must match what you sent them)
3.  Drag & drop 1-5 files (PDF, DOCX, any) or click box to select
4.  Click `SEND - Commit to GitHub`
5.  Wait for `✓ DONE!` in log
6.  Client gets POP in ~60-90s after GitHub Pages finishes deploying.

No-PAT fallback: If admin.html fails, you can manually go to `client_drop/files/CLIENT001/` > Add files > Upload files > Commit, then edit `manifest.json` manually.

### Client Experience

1.  They open `https://thisiskinglis.com/client_drop/?c=CLIENT001`
2.  They see "Enable POP Notifications" > Click > Allow
3.  Page says "Connected - checking every 10s"
4.  When you send, Windows shows native notification even if browser is closed (if they allowed)
5.  Clicking notification opens download.

### Security Notes

- `admin.html` is public if someone guesses the URL. It is safe because your PAT is stored only in YOUR browser's localStorage, not in the file. But add a PIN if you want.
- To hide admin from Google, add to root `robots.txt`: `Disallow: /client_drop/admin.html`
- Files in `files/` are public to anyone with the link. For sensitive docs, use client codes that are hard to guess (e.g., `CLIENT001_X7K9P2`)
- GitHub has 100MB per file limit, 1GB soft repo limit. Good for docs, not for videos.

### Troubleshooting

- **Click to select not working:** Use the fixed label version of admin.html (whole dashed box is a <label>). Hard refresh Ctrl+Shift+R.
- **File not showing on client:** Wait 60-90s for Pages deploy. Check Actions tab for green tick. Hard refresh client page.
- **Long filename with numbers:** Use the cleaned `index.html` version that strips timestamp prefix for display.
- **Manifest not found:** Ensure `manifest.json` is lowercase and in `client_drop/` root.

### Links

- Admin: `https://thisiskinglis.com/client_drop/admin.html`
- Client example: `https://thisiskinglis.com/client_drop/?c=CLIENT001`
- PAT creation: `https://github.com/settings/tokens/new`

Built for KINGLIS - remote clients, no exe blockers, 100% GitHub.
