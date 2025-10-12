import { useState } from 'react'
import './App.css'
import AppName from './components/AppName'
import ImageCont from './components/ImageCont'
import MainContent from './components/MainContent'

function App() {
	const [n, setN] = useState(2);
	return (
		<>
		<AppName />
		<MainContent>
			<ImageCont n={n}/>
		</MainContent>
		<button className='border border-white p-2 m-1 rounded-lg cursor-pointer' 
		onClick={() => n > 10 ? {} : setN(n => n+1)}>
			Add Node
		</button>
		<button className='border border-white p-2 m-1 rounded-lg cursor-pointer' 
		onClick={() => n <= 1 ? {} : setN(n => n-1)}>
			Remove Node
		</button>
		</>
	)
}


export default App
