### Tampopo

Small project created in Next.JS that integrates MangaDEX and Anilist APIs together to automatically update progress of currently reading Mangas.
To use it you will need to download the project and run it on a local server because MangaDEX blocks CORS

To install:

```bash
clone the project to your pc
navigate to Anilist dev page, create a new app and grab the ID
place the info inside components/nav ${clientID} and ${redirectURI} (just use http://localhost:3000)
npm run build
npm run start
login via Anilist
enjoy
```

Technologies used:
- TypeScript
- React/NextJS
- TailwindCSS
- React Query
- MangaDEX API (REST)
- Anilist API (GraphQL)
