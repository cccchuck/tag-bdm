import inscriptions from '../data/inscriptions.json'

import Brown1 from '../assets/body/brown1.png'
import Brown2 from '../assets/body/brown2.png'
import DarkBrown from '../assets/body/dark brown.png'
import Ghost from '../assets/body/ghost.png'
import Gold from '../assets/body/gold.png'
import Gray from '../assets/body/gray.png'
import Iron from '../assets/body/iron.png'
import LightBrown from '../assets/body/light brown.png'
import PurplePink from '../assets/body/purple pink.png'
import Rainbow from '../assets/body/rainbow.png'
import Skeleton from '../assets/body/skeleton.png'
import Snake from '../assets/body/snake.png'

import { useEffect, useState } from 'react'
import Loading from '../components/loading'
import query from '../apis/query'
import { Inscription } from '../types'
import update from '../apis/update'

const attributes = [
  {
    img: Brown1,
    value: 'Brown1',
  },
  {
    img: Brown2,
    value: 'Brown2',
  },
  {
    img: DarkBrown,
    value: 'DarkBrown',
  },
  {
    img: Ghost,
    value: 'Ghost',
  },
  {
    img: Gold,
    value: 'Gold',
  },
  {
    img: Gray,
    value: 'Gray',
  },
  {
    img: Iron,
    value: 'Iron',
  },
  {
    img: LightBrown,
    value: 'Light Brown',
  },
  {
    img: PurplePink,
    value: 'Purple Pink',
  },
  {
    img: Rainbow,
    value: 'Rainbow',
  },
  {
    img: Skeleton,
    value: 'Skeleton',
  },
  {
    img: Snake,
    value: 'Snake',
  },
]

const Body = () => {
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [currentValue, setCurrentValue] = useState<string>()

  const handleDecrementClick = () => {
    setLoading(true)
    if (index >= 1) {
      setIndex((index) => index - 1)
    }
  }

  const handleIncrementClick = () => {
    setLoading(true)
    if (index <= 2081) {
      setIndex((index) => index + 1)
    }
  }

  const handleImgClick = async (value: string) => {
    setLoading(true)
    const result = await update(inscriptions[index].id, 'Background', value)
    setLoading(false)
    if (result.success) {
      console.log('更新成功')
      handleIncrementClick()
    }
  }

  const initValue = async () => {
    const result = await query(inscriptions[index].id)
    if (result.success) {
      const attribute = (result.data as Inscription).meta.attributes.filter(
        (item) => item.trait_type === 'Body'
      )
      setCurrentValue(attribute[0].value || '暂无')
      setLoading(false)
    }
  }

  useEffect(() => {
    initValue()
  })

  return (
    <div className="app">
      <div className="container">
        <img
          className="bdmonkey"
          src={`https://ord-mirror.magiceden.dev/content/${inscriptions[index].id}`}
        />
        {!loading && (
          <p className="value">
            <span style={{ fontWeight: 'bold' }}>当前值：</span>
            {currentValue}
          </p>
        )}
        {loading && <Loading />}
        <div className="funcs">
          <button onClick={handleDecrementClick}>上一张</button>
          <button onClick={handleIncrementClick}>下一张</button>
        </div>
      </div>

      <div className="attributes">
        {attributes.map((item) => (
          <div key={item.value}>
            <img
              src={item.img}
              onClick={() => {
                handleImgClick(item.value)
              }}
            ></img>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Body
