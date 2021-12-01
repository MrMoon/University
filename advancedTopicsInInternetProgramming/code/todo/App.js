import React, {useState, useRef, useEffect} from 'react';
import ToDoList from './ToDoList';

const { v4: uuidv4 } = require('uuid');
//to install uuid4 : npm i uuid
function App() {
  //call usestate and pass it the default state which in our case is an empty array
  //destructure the return of useState
  const [todos, setTodoList]=useState([{id:1,name:'toDo1',completed:true}])
  const todoNameRef=useRef();
 const LOCALSTORAGEKEY="todoApp.todo";
  //useEffect is a function 

  //useEffect to get todosis a function 
  useEffect(()=>{
    const storedToDos=JSON.parse(localStorage.getItem(LOCALSTORAGEKEY))
    if (storedToDos) setTodoList(storedToDos)
  },[])//empty list of dependencies so that it runs once


  //storing todos
  useEffect(()=>{
    localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify((todos)))
  },[todos])
 
 //this function will allow us to toggle the todos

//to use this function we need to pass it down into our todo list
 function toggleTodo(id){//id of todo we want to toggle
  const newToDos=[...todos]//create copy f our todos and then modify it
  
  
  const todo=newToDos.find(todo=>todo.id===id)
   //get the todo we are tying to toggle
   
   
   todo.complete=!todo.complete
   setTodoList(newToDos)

 }
 
  //everytime we refresh the page, the todolist no longer
  //shows the todos..the todos are not persisted across page reload
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
  
  function handleClear(){
    //set the todos to the new list that doesnt have any of the coplete ones
  const newTodos=todos.filter(todo=>!todo.complete)
  setTodoList(newTodos)
  }
  return (
    <>
   <ToDoList todos={todos} toggleTodo={toggleTodo}/> 
   <input ref= {todoNameRef} type="text"/>
   <button onClick={handleAddTodo}>Add toDo</button>
   <button onClick={handleClear}>Clear completed toDos</button>
  
 <div>{todos.filter(todo=>!todo.complete).length}left to do</div>
  
   </>
   );
}

export default App;
