const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await pool.query("SELECT * FROM projects WHERE id = $1", [projectId]);
    const languages = await pool.query(
      "SELECT l.* FROM languages l JOIN project_languages pl ON pl.language_id = l.id_lng WHERE pl.project_id = $1", [projectId]
    );
    const files = await pool.query(
      "SELECT tf.* FROM translations_files tf JOIN project_files pf ON pf.file_id = tf.file_id WHERE pf.project_id = $1", [projectId]
    );
    res.json({
      ...project.rows[0],
      languages: languages.rows,
      translation_files: files.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { name, description, languages, translations_files } = req.body;
  try {
    const result = await pool.query("INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING id", [name, description]);
    const projectId = result.rows[0].id;

    for (const lng of languages) {
      await pool.query("INSERT INTO project_languages (project_id, language_id) VALUES ($1, $2)", [projectId, lng]);
    }

    for (const fileId of translations_files) {
      await pool.query("INSERT INTO project_files (project_id, file_id) VALUES ($1, $2)", [projectId, fileId]);
    }

    res.status(201).json({ id: projectId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
