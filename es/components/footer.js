"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _Dropdown = _interopRequireDefault(require("react-bootstrap/Dropdown"));

var _ButtonGroup = _interopRequireDefault(require("react-bootstrap/ButtonGroup"));

var _multiTabFormWithHeader = _interopRequireDefault(require("./multiTabFormWithHeader"));

var _dropdownMenu = _interopRequireDefault(require("./dropdownMenu"));

var _popoverTooltip = _interopRequireDefault(require("./popoverTooltip"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function (o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var url = require("url");

var Footer = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Footer, _React$PureComponent);

  var _super = _createSuper(Footer);

  function Footer(props) {
    var _this;

    _classCallCheck(this, Footer);

    _this = _super.call(this, props);
    _this.state = {
      editing: false
    };
    _this.onClickEdit = _this.onClickEdit.bind(_assertThisInitialized(_this));
    _this.onFormConfirm = _this.onFormConfirm.bind(_assertThisInitialized(_this));
    _this.onFormCancel = _this.onFormCancel.bind(_assertThisInitialized(_this));
    _this.onClickChangeValidation = _this.onClickChangeValidation.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Footer, [{
    key: "onClickEdit",
    value: function onClickEdit() {
      this.setState({
        editing: true
      });
    }
  }, {
    key: "onFormConfirm",
    value: function onFormConfirm(id, data) {
      this.setState({
        editing: false
      });
      this.props.onFormConfirm(id, data);
    }
  }, {
    key: "onFormCancel",
    value: function onFormCancel() {
      this.setState({
        editing: false
      });
    }
  }, {
    key: "onClickChangeValidation",
    value: function onClickChangeValidation(item) {
      var tier = Number(item);
      this.props.onClickChangeValidation(tier);
    }
  }, {
    key: "render",
    value: function render() {
      var width = this.props.dimensions.width;
      var height = this.props.dimensions.height; //<MultiTabFormWithHeaderV2

      if (this.state.editing) {
        return /*#__PURE__*/_react["default"].createElement(_multiTabFormWithHeader["default"], {
          schemas: this.props.componentSchemas,
          schema: this.props.schema,
          inputData: this.props.inputData,
          id: this.props.id,
          onConfirm: this.onFormConfirm,
          onCancel: this.onFormCancel,
          overlaysContainer: this.props.overlaysContainer
        });
      }

      var styleButton = {
        width: "250px",
        minWidth: "250px",
        height: "50px",
        marginLeft: "5px",
        marginRight: "5px"
      };
      var styleValidation = {
        position: "absolute",
        verticalAlign: "middle",
        fontWeight: "bold",
        textAlign: "center"
      };
      var validated = null;

      if (this.props.isSchemaValidated) {
        var styleValidated = Object.assign({}, styleValidation, {
          color: "green"
        });
        validated = /*#__PURE__*/_react["default"].createElement("div", {
          style: styleValidated
        }, "\u25CF"); // let image = url.resolve(this.props.imagesPath, "green_thumb_up.svg");
        // validated = (
        // 	<img
        // 		src={
        // 			image +
        // 			(image.indexOf("githubusercontent.com") > -1
        // 				? "?sanitize=true"
        // 				: "")
        // 		}
        // 		alt={"validated"}
        // 		style={styleValidation}
        // 	/>
        // );
      } else {
        var _styleValidated = Object.assign({}, styleValidation, {
          color: "red"
        });

        validated = /*#__PURE__*/_react["default"].createElement("div", {
          style: _styleValidated
        }, "\u25CF"); // let image = url.resolve(this.props.imagesPath, "red_thumb_down.svg");
        // validated = (
        // 	<img
        // 		src={
        // 			image +
        // 			(image.indexOf("githubusercontent.com") > -1
        // 				? "?sanitize=true"
        // 				: "")
        // 		}
        // 		alt={"not validated"}
        // 		style={imageValidation}
        // 	/>
        // );
        // styleEditButton = Object.assign(styleEditButton, {
        // 	border: "5px ridge red",
        // });
      }

      var buttons = [];
      buttons[0] = /*#__PURE__*/_react["default"].createElement(_popoverTooltip["default"], {
        key: "TooltipButton-0",
        position: _constants.edit_microscope_tooltip.position,
        title: _constants.edit_microscope_tooltip.title,
        content: _constants.edit_microscope_tooltip.content,
        element: /*#__PURE__*/_react["default"].createElement(_Button["default"], {
          key: "Button-0",
          onClick: this.onClickEdit,
          style: styleButton,
          size: "lg"
        }, validated, "Edit ".concat(this.props.element))
      });
      var inputData = [];

      for (var i = 1; i <= this.props.activeTier; i++) {
        inputData.push(i);
      }

      var defaultValidationTier = this.props.validationTier - 1;
      buttons[1] = /*#__PURE__*/_react["default"].createElement(_dropdownMenu["default"], {
        key: "Button-1",
        title: _constants.string_validationTier,
        handleMenuItemClick: this.onClickChangeValidation,
        inputData: inputData,
        width: 250,
        margin: 5,
        defaultValue: defaultValidationTier,
        direction: "up",
        tooltip: _constants.validation_tooltip
      });
      var saveOptions = [];

      if (this.props.hasSaveOption) {
        saveOptions.push("Save " + this.props.element);
      } //saveOptions.push("Export " + this.props.element + " image");


      saveOptions.push("Export " + this.props.element); //Rethink this, maybe drop down split button with multi actions?

      buttons[2] = /*#__PURE__*/_react["default"].createElement(_dropdownMenu["default"], {
        key: "Button-2",
        title: "",
        handleMenuItemClick: this.props.onClickSave,
        inputData: saveOptions,
        width: 250,
        margin: 5,
        direction: "up",
        tooltip: _constants.save_microscope_tooltip
      });
      buttons[3] = /*#__PURE__*/_react["default"].createElement(_popoverTooltip["default"], {
        key: "TooltipButton-3",
        position: _constants.back_tooltip.position,
        title: _constants.back_tooltip.title,
        content: _constants.back_tooltip.content,
        element: /*#__PURE__*/_react["default"].createElement(_Button["default"], {
          key: "Button-3",
          onClick: this.props.onClickBack,
          style: styleButton,
          size: "lg"
        }, "Back")
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          backgroundColor: "LightGray",
          width: width,
          height: height,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          flexWap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px"
        }
      }, buttons);
    }
  }]);

  return Footer;
}(_react["default"].PureComponent);

exports["default"] = Footer;