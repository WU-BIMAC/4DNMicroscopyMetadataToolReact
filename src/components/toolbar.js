import React from "react";
import Collapsible from "react-collapsible";
import { DragDropContainer } from "react-drag-drop-container";
import Button from "react-bootstrap/Button";

import PopoverTooltip from "./popoverTooltip";
import ImageElement from "./imageElement";

const url = require("url");

import {
	bool_isDebug,
	string_toolbar,
	string_canvas,
	hardware_explorer_tooltip,
	menu_order,
} from "../constants";

export default class Toolbar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			elementList: {},
			imagesDimension: {},
		};

		let counter = 0;
		for (let i = 0; i < props.componentSchemas.length; i++) {
			let obj = props.componentSchemas[i];
			if (props.activeTier < obj.tier) continue;
			let category = obj.category;
			let element = {
				ID: `${obj.title}-${i}`,
				schema: obj,
			};
			if (this.state.elementList[category] === undefined) {
				this.state.elementList[category] = [];
			}
			this.state.elementList[category].push(element);
			counter++;
		}

		this.state.numberOfElement = counter;
		this.cachedToolbar = null;

		this.updateMinMaxDimensions = this.updateMinMaxDimensions.bind(this);
	}

	updateMinMaxDimensions(id, width, height) {
		// let newImagesDimension = Object.assign({}, this.state.imagesDimension);
		// if (newImagesDimension[id] == null || newImagesDimension[id] == undefined) {
		// 	let scalingFactor = this.props.scalingFactor;
		// 	let scaledWidth = width * scalingFactor;
		// 	let scaledHeight = height * scalingFactor;
		// 	newImagesDimension[id] = { width: scaledWidth, height: scaledHeight };
		// 	this.setState({ imagesDimension: newImagesDimension });
		// }
	}

	createCategoryItems(key) {
		let elementList = this.state.elementList;
		let imageElements = [];
		let imagesDimension = this.state.imagesDimension;
		let stylesContainer = {};
		let stylesImages = {};
		elementList[key].map((item) => {
			let scalingFactor = this.props.scalingFactor;
			let width = 100 * scalingFactor;
			let height = 100 * scalingFactor;
			// let width =
			// 	imagesDimension[item.ID] === undefined
			// 		? 100
			// 		: imagesDimension[item.ID].width;
			// let height =
			// 	imagesDimension[item.ID] === undefined
			// 		? 100
			// 		: imagesDimension[item.ID].height;
			stylesContainer[item.ID] = {
				width: `${width + 20}px`,
				height: `${height + 20}px`,
				padding: "10px",
			};
			stylesImages[item.ID] = {
				width: `${width}px`,
				height: `${height}px`,
			};
		});
		elementList[key].map((item) =>
			imageElements.push(
				<ImageElement
					key={`ImageElement-${item.ID}`}
					id={item.ID}
					image={url.resolve(this.props.imagesPath, item.schema.image)}
					name={item.schema.title}
					updateMinMaxDimensions={this.updateMinMaxDimensions}
					style={stylesImages[item.ID]}
				/>
			)
		);
		let categoryItems = [];
		elementList[key].map((item, index) =>
			categoryItems.push(
				<PopoverTooltip
					key={`TooltipImageElement-${item.ID}`}
					position={"bottom"}
					title={item.schema.title}
					content={
						<p>
							Drag this component and drop it in the canvas to add a new{" "}
							{item.schema.title}
						</p>
					}
					element={
						<div key={"div" + item.ID} style={stylesContainer[item.ID]}>
							<DragDropContainer
								targetKey={string_canvas}
								key={"draggable" + item.ID}
								dragClone={true}
								dragData={{
									source: string_toolbar,
									ID: item.ID,
									schema_ID: item.schema.ID,
								}}
							>
								{imageElements[index]}
							</DragDropContainer>
						</div>
					}
				/>
			)
		);
		const styleContainer = {
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			alignItems: "center",
			margin: "5px",
		};
		return <div style={styleContainer}>{categoryItems}</div>;
	}

	// 	<Button className="collapse-btn" key={`Trigger${key}`} size="lg">
	// 	{key}
	// </Button>
	createCategories() {
		const style = {
			width: "100%",
			display: "flex",
			justifyContent: "space-between",
		};
		const explorerStyle = Object.assign(style, { pointerEvents: "none" });
		const styleTransitionClose = {
			transition: "transform 300ms",
			transform: "rotateZ(0deg)",
		};
		const styleTransitionOpen = {
			transition: "transform 300ms",
			transform: "rotateZ(-90deg)",
		};
		let elementList = this.state.elementList;
		let toolbar = [];
		let names = [];
		const hardware_explorer = (
			<PopoverTooltip
				key={"HardwareExplorerTooltip"}
				position={hardware_explorer_tooltip.position}
				title={hardware_explorer_tooltip.title}
				content={hardware_explorer_tooltip.content}
				element={
					<div style={{ width: "100%" }}>
						<Button
							key={"HardwareExplorer"}
							variant="secondary"
							size="lg"
							style={explorerStyle}
							disabled
						>
							Hardware explorer
						</Button>
					</div>
				}
			/>
		);
		toolbar.push(hardware_explorer);
		menu_order.forEach((key) => {
			let index = key.lastIndexOf(".");
			let simpleKey;
			if (index !== -1) simpleKey = key.substring(index + 1);
			else simpleKey = key;
			names.push(simpleKey);
		});
		// Object.keys(elementList).forEach((key) => {
		// 	let index = key.lastIndexOf(".");
		// 	let simpleKey;
		// 	if (index !== -1) simpleKey = key.substring(index + 1);
		// 	else simpleKey = key;
		//
		// });
		//names.sort();
		names.forEach((name) => {
			Object.keys(elementList).forEach((key) => {
				let index = key.lastIndexOf(".");
				let simpleKey;
				if (index !== -1) simpleKey = key.substring(index + 1);
				else simpleKey = key;
				if (simpleKey !== name) return;
				toolbar.push(
					<Collapsible
						key={`Collapsible-${key}`}
						trigger={
							<Button key={`Trigger${key}`} size="lg" style={style}>
								<div>{simpleKey}</div>
								<div style={styleTransitionClose}>&#9665;</div>
							</Button>
						}
						triggerWhenOpen={
							<Button key={`Trigger${key}`} size="lg" style={style}>
								<div>{simpleKey}</div>
								<div style={styleTransitionOpen}>&#9665;</div>
							</Button>
						}
					>
						{this.createCategoryItems(key)}
					</Collapsible>
				);
			});
		});
		return toolbar;
	}

	render() {
		let imagesDimension = this.state.imagesDimension;
		if (
			Object.keys(imagesDimension).length !== 0 &&
			this.state.numberOfElement !== Object.keys(imagesDimension).length &&
			this.cachedToolbar !== null
		) {
			return this.cachedToolbar;
		}
		let width = this.props.dimensions.width;
		let height = this.props.dimensions.height;
		//console.log("t w: " + width + " h: " + height);
		let style = {
			boxSizing: "border-box",
			backgroundColor: "LightGray",
			borderBottom: "2px solid",
			borderTop: "2px solid",
			width: `${width}px`,
			height: `${height}px`,
			overflow: "auto",
			textAlign: "center",
			verticalAlign: "middle",
		};
		let toolbar = this.createCategories();
		this.cachedToolbar = toolbar;
		return <div style={style}>{toolbar}</div>;
	}
}
