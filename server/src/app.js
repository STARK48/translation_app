const express = require("express");
const app = express();
const cors = require("cors");
const projectsRoutes = require("./routes/projects");
const languagesRoutes = require("./routes/languages");
const translationsRoutes = require("./routes/translations");

app.use(cors({ 
  origin: "http://localhost:4000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.use("/projects", projectsRoutes);
app.use("/languages", languagesRoutes);
app.use("/translations", translationsRoutes);

module.exports = app;
