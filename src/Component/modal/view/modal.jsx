import React, { useEffect, useState } from 'react'
import "../assets/style//modal.css"

export default function Modal({isOpen, onStateChange}) {
	
	const [open, setOpen] = useState(isOpen)

	useEffect(() => {
		setOpen(isOpen)
	}, [isOpen] )

	const handleClick = () => {
		setOpen(false)
	}

	// 🔔 Notifie le parent à chaque changement de `open`
  useEffect(() => {
		if (typeof onStateChange === "function") {
			onStateChange(open)
			console.log(open);
			
		}
	},[open])

	if(!open) return null

	return (
		<>
			{isOpen && 
				<div className='modal'>
					<div className='modal-content'>
						<p className='modal-text'>
							<span className='modal-btnClose' onClick={handleClick}>x</span>
							Employee Created!
						</p>
					</div>
				</div>
			}
		</>
		
	)
}
