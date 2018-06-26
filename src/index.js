import React, {Component} from 'react';
import PropTypes from 'prop-types';

import * as Validators from './validators';
import Checkbox from './checkbox';
import InputField from './input-field';

export default class FormValidator extends Component{
  constructor(props){
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
    
    this.state = {
      invalidFields: [],
      submited: false
    }
  }
  submitHandler(event){
    event.preventDefault();

    const { formFields } = this.props,
          invalidFields = []

    formFields.forEach((fieldset) => {
      fieldset.data.forEach((field) => {
        if(field.validators && field.validators.length){
          const fieldsValidation = this.validateField(field);
          if(fieldsValidation.includes(true))
            invalidFields.push(field.name)
        }
      });
    });

    if(!invalidFields.length){
      this.props.formSubmitHandler();
    }else{
      this.setState({
        submited: true,
        invalidFields
      });
    }
  }
  getFields(){
    const { formFields } = this.props;
    
    this.invalidForm = false;
    return formFields.map((fieldset,indexFieldset) => {
      const fields = fieldset.data.map((field, indexField) => {
        let invalidField = false,
          errorMessage = null,
          icon = null;

        if(field.validators && field.validators.length){
          if(this.state.invalidFields.includes(field.name)){
            invalidField = true;

            if(field.invalidSetup && !field.invalidSetup.errorMessage)
              icon = <i className={field.invalidSetup.icons.invalid}></i>;
            else if(field.invalidSetup && field.invalidSetup.errorMessage)
              icon = field.invalidSetup.errorMessage;

            if(field.errorMessage && !field.invalidSetup)
              errorMessage = <p className={ this.props.errorMessageClass }>{ field.errorMessage }</p>
          }else{
            if(field.invalidSetup && this.state.submited)
              icon = <i className={field.invalidSetup.icons.valid}></i>;
          }
        }

        if(field.type == 'checkbox'){
          return (
            <Checkbox
              key={ 'checkbox-'+field.name } 
              field={ field } 
              invalidField={ invalidField } 
              InvalidInputClass={ this.props.InvalidInputClass }
            />
          );
        }else if(field.type == 'hr'){
          return <hr key={ 'hr-'+indexField } ></hr>;
        }else{
          return (
            <InputField 
              key={ 'input-'+field.name } 
              field={ field } 
              invalidField={ invalidField } 
              InvalidInputClass={ this.props.InvalidInputClass }
              errorMessage={ errorMessage }
              icon={ icon }
            />
          );
        }
      });

      const fieldSetTitle = fieldset.title ? <h3>{ fieldset.title }</h3> : null;
      
      return (
        <fieldset className={ fieldset.fieldsetClass } key={ 'fieldset-'+indexFieldset }>
          { fieldSetTitle }
          { fields }
        </fieldset>
      );
    })
  }
  validateField(field){
    return field.validators.map((validator) => {
      return Validators[validator](field.value, field.checked);
    });
  }
  render(){
    const props = this.props,
          fields = this.getFields();

    return(
      <form method="POST" action="#" className={ this.props.formClass } onSubmit={ this.submitHandler } noValidate>
        <div className={ this.props.formHolderClass }>
          { fields }
          { this.props.children }
        </div>
        <div className={ props.formButtonHolder }>
          <button className={ props.formButton.buttonClass }>{ props.formButton.text }</button>
        </div>
      </form>
    );
  }
}

FormValidator.propTypes = {
  formClass: PropTypes.string,
  formFields: PropTypes.array,
  formButton: PropTypes.object,
  InvalidInputClass: PropTypes.string,
  formSubmitHandler: PropTypes.func,
  labelClass: PropTypes.string,
  formHolderClass: PropTypes.string,
  formButtonHolder: PropTypes.string
}

FormValidator.defaultProps = {
  InvalidInputClass: 'invalid-input',
  errorMessageClass: 'error-message',
  formHolderClass: 'row scrolled-content inner',
  formButtonHolder: 'form-button-holder'
}