const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const inputCheck = require('../utils/inputCheck');

//  get all departments
router.get("/departments", (req, res) => {
    const sql = `SELECT departments.*, roles.title
      FROM roles
      LEFT JOIN departments
      ON roles.department_id = departments.id`;
  
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
  
  // get a single department
  router.get("/department/:id", (req, res) => {
    const sql = `SELECT * FROM departments.*, roles.title
          AS role_title
          LEFT JOIN departments
          ON roles.department_id = departments.id;
          WHERE departments.id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: row,
      });
    });
  });
  
  //  delete a department
  router.delete("/department/:id", (req, res) => {
    const sql = `DELETE FROM departments WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        res.json({
          message: "Department not found",
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
  
  // // create a department
  router.post("/department", ({ body }, res) => {
    const errors = inputCheck(body, "department_name");
    if (errors) {
      res.status(400).json({ error: err.message });
      return;
    }
    const sql = `INSERT INTO departments (department_name)
                  VALUES (?)`;
    const params = [body.department_name];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: body,
      });
    });
  });

  module.exports = router;