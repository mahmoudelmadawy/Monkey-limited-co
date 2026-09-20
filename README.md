# Monkey Limited Co.

A small full-stack website for a construction/engineering firm staffed by
monkeys. Engineers wear one of three helmet colors — **red**, **green**, or
**blue** — shown on the site's crew roster. Backend is Node.js/Express,
data lives in PostgreSQL. All artwork is hand-drawn SVG (no stock photos).

## Stack

- **Backend:** Node.js + Express
- **Database:** PostgreSQL (via `pg`)
- **Frontend:** plain HTML/CSS/JS served as static files (no build step)

## Project layout

```
monkey-limited-co/
├── server.js           Express app + API routes
├── db/
│   ├── pool.js          Postgres connection pool
│   ├── schema.sql        Table definitions
│   ├── seed.sql           Sample crew data (helmet colors included)
│   └── seed.js             Runs schema.sql + seed.sql against your DB
├── public/
│   ├── index.html        The site
│   ├── css/style.css      Styles
│   └── js/main.js          Fetches crew from the API, renders cards
├── .env.example
└── package.json
```

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a Postgres database**
   ```bash
   createdb monkey_limited_co
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # edit .env with your Postgres host/user/password
   ```

4. **Create tables and load sample data**
   ```bash
   npm run seed
   ```
   This creates the `engineers` and `messages` tables and inserts six
   sample engineers (two per helmet color).

5. **Start the server**
   ```bash
   npm start
   ```
   Visit `http://localhost:3000`.

## API

| Method | Route                          | Description                                  |
|--------|---------------------------------|-----------------------------------------------|
| GET    | `/api/engineers`                | List all engineers                            |
| GET    | `/api/engineers?helmet=red`     | List engineers by helmet color (red/green/blue) |
| POST   | `/api/engineers`                | Add a new engineer                            |
| POST   | `/api/messages`                 | Submit the contact form                       |
| GET    | `/api/health`                   | Check server + DB connectivity                |

Example `POST /api/engineers` body:
```json
{
  "name": "Wally Torquenut",
  "species": "Howler Monkey",
  "role": "Structural Engineer",
  "helmet_color": "red",
  "specialty": "Rope bridge tension",
  "bananas_per_day": 5
}
```

## Notes

- The `helmet_color` column is constrained to `red`, `green`, or `blue`
  at the database level (`CHECK` constraint in `schema.sql`).
- The frontend has no framework or build step — open `public/js/main.js`
  and `public/css/style.css` directly to edit it.
- To reset the sample data at any time, just run `npm run seed` again —
  it truncates and reloads the `engineers` table.
