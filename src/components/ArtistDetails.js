import React from "react";

import "./ArtistList.css";

class ArtistDetails extends React.Component {
	render() {
		return (
			<div className="ArtistDetails">
				<h1>{this.props.name}</h1>
				<p className="date">{this.props.date}</p>
			</div>
		);
	}
}

export default ArtistDetails;
