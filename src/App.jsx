import './App.css'
import { useState, useEffect } from 'react'
import { checkUserExistsOrCreate, addTask, deleteTask, toggleTaskStatus } from './utilities/apiCalls'

function App() {
  const BASE = "https://playground.4geeks.com/todo"
  const USER = "waficmikati"

  let [resp, setResponse] = useState('')
  let [taskText, setTaskText] = useState('')
  let [taskList, setTasklist] = useState([])

  useEffect(() => {
    (async () => {
      try {
        await checkUserExistsOrCreate(BASE, USER, setResponse, setTasklist)
      } catch(err) {
        console.error('Load failed:', err);
        setResponse('Failed to load. Check console.');
      }
    })()
  }, [])

  function changeTaskText(event) {
    setTaskText(event.target.value)
  }

  async function handleClick(e, cmd) {
    switch(cmd) {
      case 'add':
        if (taskText.length < 1) break
        await addTask(BASE, USER, taskText, setTasklist)
        break
      case 'delete':
        await deleteTask(BASE, e.id, setTasklist)
        break
      case 'check':
        await toggleTaskStatus(BASE, e, setTasklist)
        break
      default:
        break
    }
  }

  return (
    <div id="main">
      <h1>{resp}</h1>
      <div id='task-input'>
        <input type='text' value={taskText} onChange={changeTaskText} placeholder='Enter Task' />
        <button onClick={() => handleClick(-1, 'add')}>+</button>
      </div>
      <div id='task-list'>
        {taskList.map((e, i) => 
          <div key={i} className='task-entry'>
            {e.id && <button 
              className={`${e.is_done ? 'done' : ''}`} 
              onClick={() => handleClick(e, 'check')}>
            </button>}
            {e.label && <span>{e.label}</span>}
            {e.id && <button 
                id="temp" 
                onClick={() => handleClick(e, 'delete')}>
                DEL
              </button>}
          </div>
        )}
      </div> 
    </div>
  )
}

export default App
