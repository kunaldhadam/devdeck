//Let users pick a color using a color input and display its HEX, RGB, and HSL values. Bonus: Copy to clipboard.

import React, { useEffect, useRef, useState } from 'react'

const ColorSwatch = ({ color }) => {
    if (!color) return null;
    return (
        <div className="flex text-sm">
            <div
                className="w-20 h-12"
                style={{ backgroundColor: color.rgb }}
            />
            <div className='px-3 border border-gray-300' style={{ 'width': '12rem' }}>
                <p>{color.rgb}</p>
                <p>{color.hex}</p>
            </div>
        </div>
    );
}

function ColorPicker() {

    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    const [palette, setPalette] = useState([]);
    const [imageSrc, setImageSrc] = useState('src/assets/color-picker-default.jpeg'); // <-- default image path
    const [currentColor, setCurrentColor] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    // Draw + extract color palette
    const extractColors = () => {
        const canvas = canvasRef.current;
        const img = imgRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const colorMap = {};
        const step = 140; // increase accuracy

        for (let i = 0; i < data.length; i += 4 * step) {
            let [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
            if (a < 128) continue;

            // Quantize to reduce near-identical colors
            r = Math.round(r / 24) * 24;
            g = Math.round(g / 24) * 24;
            b = Math.round(b / 24) * 24;

            const key = `${r},${g},${b}`;
            colorMap[key] = (colorMap[key] || 0) + 1;
        }

        const sorted = Object.entries(colorMap)
            .sort((a, b) => { b[1] - a[1]})
            .slice(0, 10)
            .map(([key]) => key.split(',').map(Number));

        console.log(sorted);

        setPalette(sorted);
    };

    const getColorAt = (x, y) => {
        const ctx = canvasRef.current.getContext('2d');
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        return {
            rgb: `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`,
            hex: `#${[pixel[0], pixel[1], pixel[2]]
                .map((x) => x.toString(16).padStart(2, '0'))
                .join('')}`,
        };
    };

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCurrentColor(getColorAt(x, y));
    };

    const handleClick = () => {
        if (currentColor) setSelectedColor(currentColor);
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => setImageSrc(event.target.result);
        reader.readAsDataURL(file);
    };

    const handleSwatchCheck = (e) => {
        const rgbColor = e.target.style.backgroundColor;
        setCurrentColor({
            rgb: rgbColor,
            hex: rgbToHex(rgbColor)
        })
    }

    const handleSwatchSelect = (e) => {
        const rgbColor = e.target.style.backgroundColor;
        setSelectedColor({
            rgb: rgbColor,
            hex: rgbToHex(rgbColor)
        })
    }

    const rgbToHex = (rgb) => {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        return "#" + [r, g, b]
            .map((x) => x.toString(16).padStart(2, "0"))
            .join("");
    };

    // Re-extract palette when image changes
    useEffect(() => {
        const img = imgRef.current;
        if (img.complete) extractColors();
        else img.onload = extractColors;
    }, [imageSrc]);


    useEffect(() => {
        if (palette.length >= 2) {
            const shuffled = [...palette].sort(() => 0.5 - Math.random());

            const [r1, g1, b1] = shuffled[0];
            const [r2, g2, b2] = shuffled[1];

            const rgbStr = (r, g, b) => `rgb(${r}, ${g}, ${b})`;
            const hexStr = (r, g, b) =>
                `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;

            setSelectedColor({
                rgb: rgbStr(r1, g1, b1),
                hex: hexStr(r1, g1, b1),
            });

            setCurrentColor({
                rgb: rgbStr(r2, g2, b2),
                hex: hexStr(r2, g2, b2),
            });
        }
    }, [palette]);


    const handleDrop = (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            const url = URL.createObjectURL(file);
            setImageSrc(url);
        }
    }


    return (
        <div className='flex flex-col items-center h-screen'>
            <h1 className='text-2xl font-bold my-4'>Color Picker</h1><br />
            <div className="flex gap-6 flex-switch">
                <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="picker-image-holder shadow p-4 border rounded-sm border-gray-300">
                    <div className="flex items-center">
                    <label className="block w-fit cursor-pointer bg-gray-300 text-black px-4 py-2 shadow shadow-lg border hover:bg-gray-300">
                        Choose File
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className='mb-4 hidden'
                        /></label>
                        <div className='mx-2'>Or Drop Image</div></div>
                        <br />
                    <img
                        ref={imgRef}
                        src={imageSrc}
                        onMouseMove={handleMouseMove}
                        onClick={handleClick}
                        crossOrigin='anonymous' alt='uploaded'
                        className='color-picker max-h-96 mx-auto'
                    ></img>

                    <canvas
                        ref={canvasRef}
                        className='hidden'
                    />

                    <div className='font-semibold palette-area p-3 border border-gray-400 '>
                        <span>Palette</span><br />
                        <div className="color-palette flex">
                            {palette.map((rgb, i) => (
                                <div
                                    onMouseOver={handleSwatchCheck}
                                    onClick={handleSwatchSelect}
                                    key={i}
                                    title={`rgb(${rgb.join(',')})`}
                                    style={{ backgroundColor: `rgb(${rgb.join(',')})` }}
                                    className='swatch w-12 h-12'
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                
                    <div className='shadow p-4 border rounded-sm border-gray-300' style={{'maxWidth': '18rem'}}>
                        <ColorSwatch color={selectedColor} />
                        <ColorSwatch color={currentColor} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorPicker
