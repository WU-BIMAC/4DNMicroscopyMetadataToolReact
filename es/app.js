function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _header = _interopRequireDefault(require("./components/header"));

var _footer = _interopRequireDefault(require("./components/footer"));

var _toolbar = _interopRequireDefault(require("./components/toolbar"));

var _canvas = _interopRequireDefault(require("./components/canvas"));

var _settingsMainView = _interopRequireDefault(require("./components/settingsMainView"));

var _dataLoader = _interopRequireDefault(require("./components/dataLoader"));

var _microscopePreLoader = _interopRequireDefault(require("./components/microscopePreLoader"));

var _microscopeLoader = _interopRequireDefault(require("./components/microscopeLoader"));

var _settingLoader = _interopRequireDefault(require("./components/settingLoader"));

var _imageLoader = _interopRequireDefault(require("./components/imageLoader"));

var _package = require("../package.json");

var _uuid = require("uuid");

var _constants = require("./constants");

var _util = require("util");

var _constants2 = require("constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import React from "react";
import Button from "react-bootstrap/Button";
import Header from "./components/header";
import Footer from "./components/footer";
import Toolbar from "./components/toolbar";
import Canvas from "./components/canvas";
import SettingsMainView from "./components/settingsMainView";
import DataLoader from "./components/dataLoader";
import MicroscopePreLoader from "./components/microscopePreLoader";
import MicroscopeLoader from "./components/microscopeLoader";
import SettingLoader from "./components/settingLoader";
import ImageLoader from "./components/imageLoader";
import { v4 as uuidv4 } from "uuid";

var url = require("url");

var validate = require("jsonschema").validate;

import { bool_isDebug, current_stands, string_object, string_array, string_json_ext, string_logo_img_no_bk, string_logo_img_cell_bk, string_logo_img_micro_bk, string_createFromScratch, string_createFromFile, string_loadFromRepository, string_noImageLoad } from "./constants";
import { isUndefined } from "util";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

var MicroMetaAppReact = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MicroMetaAppReact, _React$PureComponent);

  var _super = _createSuper(MicroMetaAppReact);

  function MicroMetaAppReact(props) {
    var _this;

    _classCallCheck(this, MicroMetaAppReact);

    _this = _super.call(this, props);
    _this.state = {
      microscope: props.microscope || null,
      setting: props.setting || null,
      schema: props.schema || null,
      microscopes: props.microscopes || null,
      settings: props.settings || null,
      adaptedMicroscopeSchema: null,
      adaptedComponentsSchema: null,
      adaptedImageSchema: null,
      adaptedSettingsSchema: null,
      adaptedChildrenSchema: null,
      adaptedExperimentalSchema: null,
      mounted: false,
      activeTier: 1,
      validationTier: 1,
      isCreatingNewMicroscope: null,
      isLoadingMicroscope: null,
      isLoadingSettings: null,
      isLoadingImage: null,
      loadingOption: null,
      micName: null,
      settingName: null,
      elementData: null,
      settingData: null,
      linkedFields: null,
      loadingMode: 0,
      isMicroscopeValidated: false,
      isSettingValidated: false,
      areComponentsValidated: false,
      areSettingComponentsValidated: false,
      isViewOnly: props.isViewOnly || false,
      isPreset: false,
      standTypes: {},
      standType: null,
      imageMetadata: null
    };

    for (var i = 0; i < current_stands.length; i++) {
      var stand = current_stands[i];
      var name = stand.name;
      var modifiedCreateString = string_createFromScratch.replace("#", name);
      _this.state.standTypes[modifiedCreateString] = name;
    }

    if (_this.state.microscope !== null && _this.state.microscope !== undefined) _this.state.isPreset = true; //this.isMicroscopeValidated = false;

    _this.toolbarRef = /*#__PURE__*/React.createRef();
    _this.canvasRef = /*#__PURE__*/React.createRef();
    _this.settingsMainViewRef = /*#__PURE__*/React.createRef();
    /**
     * This ref does not have 'current' until App has been mounted.
     * Because App is a PureComponent which doesn't get updated unless
     * state or props change, we need to have at least one state or prop change
     * occur before `this.overlaysContainerRef.current` is passed down correctly
     * to child Components (and not be null or undefined). This is currently done via
     * schema being null initially and then updated via 'Load Schema' button, but since
     * this prop is optional, we implement the componentDidMount func below.
     */

    _this.overlaysContainerRef = /*#__PURE__*/React.createRef();
    _this.handleLoadSchema = _this.handleLoadSchema.bind(_assertThisInitialized(_this));
    _this.handleCompleteLoadSchema = _this.handleCompleteLoadSchema.bind(_assertThisInitialized(_this));
    _this.handleLoadMicroscopes = _this.handleLoadMicroscopes.bind(_assertThisInitialized(_this));
    _this.handleCompleteLoadMicroscopes = _this.handleCompleteLoadMicroscopes.bind(_assertThisInitialized(_this));
    _this.handleLoadSettings = _this.handleLoadSettings.bind(_assertThisInitialized(_this));
    _this.handleCompleteLoadSettings = _this.handleCompleteLoadSettings.bind(_assertThisInitialized(_this));
    _this.handleLoadDimensions = _this.handleLoadDimensions.bind(_assertThisInitialized(_this));
    _this.handleCompleteLoadDimensions = _this.handleCompleteLoadDimensions.bind(_assertThisInitialized(_this));
    _this.updateElementData = _this.updateElementData.bind(_assertThisInitialized(_this));
    _this.updateLinkedFields = _this.updateLinkedFields.bind(_assertThisInitialized(_this));
    _this.updateSettingData = _this.updateSettingData.bind(_assertThisInitialized(_this));
    _this.onMicroscopeDataSave = _this.onMicroscopeDataSave.bind(_assertThisInitialized(_this));
    _this.onSettingDataSave = _this.onSettingDataSave.bind(_assertThisInitialized(_this));
    _this.handleActiveTierSelection = _this.handleActiveTierSelection.bind(_assertThisInitialized(_this));
    _this.setCreateNewMicroscope = _this.setCreateNewMicroscope.bind(_assertThisInitialized(_this));
    _this.setLoadMicroscope = _this.setLoadMicroscope.bind(_assertThisInitialized(_this));
    _this.uploadMicroscopeFromDropzone = _this.uploadMicroscopeFromDropzone.bind(_assertThisInitialized(_this));
    _this.uploadSettingFromDropzone = _this.uploadSettingFromDropzone.bind(_assertThisInitialized(_this));
    _this.handleLoadMetadataComplete = _this.handleLoadMetadataComplete.bind(_assertThisInitialized(_this));
    _this.handleLoadingOptionSelection = _this.handleLoadingOptionSelection.bind(_assertThisInitialized(_this));
    _this.selectMicroscopeFromRepository = _this.selectMicroscopeFromRepository.bind(_assertThisInitialized(_this));
    _this.selectSettingFromRepository = _this.selectSettingFromRepository.bind(_assertThisInitialized(_this));
    _this.applyPreviousVersionModificationToMicroscope = _this.applyPreviousVersionModificationToMicroscope.bind(_assertThisInitialized(_this));
    _this.applyPreviousModelVersionModificationToMicroscope = _this.applyPreviousModelVersionModificationToMicroscope.bind(_assertThisInitialized(_this));
    _this.applyPreviousAppVersionModificationToMicroscope = _this.applyPreviousAppVersionModificationToMicroscope.bind(_assertThisInitialized(_this));
    _this.applyPreviousVersionModificationToSetting = _this.applyPreviousVersionModificationToSetting.bind(_assertThisInitialized(_this));
    _this.applyPreviousModelVersionModificationToSetting = _this.applyPreviousModelVersionModificationToSetting.bind(_assertThisInitialized(_this));
    _this.applyPreviousAppVersionModificationToSetting = _this.applyPreviousAppVersionModificationToSetting.bind(_assertThisInitialized(_this));
    _this.createOrUseMicroscope = _this.createOrUseMicroscope.bind(_assertThisInitialized(_this));
    _this.createNewMicroscopeFromScratch = _this.createNewMicroscopeFromScratch.bind(_assertThisInitialized(_this));
    _this.createOrUseMicroscopeFromDroppedFile = _this.createOrUseMicroscopeFromDroppedFile.bind(_assertThisInitialized(_this));
    _this.createOrUseMicroscopeFromSelectedFile = _this.createOrUseMicroscopeFromSelectedFile.bind(_assertThisInitialized(_this)); //this.setMicroscopeScale = this.setMicroscopeScale.bind(this);

    _this.createOrUseSetting = _this.createOrUseSetting.bind(_assertThisInitialized(_this));
    _this.createNewSettingFromScratch = _this.createNewSettingFromScratch.bind(_assertThisInitialized(_this));
    _this.createOrUseSettingFromDroppedFile = _this.createOrUseSettingFromDroppedFile.bind(_assertThisInitialized(_this));
    _this.createOrUseSettingFromSelectedFile = _this.createOrUseSettingFromSelectedFile.bind(_assertThisInitialized(_this));
    _this.createOrUseMetadata = _this.createOrUseMetadata.bind(_assertThisInitialized(_this));
    _this.onClickBack = _this.onClickBack.bind(_assertThisInitialized(_this));
    _this.createAdaptedSchemas = _this.createAdaptedSchemas.bind(_assertThisInitialized(_this));
    _this.createAdaptedSchema = _this.createAdaptedSchema.bind(_assertThisInitialized(_this));
    _this.handleExportMicroscope = _this.handleExportMicroscope.bind(_assertThisInitialized(_this));
    _this.handleExportSetting = _this.handleExportSetting.bind(_assertThisInitialized(_this));
    _this.handleExportMicroscopeImage = _this.handleExportMicroscopeImage.bind(_assertThisInitialized(_this));
    _this.handleSaveMicroscope = _this.handleSaveMicroscope.bind(_assertThisInitialized(_this));
    _this.handleSaveSetting = _this.handleSaveSetting.bind(_assertThisInitialized(_this));
    _this.handleCompleteSave = _this.handleCompleteSave.bind(_assertThisInitialized(_this));
    _this.handleCompleteExport = _this.handleCompleteExport.bind(_assertThisInitialized(_this));
    _this.handleMicroscopePreset = _this.handleMicroscopePreset.bind(_assertThisInitialized(_this)); //this.toDataUrl = this.toDataUrl.bind(this);
    // Set up API

    var _createApi = createApi(_assertThisInitialized(_this)),
        api = _createApi["public"];

    _this.api = api;
    return _this;
  }

  _createClass(MicroMetaAppReact, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        mounted: true
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({
        mounted: false
      });
    }
  }, {
    key: "handleLoadDimensions",
    value: function handleLoadDimensions() {
      var _this2 = this;

      return new Promise(function () {
        return setTimeout(_this2.props.onLoadDimensions(_this2.handleCompleteLoadDimensions), 10000);
      });
    }
  }, {
    key: "handleLoadMicroscopes",
    value: function handleLoadMicroscopes() {
      var _this3 = this;

      return new Promise(function () {
        return setTimeout(_this3.props.onLoadMicroscopes(_this3.handleCompleteLoadMicroscopes), 10000);
      });
    }
  }, {
    key: "handleLoadSettings",
    value: function handleLoadSettings() {
      var _this4 = this;

      return new Promise(function () {
        return setTimeout(_this4.props.onLoadSettings(_this4.handleCompleteLoadSettings), 10000);
      });
    }
  }, {
    key: "handleCompleteLoadDimensions",
    value: function handleCompleteLoadDimensions(newDimensions) {
      //console.log(newDimensions);
      this.setState({
        dimensions: newDimensions
      });
    }
  }, {
    key: "handleCompleteLoadMicroscopes",
    value: function handleCompleteLoadMicroscopes(newMicroscopes) {
      this.setState({
        microscopes: newMicroscopes
      });
    }
  }, {
    key: "handleCompleteLoadSettings",
    value: function handleCompleteLoadSettings(newSettings) {
      this.setState({
        settings: newSettings
      });
    }
  }, {
    key: "handleLoadSchema",
    value: function handleLoadSchema() {
      var _this5 = this;

      return new Promise(function () {
        return setTimeout(_this5.props.onLoadSchema(_this5.handleCompleteLoadSchema), 10000);
      });
    }
  }, {
    key: "handleCompleteLoadSchema",
    value: function handleCompleteLoadSchema(newSchema) {
      var _this6 = this;

      if (this.state.isPreset) {
        this.setState({
          schema: newSchema
        }, function () {
          _this6.handleMicroscopePreset();
        });
      } else {
        this.setState({
          schema: newSchema
        });
      }
    } //HAVE TO DO THE SAME FOR SETTINGS?

  }, {
    key: "handleMicroscopePreset",
    value: function handleMicroscopePreset() {
      var _this7 = this;

      var microscope = this.state.microscope;
      var tier = microscope.Tier;
      var vTier = microscope.ValidationTier;
      this.setState({
        activeTier: tier,
        validationTier: vTier,
        isCreatingNewMicroscope: true,
        loadingOption: string_createFromFile,
        loadingMode: 1
      }, function () {
        _this7.createOrUseMicroscopeFromDroppedFile();
      });
    }
  }, {
    key: "handleActiveTierSelection",
    value: function handleActiveTierSelection(item) {
      var tier = Number(item);
      this.setState({
        activeTier: tier,
        validationTier: tier
      });
    }
  }, {
    key: "setCreateNewMicroscope",
    value: function setCreateNewMicroscope() {
      this.setState({
        isCreatingNewMicroscope: true,
        isLoadingMicroscope: false,
        isLoadingSettings: false,
        isLoadingImage: false,
        loadingOption: Object.keys(this.state.standTypes)[0],
        loadingMode: 0
      }); //this.handleLoadingOptionSelection(createFromScratch);
    }
  }, {
    key: "setLoadMicroscope",
    value: function setLoadMicroscope() {
      this.setState({
        isCreatingNewMicroscope: false,
        isLoadingMicroscope: true,
        isLoadingSettings: true,
        isLoadingImage: true,
        loadingOption: string_createFromFile,
        loadingMode: 1
      }); //this.handleLoadingOptionSelection(createFromFile);
    }
  }, {
    key: "handleLoadingOptionSelection",
    value: function handleLoadingOptionSelection(item) {
      var loadingMode = 0;

      if (item === string_createFromFile) {
        loadingMode = 1;
      } else if (item === string_loadFromRepository) {
        loadingMode = 2;
      }

      this.setState({
        loadingOption: item,
        loadingMode: loadingMode
      });
    }
  }, {
    key: "selectMicroscopeFromRepository",
    value: function selectMicroscopeFromRepository(item) {
      this.setState({
        micName: item
      });
    }
  }, {
    key: "selectSettingFromRepository",
    value: function selectSettingFromRepository(item) {
      this.setState({
        settingName: item
      });
    }
  }, {
    key: "uploadMicroscopeFromDropzone",
    value: function uploadMicroscopeFromDropzone(microscope) {
      this.setState({
        microscope: microscope
      });
    }
  }, {
    key: "uploadSettingFromDropzone",
    value: function uploadSettingFromDropzone(setting) {
      this.setState({
        setting: setting
      });
    }
  }, {
    key: "handleLoadMetadataComplete",
    value: function handleLoadMetadataComplete(imageMetadata) {
      this.setState({
        imageMetadata: imageMetadata
      });
    } // setMicroscopeScale(scale) {
    // 	this.state.microscope.scale = scale;
    // }

  }, {
    key: "createAdaptedSchema",
    value: function createAdaptedSchema(singleSchemaOriginal, activeTier, validationTier) {
      var _this8 = this;

      var singleSchema = Object.assign({}, singleSchemaOriginal);
      singleSchema.properties = Object.assign({}, singleSchemaOriginal.properties);
      if (singleSchema.required !== undefined) if (singleSchemaOriginal.type === string_array) {
        singleSchema.items.required = singleSchemaOriginal.items.required.slice(0);
      } else {
        singleSchema.required = singleSchemaOriginal.required.slice(0);
      }
      var fieldsToRemove = [];
      var fieldsToSetNotRequired = [];
      var required = singleSchema.required;
      var properties = singleSchema.properties;

      if (singleSchemaOriginal.type === string_array) {
        required = singleSchema.items.required;
        properties = singleSchema.items.properties;
      }

      if (properties === null || properties === undefined) {
        //console.log(singleSchema);
        return singleSchema;
      }

      Object.keys(properties).forEach(function (propKey) {
        var property = properties[propKey];

        if (property.type === string_object || property.type === string_array && property.items.properties !== null && property.items.properties !== undefined) {
          var newProp = _this8.createAdaptedSchema(property, activeTier, validationTier);

          properties[propKey] = newProp;
        }

        if (property.tier > activeTier) {
          fieldsToRemove.push(propKey);
        }

        if (property.tier > validationTier && !fieldsToRemove.includes(propKey)) {
          fieldsToSetNotRequired.push(propKey);
        }
      });

      for (var y = 0; y < fieldsToRemove.length; y++) {
        var key = fieldsToRemove[y];
        var propertyToRemove = properties[key];
        if (propertyToRemove === undefined) continue;
        delete properties[key];
        if (required === undefined) continue;
        var requiredIndex = required.indexOf(key);
        if (requiredIndex !== -1) required.splice(requiredIndex, 1);
      }

      for (var _y = 0; _y < fieldsToSetNotRequired.length; _y++) {
        var _key = fieldsToSetNotRequired[_y];
        var _propertyToRemove = properties[_key];
        if (_propertyToRemove === undefined) continue;
        if (required === undefined) continue;

        var _requiredIndex = required.indexOf(_key);

        if (_requiredIndex !== -1) required.splice(_requiredIndex, 1);
      }

      return singleSchema;
    }
  }, {
    key: "createAdaptedSchemas",
    value: function createAdaptedSchemas(validationTier, standType) {
      var _this9 = this;

      var activeTier = this.state.activeTier;
      var schema = this.state.schema;
      var componentsSchema = [];
      var settingsSchema = [];
      var childrenSchema = [];
      var experimentalSchema = [];
      var microscopeSchema = {};
      var microscopeStandSchema = {};
      var imageSchema = {};
      var microscope = this.state.microscope;
      var setting = this.state.setting;
      var componentsCounter = 0;
      var settingsCounter = 0;
      var experimentalCounter = 0;
      var childrenCounter = 0;
      var currentStandType = standType;
      if (currentStandType === null || currentStandType === undefined) currentStandType = this.state.standType;
      Object.keys(schema).forEach(function (schemaIndex) {
        var singleSchemaOriginal = schema[schemaIndex];

        var singleSchema = _this9.createAdaptedSchema(singleSchemaOriginal, activeTier, validationTier);

        if (singleSchema.title === "Instrument") {
          microscopeSchema = Object.assign(microscopeSchema, singleSchema);
        } else if (singleSchema.title === currentStandType) {
          microscopeStandSchema = Object.assign(microscopeStandSchema, singleSchema);
        } else if (singleSchema.title === "Image") {
          imageSchema = Object.assign(imageSchema, singleSchema);
        } else if (singleSchema.category === "ChildElement") {
          childrenSchema[childrenCounter] = singleSchema;
          childrenCounter++;
        } else if (singleSchema.domain === "ImageAcquisitionSettings") {
          settingsSchema[settingsCounter] = singleSchema;
          settingsCounter++;
        } else if (singleSchema.domain === "MicroscopeHardwareSpecifications" || singleSchema.domain === "MicroscopeSpecifications") {
          componentsSchema[componentsCounter] = singleSchema;
          componentsCounter++;
        } else if (singleSchema.domain === "Experimental") {
          experimentalSchema[experimentalCounter] = singleSchema;
          experimentalCounter++;
        }
      });
      var validated = false;

      if (microscope !== null && microscope !== undefined) {
        microscope.ValidationTier = validationTier;
        var validation = validate(microscope, microscopeSchema);
        validated = validation.valid;
      }

      if (setting !== null && setting !== undefined) {
        setting.ValidationTier = validationTier;

        var _validation = validate(setting, imageSchema);

        validated = _validation.valid;
      }

      this.setState({
        adaptedMicroscopeSchema: microscopeSchema,
        adaptedMicroscopeStandSchema: microscopeStandSchema,
        adaptedComponentsSchema: componentsSchema,
        adaptedImageSchema: imageSchema,
        adaptedSettingsSchema: settingsSchema,
        adaptedExperimentalSchema: experimentalSchema,
        adaptedChildrenSchema: childrenSchema,
        validationTier: validationTier,
        isMicroscopeValidated: validated
      });
      return [microscopeSchema, microscopeStandSchema, componentsSchema, imageSchema, settingsSchema, childrenSchema];
    }
  }, {
    key: "applyPreviousVersionModificationToSetting",
    value: function applyPreviousVersionModificationToSetting(originalSetting) {
      var modifiedSetting = Object.assign({}, originalSetting);
      modifiedSetting = this.applyPreviousAppVersionModificationToSetting(modifiedSetting);
      modifiedSetting = this.applyPreviousModelVersionModificationToSetting(modifiedSetting);
      return modifiedSetting;
    }
  }, {
    key: "applyPreviousAppVersionModificationToSetting",
    value: function applyPreviousAppVersionModificationToSetting(originalSetting) {
      var schema = this.state.schema;
      var oldMainVersion = 0;
      var oldSubVersion = 0.44;
      var oldPatchVersion = 0;
      var oldBetaVersion = 1;
      var oldAppVersion = originalSetting.AppVersion;

      if (oldAppVersion !== undefined && oldAppVersion !== null) {
        var oldAppVersionSplit = oldAppVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");

        oldMainVersion = Number(oldAppVersionSplit[0]);
        oldSubVersion = Number(oldAppVersionSplit[1]);
        oldPatchVersion = Number(oldAppVersionSplit[2]);
        oldBetaVersion = Number(oldAppVersionSplit[3].replace("b", ""));
      }

      var imageSchema = {};
      var pixelsSchema = {};
      var settingsSchema = {};
      var experimentalSchema = {};
      Object.keys(schema).forEach(function (schemaIndex) {
        var singleSchemaOriginal = schema[schemaIndex];

        if (singleSchemaOriginal.title === "Image") {
          imageSchema = Object.assign(imageSchema, singleSchemaOriginal);
        } else if (singleSchemaOriginal.title === "Pixels") {
          pixelsSchema = Object.assign(pixelsSchema, singleSchemaOriginal);
        } else if (singleSchemaOriginal.domain === "ImageAcquisitionSettings") {
          var schemaID = singleSchemaOriginal.ID;
          settingsSchema[schemaID] = singleSchemaOriginal;
        } else if (singleSchemaOriginal.domain === "Experimental") {
          var _schemaID = singleSchemaOriginal.ID;
          experimentalSchema[_schemaID] = singleSchemaOriginal;
        }
      });

      if (originalSetting.AppVersion === null || originalSetting.AppVersion === undefined || originalSetting.AppVersion !== _package.version) {
        originalSetting.AppVersion = _package.version;
      }

      if (oldMainVersion === 0 && oldSubVersion < 45) {
        var newSetting = Object.assign({}, originalSetting);

        if (originalSetting.ModelVersion === undefined || originalSetting.ModelVersion === null) {
          newSetting.ModelVersion = imageSchema.modelVersion;

          if (newSetting.Version !== null && newSetting.Version !== undefined) {
            delete newSetting.Version;
          }
        }

        var originalPixels = originalSetting.Pixels;

        if (originalPixels !== null && originalPixels !== undefined) {
          var newPixels = Object.assign({}, originalPixels);

          if (originalPixels.ModelVersion === undefined || originalPixels.ModelVersion === null) {
            newPixels.ModelVersion = pixelsSchema.modelVersion;

            if (newPixels.Version !== null && newPixels.Version !== undefined) {
              delete newPixels.Version;
            }
          }

          newSetting.Pixels = newPixels;
        }

        if (originalSetting.Planes !== null && originalSetting.Planes !== undefined) {
          var newPlanes = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.Planes, true, true, settingsSchema, experimentalSchema);
          newSetting.Planes = newPlanes;
        }

        if (originalSetting.Channels !== null && originalSetting.Channels !== undefined) {
          var newChannels = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.Channels, true, true, settingsSchema, experimentalSchema);
          newSetting.Channels = newChannels;
        }

        if (originalSetting.TIRFSettings !== null && originalSetting.TIRFSettings !== undefined) {
          var newTIRFSettings = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.TIRFSettings, true, true, settingsSchema, experimentalSchema);
          newSetting.TIRFSettings = newTIRFSettings;
        }

        if (originalSetting.ImagingEnvironment !== null && originalSetting.ImagingEnvironment !== undefined) {
          var newImagingEnvironment = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.ImagingEnvironment, true, true, settingsSchema, experimentalSchema);
          newSetting.ImagingEnvironment = newImagingEnvironment;
        }

        if (originalSetting.SamplePositioningSettings !== null && originalSetting.SamplePositioningSettings !== undefined) {
          var newSamplePositioningSettings = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.SamplePositioningSettings, true, true, settingsSchema, experimentalSchema);
          newSetting.SamplePositioningSettings = newSamplePositioningSettings;
        }

        if (originalSetting.MicroscopeTableSettings !== null && originalSetting.MicroscopeTableSettings !== undefined) {
          var newMicroscopeTableSettings = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalSetting.MicroscopeTableSettings, true, true, settingsSchema, experimentalSchema);
          newSetting.MicroscopeTableSettings = newMicroscopeTableSettings;
        }

        if (originalSetting.ObjectiveSettings !== null && originalSetting.ObjectiveSettings !== undefined) {
          var originalObjSett = originalSetting.ObjectiveSettings;
          var objSchema = settingsSchema[originalObjSett.Schema_ID];
          var newObjectiveSettings = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(originalObjSett, true, true, settingsSchema, experimentalSchema);
          newSetting.ObjectiveSettings = newObjectiveSettings;
        }

        if (originalSetting.MicroscopeStandSettings !== null && originalSetting.MicroscopeStandSettings !== undefined) {
          var newMicroscopeStandSettings = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(originalSetting.MicroscopeStandSettings, true, true, settingsSchema, experimentalSchema);
          newSetting.MicroscopeStandSettings = newMicroscopeStandSettings;
        }

        return newSetting;
      }

      return originalSetting;
    }
  }, {
    key: "applyPreviousModelVersionModificationToSetting",
    value: function applyPreviousModelVersionModificationToSetting(originalSetting) {
      return originalSetting;
    }
  }, {
    key: "applyPreviousVersionModificationToMicroscope",
    value: function applyPreviousVersionModificationToMicroscope(originalMicroscope) {
      if (this.state.isLoadingMicroscope) return originalMicroscope;
      var modifiedMic = Object.assign({}, originalMicroscope);
      modifiedMic = this.applyPreviousAppVersionModificationToMicroscope(modifiedMic);
      modifiedMic = this.applyPreviousModelVersionModificationToMicroscope(modifiedMic);
      return modifiedMic;
    }
  }, {
    key: "applyPreviousAppVersionModificationToMicroscope",
    value: function applyPreviousAppVersionModificationToMicroscope(originalMicroscope) {
      var schema = this.state.schema;
      var oldMainVersion = 0;
      var oldSubVersion = 0.44;
      var oldPatchVersion = 0;
      var oldBetaVersion = 1;
      var oldAppVersion = originalMicroscope.AppVersion;

      if (oldAppVersion !== undefined && oldAppVersion !== null) {
        var oldAppVersionSplit = oldAppVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");

        oldMainVersion = Number(oldAppVersionSplit[0]);
        oldSubVersion = Number(oldAppVersionSplit[1]);
        oldPatchVersion = Number(oldAppVersionSplit[2]);
        oldBetaVersion = Number(oldAppVersionSplit[3].replace("b", ""));
      }

      var microscopeSchema = {};
      var microscopeStandSchema = {};
      var componentsSchema = {};
      var experimentalSchema = {};
      var standType = "InvertedMicroscopeStand";
      var originalMicroscopeStand = originalMicroscope.MicroscopeStand;

      if (originalMicroscopeStand !== null && originalMicroscopeStand !== undefined) {
        standType = originalMicroscopeStand.Schema_ID.replace(".json", "");
      }

      Object.keys(schema).forEach(function (schemaIndex) {
        var singleSchemaOriginal = schema[schemaIndex];

        if (singleSchemaOriginal.title === "Instrument") {
          microscopeSchema = Object.assign(microscopeSchema, singleSchemaOriginal);
        } else if (singleSchemaOriginal.title === standType) {
          microscopeStandSchema = Object.assign(microscopeStandSchema, singleSchemaOriginal);
        }
        /* else if (singleSchemaOriginal.title === "Image") {
        imageSchema = Object.assign(imageSchema, singleSchemaOriginal);
        }  else if (singleSchemaOriginal.domain === "ImageAcquisitionSettings") {
        let schemaID = singleSchemaOriginal.ID;
        settingsSchema[schemaID] = singleSchemaOriginal;
        }*/
        else if (singleSchemaOriginal.domain === "MicroscopeHardwareSpecifications" || singleSchemaOriginal.domain === "MicroscopeSpecifications") {
            var schemaID = singleSchemaOriginal.ID;
            componentsSchema[schemaID] = singleSchemaOriginal;
          } else if (singleSchemaOriginal.domain === "Experimental") {
            var _schemaID2 = singleSchemaOriginal.ID;
            experimentalSchema[_schemaID2] = singleSchemaOriginal;
          }
      });

      if (originalMicroscope.AppVersion === undefined || originalMicroscope.AppVersion === null || originalMicroscope.AppVersion !== _package.version) {
        originalMicroscope.AppVersion = _package.version;
      }

      if (oldMainVersion === 0 && oldSubVersion < 45) {
        var newMicroscope = Object.assign({}, originalMicroscope);

        if (originalMicroscope.ModelVersion === undefined || originalMicroscope.ModelVersion === null) {
          newMicroscope.ModelVersion = microscopeSchema.modelVersion;

          if (newMicroscope.Version !== null && newMicroscope.Version !== undefined) {
            delete newMicroscope.Version;
          }
        }

        if (originalMicroscopeStand !== null && originalMicroscopeStand !== undefined) {
          var newMicroscopeStand = Object.assign({}, originalMicroscopeStand);

          if (originalMicroscopeStand.ModelVersion === undefined || originalMicroscopeStand.ModelVersion === null) {
            newMicroscopeStand.ModelVersion = microscopeStandSchema.modelVersion;

            if (newMicroscopeStand.Version !== null && newMicroscopeStand.Version !== undefined) {
              delete newMicroscopeStand.Version;
            }
          }

          newMicroscope.MicroscopeStand = newMicroscopeStand;
        }

        if (originalMicroscope.components !== null && originalMicroscope.components !== undefined) {
          var newComponents = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(originalMicroscope.components, true, true, componentsSchema, experimentalSchema);
          newMicroscope.components = newComponents;
        }

        return newMicroscope;
      }

      return originalMicroscope;
    }
  }, {
    key: "applyPreviousModelVersionModificationToMicroscope",
    value: function applyPreviousModelVersionModificationToMicroscope(originalMicroscope) {
      var schema = this.state.schema;
      var oldVersion = originalMicroscope.ModelVersion;
      var oldVersionString = oldVersion.split(".").join(""); //oldVersion.replaceAll(".", "");

      var oldVersionNumber = Number(oldVersionString);
      var microscopeSchema = {};
      var microscopeStandSchema = {}; //In theory these should never be needed because settings shouldn't be re-edited
      //let imageSchema = {};
      //let settingsSchema = {};

      var componentsSchema = {};
      var experimentalSchema = {};
      var standType = "InvertedMicroscopeStand";
      var originalMicroscopeStand = originalMicroscope.MicroscopeStand;

      if (originalMicroscopeStand !== null && originalMicroscopeStand !== undefined) {
        standType = originalMicroscopeStand.Schema_ID.replace(".json", "");
      }

      Object.keys(schema).forEach(function (schemaIndex) {
        var singleSchemaOriginal = schema[schemaIndex];

        if (singleSchemaOriginal.title === "Instrument") {
          microscopeSchema = Object.assign(microscopeSchema, singleSchemaOriginal);
        } else if (singleSchemaOriginal.title === standType) {
          microscopeStandSchema = Object.assign(microscopeStandSchema, singleSchemaOriginal);
        }
        /* else if (singleSchemaOriginal.title === "Image") {
        imageSchema = Object.assign(imageSchema, singleSchemaOriginal);
        }  else if (singleSchemaOriginal.domain === "ImageAcquisitionSettings") {
        let schemaID = singleSchemaOriginal.ID;
        settingsSchema[schemaID] = singleSchemaOriginal;
        }*/
        else if (singleSchemaOriginal.domain === "MicroscopeHardwareSpecifications" || singleSchemaOriginal.domain === "MicroscopeSpecifications") {
            var schemaID = singleSchemaOriginal.ID;
            componentsSchema[schemaID] = singleSchemaOriginal;
          } else if (singleSchemaOriginal.domain === "Experimental") {
            var _schemaID3 = singleSchemaOriginal.ID;
            experimentalSchema[_schemaID3] = singleSchemaOriginal;
          }
      });

      if (originalMicroscope.ModelVersion !== microscopeSchema.modelVersion) {
        originalMicroscope.ModelVersion = microscopeSchema.modelVersion;
      }

      if (originalMicroscopeStand !== undefined && originalMicroscopeStand !== null && originalMicroscopeStand.ModelVersion !== microscopeStandSchema.modelVersion) {
        originalMicroscopeStand.ModelVersion = microscopeStandSchema.modelVersion;
      } //FIXME me update experimental here?


      for (var i = 0; i < originalMicroscope.components.length; i++) {
        var comp = originalMicroscope.components[i];
        var compSchemaID = comp.Schema_ID;
        var compSchema = componentsSchema[compSchemaID];

        if (compSchema !== undefined && compSchema !== null && comp.ModelVersion !== compSchema.modelVersion) {
          comp.ModelVersion = compSchema.modelVersion;
        } else if (compSchema === undefined || compSchema === null) {
          //Adjustment case for renamed Schemas
          console.log(compSchemaID + " not found - OLD NAME");
          var newCompSchemaID = null;
          if (compSchemaID === "AutoFocus.json") newCompSchemaID = "FocusStabilizationDevice.json";else if (compSchemaID === "Direct.json") newCompSchemaID = "FreeBeam.json";else if (compSchemaID === "FilterSet.json") newCompSchemaID = "FilterCube.json";else if (compSchemaID === "Optovar.json") newCompSchemaID = "MagnificationChanger.json";else if (compSchemaID === "SampleHolder.json") newCompSchemaID = "StageInsert.json";else if (compSchemaID === "ObjectiveTurretFocus.json") newCompSchemaID = "TurretObjectiveFocusing.json";else if (compSchemaID === "PiezoElectricObjectiveFocus.json") newCompSchemaID = "IndividualObjectiveFocusing.json";
          var _compSchema = componentsSchema[newCompSchemaID];

          if (_compSchema === undefined || _compSchema === null) {
            console.log(newCompSchemaID + " not found - NEW NAME");
          } else {
            comp.Schema_ID = newCompSchemaID;
          }
        }
      }

      if (oldVersionNumber < 2000) {
        //Need to add stand and move fields from microscope to stand
        //Manufacturer, Model, SerialNumber -> CatalogNumber, LotNumber, EyePieceFieldNumber
        var activeTier = this.state.activeTier;
        var uuid2 = uuidv4();
        console.log("OLD MICROSCOPE");
        console.log(originalMicroscope);
        var newMicroscope = Object.assign({}, originalMicroscope);
        delete newMicroscope.Manufacturer;
        delete newMicroscope.Model;
        delete newMicroscope.SerialNumber;
        delete newMicroscope.LotNumber;
        delete newMicroscope.SpecsFile;
        delete newMicroscope.EyePieceFieldNumber;
        delete newMicroscope.Type;
        newMicroscope.MicroscopeStand = {
          Name: "New ".concat(microscopeStandSchema.title),
          Schema_ID: microscopeStandSchema.ID,
          ID: uuid2,
          Tier: microscopeStandSchema.tier,
          ModelVersion: microscopeStandSchema.modelVersion,
          Manufacturer: originalMicroscope.Manufacturer,
          Model: originalMicroscope.Model,
          CatalogNumber: originalMicroscope.SerialNumber,
          LotNumber: originalMicroscope.LotNumber,
          EyePieceFieldNumber: originalMicroscope.EyePieceFieldNumber,
          SpecsFile: originalMicroscope.SpecsFile
        };
        newMicroscope.Schema_ID = "Instrument.json";
        console.log("newMicroscope");
        console.log(newMicroscope);
        return newMicroscope;
      }

      return originalMicroscope;
    }
  }, {
    key: "createNewMicroscopeFromScratch",
    value: function createNewMicroscopeFromScratch(standType) {
      var typeDimensions = this.state.dimensions[standType];
      var uuid = uuidv4();
      var activeTier = this.state.activeTier;
      var adaptedSchemas = this.createAdaptedSchemas(activeTier, standType);
      var microscopeSchema = adaptedSchemas[0];
      var microscopeStandSchema = adaptedSchemas[1];
      var microscope = {
        //todo this means the microscope schema needs to be at 0 all the time
        //need to find better solution
        Name: "New ".concat(microscopeSchema.title),
        Schema_ID: microscopeSchema.ID,
        ID: uuid,
        Tier: activeTier,
        ValidationTier: activeTier,
        ModelVersion: microscopeSchema.modelVersion,
        AppVersion: _package.version,
        Extension: microscopeSchema.extension,
        Domain: microscopeSchema.domain,
        Category: microscopeSchema.category
      };
      var uuid2 = uuidv4();
      microscope.MicroscopeStand = {
        Name: "New ".concat(microscopeStandSchema.title),
        Schema_ID: microscopeStandSchema.ID,
        ID: uuid2,
        Tier: microscopeStandSchema.tier,
        ModelVersion: microscopeStandSchema.modelVersion,
        Extension: microscopeStandSchema.extension,
        Domain: microscopeStandSchema.domain,
        Category: microscopeStandSchema.category
      };
      this.setState({
        microscope: microscope,
        elementData: {},
        validationTier: microscope.ValidationTier,
        typeDimensions: typeDimensions,
        standType: standType,
        loadingOption: string_createFromFile,
        loadingMode: 1
      });
    }
  }, {
    key: "createOrUseMicroscopeFromDroppedFile",
    value: function createOrUseMicroscopeFromDroppedFile() {
      var modifiedMic = this.state.microscope;
      var activeTier = this.state.activeTier;

      if (activeTier !== modifiedMic.Tier) {
        //TODO warning tier is different ask if continue?
        modifiedMic.Tier = activeTier;
      }

      if (modifiedMic.ValidationTier > activeTier) {
        modifiedMic.ValidationTier = activeTier;
      }

      modifiedMic = this.applyPreviousVersionModificationToMicroscope(modifiedMic);
      var standType = modifiedMic.MicroscopeStand.Schema_ID.replace(".json", "");
      var adaptedSchemas = this.createAdaptedSchemas(modifiedMic.ValidationTier, standType);
      var typeDimensions = this.state.dimensions[standType];
      var microscopeSchema = adaptedSchemas[0];
      var microscopeStandSchema = adaptedSchemas[1];
      var componentsSchema = adaptedSchemas[2];
      var settingsSchema = adaptedSchemas[4];
      var components = modifiedMic.components;
      var newElementData = {};

      if (components !== undefined) {
        Object.keys(componentsSchema).forEach(function (schemaIndex) {
          var compSchema = componentsSchema[schemaIndex];
          var schema_ID = compSchema.ID;
          Object.keys(components).forEach(function (objIndex) {
            var obj = components[objIndex];
            if (schema_ID !== obj.Schema_ID) return;
            var id = compSchema.title + "_" + obj.ID;
            newElementData[id] = obj;
          });
        });
      }

      var linkedFields = Object.assign({}, modifiedMic.linkedFields);
      var validationMicroscope = validate(modifiedMic, microscopeSchema);
      var validatedMicroscope = validationMicroscope.valid;
      var validationStand = validate(modifiedMic.MicroscopeStand, microscopeStandSchema);
      var validatedStand = validationStand.valid;
      MicroMetaAppReact.checkScalingFactorAndRescaleIfNeeded(modifiedMic, newElementData, this.props.scalingFactor);
      this.setState({
        microscope: modifiedMic,
        setting: null,
        elementData: newElementData,
        settingData: null,
        linkedFields: linkedFields,
        validationTier: modifiedMic.ValidationTier,
        isMicroscopeValidated: validatedMicroscope && validatedStand,
        typeDimensions: typeDimensions,
        standType: standType,
        loadingOption: string_createFromFile,
        loadingMode: 1
      });
    }
  }, {
    key: "createOrUseMicroscopeFromSelectedFile",
    value: function createOrUseMicroscopeFromSelectedFile() {
      var modifiedMic = this.state.microscopes[this.state.micName];
      var activeTier = this.state.activeTier;

      if (activeTier !== modifiedMic.Tier) {
        //TODO warning tier is different ask if continue?
        modifiedMic.Tier = activeTier;
      }

      if (modifiedMic.ValidationTier > activeTier) {
        modifiedMic.ValidationTier = activeTier;
      }

      modifiedMic = this.applyPreviousVersionModificationToMicroscope(modifiedMic);
      var standType = modifiedMic.MicroscopeStand.Schema_ID.replace(".json", "");
      var adaptedSchemas = this.createAdaptedSchemas(modifiedMic.ValidationTier, standType);
      var typeDimensions = this.state.dimensions[standType];
      var microscopeSchema = adaptedSchemas[0];
      var microscopeStandSchema = adaptedSchemas[1];
      var componentsSchema = adaptedSchemas[2];
      var settingsSchema = adaptedSchemas[4];
      var components = modifiedMic.components;
      var newElementData = {};

      if (components !== undefined) {
        Object.keys(componentsSchema).forEach(function (schemaIndex) {
          var compSchema = componentsSchema[schemaIndex];
          var schema_ID = compSchema.ID;
          Object.keys(components).forEach(function (objIndex) {
            var obj = components[objIndex];
            if (schema_ID !== obj.Schema_ID) return;
            var id = compSchema.title + "_" + obj.ID;
            newElementData[id] = obj;
          });
        });
      }

      var linkedFields = Object.assign({}, modifiedMic.linkedFields);
      var validationMicroscope = validate(modifiedMic, microscopeSchema);
      var validatedMicroscope = validationMicroscope.valid;
      var validationStand = validate(modifiedMic.MicroscopeStand, microscopeStandSchema);
      var validatedStand = validationStand.valid;
      MicroMetaAppReact.checkScalingFactorAndRescaleIfNeeded(modifiedMic, newElementData, this.props.scalingFactor);
      this.setState({
        microscope: modifiedMic,
        setting: null,
        elementData: newElementData,
        settingData: null,
        linkedFields: linkedFields,
        validationTier: modifiedMic.ValidationTier,
        isMicroscopeValidated: validatedMicroscope && validatedStand,
        typeDimensions: typeDimensions,
        standType: standType,
        loadingOption: string_createFromFile,
        loadingMode: 1
      });
    }
  }, {
    key: "createOrUseMicroscope",
    value: function createOrUseMicroscope() {
      var loadingOption = this.state.loadingOption;
      var isCreateNewScratch = false;
      var standType = null;

      for (var typeString in this.state.standTypes) {
        if (this.state.loadingOption === typeString) {
          isCreateNewScratch = true;
          var type = this.state.standTypes[typeString];

          for (var i = 0; i < current_stands.length; i++) {
            var stand = current_stands[i];

            if (stand.name === type) {
              standType = stand.json;
              break;
            }
          }

          if (standType !== null) break;
        }
      }

      var isLoadingMicroscope = this.state.isLoadingMicroscope;
      var microscope = this.state.microscope;

      if (!isCreateNewScratch && loadingOption !== _constants.string_createFromFile) {
        microscope = this.state.microscopes[this.state.micName];
      }

      if (microscope !== null && microscope !== undefined && isLoadingMicroscope) {
        var oldAppVersion = microscope.AppVersion;
        var oldMainVersion = null;
        var oldSubVersion = null;
        var oldPatchVersion = null;
        var oldBetaVersion = null;
        var hasAppVersion = true;

        if (oldAppVersion !== undefined && oldAppVersion !== null) {
          var oldAppVersionSplit = oldAppVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");

          oldMainVersion = Number(oldAppVersionSplit[0]);
          oldSubVersion = Number(oldAppVersionSplit[1]);
          oldPatchVersion = Number(oldAppVersionSplit[2]);
          oldBetaVersion = Number(oldAppVersionSplit[3].replace("b", "")); //let appVersionSplit = appVersion.split(/[\.,]+/);

          console.log("oldAppVersionSplit");
          console.log(oldAppVersionSplit);
        } else {
          hasAppVersion = false;
        }

        var appVersionSplit = _package.version.split(/[\.-]+/); //oldVersion.replaceAll(".", "");


        var appMainVersion = Number(appVersionSplit[0]);
        var appSubVersion = Number(appVersionSplit[1]);
        var appPatchVersion = Number(appVersionSplit[2]);
        var appBetaVersion = Number(appVersionSplit[3].replace("b", "")); //let appVersionSplit = appVersion.split(/[\.,]+/);

        console.log("appVersionSplit");
        console.log(appVersionSplit);

        if (!hasAppVersion || oldMainVersion < appMainVersion || oldSubVersion < appSubVersion || oldPatchVersion < appPatchVersion || oldBetaVersion < appBetaVersion) {
          window.alert("The Microscope file you are trying to use was saved with a previous version of Micro-Meta App. To avoid errors, before proceeding please go back to the Manage Instrument section of the App and save this file again.");
          return;
        }
      }

      if (isCreateNewScratch) {
        this.createNewMicroscopeFromScratch(standType);
      } else if (loadingOption === _constants.string_createFromFile) {
        this.createOrUseMicroscopeFromDroppedFile();
      } else {
        this.createOrUseMicroscopeFromSelectedFile();
      }
    }
  }, {
    key: "createNewSettingFromScratch",
    value: function createNewSettingFromScratch() {
      var imageMetadata = this.state.imageMetadata;
      var microscope = this.state.microscope;
      var standType = microscope.MicroscopeStand.Schema_ID.replace(".json", "");
      var typeDimensions = this.state.dimensions[standType];
      var uuid = uuidv4();
      var uuid2 = uuidv4();
      uuidv4();
      var activeTier = this.state.activeTier;
      var adaptedSchemas = this.createAdaptedSchemas(activeTier, standType);
      var imageSchema = adaptedSchemas[3];
      var settingsSchema = adaptedSchemas[4]; //console.log(settingsSchema);

      var pixelsSchema = null;

      for (var i in settingsSchema) {
        var localSchema = settingsSchema[i];

        if (localSchema.ID === "Pixels.json") {
          pixelsSchema = localSchema;
        }
      }

      var setting = {
        //todo this means the microscope schema needs to be at 0 all the time
        //need to find better solution
        Name: "New ".concat(imageSchema.title),
        Schema_ID: imageSchema.ID,
        ID: uuid,
        Tier: activeTier,
        ValidationTier: activeTier,
        ModelVersion: imageSchema.modelVersion,
        AppVersion: _package.version,
        InstrumentName: microscope.Name,
        InstrumentID: microscope.ID,
        Extension: imageSchema.extension,
        Domain: imageSchema.domain,
        Category: imageSchema.category
      };
      var pixels = {
        Name: "New ".concat(pixelsSchema.title),
        Schema_ID: pixelsSchema.ID,
        ID: uuid2,
        Tier: activeTier,
        ModelVersion: pixelsSchema.modelVersion,
        Extension: pixelsSchema.extension,
        Domain: pixelsSchema.domain,
        Category: pixelsSchema.category
      };
      var mergedSettings = null;

      if (imageMetadata !== null && imageMetadata !== undefined) {
        var newImageMetadata = Object.assign({}, imageMetadata);
        delete newImageMetadata.ImagingEnvironment;
        delete newImageMetadata.MicroscopeStandSettings;
        delete newImageMetadata.MicroscopeStandSettings;
        delete newImageMetadata.MicroscopeTableSettings;
        delete newImageMetadata.ObjectiveSettings;
        delete newImageMetadata.SamplePositioningSettings;
        delete newImageMetadata.Channels;
        delete newImageMetadata.Planes;
        delete newImageMetadata.Experiment;
        delete newImageMetadata.TIRFSettings;
        mergedSettings = Object.assign({}, setting, newImageMetadata);
        var mergedPixels = Object.assign({}, pixels, newImageMetadata.Pixels);
        mergedSettings.Pixels = mergedPixels;
      } else {
        mergedSettings = setting;
        mergedSettings.Pixels = pixels;
      }

      // let imgEnv = mergedSettings.ImagingEnvironment;
      // if (imgEnv !== null && imgEnv !== undefined)
      // 	newSettingData.ImagingEnvironment = imgEnv;
      // let micStandSet = mergedSettings.MicroscopeStandSettings;
      // if (micStandSet !== null && micStandSet !== undefined)
      // 	newSettingData.MicroscopeStandSettings = micStandSet;
      // let micTableSet = mergedSettings.MicroscopeTableSettings;
      // if (micTableSet !== null && micTableSet !== undefined)
      // 	newSettingData.MicroscopeTableSettings = micTableSet;
      // let objSet = mergedSettings.ObjectiveSettings;
      // if (objSet !== null && objSet !== undefined)
      // 	newSettingData.ObjectiveSettings = objSet;
      // let samPosSet = mergedSettings.SamplePositioningSettings;
      // if (samPosSet !== null && samPosSet !== undefined)
      // 	newSettingData.SamplePositioningSettings = samPosSet;
      // let channels = mergedSettings.Channels;
      // if (channels !== null && channels !== undefined)
      // 	newSettingData.Channels = channels;
      // let planes = mergedSettings.Planes;
      // if (planes !== null && planes !== undefined) newSettingData.Planes = planes;
      // let exp = mergedSettings.Experiment;
      // if (exp !== null && exp !== undefined) newSettingData.Experiment = exp;
      // let tirf = mergedSettings.TIRFSettings;
      // if (tirf !== null && tirf !== undefined) newSettingData.TIRFSettings = tirf;
      var validationSetting = validate(mergedSettings, imageSchema);
      var validatedSetting = validationSetting.valid;
      var validationPixels = validate(mergedSettings.Pixels, pixelsSchema);
      var validatedPixels = validationPixels.valid;
      this.setState({
        setting: mergedSettings,
        settingData: {},
        validationTier: setting.ValidationTier,
        typeDimensions: typeDimensions,
        standType: standType,
        isSettingValidated: validatedSetting && validatedPixels,
        isLoadingSettings: false,
        loadingOption: string_createFromFile,
        loadingMode: 1
      });
    }
  }, {
    key: "createOrUseSettingFromDroppedFile",
    value: function createOrUseSettingFromDroppedFile() {
      var imageMetadata = this.state.imageMetadata;
      var microscope = this.state.microscope;
      var modifiedSetting = this.state.setting;
      var activeTier = this.state.activeTier;

      if (activeTier !== this.state.microscope.Tier) {
        //TODO warning tier is different ask if continue?
        modifiedSetting.Tier = activeTier;
      }

      if (modifiedSetting.ValidationTier > activeTier) {
        modifiedSetting.ValidationTier = activeTier;
      }

      modifiedSetting.InstrumentID = microscope.ID;
      modifiedSetting.InstrumentName = microscope.Name;
      modifiedSetting = this.applyPreviousVersionModificationToSetting(modifiedSetting);
      var adaptedSchemas = this.createAdaptedSchemas(modifiedSetting.ValidationTier, this.state.standType);
      var imageSchema = adaptedSchemas[3];
      var settingsSchema = adaptedSchemas[4];
      var pixelsSchema = null;

      for (var i in settingsSchema) {
        var localSchema = settingsSchema[i];

        if (localSchema.ID === "Pixels.json") {
          pixelsSchema = localSchema;
        }
      }

      var mergedSettings = null;

      if (imageMetadata !== null && imageMetadata !== undefined) {
        var newImageMetadata = Object.assign({}, imageMetadata);
        delete newImageMetadata.ImagingEnvironment;
        delete newImageMetadata.MicroscopeStandSettings;
        delete newImageMetadata.MicroscopeStandSettings;
        delete newImageMetadata.MicroscopeTableSettings;
        delete newImageMetadata.ObjectiveSettings;
        delete newImageMetadata.SamplePositioningSettings;
        delete newImageMetadata.Channels;
        delete newImageMetadata.Planes;
        delete newImageMetadata.Experiment;
        delete newImageMetadata.TIRFSettings;
        mergedSettings = Object.assign({}, newImageMetadata, modifiedSetting);
      } else {
        mergedSettings = modifiedSetting;
      }

      var newSettingData = {};
      var imgEnv = mergedSettings.ImagingEnvironment;
      if (imgEnv !== null && imgEnv !== undefined) newSettingData.ImagingEnvironment = imgEnv;
      var micStandSet = mergedSettings.MicroscopeStandSettings;
      if (micStandSet !== null && micStandSet !== undefined) newSettingData.MicroscopeStandSettings = micStandSet;
      var micTableSet = mergedSettings.MicroscopeTableSettings;
      if (micTableSet !== null && micTableSet !== undefined) newSettingData.MicroscopeTableSettings = micTableSet;
      var objSet = mergedSettings.ObjectiveSettings;
      if (objSet !== null && objSet !== undefined) newSettingData.ObjectiveSettings = objSet;
      var samPosSet = mergedSettings.SamplePositioningSettings;
      if (samPosSet !== null && samPosSet !== undefined) newSettingData.SamplePositioningSettings = samPosSet;
      var channels = mergedSettings.Channels;
      if (channels !== null && channels !== undefined) newSettingData.Channels = channels;
      var planes = mergedSettings.Planes;
      if (planes !== null && planes !== undefined) newSettingData.Planes = planes;
      var exp = mergedSettings.Experiment;
      if (exp !== null && exp !== undefined) newSettingData.Experiment = exp;
      var tirf = mergedSettings.TIRFSettings;
      if (tirf !== null && tirf !== undefined) newSettingData.TIRFSettings = tirf; // console.log("settingData");
      // console.log(newSettingData);
      //let linkedFields = Object.assign({}, modifiedSetting.linkedFields);

      var validationSetting = validate(mergedSettings, imageSchema);
      var validatedSetting = validationSetting.valid;
      var validationPixels = validate(mergedSettings.Pixels, pixelsSchema);
      var validatedPixels = validationPixels.valid;
      this.setState({
        setting: mergedSettings,
        settingData: newSettingData,
        validationTier: mergedSettings.ValidationTier,
        isSettingValidated: validatedSetting && validatedPixels,
        isLoadingSettings: false,
        loadingOption: string_createFromFile,
        loadingMode: 1
      });
    }
  }, {
    key: "createOrUseSettingFromSelectedFile",
    value: function createOrUseSettingFromSelectedFile() {
      var imageMetadata = this.state.imageMetadata;
      var microscope = this.state.microscope;

      if (bool_isDebug) {
        console.log("settings");
        console.log(this.state.settings);
        console.log("settingName");
        console.log(this.state.settingName);
      }

      var setting = this.state.settings[this.state.settingName];
      var modifiedSetting = setting;
      var activeTier = this.state.activeTier;

      if (activeTier !== microscope.Tier) {
        //TODO warning tier is different ask if continue?
        modifiedSetting.Tier = activeTier;
      }

      if (modifiedSetting.ValidationTier > activeTier) {
        modifiedSetting.ValidationTier = activeTier;
      }

      modifiedSetting.InstrumentID = microscope.ID;
      modifiedSetting.InstrumentName = microscope.Name;
      modifiedSetting = this.applyPreviousVersionModificationToSetting(modifiedSetting);
      var adaptedSchemas = this.createAdaptedSchemas(modifiedSetting.ValidationTier, this.state.standType);
      var imageSchema = adaptedSchemas[3];
      var settingsSchema = adaptedSchemas[4];
      console.log(settingsSchema);
      var pixelsSchema = null;

      for (var i in settingsSchema) {
        var localSchema = settingsSchema[i];

        if (localSchema.ID === "Pixels.json") {
          pixelsSchema = localSchema;
        }
      }

      var mergedSettings = null;

      if (imageMetadata !== null && imageMetadata !== undefined) {
        var newImageMetadata = Object.assign({}, imageMetadata);
        delete newImageMetadata.ImagingEnvironment;
        delete newImageMetadata.MicroscopeStandSettings;
        delete newImageMetadata.MicroscopeStandSettings;
        delete newImageMetadata.MicroscopeTableSettings;
        delete newImageMetadata.ObjectiveSettings;
        delete newImageMetadata.SamplePositioningSettings;
        delete newImageMetadata.Channels;
        delete newImageMetadata.Planes;
        delete newImageMetadata.Experiment;
        delete newImageMetadata.TIRFSettings;
        mergedSettings = Object.assign({}, newImageMetadata, modifiedSetting);
      } else {
        mergedSettings = modifiedSetting;
      }

      var newSettingData = {};
      var imgEnv = mergedSettings.ImagingEnvironment;
      if (imgEnv !== null && imgEnv !== undefined) newSettingData.ImagingEnvironment = imgEnv;
      var micStandSet = mergedSettings.MicroscopeStandSettings;
      if (micStandSet !== null && micStandSet !== undefined) newSettingData.MicroscopeStandSettings = micStandSet;
      var micTableSet = mergedSettings.MicroscopeTableSettings;
      if (micTableSet !== null && micTableSet !== undefined) newSettingData.MicroscopeTableSettings = micTableSet;
      var objSet = mergedSettings.ObjectiveSettings;
      if (objSet !== null && objSet !== undefined) newSettingData.ObjectiveSettings = objSet;
      var samPosSet = mergedSettings.SamplePositioningSettings;
      if (samPosSet !== null && samPosSet !== undefined) newSettingData.SamplePositioningSettings = samPosSet;
      var channels = mergedSettings.Channels;
      if (channels !== null && channels !== undefined) newSettingData.Channels = channels;
      var planes = mergedSettings.Planes;
      if (planes !== null && planes !== undefined) newSettingData.Planes = planes;
      var exp = mergedSettings.Experiment;
      if (exp !== null && exp !== undefined) newSettingData.Experiment = exp;
      var tirf = mergedSettings.TIRFSettings;
      if (tirf !== null && tirf !== undefined) newSettingData.TIRFSettings = tirf; //let linkedFields = Object.assign({}, modifiedMic.linkedFields);

      var validationSetting = validate(mergedSettings, imageSchema);
      var validatedSetting = validationSetting.valid;
      var validationPixels = validate(mergedSettings.Pixels, pixelsSchema);
      var validatedPixels = validationPixels.valid;
      this.setState({
        setting: mergedSettings,
        settingData: newSettingData,
        validationTier: mergedSettings.ValidationTier,
        isSettingValidated: validatedSetting && validatedPixels,
        isLoadingSettings: false,
        loadingOption: string_createFromFile,
        loadingMode: 1
      });
    }
  }, {
    key: "createOrUseSetting",
    value: function createOrUseSetting() {
      var loadingOption = this.state.loadingOption;
      var microscope = this.state.microscope;
      var setting = this.state.setting;

      var modifiedCreateString = _constants.string_createFromScratch.replace("# ", "");

      if (loadingOption !== modifiedCreateString && loadingOption !== _constants.string_createFromFile) {
        setting = this.state.settings[this.state.settingName];
      }

      if (setting !== null && setting !== undefined) {
        var micID = microscope.ID;
        var micName = microscope.Name;
        var instrumentID = setting.InstrumentID;
        var instrumentName = setting.InstrumentName;

        if (micID !== instrumentID || micName !== instrumentName) {
          if (!window.confirm("The unique ID & Name of the Microscope file you have selected do not match those that has been saved in the Settings file you are trying to load. If you continue the Microscope ID and Name stored in the Settings file will be overwritten. Are you sure?")) {
            return;
          }
        }
      }

      if (loadingOption === modifiedCreateString) {
        this.createNewSettingFromScratch();
      } else if (loadingOption === _constants.string_createFromFile) {
        this.createOrUseSettingFromDroppedFile();
      } else {
        this.createOrUseSettingFromSelectedFile();
      }
    }
  }, {
    key: "createOrUseMetadata",
    value: function createOrUseMetadata() {
      if (this.state.loadingOption === string_createFromFile) {
        this.setState({
          isLoadingImage: false,
          loadingOption: string_createFromFile,
          loadingMode: 1
        });
      } else {
        this.setState({
          isLoadingImage: false,
          imageMetadata: null,
          loadingOption: string_createFromFile,
          loadingMode: 1
        });
      }
    }
  }, {
    key: "onClickBack",
    value: function onClickBack() {
      var presetMicroscope = null;

      if (this.state.isPreset) {
        presetMicroscope = this.state.microscope;
      }

      this.setState({
        activeTier: 1,
        validationTier: 1,
        microscope: presetMicroscope,
        microscopes: null,
        setting: null,
        isCreatingNewMicroscope: null,
        isLoadingMicroscope: null,
        isLoadingImage: null,
        isLoadingSettings: null,
        loadingOption: null,
        micName: null,
        schema: null,
        elementData: null,
        settingData: null,
        loadingMode: 0,
        imageMetadata: null
      });
    }
  }, {
    key: "updateElementData",
    value: function updateElementData(elementData, areComponentsValidated) {
      //console.log(elementData);
      this.setState({
        elementData: elementData,
        areComponentsValidated: areComponentsValidated
      });
    }
  }, {
    key: "updateLinkedFields",
    value: function updateLinkedFields(linkedFields) {
      this.setState({
        linkedFields: linkedFields
      });
    }
  }, {
    key: "updateSettingData",
    value: function updateSettingData(settingData, areSettingComponentsValidated) {
      var oldSettingData = this.state.settingData;
      var newSettingData = Object.assign(oldSettingData, settingData);
      this.setState({
        settingData: newSettingData,
        areSettingComponentsValidated: areSettingComponentsValidated
      });
    }
  }, {
    key: "handleExportMicroscope",
    value: function handleExportMicroscope(microscope, complete) {
      var micName = microscope.Name;
      micName = micName.replace(/\s+/g, "_").toLowerCase();
      var filename = "".concat(micName, ".json");
      var a = document.createElement("a");
      a.download = filename;
      a.href = "data:" + "application/json;charset=utf-8;" + "," + encodeURIComponent(JSON.stringify(microscope));
      a.target = "_blank";
      document.body.appendChild(a);
      downloads.onChanged.addListener(function (evt) {
        console.log(evt);
      });
      a.click();
      document.body.removeChild(a); // complete(micName);
    }
  }, {
    key: "handleExportSetting",
    value: function handleExportSetting(setting, complete) {
      var settingName = setting.Name;
      settingName = settingName.replace(/\s+/g, "_").toLowerCase();
      var filename = "".concat(settingName, ".json");
      var a = document.createElement("a");
      a.download = filename;
      a.href = "data:" + "application/json;charset=utf-8;" + "," + encodeURIComponent(JSON.stringify(setting));
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); // 	complete(settingName);
    }
  }, {
    key: "handleExportMicroscopeImage",
    value: function handleExportMicroscopeImage(microscope, img
    /*, dataUrl*/
    ) {
      //console.log("im here");
      var filename2 = "".concat(microscope.Name, ".png");
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.download = filename2; // a.href = img
      // 	.toDataURL("image/png")
      // 	.replace("image/png", "image/octet-stream");
      //let dataUrl = toDataUrl()
      //console.log(img);

      a.href = img.toDataURL(); //a.href = dataUrl;

      a.target = "_blank";
      a.click();
      document.body.removeChild(a);
    }
  }, {
    key: "handleSaveMicroscope",
    value: function handleSaveMicroscope(item) {
      var validated = true;

      if (!this.state.isMicroscopeValidated) {
        validated = false;
      }

      if (!this.state.areComponentsValidated) {
        validated = false;
      }

      if (!validated) {//TODO throw warning instead of stopping validation
        //return;
      }

      var elementData = this.state.elementData;
      var components = [];
      Object.keys(elementData).forEach(function (item, index) {
        components[index] = elementData[item];
      });
      var microscope = Object.assign(this.state.microscope, {
        components: components
      };
      var microscope = Object.assign({}, this.state.microscope, comps);
      microscope.linkedFields = this.state.linkedFields;
      var lowerCaseItem = item.toLowerCase();

      if (lowerCaseItem.includes("as new")) {
        microscope.ID = (0, _uuid.v4)();

        if (microscope.MicroscopeStand !== null && microscope.MicroscopeStand !== undefined) {
          microscope.MicroscopeStand.ID = (0, _uuid.v4)();
        }
      }

      this.setState({
        microscope: microscope
      });

      if (lowerCaseItem.includes("save")) {
        this.props.onSaveMicroscope(microscope, this.handleCompleteSave);
      } else if (lowerCaseItem.includes("export")) {
        this.handleExportMicroscope(microscope, this.handleCompleteExport);
      }
    }
  }, {
    key: "handleSaveSetting",
    value: function handleSaveSetting(item) {
      var validated = true;

      if (!this.state.isSettingValidated) {
        validated = false;
      }

      if (!this.state.areSettingComponentsValidated) {
        validated = false;
      }

      if (!validated) {//TODO throw warning instead of stopping validation
        //return;
      }

      var settingData = this.state.settingData; // let components = [];
      // Object.keys(settingData).forEach((item, index) => {
      // 	components[index] = settingData[item];
      // });
      //let comps = { components };

      var setting = Object.assign({}, this.state.setting, settingData);
      var lowerCaseItem = item.toLowerCase();

      if (lowerCaseItem.includes("as new")) {
        setting.ID = (0, _uuid.v4)();

        if (setting.Pixels !== null && setting.Pixels !== undefined) {
          setting.Pixels.ID = (0, _uuid.v4)();
        }
      }

      this.setState({
        setting: setting
      });
      console.log("setting");
      console.log(setting);

      if (lowerCaseItem.includes("save")) {
        this.props.onSaveSetting(setting, this.handleCompleteSave);
      } else if (lowerCaseItem.includes("export")) {
        this.handleExportSetting(setting, this.handleCompleteExport);
      }
    }
  }, {
    key: "handleCompleteSave",
    value: function handleCompleteSave(name) {
      //console.log(micName + " saved");
      //WARN Microscope save
      window.alert(name + " saved");
    }
  }, {
    key: "handleCompleteExport",
    value: function handleCompleteExport(name) {
      //console.log(micName + " saved");
      //WARN Microscope save
      window.alert(name + " exported");
    }
  }, {
    key: "onMicroscopeDataSave",
    value: function onMicroscopeDataSave(id, data) {
      var oldMicroscope = this.state.microscope;
      var oldStand = oldMicroscope.MicroscopeStand;
      var newStand = Object.assign(oldStand, data[this.state.standType]);
      delete data[this.state.standType];
      var newMicroscope = Object.assign(oldMicroscope, data);
      newMicroscope.MicroscopeStand = newStand;
      this.setState({
        microscope: newMicroscope,
        isMicroscopeValidated: true
      }); //this.isMicroscopeValidated = true;
    }
  }, {
    key: "onSettingDataSave",
    value: function onSettingDataSave(id, data) {
      var oldSetting = this.state.setting;
      var oldPixels = oldSetting.Pixels;
      var newPixels = Object.assign(oldPixels, data.Pixels);
      var newSetting = Object.assign(oldSetting, data);
      newSetting.Pixels = newPixels;
      this.setState({
        setting: newSetting,
        isSettingValidated: true
      }); //this.isMicroscopeValidated = true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          imagesPathPNG = _this$props.imagesPathPNG,
          imagesPathSVG = _this$props.imagesPathSVG,
          width = _this$props.width,
          height = _this$props.height;
      var typeDimensions = this.state.typeDimensions;
      var schema = this.state.schema;
      var microscope = this.state.microscope;
      var microscopes = this.state.microscopes;
      var elementData = this.state.elementData;
      var setting = this.state.setting;
      var settings = this.state.settings;
      var settingData = this.state.settingData;
      var imageMetadata = this.state.imageMetadata;
      var experimental = this.state.experimental;
      var experimentalData = this.state.experimentalData;
      var linkedFields = this.state.linkedFields;
      var scalingFactor = this.props.scalingFactor;
      width = Math.max(1100, width);
      height = Math.max(600, height - 60 * 2); //let canvasWidth = Math.ceil(width * 0.75);

      var canvasWidth = width - 300; //let canvasHeight = height - 60 - 60;

      var canvasHeight = height; //let toolbarWidth = Math.floor(width * 0.25);

      //let toolbarHeight = height - 60 - 60;
      var toolbarHeight = height;
      var settingsWidth = width; //let footerWidth = width;

      var headerFooterWidth = width;
      var headerFooterHeight = 60;

      if (schema === null && microscopes === null
      /*&& microscope === null*/
      ) {
          return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
            width: width,
            height: height,
            forwardedRef: this.overlaysContainerRef
          }, /*#__PURE__*/React.createElement(DataLoader, {
            logoImg: url.resolve(imagesPathPNG, string_logo_img_micro_bk),
            onClickLoadSchema: this.handleLoadSchema,
            onClickLoadDimensions: this.handleLoadDimensions,
            onClickLoadMicroscopes: this.handleLoadMicroscopes,
            onClickLoadSettings: this.handleLoadSettings
          }));
        }

      if (microscope === null && this.state.isCreatingNewMicroscope === null) {
        return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/React.createElement(MicroscopePreLoader, {
          logoImg: url.resolve(imagesPathPNG, string_logo_img_micro_bk),
          tiers: this.props.tiers,
          onClickTierSelection: this.handleActiveTierSelection,
          onClickCreateNewMicroscope: this.setCreateNewMicroscope,
          onClickLoadMicroscope: this.setLoadMicroscope
        }));
      }

      if (this.state.isCreatingNewMicroscope === null && microscope !== null && elementData === null) {
        return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            flexFlow: "column",
            width: "100%",
            height: "100%",
            alignItems: "center"
          }
        }, /*#__PURE__*/React.createElement("div", null, "logoImg=", url.resolve(imagesPathPNG, string_logo_img_micro_bk)), /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            justifyContent: "center",
            flexFlow: "column",
            width: "100%",
            height: "100%",
            alignItems: "center"
          }
        }, /*#__PURE__*/React.createElement(Button, {
          style: {
            width: "400px",
            height: "50px",
            padding: "5px",
            margin: "5px"
          },
          size: "lg"
        }, "Loading " + microscope.Name))));
      }

      if ((this.state.isCreatingNewMicroscope || this.state.isLoadingMicroscope) && (microscope === null || elementData === null)) {
        var loadingOptions = []; //CREATE MULTIPLE ENTRIES FOR DIFFERENT MICROSCOPE

        if (!this.state.isLoadingMicroscope) {
          for (var i = 0; i < current_stands.length; i++) {
            var stand = current_stands[i];
            var name = stand.name;

            var modifiedCreateString = _constants.string_createFromScratch.replace("#", name);

            loadingOptions.push(modifiedCreateString);
          }
        } //let loadingOptions = [string_createFromScratch, string_createFromFile];


        loadingOptions.push(_constants.string_createFromFile);
        var microscopeNames = {};

        if (microscopes) {
          Object.keys(microscopes).forEach(function (key) {
            var mic = microscopes[key];

            if (mic.MicroscopeStand !== null && mic.MicroscopeStand !== undefined && mic.MicroscopeStand.Manufacturer !== null && mic.MicroscopeStand.Manufacturer !== undefined) {
              var catNames = microscopeNames[mic.MicroscopeStand.Manufacturer];
              if (catNames !== null && catNames !== undefined) catNames.push(key);else catNames = [key];
              microscopeNames[mic.MicroscopeStand.Manufacturer] = catNames;
            } else {
              var _catNames = microscopeNames["Others"];
              if (_catNames !== null && _catNames !== undefined) _catNames.push(key);else _catNames = [key];
              microscopeNames["Others"] = _catNames;
            }
          });
        }

        if (microscopeNames !== null && microscopeNames !== undefined && Object.keys(microscopeNames).length > 0) loadingOptions.push(_constants.string_loadFromRepository);
        return /*#__PURE__*/_react.default.createElement(MicroMetaAppReactContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/_react.default.createElement(_microscopeLoader.default, {
          logoImg: url.resolve(imagesPathPNG, _constants.string_logo_img_micro_bk),
          loadingOptions: loadingOptions,
          microscopes: microscopeNames,
          onFileDrop: this.uploadMicroscopeFromDropzone,
          loadingOption: this.state.loadingOption,
          loadingMode: this.state.loadingMode,
          onClickLoadingOptionSelection: this.handleLoadingOptionSelection,
          onClickMicroscopeSelection: this.selectMicroscopeFromRepository,
          onClickConfirm: this.createOrUseMicroscope,
          onClickBack: this.onClickBack,
          isSettings: this.state.isLoadingMicroscope
        }));
      }

      if (!this.state.isCreatingNewMicroscope && this.state.isLoadingImage && this.props.onLoadMetadata !== null && this.props.onLoadMetadata !== undefined) {
        console.log("IMAGE LOADER"); //let modifiedCreateString = string_createFromScratch.replace("# ", "");

        var _loadingOptions = [_constants.string_noImageLoad, _constants.string_createFromFile];
        return /*#__PURE__*/_react.default.createElement(MicroMetaAppReactContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/_react.default.createElement(_imageLoader.default, {
          logoImg: url.resolve(imagesPathPNG, _constants.string_logo_img_micro_bk),
          loadingOptions: _loadingOptions,
          onLoadMetadata: this.props.onLoadMetadata,
          handleLoadMetadataComplete: this.handleLoadMetadataComplete,
          loadingOption: this.state.loadingOption,
          loadingMode: this.state.loadingMode,
          onClickLoadingOptionSelection: this.handleLoadingOptionSelection,
          onClickConfirm: this.createOrUseMetadata,
          onClickBack: this.onClickBack
        }));
      } //should be settingData instead of elementData


      if (!this.state.isCreatingNewMicroscope && this.state.isLoadingSettings) {
        console.log("SETTINGS LOADER");

        var _modifiedCreateString = string_createFromScratch.replace("# ", "");

        var _loadingOptions2 = [_modifiedCreateString, _constants.string_createFromFile];
        var settingsNames = [];

        if (settings) {
          var mic_ID = microscope.ID;
          Object.keys(settings).forEach(function (key) {
            var sett = settings[key];
            var sett_ID = sett.InstrumentID;

            if (sett_ID === mic_ID) {
              settingsNames.push(key);
            }
          });
        }

        if (settingsNames !== null && settingsNames !== undefined && Object.keys(settingsNames).length > 0) _loadingOptions2.push(_constants.string_loadFromRepository);
        return /*#__PURE__*/_react.default.createElement(MicroMetaAppReactContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/_react.default.createElement(_settingLoader.default, {
          logoImg: url.resolve(imagesPathPNG, _constants.string_logo_img_micro_bk),
          loadingOptions: _loadingOptions2,
          settings: settingsNames,
          onFileDrop: this.uploadSettingFromDropzone,
          loadingOption: this.state.loadingOption,
          loadingMode: this.state.loadingMode,
          onClickLoadingOptionSelection: this.handleLoadingOptionSelection,
          onClickSettingsSelection: this.selectSettingFromRepository,
          onClickConfirm: this.createOrUseSetting,
          onClickBack: this.onClickBack
        }));
      }

      var style = {
        display: "flex",
        flexFlow: "row",
        height: height
      }; //TODO should be passing these to canvas and toolbar instead of
      // using percentage size inside the component

      var canvasDims = {
        width: canvasWidth,
        height: canvasHeight
      };
      var headerFooterDims = {
        width: headerFooterWidth,
        height: headerFooterHeight
      };
      var headerOffset = headerFooterHeight;
      var microscopeSchema = this.state.adaptedMicroscopeSchema;
      var microscopeStandSchema = this.state.adaptedMicroscopeStandSchema;
      var componentsSchema = this.state.adaptedComponentsSchema;
      var imageSchema = this.state.adaptedImageSchema;
      var settingsSchema = this.state.adaptedSettingsSchema;
      var experimentalSchema = this.state.adaptedExperimentalSchema;
      var childrenSchema = this.state.adaptedChildrenSchema;
      var pixelsSchema = null;

      for (var _i in settingsSchema) {
        var localSchema = settingsSchema[_i];

        if (localSchema.ID === "Pixels.json") {
          pixelsSchema = localSchema;
        }
      }

      var footerMicroscopeSchemas = [microscopeSchema, microscopeStandSchema];
      var footerMicroscopeInput = [microscope, microscope.MicroscopeStand];
      var comps = {};

      for (var _i2 in componentsSchema) {
        var _localSchema = componentsSchema[_i2];
        comps[_localSchema.ID] = _localSchema;
      } // console.log("elementData");
      // console.log(elementData);
      // console.log("componentsSchema");
      // console.log(componentsSchema);


      var elementByType = {};
      Object.keys(elementData).forEach(function (key) {
        var element = elementData[key]; // console.log("element");
        // console.log(element);

        var schemaID = element.Schema_ID.replace(string_json_ext, "");
        var itemSchema = comps[element.Schema_ID]; // if (itemSchema === null || itemSchema === undefined)
        // 	console.log(element);

        var schemaCategory = itemSchema.category;

        if (elementByType[schemaID] === undefined || elementByType[schemaID] === null) {
          elementByType[schemaID] = {};
        }

        if (elementByType[schemaCategory] === undefined || elementByType[schemaCategory] === null) {
          elementByType[schemaCategory] = {};
        }

        elementByType[schemaID][element.ID] = element.Name;
        elementByType[schemaCategory][element.ID] = element.Name;
      });

      if (!this.state.isCreatingNewMicroscope) {
        var footerSettingsSchemas = [imageSchema, pixelsSchema];
        var footerSettingsInput = [setting, setting.Pixels];
        return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/React.createElement(Header, {
          dimensions: headerFooterDims,
          logoImg: url.resolve(imagesPathPNG, string_logo_img_no_bk)
        }), /*#__PURE__*/React.createElement(SettingsMainView, {
          microscope: microscope,
          microscopeComponents: elementData,
          activeTier: this.state.activeTier,
          ref: this.settingsMainViewRef,
          imagesPath: imagesPathSVG,
          settingSchemas: settingsSchema,
          experimentalSchemas: experimentalSchema,
          componentSchemas: componentsSchema,
          setting: setting,
          settingData: settingData,
          imageMetadata: imageMetadata,
          experimentalData: experimentalData,
          componentData: elementData,
          linkedFields: linkedFields,
          updateSettingData: this.updateSettingData,
          updateLinkedFields: this.updateLinkedFields,
          overlaysContainer: this.overlaysContainerRef.current,
          areComponentsValidated: this.state.areComponentsValidated,
          dimensions: {
            width: settingsWidth,
            height: canvasHeight
          },
          containerOffsetTop: this.props.containerOffsetTop,
          containerOffsetLeft: this.props.containerOffsetLeft,
          headerOffset: headerOffset
        }), /*#__PURE__*/React.createElement(Footer, {
          activeTier: this.state.activeTier,
          validationTier: this.state.validationTier,
          componentSchemas: componentsSchema,
          schema: footerSettingsSchemas,
          onFormConfirm: this.onSettingDataSave,
          onClickSave: this.handleSaveSetting,
          onClickBack: this.onClickBack,
          hasSaveOption: this.props.onSaveSetting ? true : false,
          onClickChangeValidation: this.createAdaptedSchemas,
          overlaysContainer: this.overlaysContainerRef.current,
          inputData: footerSettingsInput,
          isSchemaValidated: this.state.isSettingValidated,
          dimensions: headerFooterDims,
          element: "image settings",
          formTitle: setting.Name,
          imagesPath: imagesPathSVG,
          elementByType: elementByType
        }));
      } else {
        if (this.state.isViewOnly) {
          canvasDims = {
            width: width,
            height: canvasHeight + headerFooterHeight
          };
          return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
            width: width,
            height: height,
            forwardedRef: this.overlaysContainerRef
          }, /*#__PURE__*/React.createElement(Header, {
            dimensions: headerFooterDims,
            logoImg: url.resolve(imagesPathPNG, string_logo_img_no_bk)
          }), /*#__PURE__*/React.createElement("div", {
            style: style
          }, /*#__PURE__*/React.createElement(Canvas, {
            microscope: microscope,
            stand: microscope.MicroscopeStand,
            activeTier: this.state.activeTier,
            ref: this.canvasRef,
            imagesPath: imagesPathSVG,
            componentSchemas: componentsSchema,
            childrenSchemas: childrenSchema,
            inputData: elementData,
            linkedFields: linkedFields //backgroundImage={`${imagesPath}${microscopeSchema.image}`}
            ,
            backgroundImage: url.resolve(imagesPathSVG, microscopeStandSchema.image),
            updateElementData: this.updateElementData,
            updateLinkedFields: this.updateLinkedFields,
            overlaysContainer: this.overlaysContainerRef.current,
            areComponentsValidated: this.state.areComponentsValidated,
            canvasElementsDimensions: typeDimensions,
            dimensions: canvasDims,
            scalingFactor: scalingFactor,
            containerOffsetTop: this.props.containerOffsetTop,
            containerOffsetLeft: this.props.containerOffsetLeft,
            headerOffset: headerOffset //setScale={this.setMicroscopeScale}
            ,
            isViewOnly: this.state.isViewOnly
          })));
        } else {
          return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
            width: width,
            height: height,
            forwardedRef: this.overlaysContainerRef
          }, /*#__PURE__*/React.createElement(Header, {
            dimensions: headerFooterDims,
            logoImg: url.resolve(imagesPathPNG, string_logo_img_no_bk)
          }), /*#__PURE__*/React.createElement("div", {
            style: style
          }, /*#__PURE__*/React.createElement(Canvas, {
            microscope: microscope,
            stand: microscope.MicroscopeStand,
            activeTier: this.state.activeTier,
            ref: this.canvasRef,
            imagesPath: imagesPathSVG,
            componentSchemas: componentsSchema,
            childrenSchemas: childrenSchema,
            inputData: elementData,
            linkedFields: linkedFields //backgroundImage={`${imagesPath}${microscopeSchema.image}`}
            ,
            backgroundImage: url.resolve(imagesPathSVG, microscopeStandSchema.image),
            updateElementData: this.updateElementData,
            updateLinkedFields: this.updateLinkedFields,
            overlaysContainer: this.overlaysContainerRef.current,
            areComponentsValidated: this.state.areComponentsValidated,
            canvasElementsDimensions: typeDimensions,
            dimensions: canvasDims,
            scalingFactor: scalingFactor,
            containerOffsetTop: this.props.containerOffsetTop,
            containerOffsetLeft: this.props.containerOffsetLeft,
            headerOffset: headerOffset //setScale={this.setMicroscopeScale}

          }), /*#__PURE__*/React.createElement(Toolbar, {
            activeTier: this.state.activeTier,
            ref: this.toolbarRef,
            imagesPath: imagesPathSVG,
            componentSchemas: componentsSchema,
            dimensions: {
              width: 300,
              height: toolbarHeight
            },
            scalingFactor: scalingFactor
          })), /*#__PURE__*/React.createElement(Footer, {
            activeTier: this.state.activeTier,
            validationTier: this.state.validationTier,
            componentSchemas: componentsSchema,
            schema: [microscopeSchema, microscopeStandSchema],
            onFormConfirm: this.onMicroscopeDataSave,
            onClickSave: this.handleSaveMicroscope,
            onClickBack: this.onClickBack,
            hasSaveOption: this.props.onSaveMicroscope ? true : false,
            onClickChangeValidation: this.createAdaptedSchemas,
            overlaysContainer: this.overlaysContainerRef.current,
            inputData: footerMicroscopeInput,
            isSchemaValidated: this.state.isMicroscopeValidated,
            dimensions: headerFooterDims,
            element: "microscope",
            formTitle: microscope.Name,
            imagesPath: imagesPathSVG,
            elementByType: elementByType
          }));
        }
      }
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.schema !== state.schema && props.schema !== null) {
        return {
          schema: props.schema
        };
      }

      if (props.microscope !== state.microscope && props.microscope !== null) {
        return {
          microscope: props.microscope
        };
      }

      if (props.setting !== state.setting && props.setting !== null) {
        return {
          setting: props.setting
        };
      }

      if (props.microscopes !== state.microscopes && props.microscopes !== null) {
        return {
          microscopes: props.microscopes
        };
      }

      if (props.settings !== state.settings && props.settings !== null) {
        return {
          settings: props.settings
        };
      }

      return null;
    }
  }, {
    key: "checkScalingFactorAndRescaleIfNeeded",
    value: function checkScalingFactorAndRescaleIfNeeded(modifiedMic, elementData, scalingFactor) {
      var micScalingFactor = 1;
      if (modifiedMic.ScalingFactor !== undefined) micScalingFactor = modifiedMic.ScalingFactor;
      if (micScalingFactor === scalingFactor) return;
      var reverseScale = 1 / micScalingFactor;
      var newScalingFactor = reverseScale * scalingFactor;
      modifiedMic.ScalingFactor = scalingFactor; //console.log("SC: " + newScalingFactor);

      for (var key in elementData) {
        var element = elementData[key];
        element.Width *= newScalingFactor;
        element.Height *= newScalingFactor;
        element.PositionX *= newScalingFactor;
        element.PositionY *= newScalingFactor;
      }
    }
  }, {
    key: "applyPreviousAppVersionModificationToObj",
    value: function applyPreviousAppVersionModificationToObj(originalObj, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2) {
      var objSchemaID = originalObj.Schema_ID;

      if (objSchemaID === null || objSchemaID === undefined) {
        //NO SCHEMA CASE IN SETTINGS
        return originalObj;
      }

      var obj = Object.assign({}, originalObj);
      var objSchema = objSchemas[objSchemaID];

      if (objSchema === undefined || objSchema === null) {
        objSchema = objSchemas2[objSchemaID];
      }

      if (objSchema !== undefined && objSchema !== null) {
        if (isAddModelVersion) {
          obj.ModelVersion = objSchema.modelVersion;

          if (obj.Version !== null && obj.Version !== undefined) {
            delete obj.Version;
          }
        }

        if (isAddExtDomCat) {
          obj.Extension = objSchema.extension;
          obj.Domain = objSchema.domain;
          obj.Category = objSchema.category;
        }

        if (obj.LightPath !== null && obj.LightPath !== undefined) {
          var newLightPath = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(obj.LightPath, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);
          obj.LightPath = newLightPath;
        }

        if (obj.ComponentSettings !== null && obj.ComponentSettings !== undefined) {
          var compSettings = obj.ComponentSettings;

          if (compSettings.LightSource !== null && compSettings.LightSource !== undefined) {
            var sett = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(compSettings.LightSource, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);
            compSettings.LightSource = sett;
          }

          if (compSettings.CouplingLens !== null && compSettings.CouplingLens !== undefined) {
            var _sett = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(compSettings.CouplingLens, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);

            compSettings.CouplingLens = _sett;
          }

          if (compSettings.LightSourceCoupling !== null && compSettings.LightSourceCoupling !== undefined) {
            var _sett2 = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(compSettings.LightSourceCoupling, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);

            compSettings.LightSourceCoupling = _sett2;
          }

          if (compSettings.ExcitationFilter !== null && compSettings.ExcitationFilter !== undefined) {
            var _sett3 = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(compSettings.ExcitationFilter, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);

            compSettings.ExcitationFilter = _sett3;
          }

          if (compSettings.Dichroic !== null && compSettings.Dichroic !== undefined) {
            var _sett4 = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(compSettings.Dichroic, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);

            compSettings.Dichroic = _sett4;
          }

          if (compSettings.EmissionFilter !== null && compSettings.EmissionFilter !== undefined) {
            var _sett5 = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(compSettings.EmissionFilter, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);

            compSettings.EmissionFilter = _sett5;
          }

          if (compSettings.RelayLens !== null && compSettings.RelayLens !== undefined) {
            var _sett6 = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(compSettings.RelayLens, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);

            compSettings.RelayLens = _sett6;
          }

          if (compSettings.Detector !== null && compSettings.Detector !== undefined) {
            var _sett7 = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(compSettings.Detector, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);

            compSettings.Detector = _sett7;
          }

          if (compSettings.AdditionalSlot_1 !== null && compSettings.AdditionalSlot_1 !== undefined) {
            var setts = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(compSettings.AdditionalSlot_1, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);
            compSettings.AdditionalSlot_1 = setts;
          }

          if (compSettings.AdditionalSlot_2 !== null && compSettings.AdditionalSlot_2 !== undefined) {
            var _setts = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(compSettings.AdditionalSlot_2, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);

            compSettings.AdditionalSlot_2 = _setts;
          }

          if (compSettings.AdditionalSlot_3 !== null && compSettings.AdditionalSlot_3 !== undefined) {
            var _setts2 = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(compSettings.AdditionalSlot_3, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);

            compSettings.AdditionalSlot_3 = _setts2;
          }

          if (compSettings.AdditionalSlot_4 !== null && compSettings.AdditionalSlot_4 !== undefined) {
            var _setts3 = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(compSettings.AdditionalSlot_4, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);

            compSettings.AdditionalSlot_4 = _setts3;
          }

          if (compSettings.AdditionalSlot_5 !== null && compSettings.AdditionalSlot_5 !== undefined) {
            var _setts4 = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(compSettings.AdditionalSlot_5, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);

            compSettings.AdditionalSlot_5 = _setts4;
          }

          if (compSettings.AdditionalSlot_6 !== null && compSettings.AdditionalSlot_6 !== undefined) {
            var _setts5 = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(compSettings.AdditionalSlot_6, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);

            compSettings.AdditionalSlot_6 = _setts5;
          }

          if (compSettings.AdditionalSlot_7 !== null && compSettings.AdditionalSlot_7 !== undefined) {
            var _setts6 = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(compSettings.AdditionalSlot_7, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);

            compSettings.AdditionalSlot_7 = _setts6;
          }

          if (compSettings.AdditionalSlot_8 !== null && compSettings.AdditionalSlot_8 !== undefined) {
            var _setts7 = MicroMetaAppReact.applyPreviousAppVersionModificationToArray(compSettings.AdditionalSlot_8, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);

            compSettings.AdditionalSlot_8 = _setts7;
          }
        }

        if (obj.Fluorophore !== null && obj.Fluorophore !== undefined) {
          var newFluorophore = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(obj.Fluorophore, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);
          obj.Fluorophore = newFluorophore;
        }

        if (obj.ImmersionLiquid !== null && obj.ImmersionLiquid !== undefined) {
          var newImmersionLiquid = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(obj.ImmersionLiquid, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);
          obj.ImmersionLiquid = newImmersionLiquid;
        }
      } else {
        console.log("Error: applyPreviousAppVersionModificationToObj : schema not found for " + objSchemaID);
      }

      return obj;
    }
  }, {
    key: "applyPreviousAppVersionModificationToArray",
    value: function applyPreviousAppVersionModificationToArray(originalArray, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2) {
      var newArray = [];

      for (var i = 0; i < originalArray.length; i++) {
        var obj = originalArray[i];
        var newObj = MicroMetaAppReact.applyPreviousAppVersionModificationToObj(obj, isAddModelVersion, isAddExtDomCat, objSchemas, objSchemas2);
        newArray[i] = newObj;
      }

      return newArray;
    }
  }]);

  return MicroMetaAppReact;
}(React.PureComponent);

