const express = require('express');
const path = require('path');
require('dotenv').config();
const pool = require('./db/pool');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const VALID_HELMETS = ['red', 'green', 'blue'];

// GET all engineers, optionally filtered by helmet color: /api/engineers?helmet=red
app.get('/api/engineers', async (req, res) => {
    try {
        const { helmet } = req.query;
        let result;
        if (helmet) {
            if (!VALID_HELMETS.includes(helmet)) {
                return res.status(400).json({ error: 'helmet must be red, green, or blue' });
            }
            result = await pool.query(
                'SELECT * FROM engineers WHERE helmet_color = $1 ORDER BY joined_date',
                [helmet]
            );
        } else {
            result = await pool.query('SELECT * FROM engineers ORDER BY joined_date');
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not reach the crew database.' });
    }
});

// POST a new engineer (e.g. from an admin form)
app.post('/api/engineers', async (req, res) => {
    try {
        const { name, species, role, helmet_color, specialty, bananas_per_day } = req.body;
        if (!name || !role || !helmet_color || !specialty) {
            return res.status(400).json({ error: 'name, role, helmet_color, and specialty are required' });
        }
        if (!VALID_HELMETS.includes(helmet_color)) {
            return res.status(400).json({ error: 'helmet_color must be red, green, or blue' });
        }
        const result = await pool.query(
            `INSERT INTO engineers (name, species, role, helmet_color, specialty, bananas_per_day)
             VALUES ($1, $2, $3, $4, $5, COALESCE($6, 4))
             RETURNING *`,
            [name, species || 'Monkey', role, helmet_color, specialty, bananas_per_day]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not hire this engineer.' });
    }
});

// POST a contact-form message
app.post('/api/messages', async (req, res) => {
    try {
        const { name, email, body } = req.body;
        if (!name || !email || !body) {
            return res.status(400).json({ error: 'name, email, and body are required' });
        }
        const result = await pool.query(
            'INSERT INTO messages (name, email, body) VALUES ($1, $2, $3) RETURNING id, created_at',
            [name, email, body]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Message got lost in the canopy. Try again.' });
    }
});

app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'ok', db: 'connected' });
    } catch (err) {
        res.status(500).json({ status: 'error', db: 'unreachable' });
    }
});

app.listen(PORT, () => {
    console.log(`Monkey Limited Co. is open for business on http://localhost:${PORT}`);
});
