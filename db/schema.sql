-- Monkey Limited Co. database schema

CREATE TABLE IF NOT EXISTS engineers (
    id            SERIAL PRIMARY KEY,
    name          TEXT NOT NULL,
    species       TEXT NOT NULL DEFAULT 'Monkey',
    role          TEXT NOT NULL,
    helmet_color  TEXT NOT NULL CHECK (helmet_color IN ('red', 'green', 'blue')),
    specialty     TEXT NOT NULL,
    bananas_per_day INTEGER NOT NULL DEFAULT 4,
    joined_date   DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS messages (
    id         SERIAL PRIMARY KEY,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    body       TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
