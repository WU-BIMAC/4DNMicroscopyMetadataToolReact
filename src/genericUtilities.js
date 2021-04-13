import React from "react";

import { version as appVersion } from "../package.json";

const validate = require("jsonschema").validate;

export function isDefined(object) {
	if (object !== null && object !== undefined) return true;
	return false;
}

export function verifyAppVersion(microscope) {
	let oldAppVersion = microscope.AppVersion;
	let oldMainVersion = null;
	let oldSubVersion = null;
	let oldPatchVersion = null;
	let oldBetaVersion = null;
	let hasAppVersion = true;
	if (oldAppVersion !== undefined && oldAppVersion !== null) {
		let oldAppVersionSplit = oldAppVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");
		oldMainVersion = Number(oldAppVersionSplit[0]);
		oldSubVersion = Number(oldAppVersionSplit[1]);
		oldPatchVersion = Number(oldAppVersionSplit[2]);
		oldBetaVersion = Number(oldAppVersionSplit[3].replace("b", ""));
		//let appVersionSplit = appVersion.split(/[\.,]+/);
		// console.log("oldAppVersionSplit");
		// console.log(oldAppVersionSplit);
	} else {
		hasAppVersion = false;
	}
	let appVersionSplit = appVersion.split(/[\.-]+/); //oldVersion.replaceAll(".", "");
	let appMainVersion = Number(appVersionSplit[0]);
	let appSubVersion = Number(appVersionSplit[1]);
	let appPatchVersion = Number(appVersionSplit[2]);
	let appBetaVersion = Number(appVersionSplit[3].replace("b", ""));
	//let appVersionSplit = appVersion.split(/[\.,]+/);
	// console.log("appVersionSplit");
	// console.log(appVersionSplit);
	if (
		!hasAppVersion ||
		oldMainVersion < appMainVersion ||
		oldSubVersion < appSubVersion ||
		oldPatchVersion < appPatchVersion ||
		oldBetaVersion < appBetaVersion
	) {
		return false;
	}
	return true;
}

export function validateAcquisitionSettings(settings, schemas) {
	let imageSchema = null;
	let pixelsSchema = null;
	for (let i = 0; i < schemas.length; i++) {
		let schema = schemas[i];
		if (schema.title === "Image") {
			imageSchema = schema;
		} else if (schema.title === "Pixels") {
			pixelsSchema = schema;
		}
	}
	let imageValidation = validate(settings, imageSchema);
	let imageValidated = imageValidation.valid;

	let pixelsValidation = validate(settings.Pixels, pixelsSchema);
	let pixelsValidated = pixelsValidation.valid;
	let validated = imageValidated && pixelsValidated;

	return validated;
}

export function validateMicroscope(
	microscope,
	schemas,
	checkForMicroscopeStand
) {
	let micStandSchemaName = null;
	let microscopeSchema = null;
	for (let i = 0; i < schemas.length; i++) {
		let schema = schemas[i];
		if (schema.title === "Instrument") {
			microscopeSchema = schema;
		}
	}

	let microscopeValidation = validate(microscope, microscopeSchema);
	let microscopeValidated = microscopeValidation.valid;

	let hasModelAppVersion = false;
	if (isDefined(microscope.ModelVersion) && isDefined(microscope.AppVersion)) {
		hasModelAppVersion = true;
	}

	let validated = hasModelAppVersion && microscopeValidated;
	if (checkForMicroscopeStand) {
		let hasMicroscopeStand = false;
		if (isDefined(microscope.MicroscopeStand)) {
			if (
				isDefined(microscope.MicroscopeStand.Name) &&
				isDefined(microscope.MicroscopeStand.Schema_ID) &&
				isDefined(microscope.MicroscopeStand.ID) &&
				isDefined(microscope.MicroscopeStand.Tier) &&
				isDefined(microscope.MicroscopeStand.ModelVersion)
			) {
				hasMicroscopeStand = true;
			}
		}

		validated = hasMicroscopeStand && hasModelAppVersion && microscopeValidated;
	}

	return validated;
}
