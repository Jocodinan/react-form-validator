import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputField extends Component{
  render(){
    const { field, invalidField, InvalidInputClass, errorMessage, icon } = this.props,
          Tag = field.tag;

    return(
      <label className={field.labelClass +' '+ (invalidField ? InvalidInputClass : '')}>
      <span>{ field.label }</span>
      <Tag 
        className={ field.fieldClass } 
        type={ field.type } 
        name={ field.name } 
        placeholder={ field.placeholder } 
        value={ field.value }
        onChange={ field.onChangeFunc } >
      </Tag>
      { errorMessage }
      { icon }
    </label>
    );
  }
}

InputField.propTypes = {
  field: PropTypes.object,
  invalidField: PropTypes.bool,
  InvalidInputClass: PropTypes.string,
  errorMessage: PropTypes.element,
  icon: PropTypes.element
}