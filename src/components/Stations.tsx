import { Marker } from 'react-map-gl';
import stations from '../constants/stations';

const style = {
	backgroundColor: 'red',
	height: 5,
	width: 5
};

export default function Stations() {
	return (
		<>
			{stations.map((station) => (
				<Marker key={station.id} longitude={station.geo[0]} latitude={station.geo[1]}>
					<div style={style} />
				</Marker>
			))}
		</>
	);
}
