const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

// { 
// 	id: 'uuid', // precisa ser um uuid
// 	name: 'Danilo Vieira', 
// 	username: 'danilo', 
// 	todos: []
// }

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers 

  if(users.some((user) => user.username === username)){
    request.user = this.user 
    return next()
  }

  return response.status(400).json({"error": "User not found"})
} 

app.post('/users', (request, response) => {
  const { username, name } = request.body

  if(users.some((user) => user.username === username)){
    return response.status(400).json({"error": "User already exists"})
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }

  users.push(user)

  return response.status(201).json(user)

});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;