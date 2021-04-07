import React from 'react';
import './style.css'

interface ButtonErrorInterface {
    text: string,
    callBack: any
}

function ButtonError({ text, callBack }: ButtonErrorInterface) {
    return (
        <button className="button__error" onClick={() => callBack()}>
            {text}
        </button>
    );
}

export default ButtonError;