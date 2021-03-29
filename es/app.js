function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
    _this.applyPreviousVersionModification = _this.applyPreviousVersionModification.bind(_assertThisInitialized(_this));
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
    _this.handleCompleteSaveMicroscope = _this.handleCompleteSaveMicroscope.bind(_assertThisInitialized(_this));
    _this.handleCompleteSaveSetting = _this.handleCompleteSaveSetting.bind(_assertThisInitialized(_this));
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
    key: "applyPreviousVersionModification",
    // static readTextFile(file) {
    // 	let rawFile = new XMLHttpRequest();
    // 	let rawData = null;
    // 	rawFile.open("GET", file, false);
    // 	rawFile.onreadystatechange = () => {
    // 		if (rawFile.readyState === 4) {
    // 			if (rawFile.status === 200 || rawFile.status == 0) {
    // 				rawData = rawFile.responseText;
    // 			}
    // 		}
    // 	};
    // 	rawFile.send(null);
    // 	return rawData;
    // }
    value: function applyPreviousVersionModification(originalMicroscope) {
      originalMicroscope.components = originalMicroscope.components || [];
      var schema = this.state.schema;
      var oldVersion = originalMicroscope.Version || "0";
      var oldVersionString = oldVersion.split(".").join(""); //oldVersion.replaceAll(".", "");

      var oldVersionNumber = Number(oldVersionString);
      var microscopeSchema = {};
      var microscopeStandSchema = {}; //In theory these should never be needed because settings shouldn't be re-edited
      //let imageSchema = {};
      //let settingsSchema = {};

      var componentsSchema = {};
      var experimentalSchema = {};
      Object.keys(schema).forEach(function (schemaIndex) {
        var singleSchemaOriginal = schema[schemaIndex];

        if (singleSchemaOriginal.title === "Instrument") {
          microscopeSchema = Object.assign(microscopeSchema, singleSchemaOriginal);
        } else if (singleSchemaOriginal.title === "InvertedMicroscopeStand") {
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
            var _schemaID = singleSchemaOriginal.ID;
            experimentalSchema[_schemaID] = singleSchemaOriginal;
          }
      });

      if (originalMicroscope.Version !== microscopeSchema.version) {
        originalMicroscope.Version = microscopeSchema.version;
      }

      if (originalMicroscope.MicroscopeStand !== undefined && originalMicroscope.MicroscopeStand !== null && originalMicroscope.MicroscopeStand.Version !== microscopeStandSchema.version) {
        originalMicroscope.MicroscopeStand.Version = microscopeStandSchema.version;
      } //FIXME me update experimental here?


      for (var i = 0; i < originalMicroscope.components.length; i++) {
        var comp = originalMicroscope.components[i];
        var compSchemaID = comp.Schema_ID;
        var compSchema = componentsSchema[compSchemaID];

        if (compSchema !== undefined && compSchema !== null && comp.Version !== compSchema.version) {
          comp.Version = compSchema.version;
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
          ValidationTier: activeTier,
          Version: microscopeStandSchema.version,
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
        Version: microscopeSchema.version
      };
      var uuid2 = uuidv4();
      microscope.MicroscopeStand = {
        Name: "New ".concat(microscopeStandSchema.title),
        Schema_ID: microscopeStandSchema.ID,
        ID: uuid2,
        Tier: microscopeStandSchema.tier,
        ValidationTier: activeTier,
        Version: microscopeStandSchema.version
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

      if (activeTier !== this.state.microscope.Tier) {
        //TODO warning tier is different ask if continue?
        modifiedMic.Tier = activeTier;
      }

      if (modifiedMic.ValidationTier > activeTier) {
        modifiedMic.ValidationTier = activeTier;
      }

      console.log('xxx modifiedMic:', modifiedMic);
      modifiedMic = this.applyPreviousVersionModification(modifiedMic);
      var standType = modifiedMic.MicroscopeStand.Schema_ID.replace(".json", "");
      var adaptedSchemas = this.createAdaptedSchemas(modifiedMic.ValidationTier, standType);
      var typeDimensions = this.state.dimensions[standType];
      var microscopeSchema = adaptedSchemas[0];
      var microscopeStandSchema = adaptedSchemas[1];
      var componentsSchema = adaptedSchemas[2];
      adaptedSchemas[4];
      var components = this.state.microscope.components;
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
      var microscope = this.state.microscopes[this.state.micName];
      var modifiedMic = microscope;
      var activeTier = this.state.activeTier;

      if (activeTier !== microscope.Tier) {
        //TODO warning tier is different ask if continue?
        modifiedMic.Tier = activeTier;
      }

      if (modifiedMic.ValidationTier > activeTier) {
        modifiedMic.ValidationTier = activeTier;
      }

      modifiedMic = this.applyPreviousVersionModification(modifiedMic);
      var standType = modifiedMic.MicroscopeStand.Schema_ID.replace(".json", "");
      var adaptedSchemas = this.createAdaptedSchemas(modifiedMic.ValidationTier, standType);
      var typeDimensions = this.state.dimensions[standType];
      var microscopeSchema = adaptedSchemas[0];
      var microscopeStandSchema = adaptedSchemas[1];
      var componentsSchema = adaptedSchemas[2];
      adaptedSchemas[4];
      var components = microscope.components;
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

      if (isCreateNewScratch) {
        this.createNewMicroscopeFromScratch(standType);
      } else if (this.state.loadingOption === string_createFromFile) {
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
        Version: imageSchema.version,
        InstrumentName: microscope.Name,
        InstrumentID: microscope.ID
      };
      var pixels = {
        Name: "New ".concat(pixelsSchema.title),
        Schema_ID: pixelsSchema.ID,
        ID: uuid2,
        Tier: activeTier,
        ValidationTier: activeTier,
        Version: pixelsSchema.version
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
      var modifiedSetting = this.state.setting;
      var activeTier = this.state.activeTier;

      if (activeTier !== this.state.microscope.Tier) {
        //TODO warning tier is different ask if continue?
        modifiedSetting.Tier = activeTier;
      }

      if (modifiedSetting.ValidationTier > activeTier) {
        modifiedSetting.ValidationTier = activeTier;
      } //modifiedSetting = this.applyPreviousVersionModification(modifiedSetting);


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
      } //modifiedSetting = this.applyPreviousVersionModification(modifiedSetting);


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
      var modifiedCreateString = string_createFromScratch.replace("# ", "");

      if (this.state.loadingOption === modifiedCreateString) {
        this.createNewSettingFromScratch();
      } else if (this.state.loadingOption === string_createFromFile) {
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
    value: function handleExportMicroscope(microscope) {
      var micName = microscope.Name;
      micName = micName.replace(/\s+/g, "_").toLowerCase();
      var filename = "".concat(micName, ".json");
      var a = document.createElement("a");
      a.download = filename;
      a.href = "data:" + "application/json;charset=utf-8;" + "," + encodeURIComponent(JSON.stringify(microscope));
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, {
    key: "handleExportSetting",
    value: function handleExportSetting(setting) {
      var settingName = setting.Name;
      settingName = settingName.replace(/\s+/g, "_").toLowerCase();
      var filename = "".concat(settingName, ".json");
      var a = document.createElement("a");
      a.download = filename;
      a.href = "data:" + "application/json;charset=utf-8;" + "," + encodeURIComponent(JSON.stringify(setting));
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
    } // toDataUrl(src, callback, outputFormat, microscope, completeCallback) {
    // 	var img = new Image();
    // 	img.crossOrigin = "Anonymous";
    // 	img.onload = function() {
    // 		var canvas = document.createElement("CANVAS");
    // 		var ctx = canvas.getContext("2d");
    // 		var dataURL;
    // 		canvas.height = this.height;
    // 		canvas.width = this.width;
    // 		ctx.drawImage(this, 0, 0);
    // 		dataURL = canvas.toDataURL(outputFormat);
    // 		callback(microscope, dataURL, completeCallback);
    // 	};
    // 	img.src = src.toDataURL();
    // 	console.log("dataurl1:");
    // 	console.log(img.src);
    // 	if (img.complete || img.complete === undefined) {
    // 		img.src = "data:image/gif;base64,";
    // 		//R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="//
    // 		img.src += src.toDataURL();
    // 	}
    // 	console.log("dataurl2:");
    // 	console.log(img.src);
    // }

  }, {
    key: "handleSaveMicroscope",
    value: function handleSaveMicroscope(item) {
      var validated = true;

      if (!this.state.isMicroscopeValidated) {
        this.setState({
          isMicroscopeValidated: false
        });
        validated = false;
      }

      if (!this.state.areComponentsValidated) {
        this.setState({
          areComponentsValidated: false
        });
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
      });
      microscope.linkedFields = this.state.linkedFields; // let node = ReactDOM.findDOMNode(this.canvasRef.current);
      // html2canvas(node, {
      // 	allowTaint: true,
      // 	foreignObjectRendering: true,
      // 	logging: true,
      // 	letterRendering: 1,
      // 	useCORS: true,
      // }).then((canvas) => {
      // 	//var myImage = canvas.toDataURL("image/png");
      // 	//window.open(myImage);
      // 	//document.body.appendChild(canvas);
      // 	if (item.startsWith("Save microscope")) {
      // 		console.log(microscope);
      // 		this.props.onSaveMicroscope(
      // 			microscope,
      // 			this.handleCompleteSaveMicroscope
      // 			//canvas
      // 		);
      // 		// this.toDataUrl(
      // 		// 	canvas,
      // 		// 	this.props.onSaveMicroscope,
      // 		// 	"image/png",
      // 		// 	microscope,
      // 		// 	this.handleCompleteSaveMicroscope
      // 		// );
      // 	} else if (item.startsWith("Export microscope")) {
      // 		this.handleExportMicroscope(microscope);
      // 	} else if (item.startsWith("Export image")) {
      // 		this.handleExportMicroscopeImage(microscope, canvas);
      // 		// this.toDataUrl(
      // 		// 	canvas,
      // 		// 	this.handleExportMicroscopeImage,
      // 		// 	"image/png",
      // 		// 	microscope
      // 		// );
      // 	}
      // 	//document.body.removeChild(canvas);
      // });

      if (item.startsWith("Save microscope")) {
        console.log(microscope);
        this.props.onSaveMicroscope(microscope, this.handleCompleteSaveMicroscope);
      } else if (item.startsWith("Export microscope")) {
        this.handleExportMicroscope(microscope);
      }
    }
  }, {
    key: "handleSaveSetting",
    value: function handleSaveSetting(item) {
      var validated = true;

      if (!this.state.isSettingValidated) {
        this.setState({
          isSettingValidated: false
        });
        validated = false;
      }

      if (!this.state.areSettingComponentsValidated) {
        this.setState({
          areSettingComponentsValidated: false
        });
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

      var setting = Object.assign(this.state.setting, settingData);
      console.log("setting");
      console.log(setting); // let node = ReactDOM.findDOMNode(this.canvasRef.current);
      // html2canvas(node, {
      // 	allowTaint: true,
      // 	foreignObjectRendering: true,
      // 	logging: true,
      // 	letterRendering: 1,
      // 	useCORS: true,
      // }).then((canvas) => {
      // 	if (item.startsWith("Save setting")) {
      // 		this.props.onSaveSetting(setting, this.handleCompleteSaveSetting);
      // 	} else if (item.startsWith("Export setting")) {
      // 		this.handleExportSetting(setting);
      // 	} else if (item.startsWith("Export image")) {
      // 		//TODO
      // 	}
      // });

      if (item.startsWith("Save image setting")) {
        this.props.onSaveSetting(setting, this.handleCompleteSaveSetting);
      } else if (item.startsWith("Export image setting")) {
        this.handleExportSetting(setting);
      }
    }
  }, {
    key: "handleCompleteSaveMicroscope",
    value: function handleCompleteSaveMicroscope(micName) {
      //console.log(micName + " saved");
      //WARN Microscope save
      window.alert(micName + " saved");
    }
  }, {
    key: "handleCompleteSaveSetting",
    value: function handleCompleteSaveSetting(settingName) {
      //console.log(micName + " saved");
      //WARN Microscope save
      window.alert(settingName + " saved");
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
        isSettingsValidated: true
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
      this.state.experimental;
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
            var modifiedCreateString = string_createFromScratch.replace("#", name);
            loadingOptions.push(modifiedCreateString);
          }
        } //let loadingOptions = [string_createFromScratch, string_createFromFile];


        loadingOptions.push(string_createFromFile);
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

        if (microscopeNames !== null && microscopeNames !== undefined && Object.keys(microscopeNames).length > 0) loadingOptions.push(string_loadFromRepository);
        return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/React.createElement(MicroscopeLoader, {
          logoImg: url.resolve(imagesPathPNG, string_logo_img_micro_bk),
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

        return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/React.createElement(ImageLoader, {
          logoImg: url.resolve(imagesPathPNG, string_logo_img_micro_bk),
          loadingOptions: [string_noImageLoad, string_createFromFile],
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

        var _loadingOptions2 = [_modifiedCreateString, string_createFromFile];
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

        if (settingsNames !== null && settingsNames !== undefined && Object.keys(settingsNames).length > 0) _loadingOptions2.push(string_loadFromRepository);
        return /*#__PURE__*/React.createElement(MicroMetaAppReactContainer, {
          width: width,
          height: height,
          forwardedRef: this.overlaysContainerRef
        }, /*#__PURE__*/React.createElement(SettingLoader, {
          logoImg: url.resolve(imagesPathPNG, string_logo_img_micro_bk),
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

      var imageMetadata = this.state.imageMetadata;
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
          isSchemaValidated: this.state.isSettingsValidated,
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
        var element = elementData[key]; // console.log("ID: " + key);
        // console.log(
        // 	" W: " +
        // 		element.Width +
        // 		" H: " +
        // 		element.Height +
        // 		" X: " +
        // 		element.PositionX +
        // 		" Y: " +
        // 		element.PositionY
        // );

        element.Width *= newScalingFactor;
        element.Height *= newScalingFactor;
        element.PositionX *= newScalingFactor;
        element.PositionY *= newScalingFactor; // console.log(
        // 	" W: " +
        // 		element.Width +
        // 		" H: " +
        // 		element.Height +
        // 		" X: " +
        // 		element.PositionX +
        // 		" Y: " +
        // 		element.PositionY
        // );
      }
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