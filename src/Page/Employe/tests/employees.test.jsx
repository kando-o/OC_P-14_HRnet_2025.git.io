import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Employees from '../views/employees'

// Wrapper pour Router (nécessaire car mon composant utilise NavLink)
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Employees Component', () => {
  // Nettoyer localStorage avant chaque test
  beforeEach(() => {
    localStorage.clear()
  })

  test('renders employees table with title', () => {
    renderWithRouter(<Employees />)
    
    // Vérifier que le titre est présent
    expect(
			screen.getAllByText(/current employees/i)
		).toHaveLength(2)
    
    // Vérifier que le lien Home est présent
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

	test('displays empty table when no employees', () => {
    renderWithRouter(<Employees />)
    
    // Vérifier que le tableau est rendu même vide
    expect(screen.getByText('Sorry, no matching records found')).toBeInTheDocument()
    
    // Vérifier que localStorage est vide
    const employees = localStorage.getItem('employees')
    expect(employees).toBeNull()
  })

	test('displays employees data correctly', () => {
    // Préparer des données de test
    const testEmployees = [
      {
        firstName: 'John',
        lastName: 'Doe',
        startDate: '2023-01-01',
        departement: 'Engineering',
        dateOfBirth: '1990-01-01',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        startDate: '2023-02-01',
        departement: 'Marketing',
        dateOfBirth: '1985-05-15',
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210'
      }
    ]
    
    localStorage.setItem('employees', JSON.stringify(testEmployees))
    
    renderWithRouter(<Employees />)
    
    // Vérifier que les employés sont affichés
    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane')).toBeInTheDocument()
    expect(screen.getByText('Smith')).toBeInTheDocument()
  })

	test('displays correct table columns', () => {
    renderWithRouter(<Employees />)
    
    // Vérifier que les colonnes sont présentes (MUIDataTable les rend)
    expect(screen.getByText('First Name')).toBeInTheDocument()
    expect(screen.getByText('Last Name')).toBeInTheDocument()
    expect(screen.getByText('Start Date')).toBeInTheDocument()
    expect(screen.getByText('Department')).toBeInTheDocument()
    expect(screen.getByText('Date of Birth')).toBeInTheDocument()
    expect(screen.getByText('Street')).toBeInTheDocument()
    expect(screen.getByText('City')).toBeInTheDocument()
    
    // Note: MUIDataTable peut ne pas rendre directement les en-têtes de colonnes
    // dans certains cas, donc on vérifie juste que le composant se rend
  })

	test('navigation link works correctly', () => {
    renderWithRouter(<Employees />)
    
    // Vérifier que le lien Home est présent et cliquable
    const homeLink = screen.getByText('Home')
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.closest('a')).toHaveAttribute('href', '/')
  })

	test('handles large number of employees', () => {
    // Créer beaucoup d'employés pour tester la pagination
    const manyEmployees = Array.from({ length: 100 }, (_, index) => ({
      firstName: `Employee${index}`,
      lastName: `Last${index}`,
      startDate: '2023-01-01',
      departement: 'Engineering',
      dateOfBirth: '1990-01-01',
      street: `${index} Main St`,
      city: 'City',
      state: 'ST',
      zipCode: '12345'
    }))
    
    localStorage.setItem('employees', JSON.stringify(manyEmployees))
    
    // Le composant devrait se rendre sans problème
    expect(() => {
      renderWithRouter(<Employees />)
    }).not.toThrow()
    
		const allCurentEmployees = screen.getAllByText("Current Employees")
		expect(allCurentEmployees).toHaveLength(2)
  })

	test('displays employee with missing optional fields', () => {
    // Test avec un employé qui a des champs manquants
    const incompleteEmployee = {
      firstName: 'Incomplete',
      lastName: 'Employee',
      startDate: '2023-01-01',
      departement: 'Engineering',
      dateOfBirth: '1990-01-01',
      // street, city, state, zipCode manquants
    }
    
    localStorage.setItem('employees', JSON.stringify([incompleteEmployee]))
    
    renderWithRouter(<Employees />)
    
    // Vérifier que l'employé est quand même affiché
    expect(screen.getByText('Incomplete')).toBeInTheDocument()
    expect(screen.getByText('Employee')).toBeInTheDocument()
  })

	test('updates display when localStorage changes', () => {
    // Test initial
    const initialEmployees = [
      { firstName: 'John', lastName: 'Doe', startDate: '2023-01-01', departement: 'Engineering', dateOfBirth: '1990-01-01', street: '123 St', city: 'City', state: 'ST', zipCode: '12345' }
    ]
    localStorage.setItem('employees', JSON.stringify(initialEmployees))
    
    const { rerender } = renderWithRouter(<Employees />)
    expect(screen.getByText('John')).toBeInTheDocument()
    
    // Ajouter un nouvel employé
    const updatedEmployees = [...initialEmployees, 
      { firstName: 'Jane', lastName: 'Smith', startDate: '2023-02-01', departement: 'Marketing', dateOfBirth: '1985-05-15', street: '456 Ave', city: 'Town', state: 'ST', zipCode: '54321' }
    ]
    localStorage.setItem('employees', JSON.stringify(updatedEmployees))
    
    // Re-rendre le composant
    rerender(
      <BrowserRouter>
        <Employees />
      </BrowserRouter>
    )
    
    // Vérifier que les deux employés sont affichés
    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Jane')).toBeInTheDocument()
  })
})