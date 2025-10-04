/**
 * Dashboard data routes
 */

const express = require('express');
const { pool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

// Get dashboard stats by role
router.get('/stats/:role/:userId?', async (req, res) => {
  try {
    const { role, userId } = req.params;
    let result;

    switch (role) {
      case 'student':
        result = await pool.query(`
          SELECT metric, value, label, description 
          FROM student_dashboard_view 
          WHERE user_id = $1
        `, [userId]);
        break;
        
      case 'teacher':
        result = await pool.query(`
          SELECT metric, value, label, description 
          FROM teacher_dashboard_view 
          WHERE user_id = $1
        `, [userId]);
        break;
        
      case 'admin':
      case 'super-admin':
      case 'principal':
        result = await pool.query(`
          SELECT metric, value, label, description 
          FROM admin_dashboard_view
        `);
        break;
        
      default:
        return res.status(400).json({ error: 'Invalid role' });
    }
    
    res.json(result.rows);
  } catch (err) {
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get notifications for a user
router.get('/notifications/:userId', async (req, res) => {
  try {
    // Verify that the requesting user has permission to access these notifications
    const { userId } = req.params;
    if (req.user.id !== userId && !['admin', 'super-admin', 'principal'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const result = await pool.query(`
      SELECT n.*, un.is_read, un.read_at 
      FROM notifications n
      JOIN user_notifications un ON n.id = un.notification_id
      WHERE un.user_id = $1 
      ORDER BY n.created_at DESC 
      LIMIT 10
    `, [userId]);
    
    res.json({ data: result.rows, error: null });
  } catch (err) {
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get calendar events for a user
router.get('/events/:userId', async (req, res) => {
  try {
    // Verify that the requesting user has permission to access these events
    const { userId } = req.params;
    if (req.user.id !== userId && !['admin', 'super-admin', 'principal'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    const result = await pool.query(`
      SELECT * FROM events 
      WHERE is_public = true OR created_by = $1
      ORDER BY start_date ASC 
      LIMIT 20
    `, [userId]);
    
    res.json({ data: result.rows, error: null });
  } catch (err) {
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark notification as read
router.put('/notifications/:notificationId/read', async (req, res) => {
  try {
    const { notificationId } = req.params;
    const result = await pool.query(`
      UPDATE user_notifications 
      SET is_read = true, read_at = NOW()
      WHERE notification_id = $1 AND user_id = $2
      RETURNING *
    `, [notificationId, req.user.id]);
    
    if (result.rows.length === 0) {
      // If no user_notification exists, create one
      const createResult = await pool.query(`
        INSERT INTO user_notifications (notification_id, user_id, is_read, read_at)
        VALUES ($1, $2, true, NOW())
        RETURNING *
      `, [notificationId, req.user.id]);
      
      return res.json({ data: createResult.rows[0], error: null });
    }
    
    res.json({ data: result.rows[0], error: null });
  } catch (err) {
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;