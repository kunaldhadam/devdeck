import React from 'react'
import FlipClock from './FlipClock'

const sidebarItems = [
    { name: 'System Stats', icon: '📁', url: '#/' },
    { name: 'Color Picker', icon: '📁', url: '#/color-picker' },
    { name: 'Regex Generator', icon: '📂', url: '#/regex-generator' },
    { name: 'JSON Formatter', icon: '📊', url: '#/json-formatter' },
    { name: 'Trend News', icon: '📊', url: '#/trendspot' },
]

function Sidebar() {
    return (
        <div className='sidebar p-4'>
            <h1 className='mb-5 text-3xl text-center'> Tools</h1>
            {sidebarItems.map((item, index) => (
                <a href={item.url} key={index} className='sidebar-item flex items-center p-2 hover:bg-gray-200 rounded-md cursor-pointer border-b-2 border-gray-300 mb-2'>
                    {/* <span className='icon text-2xl mr-2'>{item.icon}</span> */}
                    <span className='text-base'>{item.name}</span>
                </a>
            ))}

            <div className="text-center my-6 w-full flex absolute bottom-0">
                <FlipClock />
            </div>
        </div>
    )
}

export default Sidebar
