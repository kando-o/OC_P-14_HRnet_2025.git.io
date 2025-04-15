import React from 'react'

export default function Layout() {
  return (
	  <>
		  <Header/>

		  <div className='mainLayout'>
			  <Outlet/>
		  </div>
	</>
  )
}
