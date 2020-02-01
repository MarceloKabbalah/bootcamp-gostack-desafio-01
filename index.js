const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let requests = 0;

// Middleware
function checkProjectsExists(req, res, next) {
  const project = projects.find(project => project.id == req.params.id);
  if(!project) {
    return res.status(400).json('Project Does Not Exists!');
  }
  return next();
}

server.use((req, res, next) => {
  console.log('Requests: ' + ++requests);

  return next();
})

// Routes
server.post('/projects', (req, res) => {
  const data = {
    id: req.body.id,
    title: req.body.title,
    tasks: []
  }
  projects.push(data);

  return res.send('Project Was Successfully Added!');
})

server.get('/projects/', (req, res) => {

  return res.json(projects);
});

server.put('/projects/:id', checkProjectsExists, (req, res) => {
  const project = projects.find(project => project.id == req.params.id);
  project.title = req.body.title;

  return res.json(project);
})

server.delete('/projects/:id', checkProjectsExists, (req, res) => {
  const index = projects.findIndex(project => project.id == req.params.id);
  project.splice(index, 1);

  return res.send('Project Was Successfully Deleted!');
})

server.post('/projects/:id/tasks', checkProjectsExists, (req, res) => {
  const project = projects.find(project => project.id == req.params.id);
  project.tasks.push(req.body.title);

  return res.send('Task Was Successfuly Added!')
})

server.listen(3000);