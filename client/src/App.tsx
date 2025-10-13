import { useState } from 'react'
import './App.css'
import AppName from './components/AppName'
// import ImageCont from './components/ImageCont'
import MainContent from './components/MainContent'
import Practice from './components/Practice'

function App() {
	const [n, setN] = useState(0);
	return (
		<>
		<button className='border border-white p-2 m-1 rounded-lg cursor-pointer absolute left-7/10' 
		onClick={() => n > 100 ? {} : setN(n => n+1)}>
			Add Node
		</button>
		<button className='border border-white p-2 m-1 rounded-lg cursor-pointer absolute left-8/10' 
		onClick={() => n <= 1 ? {} : setN(n => n-1)}>
			Remove Node
		</button>
		<AppName />
		<MainContent>
			{/* <ImageCont n={n}/> */}
			<Practice n={n}/>
		</MainContent>
		
		</>
	)
}


export default App
