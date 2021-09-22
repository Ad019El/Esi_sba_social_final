import React from 'react';
import useStyles from "./Request-jss";

const InputElement = ( props ) => {

    let inputElement = null;

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = 
            <div >
                <div className='form-group'>
                  <input
                className='custom-select input-select input-text'
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} /> </div>
            </div>
                ;
            break;
        case ( 'textarea' ):
            inputElement = <div >
              <div className='form-group'>
                <textarea
                className='custom-select input-select input-text'
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} /></div>;
            </div>
                
            break;
        case ( 'select' ):
            inputElement = (
                 <div >
                   <div className='form-group'>
                  <select
                    className='custom-select input-select input-text'
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
                </div>
                 </div>
            );
            break;
        default:
            inputElement = <div >
              <input
                className='custom-select input-select input-text'
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            </div>;
    }
  const classes = useStyles() ;

    return (
        <div className={`${classes.page} text-center`}>
            {inputElement}
        </div>
    );

};

export default InputElement ;