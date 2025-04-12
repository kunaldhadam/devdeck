import React from 'react'

function RegexGenerator() {

    


    return (
        <div className='mx-10'>
            <p>What is this going to do?</p>
            <p>It takes a list of strings I want to allow (need input)</p>
            <p>It takes a list of strings I dont want to allow (need input)</p>

            <p>It generates the regex according to this(output display)</p>


            <p>thats it!!</p><br />


            <div className="strings-allowed">
                <span>Allowed Strings:</span><input type="text" className="text border" />
            </div><br />
            <div className="strings-not-allowed">
                <span>Not Allowed Strings:</span><input type="text" className="text border" />
            </div><br />
            <div className="regex-output">
                <p>Regex Output:</p>
            </div>
        </div>
    )
}

export default RegexGenerator
