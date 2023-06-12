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
import CowboyHat from '../assets/head/cowboy hat.png'
import BucketHat from '../assets/head/bucket hat.png'
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
import { useNavigate } from 'react-router-dom'

const attributes = [
  {
    img: BlackHoodie,
    value: 'Black Hoodie',
  },
  {
    img: BlackZangai,
    value: 'Black Zangai',
  },
  {
    img: BlueBandana,
    value: 'Blue Bandana',
  },
  {
    img: BluePika,
    value: 'Blue Pika',
  },
  {
    img: Bunnet,
    value: 'Bunnet',
  },
  {
    img: Copter,
    value: 'Copter',
  },
  {
    img: Crown,
    value: 'Crown',
  },
  {
    img: DevilHorn,
    value: 'Devil Horn',
  },
  {
    img: FireFighter,
    value: 'Fire Fighter',
  },
  {
    img: Flame,
    value: 'Flame',
  },
  {
    img: Habibi,
    value: 'Habibi',
  },
  {
    img: Halo,
    value: 'Halo',
  },
  {
    img: CowboyHat,
    value: 'Cowboy Hat',
  },
  {
    img: BucketHat,
    value: 'Bucket Hat',
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
    const result = await update(inscriptions[index].id, 'Head', value)
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
        <a
          href="/background"
          onClick={(e) => {
            e.preventDefault()
            navigate('/background')
          }}
        >
          背景颜色
        </a>
        <a
          href="/head"
          onClick={(e) => {
            e.preventDefault()
            navigate('/head')
          }}
        >
          头
        </a>
        <a
          href="/body"
          onClick={(e) => {
            e.preventDefault()
            navigate('/body')
          }}
        >
          身体
        </a>
        <a
          href="/eye"
          onClick={(e) => {
            e.preventDefault()
            navigate('/eye')
          }}
        >
          眼睛
        </a>
        <a
          href="/mouth"
          onClick={(e) => {
            e.preventDefault()
            navigate('/mouth')
          }}
        >
          嘴巴
        </a>
        <a
          href="/clothes"
          onClick={(e) => {
            e.preventDefault()
            navigate('/clothes')
          }}
        >
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
