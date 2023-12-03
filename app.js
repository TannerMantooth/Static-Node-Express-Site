const express = require("express");
const { projects } = require("./data.json");
const app = express();

app.set("view engine", "pug");
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { projects });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);
  if (project) {
    res.render("project", { project });
  } else {
    const err = new Error();
    err.status = 404;
    err.message = "Uh oh. The requested project does not exist.";
    next(err);
  }
});

app.use((req, res, next) => {
  res.status(404).render("page-not-found");
});

app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});
