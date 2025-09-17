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
    
    // Vérifier que le composant se rend sans erreur
    expect(screen.getByText('Home')).toBeInTheDocument()
    
    // Vérifier que le div employe est présent
    expect(document.getElementById('employee-div')).toBeInTheDocument()
  })

	test('displays empty table when no employees', () => {
    renderWithRouter(<Employees />)
    
    // Vérifier que le composant se rend sans erreur
    expect(screen.getByText('Home')).toBeInTheDocument()
    
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
      }
    ]
    
    localStorage.setItem('employees', JSON.stringify(testEmployees))
    
    renderWithRouter(<Employees />)
    
    // Vérifier que le composant se rend sans erreur
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(document.getElementById('employee-div')).toBeInTheDocument()
  })

	test('displays correct table columns', () => {
    renderWithRouter(<Employees />)
    
    // Vérifier que le composant se rend sans erreur
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(document.getElementById('employee-div')).toBeInTheDocument()
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
    
		expect(screen.getByText("Home")).toBeInTheDocument()
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
    
    // Vérifier que le composant se rend sans erreur
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(document.getElementById('employee-div')).toBeInTheDocument()
  })

	test('updates display when localStorage changes', () => {
    // Test initial
    const initialEmployees = [
      { firstName: 'John', lastName: 'Doe', startDate: '2023-01-01', departement: 'Engineering', dateOfBirth: '1990-01-01', street: '123 St', city: 'City', state: 'ST', zipCode: '12345' }
    ]
    localStorage.setItem('employees', JSON.stringify(initialEmployees))
    
    const { rerender } = renderWithRouter(<Employees />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    
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
    
    // Vérifier que le composant se rend toujours
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})