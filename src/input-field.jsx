import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputField extends Component{
  constructor(props){
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  onChangeHandler(event){
    const { onChange } = this.props;
    onChange(event);
  }
  getErrorMessage(){
    const { error, invalidFields, errorMessageClass, name } = this.props;

    if(!invalidFields.includes(name)){ return null; }

    return <p className={ errorMessageClass }>{ error }</p>
  }
  render(){
    const { className, name, placeholder, type, value, validators, invalidFields, invalidClass } = this.props,
          invalidClassName = invalidFields.includes(name) ? invalidClass : '',
          errorMessage = this.getErrorMessage();
    
  return (
      <span>
        <input className={`${className} ${invalidClassName}`} name={name} placeholder={placeholder} type={type} value={value} onChange={this.onChangeHandler} />
        { errorMessage }
      </span>
    );
  }
}

InputField.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  invalidFields: PropTypes.array,
  invalidClass: PropTypes.string,
  errorMessageClass: PropTypes.string
}