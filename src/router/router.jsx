import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'

// Chargement dynamique des pages
const Layout = lazy(() => import('../Page/Layout/views/layout'))
const Home = lazy(() => import('../Page/Home/views/home'))
const Employees = lazy(() => import('../Page/Employe/views/employees'))

export default function Router() {
	return (
		<BrowserRouter>
			<Suspense fallback={<div>Chargement en cours...</div>}> 
				<Routes>
					<Route path='/' element={<Layout />} />
						<Route index element={<Home />} />
						<Route path='/employees' element={<Employees />} />
						{/* <Route path='*' element={<NotFound/>} /> //Qui me renvoit vers la home en cas de page hors Routeur */}
					<Route />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}
