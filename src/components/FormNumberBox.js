import React from 'react';

const FormNumberBox = ({label, onChange, defaultText, placeholder}) => {
    const ranNum = Math.floor(Math.random() * 100000);
    return (
        <div className="flex flex-column mh3 mv2">
            <label className="f5 sans-serif mid-gray tl" htmlFor={label + ranNum}>
                {label}
            </label>
            <input className="f6 mw6 w-90 h2 bl-0 br-0 bt-0 pl2 hover-bg-washed-blue grow sans-serif" type="text" inputMode="decimal" pattern="[0-9]*" id={label + ranNum} placeholder={placeholder === undefined ? "Enter your " + label + "..." : placeholder} onChange={onChange}
                   value={defaultText}/>
        </div>
    )
};

export default FormNumberBox;