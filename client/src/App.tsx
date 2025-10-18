import './App.css'
import MainContent from './components/MainContent'
import NodeBox from './components/NodeBox'
import SearchBox from './components/Search/SearchBox'
import TitleBar from './components/TitleBar/TitleBar'
import AppProviders from './providers/AppProviders'

function App() {
	return (
		<>
		<AppProviders>
			<TitleBar />
			{/* <AddNodeButton />
			<ClearNodesButton /> */}
			<MainContent>
				<NodeBox />
				<SearchBox />
			</MainContent>
		</AppProviders>
		</>
	)
}

export default App;