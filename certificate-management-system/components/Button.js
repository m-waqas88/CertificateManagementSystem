import React, { useState } from 'react';

const  Button = (props) => {

    const issueStyle = {
        borderWidth: '1px',
        borderRadius: '0.25rem',
        borderColor: 'black',
        padding: '0.25rem 0.75rem',
        backgroundColor: '#66ff66',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    }

    const verifyStyle = {
        borderWidth: '1px',
        borderRadius: '0.25rem',
        borderColor: 'black',
        padding: '0.25rem 0.75rem',
        backgroundColor: '#3385ff',
        color: 'white',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    }

    return (
        <div className="flex justify-center mt-2">
            <button 
            className={(props.disability.issuedisabled) || (props.type==='issue' && !props.account) ? 'disabled' : ''} 
            disabled={(props.disability.issuedisabled) || (props.type==='issue' && !props.account)} 
            style={(props.type==='issue' ? issueStyle : (props.type==='verify' ? verifyStyle : {}))}>
                {props.text}
            </button>
        </div>
    )
}

export default Button