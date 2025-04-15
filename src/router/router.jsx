import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from '../Page/Layout/views/layout'
import Home from '../Page/Home/views/home'
import Employees from '../Page/Employe/views/employees'

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />} />
					<Route index element={<Home />} />
					<Route path='/employees' element={<Employees />} />
				<Route />
			</Routes>
		</BrowserRouter>
	)
}
