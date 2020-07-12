import React from "react";
import "./MenuIcon.css";
import Menu from "../components/Menu";
import Logo from "../components/Logo";
import { animated } from "react-spring";
import { Transition } from "react-spring/renderprops";

class MenuIcon extends React.Component {
	constructor() {
		super();
		this.state = {
			display: false,
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleClickX = this.handleClickX.bind(this);
	}

	handleClick() {
		return this.setState({ display: !this.state.display });
	}

	handleClickX() {
		return this.setState({ display: !this.state.display });
	}

	render() {
		return (
			<div className="nav-bar" id={window.location.href === "https://wildcodeschool.github.io/bucharest-project2-art-gallery/#/" && "transparent"}>
				<Logo display={this.state.display} />
				<Transition
					// native

					items={this.state.display}
					from={{ opacity: 0 }}
					enter={{ opacity: 1, position: "fixed" }}
					leave={{ opacity: 0 }}
					config={{ delay: 0, duration: 400 }}
				>
					{(show) =>
						show &&
						((props) => (
							<animated.div style={props}>
								<Menu display={this.state.display} handleClickX={this.handleClickX} />
							</animated.div>
						))
					}
				</Transition>

				<div className="menu-icon" onClick={this.handleClick} style={this.state.display ? { display: "none" } : { display: "" }}>
					<div
						className={
							window.location.href === "https://wildcodeschool.github.io/bucharest-project2-art-gallery/#/" ? "mob-menu1 white" : "mob-menu1"
						}
					></div>
					<div
						className={
							window.location.href === "https://wildcodeschool.github.io/bucharest-project2-art-gallery/#/" ? "mob-menu2 white" : "mob-menu2"
						}
					></div>
					<div
						className={
							window.location.href === "https://wildcodeschool.github.io/bucharest-project2-art-gallery/#/" ? "mob-menu3 white" : "mob-menu3"
						}
					></div>
				</div>
			</div>
		);
	}
}

export default MenuIcon;
