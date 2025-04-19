import React from 'react'
import { useEffect, useState } from 'react';
import TodoList from './TodoList';
import FlipClock from '../components/Home/FlipClock';


const tips = [
    "Comment your code like someone else will read it. Because they will.",
    "Keep functions pure and short — like your attention span.",
    "Console.log is the OG debugger. Use it wisely.",
    "Don’t repeat yourself. Unless you’re echoing greatness.",
    "Naming things is hard. But do it anyway.",
    "Push your code, not your luck.",
];


function HomeContent() {
    const [tip, setTip] = useState('');
    const [time, setTime] = useState(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * tips.length);
        setTip(tips[randomIndex]);
        const timer = setInterval(() => {
            setTime(
                new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            );
        }, 10000);
        return () => clearInterval(timer);
    }, []);

    const digits = time.replace(":", "").split("");



    return (

        <div className='flex justify-between w-full'>
            {/* <WeatherCard /> */}
            <div className='w-full'>
                <div className="tips text-center text-3xl text-black m-2">
                    "{tip}"
                </div>
            </div>
            <div>
                <TodoList />
            </div>
        </div>

    )
}

export default HomeContent
