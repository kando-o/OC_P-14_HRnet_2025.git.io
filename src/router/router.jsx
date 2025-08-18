import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'

// Chargement dynamique des pages
const Layout = lazy(() => import('../Page/Layout/views/layout'))
const Home = lazy(() => import('../Page/Home/views/home'))
const Employees = lazy(() => import('../Page/Employe/views/employees'))
const NotFound = lazy(() => import('../Page/404/views/404'))

export default function Router() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Chargement en cours...</div>}> 
				<Routes>
					<Route path='/' element={<Layout />} />
						<Route index element={<Home />} />
						<Route path='/employees' element={<Employees />} />
						<Route path='*' element={<NotFound/>} />
					<Route />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}