export { MicroMetaAppReact as default };

var MicroMetaAppReactContainer = /*#__PURE__*/function (_React$PureComponent2) {
  _inherits(MicroMetaAppReactContainer, _React$PureComponent2);

  var _super2 = _createSuper(MicroMetaAppReactContainer);

  function MicroMetaAppReactContainer() {
    _classCallCheck(this, MicroMetaAppReactContainer);

    return _super2.apply(this, arguments);
  }

  _createClass(MicroMetaAppReactContainer, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          height = _this$props2.height,
          width = _this$props2.width,
          forwardedRef = _this$props2.forwardedRef;
      // border-box allows element to account for padding and border
      // when calculating/using `height` and `width` style properties.
      return /*#__PURE__*/React.createElement("div", {
        id: "microscopy-app-container",
        style: {
          height: height,
          width: width,
          boxSizing: "border-box"
        }
      }, this.props.children, /*#__PURE__*/React.createElement("div", {
        id: "microscopy-app-overlays-container",
        ref: forwardedRef
      }));
    }
  }]);

  return MicroMetaAppReactContainer;
}(React.PureComponent);

MicroMetaAppReact.propTypes = {
  //TODO need to be added here and in all subclasses
  height: PropTypes.number,
  width: PropTypes.number,
  schema: PropTypes.arrayOf(PropTypes.object),
  microscopes: PropTypes.object,
  microscope: PropTypes.object
};
MicroMetaAppReact.defaultProps = {
  height: 600,
  width: 600,
  schema: null,
  microscope: null,
  setting: null,
  microscopes: null,
  settings: null,
  //REMEMBER last / is needed for url.resolve to properly handle paths
  imagesPathPNG: "./assets/png/",
  imagesPathSVG: "./assets/svg/",
  dimensionsPath: "./assets/dimension/",
  tiers: ["1", "2", "3"],
  containerOffsetTop: 0,
  containerOffsetLeft: 0,
  scalingFactor: 1,
  onLoadDimensions: function onLoadDimensions(complete) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(null);
    });
  },
  onLoadSchema: function onLoadSchema(complete) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(null);
    });
  },
  onLoadMicroscopes: function onLoadMicroscopes(complete) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(null);
    });
  },
  onLoadSettings: function onLoadSettings(complete) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(null);
    });
  },
  onSaveMicroscope: function onSaveMicroscope(microscope, complete) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(microscope.Name);
    });
  },
  onSaveSetting: function onSaveSetting(setting, complete) {
    // Do some stuff... show pane for people to browse/select schema.. etc.
    setTimeout(function () {
      complete(setting.Name);
    });
  }
};

var createApi = function (context) {
  var self = context;
  return {
    "public": {
      // saveMicroscope(){
      // 	self.handleSaveMicroscope("Save microscope");
      // },
      exportMicroscopeConfString: function exportMicroscopeConfString() {
        var elementData = self.state.elementData;
        var components = [];
        Object.keys(elementData).forEach(function (item, index) {
          components[index] = elementData[item];
        });
        var microscope = Object.assign(self.state.microscope, {
          components: components
        });
        return JSON.stringify(microscope, null, 2);
      }
    }
  };
};