import { createBrowserRouter } from 'react-router-dom'

import Eye from '../pages/eye'
import Head from '../pages/head'
import Body from '../pages/body'
import Mouth from '../pages/mouth'
import Clothes from '../pages/clothes'
import Background from '../pages/background'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Background />,
  },
  {
    path: '/eye',
    element: <Eye />,
  },
  {
    path: '/head',
    element: <Head />,
  },
  {
    path: '/body',
    element: <Body />,
  },
  {
    path: '/mouth',
    element: <Mouth />,
  },
  {
    path: '/clothes',
    element: <Clothes />,
  },
  {
    path: '/background',
    element: <Background />,
  },
])

export default router
