import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ArtistModal from "./ArtistModal";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import "./ArtistList.css";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import NavBar from "./NavBar";

const StyledArtistList = styled.ul`
	border: 0;
	list-style-type: none;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	word-wrap: break-word;
	text-align: center;
	font-size: 1.3em;

	@media (max-width: 1200px) {
		grid-template-columns: 1fr 1fr;
	}
	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;

class ArtistList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			artists: [],
			isModalOpen: false,
			currentArtistID: 0,
			currentArtistName: "",
			currentArtistDate: null,
			next: null,
			prev: null,
			searchField: "",
		};
		this.fetchNextPage = this.fetchNextPage.bind(this);
		this.fetchPrevPage = this.fetchPrevPage.bind(this);
		this.openModal = this.openModal.bind(this);
	}
	closeModal = () => {
		console.log("closing modal");
		this.setState({
			isModalOpen: false,
		});
	};

	onSearchChange = (event) => {
		this.setState({ searchField: event.target.value });
	};

	openModal = (id, name, date) => {
		console.log("opening modal");
		console.log(name, date);
		this.setState({
			isModalOpen: true,
			currentArtistID: id,
			currentArtistName: name,
			currentArtistDate: date,
		});
	};
	sortArtists() {}

	componentDidMount() {
		axios
			.get("https://api.harvardartmuseums.org/person?&size=60&apikey=912dd280-8897-11ea-953e-e1f9ff450a61&sort=objectcount&sortorder=desc")
			.then((response) => {
				console.log(response);
				this.setState({
					artists: response.data.records,
					next: response.data.info.next,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	fetchNextPage() {
		if (this.state.next) {
			console.log(this.state.next);

			axios
				.get(this.state.next)
				.then((res) => res.data)
				.then((response) =>
					this.setState({
						artists: [...this.state.artists, ...response.records],
						next: response.info.next,
						prev: response.info.prev,
					})
				);
		}
	}

	fetchPrevPage() {
		axios
			.get(this.state.prev)
			.then((res) => res.data)
			.then((response) =>
				this.setState({
					artists: response.records,
					next: response.info.next,
					prev: response.info.prev,
				})
			);
	}

	searchApiCall = () => {
		if (this.state.searchField.length >= 1) {
			this.setState({ artists: [], next: null });
			axios
				.get(
					`https://api.harvardartmuseums.org/person?&size=60&apikey=912dd280-8897-11ea-953e-e1f9ff450a61&sort=objectcount&sortorder=desc&q=displayname:${this.state.searchField}`
				)
				.then((res) => res.data)
				.then((data) => {
					this.setState({
						artists: data.records,
						next: null,
						prev: data.info.prev,
					});
				});
		} else {
			axios
				.get("https://api.harvardartmuseums.org/person?&size=60&apikey=912dd280-8897-11ea-953e-e1f9ff450a61&sort=objectcount&sortorder=desc")
				.then((response) => {
					console.log(response);
					this.setState({
						artists: response.data.records,
						next: response.data.info.next,
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	render() {
		return (
			<div>
				<NavBar />

				<Container>
					<h1>Artists</h1>

					<div className="artistSearch2">
						<input type="search" className="search artistSearch" placeholder="Search" onChange={this.onSearchChange}></input>
						<button onClick={this.searchApiCall} className="filtersButton nomargin">
							Search
						</button>
					</div>

					<Modal
						show={this.state.isModalOpen}
						onHide={this.closeModal}
						dialogClassName="modal-detail"
						aria-labelledby="artist-details"
						scrollable={true}
					>
						<ModalHeader closeButton>
							<ModalTitle id="artist-details">Artist Details</ModalTitle>
						</ModalHeader>
						<ModalBody fluid>
							<ArtistModal
								currentArtistID={this.state.currentArtistID}
								currentArtistName={this.state.currentArtistName}
								currentArtistDate={this.state.currentArtistDate}
							/>
						</ModalBody>
					</Modal>
					<Row className="ArtistList">
						<InfiniteScroll
							className="infinite-scroll"
							pageStart={0}
							loadMore={() => this.fetchNextPage()}
							hasMore={this.state.next != null ? true : false}
							loader={<Spinner animation="border"></Spinner>}
							threshold={1}
						>
							<StyledArtistList>
								{this.state.artists
									.sort((a, b) => a.alphasort && a.alphasort.localeCompare(b.alphasort))

									.map((artist) => {
										return (
											<li onClick={() => this.openModal(artist.id, artist.displayname, artist.displaydate)} key={artist.id}>
												{artist.displayname}
											</li>
										);
									})}
							</StyledArtistList>
						</InfiniteScroll>
					</Row>
				</Container>
			</div>
		);
	}
}

export default ArtistList;

// .filter((item) => {
// 	return (
// 	  this.state.searchField === "" ||
// 	  item.displayname
// 		.toLocaleLowerCase()
// 		.includes(this.state.searchField.toLocaleLowerCase())
// 	);
//   })
