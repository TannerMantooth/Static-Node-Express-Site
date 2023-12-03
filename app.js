//Import all required dependencies
const express = require("express");
const { projects } = require("./data.json");
const app = express();

//Setting the view engine and static method
app.set("view engine", "pug");
app.use("/static", express.static("public"));

//Main route that renders index.pug
app.get("/", (req, res) => {
  res.render("index", { projects });
});

//About route that renders about.pug
app.get("/about", (req, res) => {
  res.render("about");
});

//Dyanmic Project route that renders the project.pug template
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

//404 Error handler
app.use((req, res, next) => {
  res.status(404).render("page-not-found");
});

//Global Error Handler
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).render("page-not-found", { err });
  } else {
    err.message =
      err.message ||
      "Oh no! It looks like something went wrong with the server.";
    res.status(err.status || 500).render("error", { err });
  }
});

//Initiating server and setting port to 3000
app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});
