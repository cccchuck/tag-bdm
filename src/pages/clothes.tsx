import inscriptions from '../data/inscriptions.json'

import Banana from '../assets/clothes/banana.png'
import BlueCoat from '../assets/clothes/blue coat.png'
import BluePlaid from '../assets/clothes/blue plaid.png'
import BossSuit from '../assets/clothes/boss suit.png'
import Cocktail from '../assets/clothes/cocktail.png'
import GreenCoat from '../assets/clothes/green coat.png'
import PurplePlaid from '../assets/clothes/purple plaid.png'

import { useEffect, useState } from 'react'
import Loading from '../components/loading'
import query from '../apis/query'
import { Inscription } from '../types'
import update from '../apis/update'
import { useNavigate } from 'react-router-dom'

const attributes = [
  {
    img: Banana,
    value: 'Banana',
  },
  {
    img: BlueCoat,
    value: 'Blue Coat',
  },
  {
    img: BluePlaid,
    value: 'Blue Plaid',
  },
  {
    img: BossSuit,
    value: 'Boss Suit',
  },
  {
    img: Cocktail,
    value: 'Cocktail',
  },
  {
    img: GreenCoat,
    value: 'Green Coat',
  },
  {
    img: PurplePlaid,
    value: 'Purple Plaid',
  },
]

const Clothes = () => {
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
        (item) => item.trait_type === 'Clothes'
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

export default Clothes
