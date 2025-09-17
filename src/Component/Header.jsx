import { useNavigate } from 'react-router'

export default function Header() {
	const navigate = useNavigate()

	return (
		<div className='header'>
			<h1 onClick={() => navigate('/')}>HRnet</h1>
		</div>
	)
}
