import { useEffect, useState } from "react";

export default function CountdownTimer({ duration, onTimeout }) {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft === 0) {
            onTimeout();
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, onTimeout]);

    return (
        <div className="countdown-timer">
            <p>Redirecting to shop in {timeLeft} seconds...</p>
        </div>
    );
}
