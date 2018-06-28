import React, {Component} from 'react';
import { render} from 'react-dom';
import FormValidator from '../../src';

export default class Wrapper extends Component{
  constructor(props){
    super(props);

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onCheckboxHandler = this.onCheckboxHandler.bind(this);

    this.state = {
      text: '',
      secondText: '',
      pass: '',
      email: '',
      checkbox: false,
      textarea: ''
    };
  }
  onChangeHandler(target, event){
    const value = event.target.value;
    this.setState({[target]: value})
  }
  onCheckboxHandler(event){
    this.setState({checkbox: !this.state.checkbox})
  }
  render(){
    return(
      <FormValidator 
        formClass="form-class" //The form class name
        formSubmitHandler={ () => { console.log('submit form') } }   //The form submit handler
        formButtonHolder={ 'form-button-holder-class' } //The form submit button holder wrapper class
        formButton={{ //Form submit button attributes
          buttonClass: 'button-class', //The submit button class name
          text: 'Actualizar' //The submit button text
        }}
        formFields={[//Form fieldsets details
          {
            data: [ //Fields for each fieldset
              {
                tag: 'input', //field 
                type: 'text', // field type
                name: 'text-field', //field name
                invalidSetup: { //In case you want to show some icon at the validation state of this field
                  icons: {
                    valid: 'icon-element check field-icon', //valid icon class
                    invalid: 'fas fa-times-circle', //invalid icon class
                  }
                },
                placeholder: 'Ingrese una texto', //field place holder
                value: this.state.text, //field value
                label: 'Ingrese un texto:', //field label
                onChangeFunc: this.onChangeHandler.bind(null, 'text'), //on change field function
                validators: ['required'] //The validation type required
              },
              {
                tag: 'input', //field 
                type: 'text', // field type
                name: 'text', //field name
                invalidSetup: { //In case you want to show some icon at the validation state of this field
                  icons: {
                    valid: 'icon-element check field-icon', //valid icon class
                    invalid: 'fas fa-times-circle', //invalid icon class
                  },
                  errorMessage: <span className="error-message">Debes ingresar un texto</span>
                },
                placeholder: 'Ingrese una texto', //field place holder
                value: this.state.secondText, //field value
                label: 'Ingrese un texto:', //field label
                onChangeFunc: this.onChangeHandler.bind(null, 'secondText'), //on change field function
                validators: ['required'] //The validation type required
              },
              {
                tag: 'input', //field 
                type: 'email', // field type
                name: 'email', //field name
                invalidSetup: { //In case you want to show some icon at the validation state of this field
                  icons: {
                    valid: 'icon-element check field-icon', //valid icon class
                    invalid: 'fas fa-times-circle', //invalid icon class
                  },
                  errorMessage: <span className="error-message">Debes ingresar un email válido</span> //in case you wan to show a tooltip at the error state of this field
                },
                placeholder: 'Ingrese un email válido', //field place holder
                value: this.state.email, //field value
                label: 'Ingrese un email válido:', //field label
                onChangeFunc: this.onChangeHandler.bind(null, 'email'), //on change field function
                validators: ['required', 'email'] //The validation type required
              },
              {
                tag: 'input', //field 
                type: 'password', // field type
                name: 'password', //field name
                invalidSetup: { //In case you want to show some icon at the validation state of this field
                  icons: {
                    valid: 'icon-element check field-icon', //valid icon class
                    invalid: 'fas fa-times-circle', //invalid icon class
                  },
                  errorMessage: <span className="error-message">Debes ingresar un password mínimo de 8 caracteres</span> //in case you wan to show a tooltip at the error state of this field
                },
                placeholder: 'Ingrese un email válido', //field place holder
                value: this.state.pass, //field value
                label: 'Ingrese un password:', //field label
                onChangeFunc: this.onChangeHandler.bind(null, 'pass'), //on change field function
                validators: ['required', 'minCharacters8'] //The validation type required
              },
              {
                tag: 'input',
                type: 'checkbox',
                name: 'checkbox',
                checked: this.state.checkbox,
                value: 'checkbox-value',
                label: 'Checkbox',
                onChangeFunc: this.onCheckboxHandler,
                validators: ['required']
              },
              {
                tag: 'textarea',
                name: 'text-area',
                labelClass: 'label-class',
                invalidSetup: { //In case you want to show some icon at the validation state of this field
                  icons: {
                    valid: 'icon-element check field-icon', //valid icon class
                    invalid: 'fas fa-times-circle', //invalid icon class
                  },
                  // errorMessage: <span className="error-message">Debes ingresar un texto de mínimo 8 caracteres</span> //in case you wan to show a tooltip at the error state of this field
                },
                placeholder: 'Ingrese un texto',
                value: this.state.textarea,
                label: 'Ingrese un texto:',
                onChangeFunc: this.onChangeHandler.bind(null, 'textarea'),
                validators: ['required']
              }
            ]
          }
        ]}
      />
    );
  }
}