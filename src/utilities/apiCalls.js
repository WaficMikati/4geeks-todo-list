export const checkUserExistsOrCreate = (BASE, USER, setResponse, setTasklist) => {
  fetch(`${BASE}/users/${USER}`)
    .then(response => {
      if (!response.ok) {
        setResponse('Created user.')
        return fetch(`${BASE}/users/${USER}`, {
          method: 'POST'
        })
      } 
      else {
        setResponse(`Hello ${USER}!`)
      }
      return response.json()
    }).then(data => setTasklist(data.todos))
}

export const addTask = (BASE, USER, taskText, setTasklist) => {
    fetch(`${BASE}/todos/${USER}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'label': taskText,
        'is_done': false,
      })
    })
    updateUi(BASE, USER, setTasklist)
  }

export const deleteTask = (BASE, USER, id, setTasklist) => {
    fetch(`${BASE}/todos/${id}`, {
      method: 'DELETE',
      headers: {'accept': 'application/json'}
    })
    updateUi(BASE, USER, setTasklist)
  }

const updateUi = (BASE, USER, setTasklist) => {
    console.log('checking')
    fetch(`${BASE}/users/${USER}`)
      .then(r => r.json())
      .then(d => setTasklist(d.todos))
  }
