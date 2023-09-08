import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Favourites from './Favourites'
import Watchlist from './Watchlist'

export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/favourites' element={<Favourites/>}/>
        <Route path='/watchlist' element={<Watchlist/>}/>
      </Routes>
    </div>
  )
}
