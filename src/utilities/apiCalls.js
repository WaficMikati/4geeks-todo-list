const BASE = 'https://playground.4geeks.com/todo'
const USER = 'wrm'

export async function checkUserExistsOrCreate() {
  const response = await fetch(`${BASE}/users/${USER}`)

  if (!response.ok) {
    const createdRes = await fetch(`${BASE}/users/${USER}`, { 
      method: 'POST'
    })

    const createdData = await createdRes.json()

    return createdData
  }
  else {
    const data = await response.json()
    
    return data
  }
}

export async function addTask (taskText) {
  const response = await fetch(`${BASE}/todos/${USER}`, {
    method: 'POST',
    headers: {'content-type':'application/json', accept:'application/json'},
    body: JSON.stringify({
      'label': taskText,
      'is_done': false
    })
  })
  const data = await response.json()

  return data
}

export async function deleteTask (id) {
  const response = await fetch(`${BASE}/todos/${id}`, {
    method: 'DELETE',
    headers: {'content-type':'application/json', accept:'application/json'}
  })

  return response
}

export async function toggleTaskStatus(item) {
  const response = await fetch(`${BASE}/todos/${item.id}`, {
    method: 'PUT',
    headers: {'content-type':'application/json', accept:'application/json'},
    body: JSON.stringify({
      'label':item.label,
      'is_done': !item.is_done
    })
  })
  const data = response.json()

  return data
}
