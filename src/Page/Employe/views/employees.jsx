import React from 'react'
import { NavLink } from 'react-router'
import MUIDataTable from "mui-datatables";
import '../assets/styles/employes.css'

export default function Employees() {

	const employees = localStorage.getItem('employees')
	const parseEmployees = employees ? JSON.parse(employees) : []
	const columns = [
		'First Name',
		'Last Name',
		'Start Date', 
		'Department', 
		'Date of Birth', 
		'Street',
		'City',
		'State',
		'Zip Code' 
	]
	
	const tabeEmployees = parseEmployees.map(employee => {
		// console.log(employee.firstName);

		const tabemployee = [
			employee.firstName,
			employee.lastName,
			employee.dateOfBirth,
			employee.departement,
			employee.startDate,
			employee.street,
			employee.city,
			employee.state,
			employee.zipCode,
		]

		return tabemployee
	})

	console.log(tabeEmployees);
	const options = {
		selectableRows: "none",
		download: false, // 🔴 désactive le bouton "Download"
		print: false, // 🔴 désactive le bouton "Print"
		rowsPerPageOptions: [5, 10, 25, 50, 100],
		filter: true,
		textLabels: {
			pagination: {
				displayRows: "of", // ce mot reste, mais on va le modifier ci-dessous
				rowsPerPage: "Rows per page :",

				// Surcharge personnalisée :
				next: "Next Page",
				previous: "Previous Page",
			},
			filter: {
				all: "All",
				title: "FILTERS",
				reset: "RESET",
			},
			toolbar: {
				search: "Search",
				viewColumns: "View Columns",
				filterTable: "Filter Table",
			},
			viewColumns: {
				title: "Show Columns",
				titleAria: "Show/Hide Table Columns",
			},
		},
		customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
			const from = page * rowsPerPage + 1;
			const to = Math.min(count, (page + 1) * rowsPerPage);
			return (
				<tfoot>
					<tr>
						<td colSpan="100%">
							<div style={{ display: "flex", justifyContent: "space-between", padding: "1rem", alignItems: "center" }}>
								<div>Showing {from} to {to} of {count} entries</div>
								<div className='RowsPerPage' style={{display: "flex", alignItems:"center", justifyContent:"center"}}>
									<label className='RowsPerPage-valueLabel'>
										Rows per page:
										<select
											value={rowsPerPage}
											onChange={e => changeRowsPerPage(parseInt(e.target.value))}
										>
											{[5, 10, 15, 20, 50].map((val) => (
												<option key={val} value={val}>{val}</option>
											))}
										</select>
								</label>
									<button className='RowsPerPage-preview' onClick={() => changePage(page - 1)} disabled={page === 0}>
										Preview
									</button>
									<p>{page +1}</p>
									<button className='RowsPerPage-next' onClick={() => changePage(page + 1)} disabled={to >= count}>
										Next
									</button>
								</div>
						</div>

						</td>
					</tr>
				</tfoot>
				
			)
		}
	}

	return (

		<div id="employee-div" className="employe">
			<MUIDataTable title="Current Employees" 
				data={tabeEmployees} 
				columns={columns} 
				options = {options}
			/>
			<NavLink to="/" >Home</NavLink>
		</div>
	)
}


