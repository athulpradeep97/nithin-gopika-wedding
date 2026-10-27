# Nithin & Gopika – Wedding Reception Website

Static site (HTML, CSS, JS). Guest wishes are saved in Firebase Firestore (free tier); hosting is GitHub Pages.

## 1. Add your files
Put these in the folders (any missing image just shows a plain background):

| File | Used for |
|---|---|
| images/hero.jpg | faded hero backdrop |
| images/arch.jpg | arch photo under the hero |
| images/story.jpg | black & white photo (river stones) |
| images/reception.jpg | event card photo |
| images/family.jpg | family arch photo |
| images/closing.jpg | tea photo |
| images/footer.jpg | footer backdrop |
| images/og-thumb.jpg | WhatsApp/social preview, 1200x630 |
| audio/music.mp3 | background music (use a track you have rights to) |

Tip: resize photos to ~1600px wide, JPEG quality 80, to keep it fast on mobile data.

## 2. Set up guest wishes (Firebase, about 5 minutes)
1. Go to https://console.firebase.google.com, create a project (disable Analytics).
2. Build > Firestore Database > Create database > production mode > choose `asia-south1` (Mumbai).
3. Firestore > Rules tab: paste the contents of `firestore.rules`, then Publish.
4. Project settings (gear) > Your apps > Web (`</>`) > register app > copy the `firebaseConfig` values into `firebase-config.js`.

Until step 4 is done, the site still works but wishes are saved only in the visitor's own browser.

## 3. Test locally
Modules need a server, so don't double-click index.html:
    python3 -m http.server 8000
then open http://localhost:8000

## 4. Deploy to GitHub Pages
1. Create a new public repo on GitHub, e.g. `nithin-gopika-wedding`.
2. In this folder:
       git init
       git add .
       git commit -m "Wedding invitation"
       git branch -M main
       git remote add origin https://github.com/<your-username>/nithin-gopika-wedding.git
       git push -u origin main
3. Repo > Settings > Pages > Source: "Deploy from a branch", Branch: `main`, folder `/ (root)` > Save.
4. After about a minute the site is live at `https://<your-username>.github.io/nithin-gopika-wedding/`.
5. In Firebase, Authentication is not needed. If you add a custom domain later, nothing else changes.

## Moderation
Remove an inappropriate wish in Firebase console > Firestore > `wishes` > delete the document.

## Editing the content later
Open `site-config.js` (on GitHub: click the file, then the pencil icon), change the text, and Commit. The live site updates in 1 to 2 minutes. Empty values hide that line automatically.
