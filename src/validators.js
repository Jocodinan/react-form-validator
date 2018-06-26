export function required(value, checked){
    if(checked != undefined)
      return !checked;
  
    return value.length == 0;
  }
    
  export function email(value, checked){
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !emailRegEx.test(value);
  }
    
  export function minCharacters8(value, checked){
    return value && value.length < 8
  }