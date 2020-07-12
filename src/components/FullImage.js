import React, { Component } from "react";
import "./Gallery.css";

export default class FullImage extends Component {
	render() {
		return (
			<div className="fullscreen">
				<div className="closeContainer">
					<div className="menu-icon-x-gall" onClick={this.props.showImage}>
						<div className="mob-menu1-x-gall"></div>
						<div className="mob-menu3-x-gall"></div>
					</div>
				</div>

				<div className="fullContainer">
					<div className="imageDiv">
						<a href={this.props.currentImage} target="_blank" rel="noopener noreferrer">
							<img
								className="highlightImg"
								title="Open image in new tab."
								alt="idk"
								src={this.props.currentImage && this.props.currentImage}
							></img>
						</a>
					</div>
					<div className="descriptionDiv">
						<h4 style={{ display: this.props.name ? "block" : "none" }}>Artist</h4>
						<h3>{this.props.name ? this.props.name : "Unknown"}</h3>
						<h4>Title</h4>
						<h3>{this.props.title ? this.props.title : "Unknown"}</h3>
						<h4>Date</h4>
						<h3>{this.props.date ? this.props.date : "Unknown"}</h3>
						<h4>Technique</h4>
						<h3>{this.props.technique ? this.props.technique : "Unknown"}</h3>
						<h4>Category</h4>
						<h3>{this.props.category ? this.props.category : "Unknown"}</h3>
						<h4>Culture</h4>
						<h3>{this.props.culture ? this.props.culture : "Unknown"}</h3>
					</div>
				</div>
			</div>
		);
	}
}
