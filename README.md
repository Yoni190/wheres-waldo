# Where’s Waldo

A web game where users find hidden characters in a large image, click on their locations, and get timed based on how fast they complete the round.

Typical use: open a level, click on the image to guess where a character is, and get instant feedback + a final completion time leaderboard entry.

[Live Preview](https://wheres-waldo-one-gamma.vercel.app/)

---

## What this project does

* Displays a large “Where’s Waldo”-style image
* Lets users click anywhere on the image
* Shows a targeting box with character options
* Sends selected coordinates to a backend for validation
* Marks correct finds directly on the image
* Tracks how long it takes to find all characters
* Saves results to a leaderboard

---

## Tech stack

* React (frontend)
* Express.js (backend)
* Prisma ORM
* PostgreSQL
* Tailwind CSS

---

## How it works (high level)

1. User opens a level
2. Backend starts a round and stores `startTime`
3. User clicks on image → normalized coordinates are calculated
4. User selects a character from dropdown
5. Backend checks if coordinates match stored bounding box
6. If correct:

   * character is set as found
   * feedback is sent
7. When all characters are found:

   * backend sets `endTime`
   * duration is calculated and stored
   * user enters name for leaderboard

---

## Setup

### Backend

```bash
cd backend
npm install
npx prisma migrate dev
node app.js
```

Create `.env`:

```
DATABASE_URL=your_postgres_url
PORT=your_port
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `.env`:

```
VITE_API_URL=your_backend_url
```

---

## Key feature: coordinate normalization

Screen sizes differ, so raw pixel positions are not reliable.

Instead, coordinates are stored and sent as percentages:

```js
const xPercent = (x / imageWidth) * 100
const yPercent = (y / imageHeight) * 100
```

Backend compares using stored bounding boxes:

```js
if (
  character.xMin <= x &&
  character.xMax >= x &&
  character.yMin <= y &&
  character.yMax >= y
)
```

---

## Leaderboard

Once all characters are found:

* user submits name
* round is saved with duration
* leaderboard sorts fastest times first

Example output:

```
1. Yoni - 7.1s
2. Alex - 9.4s
3. Sam - 12.0s
```

---

## Why this exists

This project is basically a real-world version of:

* click-based games
* image annotation tools
* basic multiplayer scoring systems

Compared to simpler tutorial apps, this one forces real problems:

* coordinate normalization
* game state tracking
* server-side timing (anti-cheat)
* relational database design

Alternatives like basic todo apps or CRUD blogs don’t touch these problems, so they don’t prepare you for interactive systems like this.

---

## Things I don’t like / known rough edges

* React StrictMode can trigger duplicate API calls in development
* Coordinate matching depends heavily on image scaling consistency
* No authentication (leaderboard is anonymous + name-based)
* Game rounds are not fully protected against replay/spam
* Leaderboard queries are simple and not optimized for large scale
* UI is functional but not fully polished or responsive on all screen sizes

---

## Extra ideas (not implemented)

* Real-time leaderboard updates
* Replay mode showing user clicks
* Different difficulty levels with smaller targets
* Account-based scoring instead of anonymous names

---

## Notes

This project intentionally mixes frontend and backend logic. The hardest parts are not React or Prisma — it’s keeping game state consistent across both.

---
