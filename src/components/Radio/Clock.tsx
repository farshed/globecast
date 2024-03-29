import { useEffect, useMemo, useState } from 'react';

interface ClockProps {
	utcOffset: number | null;
}

export default function Clock({ utcOffset }: ClockProps) {
	const [time, setTime] = useState(Date.now);

	useEffect(() => {
		const interval = setInterval(() => setTime(Date.now()), 1e3);
		return () => clearInterval(interval);
	}, []);

	const currentTime = useMemo(() => {
		return new Date(time + (utcOffset ?? 0) * 6e4).toISOString().substring(11, 19);
	}, [utcOffset, time]);

	return <p className="pl-4 font-mono text-sm text-white leading-6">{currentTime}</p>;
}
