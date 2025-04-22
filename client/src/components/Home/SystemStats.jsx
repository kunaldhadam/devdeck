import React, { useEffect, useState } from 'react';

const getSystemStats = async () => {
    const connection = navigator.connection || {};
    const battery = await navigator.getBattery?.();

    const ipData = await fetch('https://api64.ipify.org?format=json')
        .then(res => res.json())
        .catch(() => ({ ip: 'Unavailable' }));

    return {
        ip: ipData.ip,
        ipv4: getIPv4(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        memory: navigator.deviceMemory || 'N/A',
        cores: navigator.hardwareConcurrency || 'N/A',
        online: navigator.onLine,
        timeSinceLoad: (performance.now() / 1000).toFixed(2) + 's',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screenRes: `${window.screen.width}x${window.screen.height}`,
        network: {
            type: connection.effectiveType || 'Unknown',
            downlink: connection.downlink || 'Unknown',
        },
        battery: battery ? {
            level: Math.round(battery.level * 100) + '%',
            charging: battery.charging,
        } : null,
        cookiesEnabled: navigator.cookieEnabled,
        localStorage: { ...localStorage },
        sessionStorage: { ...sessionStorage },
    };
};

const getIPv4 = async () => {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip || 'Unavailable';
};

const SystemStats = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const loadStats = async () => {
            const result = await getSystemStats();
            setStats(result);
        };
        loadStats();

        const interval = setInterval(loadStats, 5000); // refresh every 5s
        return () => clearInterval(interval);
    }, []);

    


    if (!stats) return <p className="text-black">Loading stats...</p>;

    return (
        <div className="system-stats bg-gray-900 text-white p-4 shadow-xl w-full h-full">
            <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">System Info</h2>
            <ul className="space-y-2 text-sm">
                <li><strong>IPv6:</strong> {stats.ip}</li>
                <li><strong>IPv4:</strong> {stats.ipv4}</li>
                <li><strong>Platform:</strong> {stats.platform}</li>
                <li><strong>Browser:</strong> {stats.userAgent}</li>
                <li><strong>Language:</strong> {stats.language}</li>
                <li><strong>CPU Cores:</strong> {stats.cores}</li>
                <li><strong>Memory:</strong> {stats.memory} GB</li>
                <li><strong>Screen:</strong> {stats.screenRes}</li>
                <li><strong>Timezone:</strong> {stats.timezone}</li>
                <li><strong>Online:</strong> {stats.online ? 'Yes' : 'No'}</li>
                <li><strong>Network Type:</strong> {stats.network.type}</li>
                <li><strong>Download Speed:</strong> {stats.network.downlink} Mbps</li>
                <li><strong>Cookies Enabled:</strong> {stats.cookiesEnabled ? 'Yes' : 'No'}</li>
                {stats.battery && (
                    <li><strong>Battery:</strong> {stats.battery.level} {stats.battery.charging ? '(Charging)' : ''}</li>
                )}
                <li><strong>Time Since Load:</strong> {stats.timeSinceLoad}</li>
            </ul>
            </div>

            
        </div>
    );
};

export default SystemStats;
