import { deleteTask, toggleTaskStatus } from '../utilities/apiCalls'

export const Entry = ({ item, setItemList }) => {
  async function handleDelete() {
    const response = await deleteTask(item.id)

    if (!response.ok) {
      console.error(response)
    } else {
      setItemList(prev => prev.filter(e => e.id !== item.id))
    }
  }

  async function toggleDone() {
    const data = await toggleTaskStatus(item)
    setItemList(prev => prev.map(e => (e.id === data.id ? data : e)))
  }

  return (
    <div className='item-entry'>
      <div
        className={`check ${item.is_done ? 'done' : ''}`}
        onClick={toggleDone}
      />
      <span className='item-text'>{item.label}</span>
      <button onClick={handleDelete}>X</button>
    </div>
  )
}
