"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Dropdown = _interopRequireDefault(require("react-bootstrap/Dropdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function (o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DropdownMenu =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(DropdownMenu, _React$PureComponent);

  function DropdownMenu(props) {
    var _this;

    _classCallCheck(this, DropdownMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropdownMenu).call(this, props));
    _this.state = {
      inputData: props.inputData,
      title: props.title,
      currentTitle: "".concat(props.title, " ").concat(props.inputData[_this.props.defaultValue || 0])
    };
    _this.handleMenuItemClick = _this.handleMenuItemClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(DropdownMenu, [{
    key: "handleMenuItemClick",
    value: function handleMenuItemClick(e) {
      var item = e.target.id;
      var currentTitle = "".concat(this.state.title, " ").concat(item);
      this.props.handleMenuItemClick(item);
      this.setState({
        currentTitle: currentTitle
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var inputData = this.state.inputData;
      var width = this.props.width || 250;
      var margin = this.props.margin || 0;
      var direction = this.props.direction || "down";
      var dropdownItems = inputData.map(function (item) {
        return _react["default"].createElement(_Dropdown["default"].Item, {
          key: item,
          onClick: _this2.handleMenuItemClick,
          id: item
        }, item);
      });
      var dropdownStyle = {
        width: "".concat(width, "px"),
        height: "50px",
        margin: "".concat(margin, "px")
      };
      var dropdownMenuStyle = {
        overflow: "auto",
        maxHeight: "100px",
        maxWidth: "".concat(width, "px"),
        width: "".concat(width, "px")
      };
      return _react["default"].createElement(_Dropdown["default"], {
        drop: direction
      }, _react["default"].createElement(_Dropdown["default"].Toggle, {
        id: "dropdown-basic-button",
        style: dropdownStyle,
        size: "lg"
      }, this.state.currentTitle), _react["default"].createElement(_Dropdown["default"].Menu, {
        style: dropdownMenuStyle
      }, dropdownItems));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var oldInputData = state.inputData;
      var newInputData = props.inputData;

      if (newInputData !== null && newInputData !== undefined) {
        if (oldInputData === null || oldInputData === undefined || oldInputData !== newInputData) {
          var newCurrent = "".concat(props.title, " ").concat(newInputData[props.defaultValue || 0]);
          return {
            inputData: newInputData,
            currentTitle: newCurrent
          };
        }
      }

      return null;
    }
  }]);

  return DropdownMenu;
}(_react["default"].PureComponent);

exports["default"] = DropdownMenu;
DropdownMenu.defaultProps = {
  inputData: ["1"],
  title: "Dropdown Menu"
};