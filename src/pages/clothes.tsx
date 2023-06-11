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

export default Clothes
