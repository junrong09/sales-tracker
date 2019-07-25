import React from "react";

const FormDropDown = ({label, options, onChange}) => {
    const ranNum = Math.floor(Math.random() * 100000);
    const optionTags = [];
    for (let [key] of options) {
        optionTags.push(
            <option value={key} key={key} className="sans-serif mid-gray">{key}</option>
        )
    }

    return (
        <div className="flex flex-column mh3 mv3">
            <label className="f5 sans-serif mid-gray tl" htmlFor={label + ranNum}>
                {label}
            </label>
            <select name={label} id={label + ranNum} className="sans-serif mid-gray mw6 h2 bl-0 br-0 bt-0 pl2 hover-bg-washed-blue grow" onChange={onChange}>
                {optionTags}
            </select>
        </div>
    )
};

export default FormDropDown;