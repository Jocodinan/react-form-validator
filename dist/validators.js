"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.required = required;
exports.email = email;
exports.minCharacters8 = minCharacters8;
function required(value, checked) {
  if (checked != undefined) return !checked;

  return value.length == 0;
}

function email(value, checked) {
  var emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !emailRegEx.test(value);
}

function minCharacters8(value, checked) {
  return value && value.length < 8;
}