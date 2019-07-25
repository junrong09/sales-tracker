import React from 'react';

const FormButton = ({label, onClick, className}) => {
    return (
        <input className={"f5 fw6 ph3 h2 br2 bn bg-blue hover-bg-light-blue white self-center shadow-4 " + className}
               type="button" value={label} onClick={onClick}/>
    )
};

export default FormButton;