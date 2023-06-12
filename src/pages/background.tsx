import inscriptions from '../data/inscriptions.json'

import DarkPurple from '../assets/background/dark purple.png'
import DarkGray from '../assets/background/dark gray.png'
import Gradient from '../assets/background/gradient.png'
import Jade from '../assets/background/jade.png'
import Mint from '../assets/background/mint.png'
import LightGray from '../assets/background/light gray.png'
import Smoky from '../assets/background/smoky.png'
import Lime from '../assets/background/lime.png'
import Orange from '../assets/background/orange.png'
import LightPurple from '../assets/background/light purple.png'
import { useEffect, useState } from 'react'
import Loading from '../components/loading'
import query from '../apis/query'
import { Inscription } from '../types'
import update from '../apis/update'

const attributes = [
  {
    img: DarkPurple,
    value: 'Dark Purple',
  },
  {
    img: DarkGray,
    value: 'Dark Gray',
  },
  {
    img: Gradient,
    value: 'Gradient',
  },
  {
    img: Jade,
    value: 'Jade',
  },
  {
    img: Mint,
    value: 'Mint',
  },
  {
    img: LightGray,
    value: 'Light Gray',
  },
  {
    img: Smoky,
    value: 'Smoky',
  },
  {
    img: Lime,
    value: 'Lime',
  },
  {
    img: Orange,
    value: 'Orange',
  },
  {
    img: LightPurple,
    value: 'Light Purple',
  },
]

const Background = () => {
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
    if (index <= 2080) {
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
        (item) => item.trait_type === 'Background'
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
      <div className="link">
        <a href="/background">背景颜色</a>
        <a href="/head">头</a>
        <a href="/body">身体</a>
        <a href="/eye">眼睛</a>
        <a href="/mouth">嘴巴</a>
        <a href="/clothes">衣服</a>
      </div>
      <div className="container">
        {!loading && (
          <p className="value">
            <span style={{ fontWeight: 'bold' }}>当前进度：</span>
            {index + 1} / 2082
          </p>
        )}
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

export default Background
