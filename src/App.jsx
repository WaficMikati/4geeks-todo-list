import './App.css'
import { useState, useEffect } from 'react'
import { checkUserExistsOrCreate, addTask, deleteTask } from './utilities/apiCalls'

function App() {
  const BASE = "https://playground.4geeks.com/todo"
  const USER = "waficmikati"
  let [resp, setResponse] = useState('')
  let [taskText, setTaskText] = useState('')
  let [taskList, setTasklist] = useState([])

  useEffect(() => {
    checkUserExistsOrCreate(BASE, USER, setResponse, setTasklist)
  }, [])

  function changeTaskText(event) {
    setTaskText(event.target.value)
  }

  function handleClick(id) {
    switch(typeof id === 'number' ? true : false) {
      case false:
        addTask(BASE, USER, taskText, setTasklist)
        break
      case true:
        console.log(id)
        deleteTask(BASE, USER, id, setTasklist)
        break
    }
  }

  return (
    <>
      <h1>{resp}</h1>
      <input type='text' value={taskText} onChange={changeTaskText} placeholder='Enter Task' />
      <button onClick={handleClick}>Add Task</button>
      <ul id='tasklist'>
        {taskList.map((e, i) => 
          <li key={i}>
            {e.id && <input type='checkbox' onClick={() => handleClick(e.id)}/>}
            {e.label}
            {e.id && <button onClick={() => handleClick(e.id)}>DEL</button>}
          </li>
        )}
      </ul> 
    </>
  )
}

export default App
