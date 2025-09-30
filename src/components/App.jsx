import '../styles/App.css'
import bgImg from '../assets/book.webp'
import bgAnim from '../assets/book.webp'
import bgAnimRev from '../assets/book-rev.webp'
import { useState, useEffect } from 'react'
import { Input } from './Input'
import { Entry } from './Entry'
import { checkUserExistsOrCreate } from '../utilities/apiCalls'
function App() {
  const [itemList, setItemList] = useState([])
  const [pages, setPages] = useState({ arr: [], current: 0 })
  const [isPlaying, setIsPlaying] = useState(false)
  const [direction, setDirection] = useState('forward')

  useEffect(() => {
    const test = async () => {
      try {
        const userData = await checkUserExistsOrCreate()
        setItemList(userData.todos.reverse())
      } catch (err) {
        console.error('Load failed:', err)
      }
    }
    test()
  }, [])

  useEffect(() => {
    const preloadAnim = new Image()
    const preloadAnimRev = new Image()
    preloadAnim.src = bgAnim
    preloadAnimRev.src = bgAnimRev
  }, [])

  const getPages = () => {
    const newArr = []
    if (itemList.length > 0) {
      newArr.push([itemList.slice(0, 7), itemList.slice(7, 15)])
    }
    for (let i = 15; i < itemList.length; i += 16) {
      newArr.push([itemList.slice(i, i + 8), itemList.slice(i + 8, i + 16)])
    }
    const newCurrent =
      pages.current >= newArr.length
        ? Math.max(0, newArr.length - 1)
        : pages.current
    setPages({ arr: newArr, current: newCurrent })
  }
  useEffect(() => {
    getPages()
  }, [itemList])

  const nextPage = () => {
    setDirection('forward')
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 1000)
    setPages(prev => {
      const next = prev.current + 1 < prev.arr.length ? prev.current + 1 : 0
      return { ...prev, current: next }
    })
  }

  const prevPage = () => {
    setDirection('reverse')
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 1000)
    setPages(prev => {
      const previous =
        prev.current - 1 < 0 ? prev.arr.length - 1 : prev.current - 1
      return { ...prev, current: previous }
    })
  }

  return (
    <div id='main-grid'>
      <img
        id='main-bg'
        src={
          isPlaying
            ? `${direction === 'reverse' ? bgAnimRev : bgAnim}?t=${Date.now()}`
            : bgImg
        }
      />
      <div
        id='todo-grid'
        className={isPlaying ? `fade-${direction}` : ''}
      >
        <div className='page left'>
          {!pages.current && <Input setItemList={setItemList} />}
          {pages.arr[pages.current] &&
            pages.arr[pages.current][0]?.map((e, i) => (
              <Entry
                item={e}
                setItemList={setItemList}
                key={i}
              />
            ))}
          {pages.current !== 0 && (
            <button
              className='btn-page prev'
              onClick={prevPage}
            >
              Prev Page
            </button>
          )}
        </div>
        <div className='page right'>
          {pages.arr[pages.current] &&
            pages.arr[pages.current][1]?.map((e, i) => (
              <Entry
                item={e}
                setItemList={setItemList}
                key={i}
              />
            ))}
          {itemList.length > 15 && (
            <button
              className={`btn-page ${
                pages.current === pages.arr.length - 1 ? 'home' : 'next'
              }`}
              onClick={nextPage}
            >
              {pages.current === pages.arr.length - 1
                ? 'Home Page'
                : 'Next Page'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
export default App
