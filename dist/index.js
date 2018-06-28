'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _validators = require('./validators');

var Validators = _interopRequireWildcard(_validators);

var _checkbox = require('./checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _inputField = require('./input-field');

var _inputField2 = _interopRequireDefault(_inputField);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormValidator = function (_Component) {
  _inherits(FormValidator, _Component);

  function FormValidator(props) {
    _classCallCheck(this, FormValidator);

    var _this = _possibleConstructorReturn(this, (FormValidator.__proto__ || Object.getPrototypeOf(FormValidator)).call(this, props));

    _this.submitHandler = _this.submitHandler.bind(_this);

    _this.state = {
      invalidFields: [],
      submited: false
    };
    return _this;
  }

  _createClass(FormValidator, [{
    key: 'submitHandler',
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
    key: 'getFields',
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

              if (field.invalidSetup && !field.invalidSetup.errorMessage) icon = _react2.default.createElement('i', { className: field.invalidSetup.icons.invalid });else if (field.invalidSetup && field.invalidSetup.errorMessage) icon = field.invalidSetup.errorMessage;

              if (field.errorMessage && !field.invalidSetup) errorMessage = _react2.default.createElement(
                'p',
                { className: _this3.props.errorMessageClass },
                field.errorMessage
              );
            } else {
              if (field.invalidSetup && _this3.state.submited) icon = _react2.default.createElement('i', { className: field.invalidSetup.icons.valid });
            }
          }

          if (field.type == 'checkbox') {
            return _react2.default.createElement(_checkbox2.default, {
              key: 'checkbox-' + field.name,
              field: field,
              invalidField: invalidField,
              InvalidInputClass: _this3.props.InvalidInputClass
            });
          } else if (field.type == 'hr') {
            return _react2.default.createElement('hr', { key: 'hr-' + indexField });
          } else {
            return _react2.default.createElement(_inputField2.default, {
              key: 'input-' + field.name,
              field: field,
              invalidField: invalidField,
              InvalidInputClass: _this3.props.InvalidInputClass,
              errorMessage: errorMessage,
              icon: icon
            });
          }
        });

        var fieldSetTitle = fieldset.title ? _react2.default.createElement(
          'h3',
          null,
          fieldset.title
        ) : null;

        return _react2.default.createElement(
          'fieldset',
          { className: fieldset.fieldsetClass, key: 'fieldset-' + indexFieldset },
          fieldSetTitle,
          fields
        );
      });
    }
  }, {
    key: 'validateField',
    value: function validateField(field) {
      return field.validators.map(function (validator) {
        return Validators[validator](field.value, field.checked);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props,
          fields = this.getFields();

      return _react2.default.createElement(
        'form',
        { method: 'POST', action: '#', className: this.props.formClass, onSubmit: this.submitHandler, noValidate: true },
        _react2.default.createElement(
          'div',
          { className: this.props.formHolderClass },
          fields,
          this.props.children
        ),
        _react2.default.createElement(
          'div',
          { className: props.formButtonHolder },
          _react2.default.createElement(
            'button',
            { className: props.formButton.buttonClass },
            props.formButton.text
          )
        )
      );
    }
  }]);

  return FormValidator;
}(_react.Component);

exports.default = FormValidator;


FormValidator.propTypes = {
  formClass: _propTypes2.default.string,
  formFields: _propTypes2.default.array,
  formButton: _propTypes2.default.object,
  InvalidInputClass: _propTypes2.default.string,
  formSubmitHandler: _propTypes2.default.func,
  labelClass: _propTypes2.default.string,
  formHolderClass: _propTypes2.default.string,
  formButtonHolder: _propTypes2.default.string
};

FormValidator.defaultProps = {
  InvalidInputClass: 'invalid-input',
  errorMessageClass: 'error-message',
  formHolderClass: 'row scrolled-content inner',
  formButtonHolder: 'form-button-holder'
};