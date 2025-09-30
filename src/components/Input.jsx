import { useState } from 'react'
import { addTask } from '../utilities/apiCalls'

export function Input({ setItemList }) {
  const [text, setText] = useState('')

  function updateText(e) {
    setText(e.target.value)
  }

  async function deleteAll() {}

  async function add() {
    if (text.length > 0) {
      const data = await addTask(text)
      setItemList(prev => [data, ...prev])
      setText('')
    }
  }

  return (
    <div id='input-group'>
      <input
        type='text'
        id='text-input'
        placeholder='Enter new item here'
        onChange={updateText}
        value={text}
      />
      <div id='btn-group'>
        <button onClick={add}>Add Item</button>
        <button onClick={deleteAll}>X</button>
      </div>
    </div>
  )
}
