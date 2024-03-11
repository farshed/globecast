import { useState } from 'react';
import Map from 'react-map-gl';

export default function App() {
	const [viewport, setViewport] = useState({});
	return (
		<div className="h-screen w-screen">
			<Map
				mapLib={import('mapbox-gl')}
				initialViewState={{
					longitude: -100,
					latitude: 40,
					zoom: 3.5
				}}
				mapboxAccessToken="pk.eyJ1IjoiZmFpc2FsYXJzaGVkIiwiYSI6ImNsdG4yaGs0YTAya3YyanA4aWZrbHg0aTEifQ.2fgTovIlzWCkgM9AJdsubg"
				style={{ width: '100%', height: '100%' }}
				mapStyle="mapbox://styles/mapbox/streets-v9"
			/>
		</div>
	);
}
