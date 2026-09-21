const fs = require('fs');
const path = require('path');
const pool = require('./pool');

async function run() {

    const seednew = fs.readFileSync(path.join(__dirname, 'seednew.sql'), 'utf8');

    const client = await pool.connect();
    try {
       
       
       
        await client.query(seednew);
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
