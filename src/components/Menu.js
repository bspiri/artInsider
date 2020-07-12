import React from "react";
import "./Menu.css";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

class Menu extends React.Component {
	render() {
		const menuArr = ["Home", "Gallery", "Artists"];
		const linkArr = ["/", "/gallery", "/artists"];

		return (
			<div className="menu-container" style={{ display: this.props.display ? "block" : "hidden" }}>
				<div className="nav-container">
					<Logo white={"white"} />
					<div className="menu-icon-x" onClick={this.props.handleClickX}>
						<div className="mob-menu1-x"></div>
						<div className="mob-menu3-x"></div>
					</div>
				</div>
				<div className="menu-itemsContainer">
					<div className="menu-items">
						<ul>
							{menuArr.map((item, i) => {
								return (
									<li onClick={this.props.handleClickX}>
										<Link to={linkArr[i]}> {item} </Link>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Menu;
