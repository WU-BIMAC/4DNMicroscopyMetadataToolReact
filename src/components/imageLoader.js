import React from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Dropzone from "react-dropzone";

import DropdownMenu from "./dropdownMenu";
import PopoverTooltip from "./popoverTooltip";

import {
	string_json_ext,
	number_logo_width,
	number_logo_height,
	loadImage_mode_selector_tooltip,
	loadImage_from_file_tooltip,
	loadImage_mode_continue_tooltip,
	back_tooltip,
} from "../constants";

export default class ImageLoader extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			fileLoaded: false,
			fileLoading: false,
			//selectedManu: null,
			selectedSettings: null,
			//settingsNames: null,
		};

		this.dropzoneDropAccepted = this.dropzoneDropAccepted.bind(this);
		this.dropzoneDropRejected = this.dropzoneDropRejected.bind(this);
		this.dropzoneDrop = this.dropzoneDrop.bind(this);
		this.dropzoneDialogOpen = this.dropzoneDialogOpen.bind(this);
		this.dropzoneDialogCancel = this.dropzoneDialogCancel.bind(this);

		this.onFileReaderAbort = this.onFileReaderAbort.bind(this);
		this.onFileReaderError = this.onFileReaderError.bind(this);
		this.onFileReaderLoad = this.onFileReaderLoad.bind(this);

		//this.onClickSettingsSelection = this.onClickSettingsSelection.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		// if (props.loadingMode === 2) {
		// 	if (props.settings !== null && props.settings !== undefined) {
		// 		if (
		// 			state.selectedSettings === null ||
		// 			state.selectedSettings === undefined
		// 		) {
		// 			let selectedSettings = props.settings[0];
		// 			props.onClickSettingsSelection(selectedSettings);
		// 		}
		// 		return null;
		// 	}
		// }
		// return null;
	}

	// onClickSettingsSelection(item) {
	// 	if (item !== null && item !== undefined) {
	// 		this.setState({ selectedSettings: item });
	// 		this.props.onClickSettingsSelection(item);
	// 	}
	// }

	onFileReaderAbort(e) {
		this.setState({ fileLoaded: false });
	}

	onFileReaderError(e) {
		this.setState({ fileLoaded: false });
	}

	onFileReaderLoad(e) {
		console.log(e);
		let binaryStr = e.target.result;
		//let microscope = JSON.parse(binaryStr);
		this.props.onFileDrop();
		this.setState({ fileLoaded: true });
	}

	dropzoneDrop() {
		this.setState({ fileLoading: true, fileLoaded: false });
	}

	dropzoneDropRejected() {
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

		//let inputData = this.props.settings;

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

		let isDropzoneActive = false;
		if (loadingMode === 1) isDropzoneActive = true;

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
				tooltip={loadImage_mode_selector_tooltip}
			/>
		);
		if (loadingMode === 1) {
			list.push(
				<PopoverTooltip
					key={"dropzone-tooltip"}
					position={loadImage_from_file_tooltip.position}
					title={loadImage_from_file_tooltip.title}
					content={loadImage_from_file_tooltip.content}
					element={
						<Dropzone
							key={"dropzone"}
							onFileDialogCancel={this.dropzoneDialogCancel}
							onDrop={this.dropzoneDrop}
							onDropAccepted={this.dropzoneDropAccepted}
							onDropRejected={this.dropzoneDropRejected}
							multiple={false}
						>
							{({ getRootProps, getInputProps }) => (
								<section style={dropzoneStyle}>
									<div {...getRootProps()}>
										<input
											{...getInputProps({ onClick: this.dropzoneDialogOpen })}
										/>
										<p>Select an existing Image file you want to work on.</p>
									</div>
								</section>
							)}
						</Dropzone>
					}
				/>
			);
		}

		// if (loadingMode === 2) {
		// 	let selectedSettings = this.state.selectedSettings;
		// 	let defaultMic =
		// 		selectedSettings !== null && selectedSettings !== undefined
		// 			? inputData.indexOf(selectedSettings)
		// 			: 0;
		// 	//console.log(inputData);
		// 	list.push(
		// 		<DropdownMenu
		// 			key={"dropdown-names"}
		// 			title={""}
		// 			handleMenuItemClick={this.onClickSettingsSelection}
		// 			inputData={inputData}
		// 			defaultValue={defaultMic}
		// 			width={width}
		// 			margin={margin}
		// 			tooltip={createSettings_from_repo_names_tooltip}
		// 		/>
		// 	);
		// }
		list.push(
			<div key="buttons">
				<PopoverTooltip
					position={loadImage_mode_continue_tooltip.position}
					title={loadImage_mode_continue_tooltip.title}
					content={loadImage_mode_continue_tooltip.content}
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

		return (
			<div style={windowExternalContainer}>
				<div style={windowInternalContainer}>
					<div style={styleImageContainer}>
						<img
							src={this.props.logoImg}
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
