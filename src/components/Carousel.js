import React from "react";

class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timer: 3000,
			activeID: 0,
			wrapperStyle: {
				backgroundImage: window.innerWidth >= 650 ? `url("https://i.imgur.com/U14xxzn.jpg")` : `url("https://i.imgur.com/nZIOfkW.jpg")`,
			},
			panelStyle: {
				background: this.props.data[0].colour,
			},
			buttonHover: false,
			buttonStyle: {
				color: "#ffffff",
			},
		};
	}
	carouselFn = () => {
		if (this.state.activeID < 4) {
			const futureActiveId = this.state.activeID + 1;
			this.setState({
				activeID: futureActiveId,
				wrapperStyle: {
					backgroundImage:
						window.innerWidth >= 650 ? `url('${this.props.data[futureActiveId].img}')` : `url('${this.props.data[futureActiveId].mobileImg}')`,
				},
				panelStyle: {
					background: this.props.data[futureActiveId].colour,
				},
			});
		} else if (this.state.activeID === 4) {
			this.setState({
				activeID: 0,
				wrapperStyle: {
					backgroundImage: window.innerWidth >= 650 ? `url('${this.props.data[0].img}')` : `url('${this.props.data[0].mobileImg}')`,
				},
				panelStyle: {
					background: this.props.data[0].colour,
				},
			});
		}
	};
	carouselInterval = () => setInterval(this.carouselFn, 3000);
	componentDidMount() {
		this.carouselInterval();
	}

	_changeActive(id) {
		this.setState({
			activeID: id,
			wrapperStyle: {
				backgroundImage: window.innerWidth >= 650 ? `url('${this.props.data[id].img}')` : `url('${this.props.data[id].mobileImg}')`,
			},
			panelStyle: {
				backgroundColor: this.props.data[id].colour,
			},
		});
	}
	_buttonColour() {
		if (!this.state.buttonHover) {
			this.setState({
				buttonHover: true,
				buttonStyle: {
					color: this.props.data[this.state.activeID].colour,
				},
			});
		} else {
			this.setState({
				buttonHover: false,
				buttonStyle: {
					color: "#ffffff",
				},
			});
		}
	}
	render() {
		return (
			<section className="wrapper" style={this.state.wrapperStyle}>
				<Selectors data={this.props.data} activeID={this.state.activeID} _changeActive={this._changeActive.bind(this)} />
				<Panel
					data={this.props.data[this.state.activeID]}
					panelStyle={this.state.panelStyle}
					buttonStyle={this.state.buttonStyle}
					_buttonColour={this._buttonColour.bind(this)}
				/>
			</section>
		);
	}
}
class Panel extends React.Component {
	render() {
		return (
			<aside className="panel" style={this.props.panelStyle}>
				<h2 className="panel-artist">{this.props.data.artist}</h2>
				<p className="panel-title">{this.props.data.title}</p>
			</aside>
		);
	}
}
class Selectors extends React.Component {
	_handleClick(e) {
		if (this.props.id !== this.props.activeID) {
			this.props._changeActive(this.props.id);
		} else {
			return;
		}
	}
	render() {
		return (
			<div className="selectors">
				{this.props.data.map((item) => (
					<Selector
						key={item.id}
						id={item.id}
						_handleClick={this._handleClick}
						_changeActive={this.props._changeActive}
						activeID={this.props.activeID}
					/>
				))}
			</div>
		);
	}
}
class Selector extends React.Component {
	render() {
		let componentClass = "selector";
		if (this.props.activeID === this.props.id) {
			componentClass = "selector active";
		}
		return <div className={componentClass} onClick={this.props._handleClick.bind(this)}></div>;
	}
}

export default Carousel;
