import { useState } from 'react'
import './App.css'
// import ImageCont from './components/ImageCont'
import MainContent from './components/MainContent'
import Practice from './components/Practice'
import TitleBar from './components/TitleBar/TitleBar'
import ViewProvider from './providers/ViewProvider'

function App() {
	const [n, setN] = useState(6);
	return (
		<>
		<ViewProvider>

		
		<TitleBar />
		<button className='border border-white p-2 m-1 rounded-lg cursor-pointer absolute left-75/100 top-2' 
		onClick={() => n > 100 ? {} : setN(n => n+1)}>
			Add Node
		</button>
		<button className='border border-white p-2 m-1 rounded-lg cursor-pointer absolute left-85/100 top-2' 
		onClick={() => n <= 0 ? {} : setN(n => n-1)}>
			Remove Node
		</button>
		<MainContent>
			{/* <ImageCont n={n}/> */}
			<Practice n={n}/>
		</MainContent>
		</ViewProvider>
		</>
	)
}


export default App
