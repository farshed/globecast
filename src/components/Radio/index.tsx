import Station from './Station';
import Clock from './Clock';
import { usePlayer } from '../../context/player';
import Controls from './Controls';

export default function Radio() {
	const { location, station } = usePlayer();

	if (!location) {
		return null;
	}

	const { stations, title, country, utcOffset } = location;

	return (
		<div className="absolute bottom-4 right-4">
			<div className="absolute bottom-14 right-0 w-80 max-h-96 p-2 bg-slate-900 rounded-sm">
				<div className="p-4 flex flex-row justify-between items-center">
					<p className="font-bold text-white line-clamp-2">
						{title}, {country}
					</p>
					<Clock utcOffset={utcOffset} />
				</div>

				{stations.map((s: any) => (
					<Station key={s.id} station={s} playing={s.id === station.id} />
				))}
			</div>

			<div className="absolute bottom-0 right-0 w-80 h-12 bg-slate-900 rounded-sm">
				<Controls />
			</div>
		</div>
	);
}
