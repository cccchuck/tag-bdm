import inscriptions from '../data/inscriptions.json'

import BlackEye from '../assets/eye/black eye.png'
import BlackGlasses from '../assets/eye/black glasses.png'
import Blindfold from '../assets/eye/blindfold.png'
import BlueGlasses from '../assets/eye/blue glasses.png'
import BlueShade from '../assets/eye/blue shade.png'
import GrayShade from '../assets/eye/gray shade.png'
import GreenBeam from '../assets/eye/green beam.png'
import GreenShade from '../assets/eye/green shade.png'
import Happy from '../assets/eye/happy.png'
import Nouns from '../assets/eye/nouns.png'
import OrangeShade from '../assets/eye/orange shade.png'
import PurpleBeam from '../assets/eye/purple beam.png'
import PurpleGlasses from '../assets/eye/purple glasses.png'
import RedEye from '../assets/eye/red eye.png'
import Wink1 from '../assets/eye/wink1.png'
import Wink2 from '../assets/eye/wink2.png'

import { useEffect, useState } from 'react'
import Loading from '../components/loading'
import query from '../apis/query'
import { Inscription } from '../types'
import update from '../apis/update'
import { useNavigate } from 'react-router-dom'

const attributes = [
  {
    img: BlackEye,
    value: 'Black Eye',
  },
  {
    img: BlackGlasses,
    value: 'Black Glasses',
  },
  {
    img: Blindfold,
    value: 'Blindfold',
  },
  {
    img: BlueGlasses,
    value: 'Blue Glasses',
  },
  {
    img: BlueShade,
    value: 'Blue Shade',
  },
  {
    img: GrayShade,
    value: 'Gray Shade',
  },
  {
    img: GreenBeam,
    value: 'Green Beam',
  },
  {
    img: GreenShade,
    value: 'Green Shade',
  },
  {
    img: Happy,
    value: 'Happy',
  },
  {
    img: Nouns,
    value: 'Nouns',
  },
  {
    img: OrangeShade,
    value: 'Orange Shade',
  },
  {
    img: PurpleBeam,
    value: 'Purple Beam',
  },
  {
    img: PurpleGlasses,
    value: 'Purple Glasses',
  },
  {
    img: RedEye,
    value: 'Red Eye',
  },
  {
    img: Wink1,
    value: 'Wink1',
  },
  {
    img: Wink2,
    value: 'Wink2',
  },
]

const Eye = () => {
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
        (item) => item.trait_type === 'Eye'
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

export default Eye
