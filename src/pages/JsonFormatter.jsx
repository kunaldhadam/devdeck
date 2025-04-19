import React, { useState } from 'react'

function JsonFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');


    const formatJson = () =>{
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2)
            setOutput(formatted);
            setError('');
        } catch (error) {
            setError(`Invalid JSON ${error}`);
            setOutput('');
        }
    };


    return (
        <div className="p-4 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">JSON Formatter</h1>
          <textarea

            className="bg-white w-full h-40 p-2 border rounded"
            placeholder="Paste your JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={formatJson}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Format
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {output && (
            <pre className="mt-4 bg-gray-100 p-4 rounded overflow-x-auto">
              {output}
            </pre>
          )}
        </div>
  )
}

export default JsonFormatter
