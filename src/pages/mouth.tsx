import inscriptions from '../data/inscriptions.json'

import BlueCigar from '../assets/mouth/blue cigar.png'
import BlueLollipop from '../assets/mouth/blue lollipop.png'
import Chill from '../assets/mouth/chill.png'
import Pipe from '../assets/mouth/pipe.png'
import PurpleLollipop from '../assets/mouth/purple lollipop.png'
import Rainbow from '../assets/mouth/rainbow.png'
import RedCigar from '../assets/mouth/red cigar.png'
import RedLollipop from '../assets/mouth/red lollipop.png'
import Smile from '../assets/mouth/smile.png'

import { useEffect, useState } from 'react'
import Loading from '../components/loading'
import query from '../apis/query'
import { Inscription } from '../types'
import update from '../apis/update'
import { useNavigate } from 'react-router-dom'

const attributes = [
  {
    img: BlueCigar,
    value: 'Blue Cigar',
  },
  {
    img: BlueLollipop,
    value: 'Blue Lollipop',
  },
  {
    img: Chill,
    value: 'Chill',
  },
  {
    img: Pipe,
    value: 'Pipe',
  },
  {
    img: PurpleLollipop,
    value: 'Purple Lollipop',
  },
  {
    img: Rainbow,
    value: 'Rainbow',
  },
  {
    img: RedCigar,
    value: 'Red Cigar',
  },
  {
    img: RedLollipop,
    value: 'Red Lollipop',
  },
  {
    img: Smile,
    value: 'Smile',
  },
]

const Head = () => {
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [currentValue, setCurrentValue] = useState<string>()
  const navigate = useNavigate()

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
        (item) => item.trait_type === 'Head'
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
        <a href="/background" onClick={() => navigate('/background')}>
          背景颜色
        </a>
        <a href="/head" onClick={() => navigate('/head')}>
          头
        </a>
        <a href="/body" onClick={() => navigate('/body')}>
          身体
        </a>
        <a href="/eye" onClick={() => navigate('/eye')}>
          眼睛
        </a>
        <a href="/mouth" onClick={() => navigate('/mouth')}>
          嘴巴
        </a>
        <a href="/clothes" onClick={() => navigate('/clothes')}>
          衣服
        </a>
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

export default Head
