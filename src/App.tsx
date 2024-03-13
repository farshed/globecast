import PlayerProvider from './context/player';
import Planet from './components/Planet';
import Radio from './components/Radio';

export default function App() {
	return (
		<PlayerProvider>
			<div className="h-screen w-screen relative">
				<Planet />
				<Radio />
			</div>
		</PlayerProvider>
	);
}
