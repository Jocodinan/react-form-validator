import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import * as Validators from './validators';
import Fields from './fields';

export default class FormValidator extends Component{
  constructor(props){
    super(props);

    this.submitHandler = this.submitHandler.bind(this);

    this.state = {
      invalidFields: []
    }
  }
  validateFields(children){
    let invalidFields = [];

    Children.map(children, child => {
      if(child.props){
        const { validators, name } = child.props;
        
        if(child.props && child.props.children)
          invalidFields = invalidFields.concat(this.validateFields(child.props.children));

        if(validators && validators.length){
          const fieldsValidation = this.validateField(child.props);
          if(fieldsValidation.includes(true))
            invalidFields.push(name)
        }
      }
    });

    return invalidFields;
  }
  submitHandler(event){
    event.preventDefault();
    const { children } = this.props;

    let invalidFields = this.validateFields(children);
    
    if(!invalidFields.length){
      this.setState({ invalidFields }, this.props.submitHandler());
    }else{
      this.setState({ invalidFields });
    }
  }
  validateField(field){
    const { validators, value, checked } = field;

    return validators.map((validator) => {
      return Validators[validator](value, checked);
    });
  }
  render(){
    const { formClass, buttonClass, children } = this.props;

    return(
      <form method="POST" action="#" className={ formClass } onSubmit={ this.submitHandler } noValidate>
        <Fields fields={ children } { ...this.props } {...this.state}/>
        <button className={ buttonClass }>Guardar</button>
      </form>
    );
  }
}

FormValidator.propTypes = {
  formClass: PropTypes.string,
  buttonClass: PropTypes.string,
  invalidClass: PropTypes.string,
  errorMessageClass: PropTypes.string,
  labelClass: PropTypes.string,
  submitHandler: PropTypes.func.isRequired
}

FormValidator.defaultProps = {
  invalidClass: 'invalid-input',
  errorMessageClass: 'error-message',
  labelClass: 'label-name'
}