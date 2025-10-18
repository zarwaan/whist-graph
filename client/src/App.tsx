import { AnimatePresence } from 'motion/react'
import './App.css'
import MainContent from './components/MainContent'
import NodeBox from './components/NodeBox'
import SearchBox from './components/Search/SearchBox'
import TitleBar from './components/TitleBar/TitleBar'
import AppProviders from './providers/AppProviders'
import { useUIContext } from './providers/UIProvider'

function App() {
	return (
		<>
		<AppProviders>
			<AppContent />
		</AppProviders>
		</>
	)
}

function AppContent () {
	const uiCtx = useUIContext();
	return (
		<>
		<TitleBar />
		<MainContent>
			<NodeBox />
			<AnimatePresence>
				{
					uiCtx.isSearchBoxOpen &&
					<SearchBox />
				}
			</AnimatePresence>
		</MainContent>
		</>
	)
}

export default App;