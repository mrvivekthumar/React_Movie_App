import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Popular from './components/Popular'
import Trending from './components/Trending'
import Movie from './components/Movie'

const App = () => {
	return (
		<div className='bg-[#1F1E24] w-screen h-screen flex'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/trending' element={<Trending />} />
				<Route path='/popular' element={<Popular />} />
				<Route path='/movie' element={<Movie />} />
			</Routes>
		</div>
	)
}

export default App