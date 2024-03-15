import { usePlayer } from '../../context/player';

export default function Controls() {
	const { playing, togglePlayback, volume, changeVolume } = usePlayer();

	return (
		<div className="absolute bottom-0 left-0 right-0 h-12 flex flex-row justify-evenly items-center">
			<div
				className="p-2 rounded-lg cursor-pointer hover:bg-slate-800"
				onClick={() => togglePlayback()}>
				{playing ? <Pause /> : <Play />}
			</div>

			<div className="p-2 rounded-lg cursor-pointer hover:bg-slate-800">
				<Heart />
			</div>

			<input
				id="volume-ctrl"
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

function Heart() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
			<path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
		</svg>
	);
}
