import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends Component{
  render(){
    const { field, invalidField, InvalidInputClass } = this.props,
          Tag = field.tag;

    return (
      <label className={field.labelClass +' '+ (invalidField ? InvalidInputClass : '')} key={'input-'+ field.name}>
        <Tag 
        className={ field.fieldClass } 
        type={ field.type } 
        name={ field.name } 
        placeholder={ field.placeholder } 
        value={ field.value }
        onChange={ field.onChangeFunc }
        checked={ field.checked }
        />
        <span>{ field.label }</span>
      </label>
    );
  }
}

Checkbox.propTypes = {
  field: PropTypes.object,
  invalidField: PropTypes.bool,
  InvalidInputClass: PropTypes.string
}