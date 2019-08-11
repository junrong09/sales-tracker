import React from 'react';

const FormTextField = ({label, onChange, defaultText, placeholder}) => {
    const ranNum = Math.floor(Math.random() * 100000);
    return (
        <div className="flex flex-column mh3 mv2">
            <label className="f5 sans-serif mid-gray tl" htmlFor={label + ranNum}>
                {label}
            </label>
            <textarea className="f6 mt3 mb1 mw6 w-100 h4 bl-0 br-0 bt-0 pl2 bg-washed-blue grow sans-serif b--light-gray no-resize"
    placeholder={placeholder === undefined ? "Enter your " + label + "..." : placeholder} onChange={onChange}/>
        </div>
    )
};

export default FormTextField;