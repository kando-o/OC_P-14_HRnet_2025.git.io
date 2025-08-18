import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import App from '../../App'
import Home from "../../Page/Home/views/home"
import Employees from "../../Page/Employe/views/employees"
import NotFound from "../../Page/404/views/404"


// Configuration des routes pour les tests
const createTestRouter = (initialEntries = ['/']) => {
	const routes = [
		{
			path: '/',
			element: <Home />
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
    
    // Vérifier qu'on est sur la bonne page
    expect(screen.getAllByText('Current Employees')).toHaveLength(2)
    
    // Retourner à l'accueil
    const homeLink = screen.getByText('Home')
    fireEvent.click(homeLink)
    
    // Vérifier qu'on est revenu
    expect(screen.getByText('Create Employee')).toBeInTheDocument()
  })

	test('navigate to loading page', () => {
		render(
			<App/>
		)

		expect(screen.getByText('Chargement en cours...'))
	})

	test('navigates to employees page', () => {
    render(
			<App />
    )
    
    // Simuler la navigation
    const employeesLink = screen.getByText('View Current Employees')
    fireEvent.click(employeesLink)
    
    expect(screen.getByText('First Name')).toBeInTheDocument()
  })

})