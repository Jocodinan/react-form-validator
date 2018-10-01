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
      email: ''
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
    return (
      <FormValidator submitHandler={ ()=>{ console.log('submit') } }>
        <label>
          <span className="label-like">Ingresar texto:</span>
          <input type="text" name="text-field" placeholder="Ingresa un texto" value={ this.state.text } onChange={ this.onChangeHandler.bind(null, 'text') } validators={ ['required'] } error={ 'Debe ingresar un texto válido' } />
        </label>
        <label>
          <span className="label-like">Ingresar email:</span>
          <input type="text" name="email-field" placeholder="Ingresa un email" value={ this.state.email } onChange={ this.onChangeHandler.bind(null, 'email') } validators={ ['required', 'email'] } error={ 'Debe ingresar un email válido' } />
        </label>
      </FormValidator>
    );
  }
}