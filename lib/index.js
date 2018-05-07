"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Validators = _interopRequireWildcard(require("./validators"));

var _checkbox = _interopRequireDefault(require("./checkbox"));

var _inputField = _interopRequireDefault(require("./input-field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var FormValidator =
/*#__PURE__*/
function (_Component) {
  function FormValidator(props) {
    var _this;

    _classCallCheck(this, FormValidator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormValidator).call(this, props));
    _this.submitHandler = _this.submitHandler.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      invalidFields: [],
      submited: false
    };
    return _this;
  }

  _createClass(FormValidator, [{
    key: "submitHandler",
    value: function submitHandler(event) {
      var _this2 = this;

      event.preventDefault();
      var formFields = this.props.formFields,
          invalidFields = [];
      formFields.forEach(function (fieldset) {
        fieldset.data.forEach(function (field) {
          if (field.validators && field.validators.length) {
            var fieldsValidation = _this2.validateField(field);

            if (fieldsValidation.includes(true)) invalidFields.push(field.name);
          }
        });
      });

      if (!invalidFields.length) {
        this.props.formSubmitHandler();
      } else {
        this.setState({
          submited: true,
          invalidFields: invalidFields
        });
      }
    }
  }, {
    key: "getFields",
    value: function getFields() {
      var _this3 = this;

      var formFields = this.props.formFields;
      this.invalidForm = false;
      return formFields.map(function (fieldset, indexFieldset) {
        var fields = fieldset.data.map(function (field, indexField) {
          var invalidField = false,
              errorMessage = null,
              icon = null;

          if (field.validators && field.validators.length) {
            if (_this3.state.invalidFields.includes(field.name)) {
              invalidField = true;
              if (field.invalidSetup && !field.invalidSetup.errorMessage) icon = _react.default.createElement("i", {
                className: field.invalidSetup.icons.invalid
              });else if (field.invalidSetup && field.invalidSetup.errorMessage) icon = field.invalidSetup.errorMessage;
              if (field.errorMessage && !field.invalidSetup) errorMessage = _react.default.createElement("p", {
                className: _this3.props.errorMessageClass
              }, field.errorMessage);
            } else {
              if (field.invalidSetup && _this3.state.submited) icon = _react.default.createElement("i", {
                className: field.invalidSetup.icons.valid
              });
            }
          }

          if (field.type == 'checkbox') {
            return _react.default.createElement(_checkbox.default, {
              key: 'checkbox-' + field.name,
              field: field,
              invalidField: invalidField,
              InvalidInputClass: _this3.props.InvalidInputClass
            });
          } else if (field.type == 'hr') {
            return _react.default.createElement("hr", {
              key: 'hr-' + indexField
            });
          } else {
            return _react.default.createElement(_inputField.default, {
              key: 'input-' + field.name,
              field: field,
              invalidField: invalidField,
              InvalidInputClass: _this3.props.InvalidInputClass,
              errorMessage: errorMessage,
              icon: icon
            });
          }
        });
        var fieldSetTitle = fieldset.title ? _react.default.createElement("h3", null, fieldset.title) : null;
        return _react.default.createElement("fieldset", {
          className: fieldset.fieldsetClass,
          key: 'fieldset-' + indexFieldset
        }, fieldSetTitle, fields);
      });
    }
  }, {
    key: "validateField",
    value: function validateField(field) {
      return field.validators.map(function (validator) {
        return Validators[validator](field.value, field.checked);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props,
          fields = this.getFields();
      return _react.default.createElement("form", {
        method: "POST",
        action: "#",
        className: this.props.formClass,
        onSubmit: this.submitHandler,
        noValidate: true
      }, _react.default.createElement("div", {
        className: this.props.formHolderClass
      }, fields, this.props.children), _react.default.createElement("div", {
        className: props.formButtonHolder
      }, _react.default.createElement("button", {
        className: props.formButton.buttonClass
      }, props.formButton.text)));
    }
  }]);

  _inherits(FormValidator, _Component);

  return FormValidator;
}(_react.Component);

exports.default = FormValidator;
FormValidator.propTypes = {
  formClass: _propTypes.default.string,
  formFields: _propTypes.default.array,
  formButton: _propTypes.default.object,
  InvalidInputClass: _propTypes.default.string,
  formSubmitHandler: _propTypes.default.func,
  labelClass: _propTypes.default.string,
  formHolderClass: _propTypes.default.string,
  formButtonHolder: _propTypes.default.string
};
FormValidator.defaultProps = {
  InvalidInputClass: 'invalid-input',
  errorMessageClass: 'error-message',
  formHolderClass: 'row scrolled-content inner',
  formButtonHolder: 'form-button-holder'
};