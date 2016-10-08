import React from 'react'

import Footer from './Footer'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import '../App.css'

const TodoApp = () => (
  <Card className="Card-Container">
    <CardTitle 
      title='Todo App'/>
      <CardActions>
        <AddTodo />
      </CardActions>
      <TodoList />
      <Footer /> 
  </Card>
)
export default TodoApp