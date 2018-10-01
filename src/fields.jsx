import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import InputField from './input-field';

export default class Fields extends Component{
  renderSubChildren(childrens){
    return Children.map(childrens, child => {
      const { labelClass } = this.props,
            element = child.type;

      switch (element){
        case 'input':
          return <InputField { ...child.props } { ...this.props }/>
        default:
          return <span className={ labelClass }>{child}</span>;
      }
    })
  }
  renderChildren(childrens){
    return Children.map(childrens, child => {
      if(child.props && child.props.children)
        return <label>{this.renderSubChildren(child.props.children)}</label>;
    });
  }
  render(){
    const { fields } = this.props;

    return (
      <div>
        { this.renderChildren(fields) }
      </div>
    )
  }
}

Fields.propTypes = {
  fields: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  invalidFields: PropTypes.array
}