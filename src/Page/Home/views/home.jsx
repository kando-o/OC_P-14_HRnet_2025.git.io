import React, { useEffect, useState } from 'react'
import "../assets/styles/home.css"
import { NavLink } from 'react-router'
import Modal from '../../../Component/modal/view/modal'

export default function Home() {
		const states = [ 
	{
		"name": "Alabama",
		"abbreviation": "AL"
	},
	{
		"name": "Alaska",
		"abbreviation": "AK"
	},
	{
		"name": "American Samoa",
		"abbreviation": "AS"
	},
	{
		"name": "Arizona",
		"abbreviation": "AZ"
	},
	{
		"name": "Arkansas",
		"abbreviation": "AR"
	},
	{
		"name": "California",
		"abbreviation": "CA"
	},
	{
		"name": "Colorado",
		"abbreviation": "CO"
	},
	{
		"name": "Connecticut",
		"abbreviation": "CT"
	},
	{
		"name": "Delaware",
		"abbreviation": "DE"
	},
	{
		"name": "District Of Columbia",
		"abbreviation": "DC"
	},
	{
		"name": "Federated States Of Micronesia",
		"abbreviation": "FM"
	},
	{
		"name": "Florida",
		"abbreviation": "FL"
	},
	{
		"name": "Georgia",
		"abbreviation": "GA"
	},
	{
		"name": "Guam",
		"abbreviation": "GU"
	},
	{
		"name": "Hawaii",
		"abbreviation": "HI"
	},
	{
		"name": "Idaho",
		"abbreviation": "ID"
	},
	{
		"name": "Illinois",
		"abbreviation": "IL"
	},
	{
		"name": "Indiana",
		"abbreviation": "IN"
	},
	{
		"name": "Iowa",
		"abbreviation": "IA"
	},
	{
		"name": "Kansas",
		"abbreviation": "KS"
	},
	{
		"name": "Kentucky",
		"abbreviation": "KY"
	},
	{
		"name": "Louisiana",
		"abbreviation": "LA"
	},
	{
		"name": "Maine",
		"abbreviation": "ME"
	},
	{
		"name": "Marshall Islands",
		"abbreviation": "MH"
	},
	{
		"name": "Maryland",
		"abbreviation": "MD"
	},
	{
		"name": "Massachusetts",
		"abbreviation": "MA"
	},
	{
		"name": "Michigan",
		"abbreviation": "MI"
	},
	{
		"name": "Minnesota",
		"abbreviation": "MN"
	},
	{
		"name": "Mississippi",
		"abbreviation": "MS"
	},
	{
		"name": "Missouri",
		"abbreviation": "MO"
	},
	{
		"name": "Montana",
		"abbreviation": "MT"
	},
	{
		"name": "Nebraska",
		"abbreviation": "NE"
	},
	{
		"name": "Nevada",
		"abbreviation": "NV"
	},
	{
		"name": "New Hampshire",
		"abbreviation": "NH"
	},
	{
		"name": "New Jersey",
		"abbreviation": "NJ"
	},
	{
		"name": "New Mexico",
		"abbreviation": "NM"
	},
	{
		"name": "New York",
		"abbreviation": "NY"
	},
	{
		"name": "North Carolina",
		"abbreviation": "NC"
	},
	{
		"name": "North Dakota",
		"abbreviation": "ND"
	},
	{
		"name": "Northern Mariana Islands",
		"abbreviation": "MP"
	},
	{
		"name": "Ohio",
		"abbreviation": "OH"
	},
	{
		"name": "Oklahoma",
		"abbreviation": "OK"
	},
	{
		"name": "Oregon",
		"abbreviation": "OR"
	},
	{
		"name": "Palau",
		"abbreviation": "PW"
	},
	{
		"name": "Pennsylvania",
		"abbreviation": "PA"
	},
	{
		"name": "Puerto Rico",
		"abbreviation": "PR"
	},
	{
		"name": "Rhode Island",
		"abbreviation": "RI"
	},
	{
		"name": "South Carolina",
		"abbreviation": "SC"
	},
	{
		"name": "South Dakota",
		"abbreviation": "SD"
	},
	{
		"name": "Tennessee",
		"abbreviation": "TN"
	},
	{
		"name": "Texas",
		"abbreviation": "TX"
	},
	{
		"name": "Utah",
		"abbreviation": "UT"
	},
	{
		"name": "Vermont",
		"abbreviation": "VT"
	},
	{
		"name": "Virgin Islands",
		"abbreviation": "VI"
	},
	{
		"name": "Virginia",
		"abbreviation": "VA"
	},
	{
		"name": "Washington",
		"abbreviation": "WA"
	},
	{
		"name": "West Virginia",
		"abbreviation": "WV"
	},
	{
		"name": "Wisconsin",
		"abbreviation": "WI"
	},
	{
		"name": "Wyoming",
		"abbreviation": "WY"
	}
	]
	
	const departements = [
		{name: "Marketing"},
		{name: "Engineering"},
		{name: "Sales"},
		{name: "Human Resources"},
		{name: "Legal"},
	]
	
	const [form, setForm] = useState( () => {		
		const employees = localStorage.getItem('employees');
		// au montage du composant si saveForm existe le parse sinon mettre une valeur vide
		return employees ? 
		JSON.parse(employees) 
		:
		{
			firstName: null,
			lastName: null,
			startDate: null,
			departement: null,
			dateOfBirth: null,
			street: null,
			city: null,
			state: null,
			zipCode: null,
		}
		
	})
	
	
	const saveEmployee = () => {		
		setmodale(true);
		console.log(modale);
		
		
		const employees = JSON.parse(localStorage.getItem("employees"))
		if (!employees) {
			localStorage.setItem("employees", JSON.stringify([form]))
		} else {
			// Si la valeur du champ et égale à ce qui existe deja fuck off
			const newEmploye = [...employees, {...form}] 
			localStorage.setItem("employees", JSON.stringify(newEmploye))
			console.log(newEmploye);
		}
	}

	// à chaque changement dans le composant mettre à jour le LS
	useEffect(() => {
	}, [form]);

	const [modale, setmodale] = useState(false)

	const handleModalChange = (value) => {
		setmodale(value)
		console.log("état de la modale depuis la home", value);
	}

  return (
		<>
			<div className='home'>
				<div className="title">
					<h1>HRnet 2</h1>
				</div>

				<div className="container">
					<NavLink to="/employees">View Current Employees</NavLink>
						<h2>Create Employee</h2>
						<form action="#" id="create-employee">
							<label htmlFor="first-name">First Name</label>
							<input 
								type="text" 
								id="first-name" 
								onChange={(e) =>
									(
										setForm((form) => ({
											...form,
											firstName : e.target.value
										})
									))
								}
							/>

							<label htmlFor="last-name">Last Name</label>
							<input 
								type="text" 
								id="last-name" 
								onChange={(e) => (
									setForm((form) => ({
										...form,
										lastName : e.target.value
									}
									))
								)}
							/>

							<label htmlFor="date-of-birth">Date of Birth</label>
							<input 
								id="date-of-birth" 
								type="date" 
								onChange={(e) => (
									setForm((form) => ({
										...form,
										dateOfBirth : e.target.value
									}))
								)}
							/>

							<label htmlFor="start-date">Start Date</label>
							<input 
								id="start-date"
								type="date"
								onChange={e => (
									setForm(form => ({
										...form,
										startDate : e.target.value
									}))
								)}
							/>

							<br />
							<br />

							<fieldset className="address">
								<legend>Address</legend>

								<label htmlFor="street">Street</label>
								<input 
									id="street" 
									type="text"
									onChange={e => (
										setForm(form => ({
											...form,
											street : e.target.value
										}))
									)}
								/>

								<label htmlFor="city">City</label>
								<input 
									id="city" 
									type="text" 
									onChange={e => (
										setForm(form => ({
											...form,
											city : e.target.value
										}))
									)}
								/>

								<label htmlFor="state">State</label>
								<select 
									name="state" 
									id="state"
									onChange={(e) => (
										setForm(form =>({
											...form,
											state : e.target.value
										}))
									)}
								>
									{states.map((state, index) =>( 
										<option value={state.name} key={index}>{state.name}</option>

									))}
								</select>

								<label htmlFor="zip-code">Zip Code</label>
								<input 
									id="zip-code" 
									type="number" 
									onChange={(e) => (
										setForm(form => ({
											...form,
											zipCode : e.target.value
										}))
									)}
								/>
							</fieldset>

							<label htmlFor="departement">Departement</label>
							<select 
								name="departement" 
								id="departement" 
								value={form.departements}
								onChange={(e) => (
									setForm(form => ({
											...form,
											departement : e.target.value
										}))
									)}
							>
							{departements.map((department, index) =>(
								<option key={index} value={department.name}>{department.name}</option>
							))}
							</select>
						</form>

					<button 
						type="button"
						onClick={(e) => (
							saveEmployee()
						)}
					>
						Save me
					</button>
				</div>

			</div>
			<Modal isOpen={modale} onStateChange={handleModalChange} />			
		</>
  )
}
