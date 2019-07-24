import React from 'react';

const FormTextBox = ({label, onChange, defaultText}) => {
    const ranNum = Math.floor(Math.random() * 100000);
    return (
        <div className="flex flex-column mh3 mv3">
            <label className="f5 sans-serif mid-gray tl" htmlFor={label + ranNum}>
                {label}
            </label>
            <input className="f6 mw5 w-90 h2 bl-0 br-0 bt-0 br2 pl2 hover-bg-washed-blue grow sans-serif" type="text" id={label + ranNum} placeholder={"Enter your " + label + "..."} onChange={onChange} value={defaultText}/>
        </div>
    )
};

export default FormTextBox;