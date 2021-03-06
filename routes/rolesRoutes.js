const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// get all roles
router.get("/roles", (req, res) => {
    const sql = `SELECT * FROM roles`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: rows,
      });
    });
  });
  
  // get single role
  router.get("/role/:id", (req, res) => {
    const sql = `SELECT * FROM roles WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: row,
      });
    });
  });
  
  // delete role
  router.delete("/role/:id", (req, res) => {
    const sql = `DELETE FROM roles WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        // check if anything was deleted
      } else if (!result.affectedRows) {
        res.status(200).json({
          message: "party not found",
        });
      } else {
        res.json({
          message: "deleted",
          changes: result.affectedRows,
          id: req.params.id,
        });
      }
    });
  });

  module.exports = router;