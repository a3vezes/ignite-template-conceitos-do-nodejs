const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

function getTodo(request) {
  return request.user.todos.filter((item) => item.id == request.params.id)[0];
}

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers 

  const user = users.find(user => user.username === username)

  if(!user){
      return response.status(400).json({error: 'User Not Found'})
  }

  request.user = user

  return next()
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
  return response.json(request.user.todos)
}); 

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body 

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  };

  request.user.todos.push(todo)

  return response.status(201).json(todo)
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body

  const todo = getTodo(request)

  if(!todo) return response.status(404).json({error: 'Todo Not Found'})

  todo.title = title
  todo.deadline = new Date(deadline) 

  return response.json(todo)
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const todo = getTodo(request)

  if(!todo) return response.status(404).json({error: 'Todo Not Found'})

  todo.done = !todo.done

  return response.json(todo)
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;