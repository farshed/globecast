import clsx from 'clsx';
import { usePlayer } from '../../context/player';

interface StationProps {
	station: any;
	playing: boolean;
}

export default function Station({ station, playing }: StationProps) {
	const { selectStation } = usePlayer();

	return (
		<div
			className={clsx(
				'w-full flex p-4 py-3 cursor-pointer hover:bg-slate-800 rounded-sm'
				// playing && 'bg-slate-800'
			)}
			onClick={() => selectStation(station)}>
			<p className={clsx('line-clamp-1', playing ? 'text-neon' : 'text-white')}>
				{station.title}
			</p>
		</div>
	);
}
