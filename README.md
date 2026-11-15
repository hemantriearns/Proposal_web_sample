# A Little Love Story 💗

A seven-page romantic proposal website built with plain HTML, CSS and JavaScript.

## 1. Open it in VS Code
1. Download and unzip `love-story-website.zip`.
2. Open the `love-story-website` folder in VS Code.
3. Install the **Live Server** extension.
4. Right-click `index.html` and choose **Open with Live Server**.

You can also open `index.html` directly in a browser, but Live Server is recommended.

## 2. Personalize the website
Open `script.js` and edit the `SETTINGS` object near the top:

- `recipientName`: the name or nickname you use for your loved one.
- `secretPassword`: the word they need to enter on the secret page.
- `specialDate`: the countdown target in `YYYY-MM-DDTHH:MM:SS` format.
- `musicFile`: path to your own MP3 file.

Example:
```js
const SETTINGS = {
  recipientName: "Aarohi",
  secretPassword: "starlight",
  specialDate: "2027-02-14T00:00:00",
  musicFile: "assets/music/romantic.mp3",
  musicStartsAutomatically: false
};
```

The music button starts playback after a user click because modern browsers generally block autoplay with sound. Add music you own or have permission to use as `assets/music/romantic.mp3`.

## 3. Replace photos
Open `memories.html`. Each gallery card has an image URL in both `data-photo` and `img src`.
Replace both occurrences for a card with the path to your own photo, for example:
`assets/images/memory-1.jpg`

Put your images in `assets/images/`. Use compressed JPG or WebP images for faster loading.

## 4. Edit the story
Open `journey.html` and replace the sample dates, headings and descriptions in each timeline card.
Open `letter.html` to personalize the little letter on the paper.
Open `proposal.html` to change the proposal question and final love letter.

## 5. Change the secret password
The password check runs in front-end JavaScript. It is a playful surprise gate, **not secure authentication**: anyone who inspects the website source can discover the password. Do not use it to protect private or sensitive information.

## 6. Website pages
- `index.html` — Welcome
- `secret.html` — Secret password
- `letter.html` — Animated envelope
- `memories.html` — Photo gallery and lightbox
- `journey.html` — Story timeline
- `countdown.html` — Live countdown
- `proposal.html` — Proposal, celebration and replay
- `style.css` — Shared design and responsive styles
- `script.js` — Navigation, interactions, music, countdown and confetti

## 7. Before publishing
- Replace all sample photos and text.
- Add your licensed/original MP3.
- Set the correct special date and password.
- Test every page and button on desktop and mobile.
- Make sure your photo subjects have agreed to have the photos shared.
- Publish the folder using Netlify or Vercel static hosting.

## Notes
- Google Fonts and the sample Unsplash photos require an internet connection.
- Music is intentionally user-triggered; browsers commonly prevent autoplay with sound.
- This is a static website. The secret password and story content are visible in the client-side source.
