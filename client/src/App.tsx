import { AnimatePresence } from 'motion/react'
import './App.css'
import MainContent from './components/MainContent'
import NodeBox from './components/NodeBox'
import SearchBox from './components/Search/SearchBox'
import TitleBar from './components/TitleBar/TitleBar'
import AppProviders from './providers/AppProviders'
import { useUIContext } from './providers/UIProvider'
import Overlay from './components/Overlay'
import Toast from './components/Toast'

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
		<AnimatePresence>
		{
			uiCtx.isSearchBoxOpen &&
			<Overlay />
		}
		</AnimatePresence>
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
		<AnimatePresence>
			{
				uiCtx.toast &&
				<Toast kind={uiCtx.toast.kind} message={uiCtx.toast.message} />
			}
		</AnimatePresence>
		</>
	)
}

export default App;