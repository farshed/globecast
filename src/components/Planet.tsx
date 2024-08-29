import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useState } from 'react';
import Map, { Layer, MapLayerMouseEvent, MapRef, Marker, Source } from 'react-map-gl';
import { usePlayer } from '../context/player';

const INTERACTIVE_LAYER_ID = 'stations';

export default function Planet() {
	const { selectLocation, loading, geoJSONdata } = usePlayer();
	const [hovered, setHovered] = useState<any>(null);
	const [cursorStyle, setCursorStyle] = useState('');

	const mapRef = useCallback((map: MapRef) => {
		if (map) {
			map.on('mouseover', INTERACTIVE_LAYER_ID, (e) => {
				if (e?.features?.length) {
					const { properties } = e.features[0];

					setHovered({
						...properties,
						geo: JSON.parse(properties?.geo),
						stations: JSON.parse(properties?.stations)
					});
				}
				setCursorStyle('pointer');
			});

			map.on('mouseleave', INTERACTIVE_LAYER_ID, (e) => {
				setHovered(null);
				setCursorStyle('');
			});
			// map.on('click', 'stations', function (e) {
			// 	console.log(e);
			// 	if (e?.features?.length) {
			// 		const { properties } = e.features[0];
			// 		selectLocation({
			// 			...properties,
			// 			stations: JSON.parse(properties?.stations)
			// 		});
			// 	}
			// });
		}
	}, []);

	const handleLocationClick = useCallback(
		(e: MapLayerMouseEvent) => {
			if (e?.features?.length) {
				const { properties } = e.features[0];

				if (properties) {
					selectLocation({
						...properties,
						geo: JSON.parse(properties.geo),
						stations: JSON.parse(properties.stations)
					});
				}
			}
		},
		[selectLocation]
	);

	return (
		<>
			<Map
				ref={mapRef}
				mapLib={import('mapbox-gl')}
				initialViewState={{
					longitude: -100,
					latitude: 40,
					zoom: 3.5
				}}
				// onZoom={(e) => console.log(e.target.getLayer('data-8spf3l'))}
				onClick={handleLocationClick}
				// onMou={(e) => console.log(e.features)}
				interactiveLayerIds={[INTERACTIVE_LAYER_ID]}
				cursor={cursorStyle}
				attributionControl={false}
				mapboxAccessToken="pk.eyJ1IjoiZmFpc2FsYXJzaGVkIiwiYSI6ImNsdG4yaGs0YTAya3YyanA4aWZrbHg0aTEifQ.2fgTovIlzWCkgM9AJdsubg"
				mapStyle="mapbox://styles/faisalarshed/cltn7xfj500d201qo3ck7g93l">
				{/* <Source type="geojson" data={geoJSONdata}>
				<Layer
					id="stations"
					// beforeId="place-labels"
					type="circle"
					paint={{
						'circle-color': '#00ff00',
						'circle-radius': ['interpolate', ['linear'], ['zoom'], 1, 1, 5, 4] // alternating (zoom, size) pairs
					}}
				/>
			</Source> */}
				<HoverOverlay radioGroup={hovered} />
			</Map>
		</>
	);
}

function HoverOverlay({ radioGroup }: { radioGroup: RadioGroup }) {
	if (!radioGroup) {
		return null;
	}

	const { title, country, geo, stations, utcOffset } = radioGroup;

	const [longitude, latitude] = geo;
	const stationCount = stations.length;
	const currentTime = new Date(Date.now() + (utcOffset ?? 0) * 6e4)
		.toISOString()
		.substring(11, 16);

	return (
		<Marker latitude={latitude} longitude={longitude}>
			<div className="p-2 mb-28 rounded-sm bg-slate-900/50 text-white backdrop-blur">
				<p>
					{title}, {country}
				</p>
				<p>Current time: {currentTime}</p>
				<p>
					{stationCount} station{stationCount > 1 ? 's' : ''} available
				</p>
			</div>
		</Marker>
	);
}
