import React from 'react';

const FormButton = ({label}) => {
    return (
        <input className="f5 fw6 mw4 w-80 h2 br2 bn bg-blue hover-bg-light-blue white self-center shadow-4" type="button" value={label}/>
    )
};

export default FormButton;