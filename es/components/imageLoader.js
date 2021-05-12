function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function (o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import React from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Dropzone from "react-dropzone";
import DropdownMenu from "./dropdownMenu";
import PopoverTooltip from "./popoverTooltip";
import { string_json_ext, number_logo_width, number_logo_height, loadImage_mode_selector_tooltip, loadImage_from_file_tooltip, loadImage_from_repo_names_tooltip, loadImage_mode_continue_tooltip, back_tooltip } from "../constants";

var url = require("url");

var ImageLoader = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ImageLoader, _React$PureComponent);

  var _super = _createSuper(ImageLoader);

  function ImageLoader(props) {
    var _this;

    _classCallCheck(this, ImageLoader);

    _this = _super.call(this, props);
    _this.state = {
      fileLoaded: false,
      fileLoading: false,
      //selectedManu: null,
      selectedSettings: null,
      //settingsNames: null,
      imageMap: null
    };
    _this.dropzoneDropAccepted = _this.dropzoneDropAccepted.bind(_assertThisInitialized(_this));
    _this.dropzoneDropRejected = _this.dropzoneDropRejected.bind(_assertThisInitialized(_this));
    _this.dropzoneDrop = _this.dropzoneDrop.bind(_assertThisInitialized(_this));
    _this.dropzoneDialogOpen = _this.dropzoneDialogOpen.bind(_assertThisInitialized(_this));
    _this.dropzoneDialogCancel = _this.dropzoneDialogCancel.bind(_assertThisInitialized(_this));
    _this.handleLoadMetadataComplete = _this.handleLoadMetadataComplete.bind(_assertThisInitialized(_this));
    _this.handleImageSelection = _this.handleImageSelection.bind(_assertThisInitialized(_this)); // this.onFileReaderAbort = this.onFileReaderAbort.bind(this);
    // this.onFileReaderError = this.onFileReaderError.bind(this);
    // this.onFileReaderLoad = this.onFileReaderLoad.bind(this);
    //this.onClickSettingsSelection = this.onClickSettingsSelection.bind(this);

    return _this;
  }

  _createClass(ImageLoader, [{
    key: "handleImageSelection",
    value: function handleImageSelection(item) {
      var imageMap = this.state.imageMap;
      var image = imageMap[item];
      console.log("image");
      console.log(image);
      this.props.handleLoadMetadataComplete(image);
    }
  }, {
    key: "handleLoadMetadataComplete",
    value: function handleLoadMetadataComplete(imageMetadata) {
      if (imageMetadata.Error != null && imageMetadata.Error !== undefined) {
        window.alert("Error " + imageMetadata.Error);
      } else if (imageMetadata.Images !== null && imageMetadata.Images !== undefined) {
        var images = imageMetadata.Images;
        var firstImage = null;
        var imageMap = {};

        for (var index in images) {
          var image = images[index];
          if (firstImage === null) firstImage = image;
          var name = image.Name;
          imageMap[name] = image;
        }

        console.log("image");
        console.log(firstImage);
        this.props.handleLoadMetadataComplete(firstImage);
        this.setState({
          imageMap: imageMap,
          fileLoaded: true
        });
      } else {
        var _image = imageMetadata.Image;
        console.log("image");
        console.log(_image);
        this.props.handleLoadMetadataComplete(_image);
        this.setState({
          fileLoaded: true
        });
      }
    }
  }, {
    key: "dropzoneDrop",
    value: function dropzoneDrop() {
      this.setState({
        fileLoading: true,
        fileLoaded: false
      });
    }
  }, {
    key: "dropzoneDropRejected",
    value: function dropzoneDropRejected() {
      this.setState({
        fileLoading: false,
        fileLoaded: false
      });
    }
  }, {
    key: "processFile",
    value: function processFile() {//let binaryStr = e.target.result;
      //let microscope = JSON.parse(binaryStr);
      //
    }
  }, {
    key: "dropzoneDropAccepted",
    value: function dropzoneDropAccepted(acceptedFiles) {
      var _this2 = this;

      // const reader = new FileReader();
      // reader.onabort = this.onFileReaderAbort;
      // reader.onerror = this.onFileReaderError;
      // reader.onload = this.onFileReaderLoad;
      acceptedFiles.forEach(function (file) {
        console.log(file);

        _this2.props.onLoadMetadata(file.path, _this2.handleLoadMetadataComplete);
      });
      this.setState({
        fileLoading: false
      });
    }
  }, {
    key: "dropzoneDialogOpen",
    value: function dropzoneDialogOpen() {
      this.setState({
        fileLoading: true,
        fileLoaded: false
      });
    }
  }, {
    key: "dropzoneDialogCancel",
    value: function dropzoneDialogCancel() {
      this.setState({
        fileLoading: false,
        fileLoaded: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var buttonStyle = {
        width: "200px",
        height: "50px",
        padding: "5px",
        margin: "5px"
      };
      var width = 410;
      var margin = 5; //let inputData = this.props.settings;

      var dropzoneStyle = {
        borderStyle: "dashed",
        borderWidth: "thin",
        width: "".concat(width, "px")
      };
      var styleImageContainer = {
        width: "".concat(number_logo_width, "px"),
        height: "".concat(number_logo_height, "px")
      };
      var styleImageBk = {
        width: "20px",
        height: "20px",
        marginLeft: "10px",
        marginRight: "10px"
      };
      var imageMap = this.state.imageMap;
      var loadingMode = this.props.loadingMode;
      var fileLoading = this.state.fileLoading;
      var fileLoaded = this.state.fileLoaded;
      var isDropzoneActive = false;
      if (loadingMode === 1) isDropzoneActive = true;
      var list = [];
      list.push( /*#__PURE__*/React.createElement(DropdownMenu, {
        key: "dropdown-loadingOption",
        title: "",
        handleMenuItemClick: this.props.onClickLoadingOptionSelection,
        defaultValue: this.props.loadingOptions.indexOf(this.props.loadingOption),
        inputData: this.props.loadingOptions,
        width: width,
        margin: margin,
        tooltip: loadImage_mode_selector_tooltip
      }));

      if (loadingMode === 1) {
        list.push( /*#__PURE__*/React.createElement(PopoverTooltip, {
          key: "dropzone-tooltip",
          position: loadImage_from_file_tooltip.position,
          title: loadImage_from_file_tooltip.title,
          content: loadImage_from_file_tooltip.content,
          element: /*#__PURE__*/React.createElement(Dropzone, {
            key: "dropzone",
            onFileDialogCancel: this.dropzoneDialogCancel,
            onDrop: this.dropzoneDrop,
            onDropAccepted: this.dropzoneDropAccepted,
            onDropRejected: this.dropzoneDropRejected,
            multiple: false
          }, function (_ref) {
            var getRootProps = _ref.getRootProps,
                getInputProps = _ref.getInputProps;
            return /*#__PURE__*/React.createElement("section", {
              style: dropzoneStyle
            }, /*#__PURE__*/React.createElement("div", getRootProps(), /*#__PURE__*/React.createElement("input", getInputProps({
              onClick: _this3.dropzoneDialogOpen
            })), /*#__PURE__*/React.createElement("p", null, "Select an existing Image file you want to work on.")));
          })
        }));
      }

      if (imageMap !== null) {
        list.push( /*#__PURE__*/React.createElement(DropdownMenu, {
          key: "dropdown-names",
          title: "",
          handleMenuItemClick: this.handleImageSelection,
          inputData: Object.keys(imageMap) //defaultValue={defaultMic}
          ,
          width: width,
          margin: margin,
          tooltip: loadImage_from_repo_names_tooltip
        }));
      }

      var backImgPath_tmp = url.resolve(this.props.imagesPath, _constants.string_back_img);
      var backImgPath = backImgPath_tmp + (backImgPath_tmp.indexOf("githubusercontent.com") > -1 ? "?sanitize=true" : "");
      list.push( /*#__PURE__*/_react.default.createElement("div", {
        key: "buttons"
      }, /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        position: _constants.back_tooltip.position,
        title: _constants.back_tooltip.title,
        content: _constants.back_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          onClick: this.props.onClickBack,
          style: buttonStyle,
          size: "lg",
          variant: "outline-dark"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center" //gap: "10px",

          }
        }, /*#__PURE__*/_react.default.createElement("img", {
          src: backImgPath,
          alt: backImgPath_tmp,
          style: styleImageBk,
          onLoad: this.onImgLoad
        }), "Back"))
      }), /*#__PURE__*/_react.default.createElement(_popoverTooltip.default, {
        position: _constants.loadImage_mode_continue_tooltip.position,
        title: _constants.loadImage_mode_continue_tooltip.title,
        content: _constants.loadImage_mode_continue_tooltip.content,
        element: /*#__PURE__*/_react.default.createElement(_Button.default, {
          onClick: isDropzoneActive && fileLoaded && !fileLoading || !isDropzoneActive ? this.props.onClickConfirm : null,
          style: buttonStyle,
          size: "lg",
          disabled: isDropzoneActive && (!fileLoaded || fileLoading)
        }, isDropzoneActive && !fileLoaded && !fileLoading ? "Waiting for file" : isDropzoneActive && fileLoading ? "Loading file" : "Continue")
      })));
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          width: "100%",
          height: "100%",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
          width: "100%",
          height: "100%",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: styleImageContainer
      }, /*#__PURE__*/React.createElement("img", {
        src: this.props.logoImg,
        alt: this.props.logoImg,
        style: {
          width: "100%",
          height: "100%",
          margin: "auto"
        },
        onLoad: this.onImgLoad
      })), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          textAlign: "center",
          fontWeight: "bold"
        }
      }, "Manage Settings Step 2/3: Load Image File"), list));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps() {
      return null;
    }
  }]);

  return ImageLoader;
}(React.PureComponent);

export { ImageLoader as default };