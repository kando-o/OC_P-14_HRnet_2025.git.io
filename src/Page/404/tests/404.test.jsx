import {render, screen} from '@testing-library/react'
import NotFound from '../views/404'
import Home from '../../Home/views/home'
import Employees from '../../Employe/views/employees'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'


// Configuration des routes pour les tests
const createTestRouter = (initialEntries = ['/']) => {
  const routes = [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/employees',
      element: <Employees/>
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
  test('shows 404 page for invalid routes', () => {
    // Tester une route qui n'existe pas
    const router = createTestRouter(['/invalid-route'])
    
    render(<RouterProvider router={router} />)
    
    // Vérifier que la page 404 s'affiche
    expect(screen.getAllByText('Une erreur est survenue. Page non trouvée !')).toHaveLength(1)
  })

	test.each(['/admin', '/profile', '/settings', '/random-page'])('404 page is accessible from any invalid route', (route) => {
		const router = createTestRouter([route])
		
		render(<RouterProvider router={router} />)
		
		// Vérifier que la page 404 s'affiche pour chaque route invalide
		expect(screen.queryByText('Une erreur est survenue. Page non trouvée !')).toBeInTheDocument()
    
  })
})