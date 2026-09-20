const fs = require('fs');
const path = require('path');
const pool = require('./pool');

async function run() {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');

    const client = await pool.connect();
    try {
        console.log('Creating schema...');
        await client.query(schema);
        console.log('Loading seed data...');
        await client.query(seed);
        console.log('Done. The crew is on site.');
    } finally {
        client.release();
        await pool.end();
    }
}

run().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
