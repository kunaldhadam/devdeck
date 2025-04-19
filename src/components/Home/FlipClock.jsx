import React, { useEffect, useState } from "react";

const FlipClock = () => {
    const [time, setTime] = useState(getFormattedTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getFormattedTime());
        }, 1000); // update every second
        return () => clearInterval(interval);
    }, []);

    function getFormattedTime() {
        const now = new Date();
        return now.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    }


    return (
        <div className="time-container flex space-x-2 text-white text-6xl font-mono">
            <div className="fake_time flex align-left">{[..."88:88"].map((char, i) => (
                <div className="time-digits" key={i}>{char}</div>
            ))}</div>
            <div className="time flex align-left">{[...time].map((char, i) => (
                <div className="time-digits" key={i}>{char}</div>
            ))}</div>
        </div>
    );
};

export default FlipClock;
