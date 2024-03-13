import Station from './Station';
import Clock from './Clock';
import { usePlayer } from '../context/player';

export default function Radio() {
	const { location, station } = usePlayer();

	if (!location) {
		return null;
	}

	const { stations, title, country, utcOffset } = location;

	return (
		<div className="absolute bottom-4 right-4 w-80 h-96 bg-slate-900 rounded-md">
			<div className="flex flex-row justify-between">
				<p className="p-4 font-bold text-white">
					{title}, {country}
				</p>
				<Clock utcOffset={utcOffset} />
			</div>

			{stations.map((s: any) => (
				<Station key={s.id} station={s} playing={s.id === station.id} />
			))}
		</div>
	);
}
