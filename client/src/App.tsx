import './App.css'
import MainContent from './components/MainContent'
import Practice from './components/Practice'
import TitleBar from './components/TitleBar/TitleBar'
import AppProviders from './providers/AppProviders'
import AddNodeButton from './components/AddNodeButton'
import ClearNodesButton from './components/ClearNodesButton'

function App() {
	return (
		<>
		<AppProviders>
			<TitleBar />
			<AddNodeButton />
			<ClearNodesButton />
			<MainContent>
				<Practice />
			</MainContent>
		</AppProviders>
		</>
	)
}

export default App;