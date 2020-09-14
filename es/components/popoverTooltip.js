"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _OverlayTrigger = _interopRequireDefault(require("react-bootstrap/OverlayTrigger"));

var _Popover = _interopRequireDefault(require("react-bootstrap/Popover"));

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

var PopoverTooltip = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(PopoverTooltip, _React$PureComponent);

  var _super = _createSuper(PopoverTooltip);

  function PopoverTooltip(props) {
    var _this;

    _classCallCheck(this, PopoverTooltip);

    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }

  _createClass(PopoverTooltip, [{
    key: "render",
    value: function render() {
      var delay = {
        show: this.props.show,
        hide: this.props.hide
      };
      return /*#__PURE__*/_react["default"].createElement(_OverlayTrigger["default"], {
        placement: this.props.position,
        delay: delay,
        rootClose: true,
        rootCloseEvent: "mousedown" || "click",
        overlay: /*#__PURE__*/_react["default"].createElement(_Popover["default"], {
          id: "popover-basic"
        }, /*#__PURE__*/_react["default"].createElement(_Popover["default"].Title, {
          as: "h3"
        }, this.props.title), /*#__PURE__*/_react["default"].createElement(_Popover["default"].Content, null, this.props.content))
      }, this.props.element);
    }
  }]);

  return PopoverTooltip;
}(_react["default"].PureComponent);

exports["default"] = PopoverTooltip;
PopoverTooltip.defaultProps = {
  show: 1000,
  hide: 1000,
  title: "A title",
  content: "Tooltip content",
  element: /*#__PURE__*/_react["default"].createElement("button", null, "Fake button")
};