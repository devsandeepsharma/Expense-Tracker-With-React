import "./input.css";

const Input = ({ 
    name="", 
    type="text", 
    labelText="Input Lable" ,
    errText="",
    value="",
    onChange=()=>{},
    ...props
}) => {
    return (
        <div className="input-container">
            <label htmlFor={name}>{labelText}</label>
            <input 
                id={name} 
                type={type} 
                name={name}

                value={value}
                onChange={onChange}
                {...props} 
            />
            <p>{errText && errText}</p>
        </div>
    )
}

export default Input;