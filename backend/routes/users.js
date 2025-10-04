/**
 * User management routes
 */

const express = require('express');
const bcrypt = require('bcrypt');
const { pool } = require('../config/database');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, email, first_name, last_name, role, status, phone, last_login, created_at 
      FROM users 
      ORDER BY created_at DESC
    `);
    // Combine first_name and last_name into name for compatibility
    const users = result.rows.map(user => ({
      ...user,
      name: `${user.first_name} ${user.last_name}`.trim()
    }));
    res.json(users);
  } catch (err) {
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT id, email, first_name, last_name, role, status, phone, address, date_of_birth, 
             emergency_contact, avatar_url, last_login, created_at 
      FROM users 
      WHERE id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Combine first_name and last_name into name for compatibility
    const user = {
      ...result.rows[0],
      name: `${result.rows[0].first_name} ${result.rows[0].last_name}`.trim()
    };
    
    res.json(user);
  } catch (err) {
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const { email, password, name, role, phone, address } = req.body;
    
    // Split name into first and last name
    const nameParts = name ? name.trim().split(' ') : ['', ''];
    const first_name = nameParts[0] || '';
    const last_name = nameParts.slice(1).join(' ') || '';
    
    // Check if user already exists
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    
    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);
    
    const result = await pool.query(`
      INSERT INTO users (email, password_hash, first_name, last_name, role, phone, address)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, email, first_name, last_name, role, status, phone, created_at
    `, [email, password_hash, first_name, last_name, role, phone, address]);
    
    // Combine first_name and last_name into name for compatibility
    const user = {
      ...result.rows[0],
      name: `${result.rows[0].first_name} ${result.rows[0].last_name}`.trim()
    };
    
    res.status(201).json(user);
  } catch (err) {
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, phone, address, status, avatar_url } = req.body;
    
    // Split name into first and last name
    const nameParts = name ? name.trim().split(' ') : ['', ''];
    const first_name = nameParts[0] || '';
    const last_name = nameParts.slice(1).join(' ') || '';
    
    const result = await pool.query(`
      UPDATE users 
      SET first_name = $1, last_name = $2, role = $3, phone = $4, address = $5, status = $6, avatar_url = $7, updated_at = NOW()
      WHERE id = $8
      RETURNING id, email, first_name, last_name, role, status, phone, address, avatar_url, updated_at
    `, [first_name, last_name, role, phone, address, status, avatar_url, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Combine first_name and last_name into name for compatibility
    const user = {
      ...result.rows[0],
      name: `${result.rows[0].first_name} ${result.rows[0].last_name}`.trim()
    };
    
    res.json(user);
  } catch (err) {
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;