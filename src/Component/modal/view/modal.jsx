import React, { useEffect, useState } from 'react'
import "../assets/style//modal.css"
import { NavLink } from 'react-router'

export default function Modal({isOpen, onStateChange}) {
	
	const [open, setOpen] = useState(isOpen)

	useEffect(() => {
		setOpen(isOpen)
	}, [isOpen] )

	const handleClickCloseModal = () => {
		setOpen(false)
	}

	// 🔔 Notifie le parent à chaque changement de `open`
  useEffect(() => {
		if (typeof onStateChange === "function") {
			onStateChange(open)			
		}
	},[open])

	if(!open) return null

	return (
		<>
			{isOpen && 
				<div className='modal'>
					<div className='modal-content'>
						<p className='modal-text'>
							<span className='modal-btnClose' onClick={handleClickCloseModal}>x</span>
							Employee Created!
						</p>
						<NavLink to="/employees">View Current Employees</NavLink>
					</div>
				</div>
			}
		</>
	)
}
