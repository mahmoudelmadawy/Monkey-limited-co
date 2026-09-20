const { Pool } = require('pg');
require('dotenv').config();

// Uses DATABASE_URL if present, otherwise falls back to PG* env vars
// (PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD), which `pg` reads
// automatically.
const pool = new Pool(
    process.env.DATABASE_URL
        ? { connectionString: process.env.DATABASE_URL }
        : undefined
);

pool.on('error', (err) => {
    console.error('Unexpected error on idle Postgres client', err);
});

module.exports = pool;
