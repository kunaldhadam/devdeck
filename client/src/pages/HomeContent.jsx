import React from 'react'
import { useEffect, useState } from 'react';
import TodoList from './TodoList';
import SystemStats from '../components/Home/SystemStats';


function HomeContent() {

    const [time, setTime] = useState(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );

    useEffect(() => {


        const timer = setInterval(() => {
            setTime(
                new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            );
        }, 10000);
        return () => clearInterval(timer);
    }, []);

    const digits = time.replace(":", "").split("");



    return (

        <div className='flex justify-between w-full h-full'>
            <div className='tips-holder h-full'>
                <SystemStats />
            </div>
            <div className='h-full'>
                <TodoList />
            </div>
        </div>

    )
}

export default HomeContent
