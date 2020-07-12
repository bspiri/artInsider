import React from "react";
import "./Carousel.css";
import Carousel from "./Carousel";
import NavBar from "./NavBar";

class Homepage extends React.Component {
	render() {
		return (
			<div className="homepage">
				<nav className="navigation">
					<NavBar />
				</nav>
				<Carousel data={data} />
			</div>
		);
	}
}
const data = [
	{
		id: 0,
		colour: "#7a4315",
		img: "https://i.imgur.com/U14xxzn.jpg",
		mobileImg: "https://i.imgur.com/nZIOfkW.jpg",
		artist: "Charles Bird King",
		title: "The Vanity of the Artist's Dream",
	},
	{
		id: 1,
		colour: "#734c30",
		img: "https://i.imgur.com/csx4i6x.jpg",
		mobileImg: "https://i.imgur.com/c5aHfAc.jpg",
		artist: "Joos van Cleve",
		title: "Saint Jerome in His Study",
	},
	{
		id: 2,
		colour: "#715c41",
		img: "https://i.imgur.com/diNQltJ.jpg",
		mobileImg: "https://i.imgur.com/CwqrD69.jpg",
		artist: "Albert Bierstadt",
		title: 'Rocky Mountains, "Lander\'s Peak"',
	},
	{
		id: 3,
		colour: "#67543c",
		img: "https://i.imgur.com/Oz0sXVO.jpg",
		mobileImg: "https://i.imgur.com/xkqGrDT.jpg",
		artist: "Hilaire-Germain-Edgar Degas",
		title: "The Rehearsal",
	},
	{
		id: 4,
		colour: "#57a75d",
		img: "https://i.imgur.com/R2M7gBK.jpg",
		mobileImg: "https://i.imgur.com/2kmJg0T.jpg",
		artist: "Vincent van Gogh",
		title: "Self-Portrait Dedicated to Paul Gauguin",
	},
];

export default Homepage;
