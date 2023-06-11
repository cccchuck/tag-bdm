import inscriptions from '../data/inscriptions.json'

import BlackHoodie from '../assets/head/black hoodie.png'
import BlackZangai from '../assets/head/black zangai.png'
import BlueBandana from '../assets/head/blue bandana.png'
import BluePika from '../assets/head/blue pika.png'
import Bunnet from '../assets/head/bunnet.png'
import Copter from '../assets/head/copter.png'
import Crown from '../assets/head/crown.png'
import DevilHorn from '../assets/head/devil horn.png'
import FireFighter from '../assets/head/fire fighter.png'
import Flame from '../assets/head/flame.png'
import Habibi from '../assets/head/habibi.png'
import Halo from '../assets/head/halo.png'
import Hat1 from '../assets/head/hat1.png'
import Hat2 from '../assets/head/hat2.png'
import Jingu from '../assets/head/jingu.png'
import Medic from '../assets/head/medic.png'
import Mohawk from '../assets/head/mohawk.png'
import Police from '../assets/head/police.png'
import PurpleKipa from '../assets/head/purple kipa.png'
import RedBandana from '../assets/head/red bandana.png'
import Samurai from '../assets/head/samurai.png'
import WhiteHoodie from '../assets/head/white hoodie.png'
import WhiteZangai from '../assets/head/white zangai.png'

import { useEffect, useState } from 'react'
import Loading from '../components/loading'
import query from '../apis/query'
import { Inscription } from '../types'
import update from '../apis/update'

const attributes = [
  {
    img: BlackHoodie,
    value: 'Banana',
  },
  {
    img: BlackZangai,
    value: 'Blue Coat',
  },
  {
    img: BlueBandana,
    value: 'Blue Plaid',
  },
  {
    img: BluePika,
    value: 'Boss Suit',
  },
  {
    img: Bunnet,
    value: 'Cocktail',
  },
  {
    img: Copter,
    value: 'Green Coat',
  },
  {
    img: Crown,
    value: 'Purple Plaid',
  },
  {
    img: DevilHorn,
    value: 'Green Shade',
  },
  {
    img: FireFighter,
    value: 'Fire Fighter',
  },
  {
    img: Flame,
    value: 'Nouns',
  },
  {
    img: Habibi,
    value: 'Orange Shade',
  },
  {
    img: Halo,
    value: 'Purple Beam',
  },
  {
    img: Hat1,
    value: 'Purple Glasses',
  },
  {
    img: Hat2,
    value: 'Red Eye',
  },
  {
    img: Jingu,
    value: 'Jingu',
  },
  {
    img: Medic,
    value: 'Medic',
  },
  {
    img: Mohawk,
    value: 'Mohawk',
  },
  {
    img: Police,
    value: 'Police',
  },
  {
    img: PurpleKipa,
    value: 'Purple Kipa',
  },
  {
    img: RedBandana,
    value: 'Red Bandana',
  },
  {
    img: Samurai,
    value: 'Samurai',
  },
  {
    img: WhiteHoodie,
    value: 'White Hoodie',
  },
  {
    img: WhiteZangai,
    value: 'White Zangai',
  },
]

const Head = () => {
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

export default Head
