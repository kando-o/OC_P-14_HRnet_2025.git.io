import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from '@kyssiii_gtml/modal-lib-p14'
import App from '../../App'
import Home from "../../Page/Home/views/home"
import Employees from "../../Page/Employe/views/employees"
import NotFound from "../../Page/404/views/404"


// Configuration des routes pour les tests
const createTestRouter = (initialEntries = ['/']) => {
	const routes = [
		{
			path: '/',
			element: (
				<ModalProvider>
					<Home />
				</ModalProvider>
			)
		},
		{
			path: '/employees',
			element: <Employees />
		},
		{
			path: '*',
			element: <NotFound />
		}
	]

	const router = createMemoryRouter(routes, {
		initialEntries
	})

	return router
}

describe('Router', () => {

	test('can navigate between home and employees pages', () => {
    const router = createTestRouter(['/'])
    
    render(<RouterProvider router={router} />)
    
    // Vérifier qu'on est sur la page d'accueil
    expect(screen.getByText('Create Employee')).toBeInTheDocument()
    
    // Aller sur la page des employés
    const employeesLink = screen.getByText('View Current Employees')
    fireEvent.click(employeesLink)
    
    // Vérifier qu'on est sur la bonne page - le composant Employees se rend
    expect(screen.getByText('Home')).toBeInTheDocument()
    
    // Retourner à l'accueil
    const homeLink = screen.getByText('Home')
    fireEvent.click(homeLink)
    
    // Vérifier qu'on est revenu
    expect(screen.getByText('Create Employee')).toBeInTheDocument()
  })

	test('navigate to loading page', () => {
		render(<App/>)

		expect(screen.getByText('Chargement en cours...')).toBeInTheDocument()
	})

	test('navigates to employees page', () => {
    render(<App />)
    
    // Simuler la navigation
    const employeesLink = screen.getByText('View Current Employees')
    fireEvent.click(employeesLink)
    
    expect(screen.getByText('First Name')).toBeInTheDocument()
  })

})