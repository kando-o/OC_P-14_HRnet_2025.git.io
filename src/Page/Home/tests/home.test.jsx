import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Home from '../views/home'

// Wrapper pour Router (nécessaire car mon composant utilise NavLink)
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Home Component', () => {
  // Nettoyer localStorage avant chaque test
  beforeEach(() => {
    localStorage.clear()
  })

  test('renders create employee form', () => {
    renderWithRouter(<Home />)
    
    // Vérifier que le titre est présent
    expect(screen.getByText('Create Employee')).toBeInTheDocument()
    
    // Vérifier que les champs principaux sont présents
    expect(screen.getByLabelText('First Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument()
    expect(screen.getByLabelText('Street')).toBeInTheDocument()
    expect(screen.getByLabelText('City')).toBeInTheDocument()
    expect(screen.getByLabelText('State')).toBeInTheDocument()
    expect(screen.getByLabelText('Zip Code')).toBeInTheDocument()
    expect(screen.getByLabelText('Departement')).toBeInTheDocument()
		
  })

	test('form validation prevents submission with empty fields', () => {
		renderWithRouter(<Home />)
		
		// Trouver le bouton submit (ajoute un id="submit-btn" à ton bouton)
		const submitButton = screen.getByText('Save me')
		
		// Essayer de soumettre sans remplir
		fireEvent.click(submitButton)
		
		// Le formulaire ne devrait pas être soumis (HTML5 validation)
		// Vérifier que les champs required sont toujours visibles
		expect(screen.getByLabelText('First Name')).toBeInTheDocument()
	})

	test('saves employee to localStorage when form is submitted', async () => {
		// Définir user avec userEvent.setup()
		const user = userEvent.setup()

		renderWithRouter(<Home />)
		
		// Remplir le formulaire avec des données valides
		await user.type(screen.getByLabelText('First Name'), 'John')
		await user.type(screen.getByLabelText('Last Name'), 'Doe')
		await user.type(screen.getByLabelText('Date of Birth'), '1990-01-01')
		await user.type(screen.getByLabelText('Start Date'), '2023-01-01')
		await user.type(screen.getByLabelText('Street'), '123 Main St')
		await user.type(screen.getByLabelText('City'), 'Antony')
		await user.type(screen.getByLabelText('State'), 'CA')
		await user.type(screen.getByLabelText('Zip Code'), '12345')
		
		// Remplir le département
		const departmentSelect = screen.getByLabelText(/Departement/i)
		fireEvent.change(departmentSelect, { target: { value: 'Engineering' } })

		
		// Soumettre le formulaire avec le bon nom
		const submitButton = screen.getByText('Save me')
		fireEvent.submit(submitButton)

		// Attendre un peu pour laisser le temps au localStorage de se mettre à jour
		await new Promise(resolve => setTimeout(resolve, 100))

		// Vérifier le localStorage
		const localStorageContent = localStorage.getItem('employees')
		console.log('localStorage content:', localStorageContent)

		
		// Vérifier que l'employé est sauvegardé dans localStorage
		const savedEmployees = JSON.parse(localStorage.getItem('employees'))
		console.log('Form values before submit:', {
			 savedEmployees 
			})
		expect(savedEmployees).toBeTruthy()
		expect(savedEmployees).toHaveLength(1)
		expect(savedEmployees[0].firstName).toBe('John')
		expect(savedEmployees[0].lastName).toBe('Doe')
	})

	test('adds new employee to existing employees list', async () => {
		// Définir user avec userEvent.setup()
		const user = userEvent.setup()

    // Préparer des données existantes
    const existingEmployees = [
      { firstName: 'Jane', lastName: 'Smith'}
    ]
    localStorage.setItem('employees', JSON.stringify(existingEmployees))
    
    renderWithRouter(<Home />)
    
  	// Remplir TOUS les champs requis (avec await)
		await user.type(screen.getByLabelText('First Name'), 'Jon')
		await user.type(screen.getByLabelText('Last Name'), 'Doe')
		await user.type(screen.getByLabelText('Date of Birth'), '1990-01-01')
		await user.type(screen.getByLabelText('Start Date'), '2023-01-01')
		await user.type(screen.getByLabelText('Street'), '123 Main St')
		await user.type(screen.getByLabelText('City'), 'Antony')
		await user.type(screen.getByLabelText('State'), 'CA')
		await user.type(screen.getByLabelText('Zip Code'), '12345')

		// Remplir le département
		const departmentSelect = screen.getByLabelText(/Departement/i)
		fireEvent.change(departmentSelect, { target: { value: 'Engineering' } })

		const submitButton = screen.getByText('Save me')
		fireEvent.submit(submitButton)

		// Attendre un peu pour laisser le temps au localStorage de se mettre à jour
		new Promise(resolve => setTimeout(resolve, 100))

		// Vérifier le localStorage
		const localStorageContent = localStorage.getItem('employees')
		console.log('localStorage content:', localStorageContent)
        
    // Vérifier que la liste contient maintenant 2 employés
    const savedEmployees = JSON.parse(localStorage.getItem('employees'))
    expect(savedEmployees).toHaveLength(2)
  })

})	