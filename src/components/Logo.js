import React from "react";
import "./Logo.css";
import { Link } from "react-router-dom";

class Logo extends React.Component {
	render() {
		console.log(window.location.href);
		return (
			<div style={{ display: this.props.display ? "none" : "" }}>
				<Link to="/">
					<img
						className="logo"
						src={
							this.props.white || window.location.href === "https://wildcodeschool.github.io/bucharest-project2-art-gallery/#/"
								? require("../logos/logo_transparent_white.png")
								: require("../logos/logo_transparent.png")
						}
						alt=""
					/>
				</Link>
			</div>
		);
	}
}

export default Logo;
