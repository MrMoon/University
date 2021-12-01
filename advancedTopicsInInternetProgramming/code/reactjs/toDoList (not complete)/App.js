import React, {useState, useRef} from 'react';
import ToDoList from './ToDoList';

const { v4: uuidv4 } = require('uuid');

function App() {
  //call usestate and pass it the default state which in our case is an empty array
  //destructure the return of useState
  const [todos, setTodoList]=useState([{id:1,name:'toDo1',completed:true}])
  const todoNameRef=useRef();
  
  function handleAddTodo(){
//here we need to set up the todos to one more todos
//get previous todos,add the new one, and then set our todos to the new todolist
const name= todoNameRef.current.value
if (name==='')return
console.log(name)
setTodoList(prevTodos => {
  return [...prevTodos, {id:uuidv4(), name:name,complete:false}]

})
todoNameRef.current.value=null

  }
  
  return (
    <>
   <ToDoList todos={todos}/> 
   <input ref= {todoNameRef} type="text"/>
   <button onClick={handleAddTodo}>Add toDo</button>
   <button>Clear completed toDos</button>
   <div>0 left to do</div>
   </>
   );
}

export default App;
