// backend/routes/sdg.js
const express = require('express');
const router = express.Router();
const db = require('../config/db').promise();

// 1. Get all SDGs
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT sdg_ID, sdg_name, description FROM tb_sdgs');
    res.json({
      status: 'success',
      data: rows
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch SDGs',
      error: err.message
    });
  }
});

// 2. Get SDG Performance Trends (Line Chart)
router.get('/trends', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.created_year,
        SUM(p.total_points) as total_points,
        COUNT(DISTINCT p.sdg_ID) as sdg_count,
        COUNT(p.participation_id) as participation_count
      FROM tb_participation p
      GROUP BY p.created_year
      ORDER BY p.created_year;
    `);
    res.json({
      status: 'success',
      data: rows
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch SDG trends',
      error: err.message
    });
  }
});

// 3. Get Campus Comparison (Bar Chart)
router.get('/campus-stats', async (req, res) => {
  try {
    const [rows] = await db.query(`
      WITH CampusTotals AS (
        SELECT 
          UPPER(p.campus) as campus,
          s.sdg_name,
          SUM(p.total_points) as total_points,
          COUNT(p.participation_id) as participation_count,
          SUM(p.policy_research_count) as total_policy_research
        FROM tb_participation p
        JOIN tb_sdgs s ON p.sdg_ID = s.sdg_ID
        GROUP BY UPPER(p.campus), s.sdg_name
      )
      SELECT 
        campus,
        sdg_name,
        total_points,
        participation_count,
        total_policy_research
      FROM CampusTotals
      ORDER BY campus, total_points DESC;
    `);
    res.json({
      status: 'success',
      data: rows
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch campus statistics',
      error: err.message
    });
  }
});

// 4. Get SDG Distribution (Pie/Donut Chart)
router.get('/distribution', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        s.sdg_name,
        COUNT(p.participation_id) as participation_count,
        SUM(p.total_points) as total_points,
        COUNT(pc.participation_content_id) as project_count
      FROM tb_sdgs s
      LEFT JOIN tb_participation p ON s.sdg_ID = p.sdg_ID
      LEFT JOIN tb_participation_content pc ON p.participation_id = pc.participation_id
      GROUP BY s.sdg_name
      ORDER BY total_points DESC;
    `);
    res.json({
      status: 'success',
      data: rows
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch SDG distribution',
      error: err.message
    });
  }
});

// 5. Get Project Details (Radar Chart)
router.get('/project-details', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        pc.title_ppa,
        pc.description,
        pc.total_cost,
        pc.fund_source,
        pc.campus,
        s.sdg_name,
        p.total_points,
        p.policy_research_count,
        p.created_year
      FROM tb_participation_content pc
      JOIN tb_sdgs s ON pc.sdg_ID = s.sdg_ID
      JOIN tb_participation p ON pc.participation_id = p.participation_id
      ORDER BY p.created_year DESC, pc.campus;
    `);
    res.json({
      status: 'success',
      data: rows
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch project details',
      error: err.message
    });
  }
});

// 6. Get Yearly Progress
router.get('/yearly-progress', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.created_year,
        COUNT(p.participation_id) as total_participations,
        SUM(p.total_points) as total_points,
        COUNT(pc.participation_content_id) as total_projects,
        COUNT(DISTINCT p.campus) as active_campuses,
        SUM(p.policy_research_count) as total_policy_research
      FROM tb_participation p
      LEFT JOIN tb_participation_content pc ON p.participation_id = pc.participation_id
      GROUP BY p.created_year
      ORDER BY p.created_year;
    `);
    res.json({
      status: 'success',
      data: rows
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch yearly progress',
      error: err.message
    });
  }
});

// 7. Get Policy Research Analysis
router.get('/policy-research', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        s.sdg_name,
        SUM(p.policy_research_count) as total_policy_research,
        COUNT(p.participation_id) as participation_count,
        AVG(p.total_points) as avg_points
      FROM tb_participation p
      JOIN tb_sdgs s ON p.sdg_ID = s.sdg_ID
      GROUP BY s.sdg_name
      ORDER BY total_policy_research DESC;
    `);
    res.json({
      status: 'success',
      data: rows
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch policy research data',
      error: err.message
    });
  }
});

module.exports = router;
