import React from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Dropzone from "react-dropzone";

import DropdownMenu from "./dropdownMenu";
import PopoverTooltip from "./popoverTooltip";

import { validateMicroscope } from "../genericUtilities";

import {
	string_json_ext,
	number_logo_width,
	number_logo_height,
	create_mode_selector_tooltip,
	create_mode_selector_settings_tooltip,
	create_from_file_tooltip,
	create_from_repo_manufacturer_tooltip,
	create_from_repo_names_tooltip,
	create_mode_continue_tooltip,
	create_mode_continue_settings_tooltip,
	back_tooltip,
	bool_isDebug,
} from "../constants";

export default class MicroscopeLoader extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			fileLoaded: false,
			fileLoading: false,
			selectedManu: null,
			selectedMic: null,
			micNames: null,
		};

		this.dropzoneDropAccepted = this.dropzoneDropAccepted.bind(this);
		this.dropzoneDropRejected = this.dropzoneDropRejected.bind(this);
		this.dropzoneDrop = this.dropzoneDrop.bind(this);
		this.dropzoneDialogOpen = this.dropzoneDialogOpen.bind(this);
		this.dropzoneDialogCancel = this.dropzoneDialogCancel.bind(this);

		this.onFileReaderAbort = this.onFileReaderAbort.bind(this);
		this.onFileReaderError = this.onFileReaderError.bind(this);
		this.onFileReaderLoad = this.onFileReaderLoad.bind(this);

		this.onClickManufacturerSelection = this.onClickManufacturerSelection.bind(
			this
		);
	}

	static getDerivedStateFromProps(props, state) {
		if (props.loadingMode === 2) {
			if (props.microscopes !== null && props.microscopes !== undefined) {
				if (state.selectedManu === null) {
					let selectedManu = Object.keys(props.microscopes)[0];
					let micNames = props.microscopes[selectedManu];
					props.onClickMicroscopeSelection(micNames[0]);
					return { selectedManu: selectedManu, micNames: micNames };
				}
			}
		}
		return null;
	}

	onFileReaderAbort(e) {
		this.setState({ fileLoaded: false });
	}

	onFileReaderError(e) {
		this.setState({ fileLoaded: false });
	}

	onFileReaderLoad(e) {
		let binaryStr = e.target.result;
		let microscope = null;
		let errorMsg = null;
		try {
			microscope = JSON.parse(binaryStr);
			if (validateMicroscope(microscope, this.props.schema, true)) {
				this.props.onFileDrop(microscope);
				this.setState({ fileLoaded: true });
			} else {
				errorMsg =
					"The file you are trying to load does not contain a proper MicroMetaApp Microscope";
			}
		} catch (exception) {
			if (bool_isDebug) console.log(exception);
			errorMsg = "The file you are trying to load is not a proper json file";
		}

		if (errorMsg !== null) {
			window.alert(errorMsg);
			this.setState({ fileLoaded: false });
		}
	}

	dropzoneDrop() {
		this.setState({ fileLoading: true, fileLoaded: false });
	}

	dropzoneDropRejected(rejectedFiles) {
		let fileRejectedNames = "";
		rejectedFiles.forEach((rejected) => {
			fileRejectedNames += rejected.file.name + "\n";
		});
		window.alert(
			"The following file you tried to load is not a json file:\n" +
				fileRejectedNames
		);
		this.setState({ fileLoading: false, fileLoaded: false });
	}

	dropzoneDropAccepted(acceptedFiles) {
		const reader = new FileReader();
		reader.onabort = this.onFileReaderAbort;
		reader.onerror = this.onFileReaderError;
		reader.onload = this.onFileReaderLoad;

		acceptedFiles.forEach((file) => reader.readAsText(file));

		this.setState({ fileLoading: false });
	}

	dropzoneDialogOpen() {
		this.setState({ fileLoading: true, fileLoaded: false });
	}

	dropzoneDialogCancel() {
		this.setState({ fileLoading: false, fileLoaded: false });
	}

	onClickManufacturerSelection(item) {
		let micNames = this.props.microscopes[item];
		this.setState({ selectedManu: item, micNames: micNames });
		this.props.onClickMicroscopeSelection(this.props.microscopes[item][0]);
	}

	render() {
		const buttonStyle = {
			width: "200px",
			height: "50px",
			padding: "5px",
			margin: "5px",
		};
		const windowExternalContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};
		const windowInternalContainer = {
			display: "flex",
			justifyContent: "center",
			flexFlow: "column",
			width: "100%",
			height: "100%",
			alignItems: "center",
		};

		let width = 410;
		let margin = 5;

		let inputData = this.props.microscopes;

		let dropzoneStyle = {
			borderStyle: "dashed",
			borderWidth: "thin",
			width: `${width}px`,
		};
		let styleImageContainer = {
			width: `${number_logo_width}px`,
			height: `${number_logo_height}px`,
		};
		let styleImage = {
			width: "100%",
			height: "100%",
			margin: "auto",
		};
		let loadingMode = this.props.loadingMode;
		let fileLoading = this.state.fileLoading;
		let fileLoaded = this.state.fileLoaded;

		let selectedManu = this.state.selectedManu;

		let isDropzoneActive = false;
		if (loadingMode === 1) isDropzoneActive = true;

		let create_mode_tooltip = null;
		if (this.props.isSettings) {
			create_mode_tooltip = create_mode_selector_settings_tooltip;
		} else {
			create_mode_tooltip = create_mode_selector_tooltip;
		}

		let list = [];
		list.push(
			<DropdownMenu
				key={"dropdown-loadingOption"}
				title={""}
				handleMenuItemClick={this.props.onClickLoadingOptionSelection}
				defaultValue={this.props.loadingOptions.indexOf(
					this.props.loadingOption
				)}
				inputData={this.props.loadingOptions}
				width={width}
				margin={margin}
				tooltip={create_mode_tooltip}
			/>
		);
		if (loadingMode === 1) {
			list.push(
				<PopoverTooltip
					key={"dropzone-tooltip"}
					position={create_from_file_tooltip.position}
					title={create_from_file_tooltip.title}
					content={create_from_file_tooltip.content}
					element={
						<Dropzone
							key={"dropzone"}
							onFileDialogCancel={this.dropzoneDialogCancel}
							onDrop={this.dropzoneDrop}
							onDropAccepted={this.dropzoneDropAccepted}
							onDropRejected={this.dropzoneDropRejected}
							accept={string_json_ext}
							multiple={false}
						>
							{({ getRootProps, getInputProps }) => (
								<section style={dropzoneStyle}>
									<div {...getRootProps()}>
										<input
											{...getInputProps({ onClick: this.dropzoneDialogOpen })}
										/>
										<p>
											Select an existing Microscope file you want to work on.
										</p>
									</div>
								</section>
							)}
						</Dropzone>
					}
				/>
			);
		}

		if (loadingMode === 2) {
			let manufacturers = Object.keys(inputData);
			let defaultManu =
				selectedManu !== null && selectedManu !== undefined
					? manufacturers.indexOf(selectedManu)
					: 0;
			list.push(
				<DropdownMenu
					key={"dropdown-manufacturers"}
					title={""}
					handleMenuItemClick={this.onClickManufacturerSelection}
					inputData={manufacturers}
					defaultValue={defaultManu}
					width={width}
					margin={margin}
					tooltip={create_from_repo_manufacturer_tooltip}
				/>
			);

			if (selectedManu !== null && selectedManu !== undefined) {
				let selectedMic = this.state.selectedMic;
				let defaultMic =
					selectedMic !== null && selectedMic !== undefined
						? inputData[selectedManu].indexOf(selectedMic)
						: 0;
				//console.log(this.state.micNames);
				list.push(
					<DropdownMenu
						key={"dropdown-names"}
						title={""}
						handleMenuItemClick={this.props.onClickMicroscopeSelection}
						inputData={this.state.micNames}
						defaultValue={defaultMic}
						width={width}
						margin={margin}
						tooltip={create_from_repo_names_tooltip}
					/>
				);
			}
		}

		let continue_tooltip = null;
		if (this.props.isSettings) {
			continue_tooltip = create_mode_continue_settings_tooltip;
		} else {
			continue_tooltip = create_mode_continue_tooltip;
		}
		list.push(
			<div key="buttons">
				<PopoverTooltip
					position={continue_tooltip.position}
					title={continue_tooltip.title}
					content={continue_tooltip.content}
					element={
						<Button
							onClick={
								(isDropzoneActive && fileLoaded && !fileLoading) ||
								!isDropzoneActive
									? this.props.onClickConfirm
									: null
							}
							style={buttonStyle}
							size="lg"
							disabled={isDropzoneActive && (!fileLoaded || fileLoading)}
						>
							{isDropzoneActive && !fileLoaded && !fileLoading
								? "Waiting for file"
								: isDropzoneActive && fileLoading
								? "Loading file"
								: "Continue"}
						</Button>
					}
				/>
				<PopoverTooltip
					position={back_tooltip.position}
					title={back_tooltip.title}
					content={back_tooltip.content}
					element={
						<Button
							onClick={this.props.onClickBack}
							style={buttonStyle}
							size="lg"
						>
							Back
						</Button>
					}
				/>
			</div>
		);

		let logoPath =
			this.props.logoImg +
			(this.props.logoImg.indexOf("githubusercontent.com") > -1
				? "?sanitize=true"
				: "");
		return (
			<div style={windowExternalContainer}>
				<div style={windowInternalContainer}>
					<div style={styleImageContainer}>
						<img
							src={logoPath}
							alt={this.props.logoImg}
							style={styleImage}
							onLoad={this.onImgLoad}
						/>
					</div>
					{list}
				</div>
			</div>
		);
	}
}
