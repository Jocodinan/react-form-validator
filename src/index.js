import React from 'react';
import ReactDOM from 'react-dom';

import FormValidator from './components/form-validator';

ReactDOM.render(
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
            name: 'text', //field name
            invalidSetup: { //In case you want to show some icon at the validation state of this field
              icons: {
                valid: 'icon-element check field-icon', //valid icon class
                invalid: 'icon-element rounded info red field-icon', //invalid icon class
              },
              tooltip: <span>tooltip</span> //in case you wan to show a tooltip at the error state of this field
            },
            placeholder: 'Ingrese una texto', //field place holder
            value: '', //field value
            label: 'Ingrese un texto:', //field label
            onChangeFunc: () => { console.log('change') }, //on change field function
            validators: ['required'] //The validation type required
          },
          {
            tag: 'input', //field 
            type: 'email', // field type
            name: 'email', //field name
            invalidSetup: { //In case you want to show some icon at the validation state of this field
              icons: {
                valid: 'icon-element check field-icon', //valid icon class
                invalid: 'icon-element rounded info red field-icon', //invalid icon class
              },
              tooltip: <span>tooltip</span> //in case you wan to show a tooltip at the error state of this field
            },
            placeholder: 'Ingrese un email válido', //field place holder
            value: '', //field value
            label: 'Ingrese un email válido:', //field label
            onChangeFunc: () => { console.log('change') }, //on change field function
            validators: ['required', 'email'] //The validation type required
          },
          {
            tag: 'input', //field 
            type: 'password', // field type
            name: 'password', //field name
            invalidSetup: { //In case you want to show some icon at the validation state of this field
              icons: {
                valid: 'icon-element check field-icon', //valid icon class
                invalid: 'icon-element rounded info red field-icon', //invalid icon class
              },
              tooltip: <span>tooltip</span> //in case you wan to show a tooltip at the error state of this field
            },
            placeholder: 'Ingrese un email válido', //field place holder
            value: '', //field value
            label: 'Ingrese un password:', //field label
            onChangeFunc: () => { console.log('change') }, //on change field function
            validators: ['required', 'minCharacters8'] //The validation type required
          },
          {
            tag: 'input',
            type: 'checkbox',
            name: 'checkbox',
            checked: true,
            value: 'checkbox-value',
            label: 'Checkbox',
            onChangeFunc: () => { console.log('change') }
          },
          {
            tag: 'textarea',
            name: 'text-area',
            labelClass: 'label-class',
            placeholder: 'Ingrese un texto',
            value: '',
            label: 'Ingrese un texto:',
            onChangeFunc: () => { console.log('change') },
            validators: ['required', 'minCharacters8']
          }
        ]
      }
    ]}
  />,
  document.getElementById('root')
);