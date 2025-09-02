export async function checkUserExistsOrCreate(BASE, USER, setResponse, setTasklist) {
  const response = await fetch(`${BASE}/users/${USER}`)

  if (!response.ok) {
    setResponse(`Created user: ${USER}`)
    const createRes = await fetch(`${BASE}/users/${USER}`, { 
      method: 'POST'
    })

    const createData = await createRes.json()
    setTasklist(createData.todos)
    return createData
  }
  else {
    setResponse(`Hello ${USER}!`)
    const data = await response.json()
    setTasklist(data.todos)
    return data
  }
}

export async function addTask (BASE, USER, taskText, setTasklist) {
  const response = await fetch(`${BASE}/todos/${USER}`, {
    method: 'POST',
    headers: {'content-type':'application/json', accept:'application/json'},
    body: JSON.stringify({
      'label': taskText,
      'is_done': false
    })
  })

  const data = await response.json()
  console.log(data)
  setTasklist(prev => [data,...prev])
}

export async function deleteTask (BASE, id, setTasklist) {
  const response = await fetch(`${BASE}/todos/${id}`, {
    method: 'DELETE',
    headers: {'content-type':'application/json', accept:'application/json'}
  })

  setTasklist(prev => prev.filter(task => task.id !== id))
}

export async function toggleTaskStatus(BASE, e, setTasklist) {
  const response = await fetch(`${BASE}/todos/${e.id}`, {
    method: 'PUT',
    headers: {'content-type':'application/json', accept:'application/json'},
    body: JSON.stringify({
      'label':e.label,
      'is_done': !e.is_done
    })
  })

  const data = await response.json()
  setTasklist(prev => prev.map(ele => ele.id === data.id ? data : ele))
}
