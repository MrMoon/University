import React from 'react'
import Todo from './Todo'

//you can return 
export default function ToDoList({todos}) {
    return (
       todos.map(todo=>{
        return <Todo key={todo.id} todo={todo} /> 
       })
    )
}

