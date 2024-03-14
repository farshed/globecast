import { usePlayer } from '../../context/player';

export default function Controls() {
	const { playing, togglePlayback, volume, changeVolume } = usePlayer();

	return (
		<div className="absolute bottom-0 left-0 right-0 h-12 flex flex-row justify-evenly items-center">
			<div
				className="cursor-pointer hover:bg-slate-800 p-2 rounded-lg"
				onClick={() => togglePlayback()}>
				{playing ? <Pause /> : <Play />}
			</div>

			<input
				type="range"
				min={0}
				max={1}
				step="any"
				value={volume}
				onChange={(e) => changeVolume(e.target.value)}
			/>
		</div>
	);
}

function Play() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
			<path
				fillRule="evenodd"
				d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
				clipRule="evenodd"
			/>
		</svg>
	);
}

function Pause() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
			<path
				fillRule="evenodd"
				d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
				clipRule="evenodd"
			/>
		</svg>
	);
}
