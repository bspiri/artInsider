import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import Masonry from "react-masonry-css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./mgal.css";
import GalleryItem from "./GalleryItem";
import InfiniteScroll from "react-infinite-scroller";
import { StyledUl } from "./styled-components/StyledUl";
import FilterItem from "./FilterItem";
import { categs } from "./resources/categs";
import { periods } from "./resources/periods";
import { technique } from "./resources/technique";
import { FilterToggleLink } from "./styled-components/FilterToggleLink";
import { FiltersWrapper } from "./styled-components/FiltersWrapper";
import Spinner from "react-bootstrap/Spinner";
import NavBar from "./NavBar";
import "./Gallery.css";

import FullImage from "./FullImage";

const StyledCol = styled(Col)`
	background-color: #ffffff;
	width: 100%;
`;

export default class MGal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			apikey: "221b4e10-7bc5-11ea-8865-8f439f2941d8",
			imagesList: [],
			prev: null,
			next: null,
			categories: categs,
			periods: periods,
			technique: technique,
			filter: null,
			breakpointsColumnsObj: {
				default: 3,
				1200: 2,
				992: 2,
				768: 1,
				576: 1,
			},

			imageDiv: false,
			currentImage: null,
			searchField: "",
			toggleFilters: false,
		};
		this.fetchNextImages = this.fetchNextImages.bind(this);
		this.fetchImages = this.fetchImages.bind(this);
		this.filterCall = this.filterCall.bind(this);
		this.showFilter = this.showFilter.bind(this);
	}
	fetchNextImages() {
		axios
			.get(this.state.next)
			.then((res) => res.data)
			.then((data) => {
				this.setState({
					imagesList: [...this.state.imagesList, ...data.records],
					next: data.info.next,
					prev: data.info.prev,
				});
			})
			.catch((err) => console.log(err));
	}

	onSearchChange = (event) => {
		this.setState({ searchField: event.target.value });
	};

	showImage = (image) => {
		this.setState({ imageDiv: !this.state.imageDiv, currentImage: image });
		setTimeout(() => {
			document.body.style.overflowY = this.state.imageDiv ? "hidden" : "scroll";
		}, 10);
	};

	fetchImages() {
		axios
			.get(this.state.next)
			.then((res) => res.data)
			.then((data) => {
				this.setState({
					imagesList: data.records,
					next: data.info.next,
					prev: data.info.prev,
				});
			});
	}

	filterCall(event, filter) {
		this.setState({ imagesList: [] });
		axios
			.get(`https://api.harvardartmuseums.org/object?size=20&page=1&apikey=${this.state.apikey}&${filter}=${event.target.innerText}&hasimage=1`)
			.then((res) => res.data)
			.then((data) =>
				this.setState({
					imagesList: data.records,
					next: data.info.next,
					prev: data.info.prev,
				})
			);
	}

	showFilter(filter) {
		switch (filter) {
			case "classification":
				return (
					<StyledUl>
						{this.state.categories.sort().map((e) => (
							<FilterItem name={e} function={(event) => this.filterCall(event, filter)}></FilterItem>
						))}{" "}
					</StyledUl>
				);
			case "period":
				return (
					<StyledUl>
						{this.state.periods.sort().map((e) => (
							<FilterItem name={e} function={(event) => this.filterCall(event, filter)}></FilterItem>
						))}{" "}
					</StyledUl>
				);

			case "technique":
				return (
					<StyledUl>
						{this.state.technique.sort().map((e) => (
							<FilterItem name={e} function={(event) => this.filterCall(event, filter)}></FilterItem>
						))}{" "}
					</StyledUl>
				);
			default:
				return null;
		}
	}

	componentDidMount() {
		axios
			.get(`https://api.harvardartmuseums.org/object/?size=20&page=1&apikey=${this.state.apikey}&sort=totalpageviews&sortorder=desc`)
			.then((res) => res.data)
			.then((data) => {
				this.setState({
					imagesList: data.records,
					next: data.info.next,
					prev: data.info.prev,
				});
			});
	}

	searchApiCall = () => {
		if (this.state.searchField.length >= 1) {
			this.setState({ imagesList: [], next: null });
			axios
				.get(`https://api.harvardartmuseums.org/object/?size=100&page=1&apikey=${this.state.apikey}&keyword=${this.state.searchField}`)
				.then((res) => res.data)
				.then((data) => {
					this.setState({
						imagesList: data.records,
						next: null,
						prev: data.info.prev,
					});
				});
		} else {
			axios
				.get(`https://api.harvardartmuseums.org/object/?size=20&page=1&apikey=${this.state.apikey}&sort=totalpageviews&sortorder=desc`)
				.then((res) => res.data)
				.then((data) => {
					this.setState({
						imagesList: data.records,
						next: data.info.next,
						prev: data.info.prev,
					});
				});
		}
	};

	render() {
		return (
			<div>
				<NavBar />
				<Container>
					<h1>Gallery</h1>
					{this.state.imageDiv && (
						<FullImage
							currentImage={this.state.currentImage.primaryimageurl}
							name={this.state.currentImage.people ? this.state.currentImage.people[0].name : null}
							title={this.state.currentImage.title}
							date={this.state.currentImage.dated}
							category={this.state.currentImage.classification}
							technique={this.state.currentImage.technique}
							culture={this.state.currentImage.culture}
							showImage={this.showImage}
						/>
					)}
					<Row>
						{" "}
						<StyledCol>
							<div className="searchButton flexWrap">
								<input type="search" className="search" placeholder="Search by title" onChange={this.onSearchChange}></input>

								<button onClick={this.searchApiCall} className="filtersButton">
									Search
								</button>

								<button
									id="advancedButton"
									onClick={() => this.setState({ toggleFilters: !this.state.toggleFilters })}
									className="filtersButton"
								>
									Advanced
								</button>
							</div>
							{this.state.toggleFilters && (
								<>
									<FiltersWrapper>
										<FilterToggleLink
											onClick={() =>
												this.state.filter !== "classification"
													? this.setState({ filter: "classification" })
													: this.setState({ filter: null })
											}
										>
											Classification
										</FilterToggleLink>

										<FilterToggleLink
											onClick={() =>
												this.state.filter !== "period" ? this.setState({ filter: "period" }) : this.setState({ filter: null })
											}
										>
											Period
										</FilterToggleLink>
										<FilterToggleLink
											onClick={() =>
												this.state.filter !== "technique" ? this.setState({ filter: "technique" }) : this.setState({ filter: null })
											}
										>
											Technique
										</FilterToggleLink>
									</FiltersWrapper>
									{this.showFilter(this.state.filter)}
								</>
							)}
						</StyledCol>
						<StyledCol md={12}>
							<InfiniteScroll
								className="infinite-scroll-gallery"
								pageStart={0}
								loadMore={() => this.fetchNextImages()}
								hasMore={this.state.next != null ? true : false}
								loader={<Spinner animation="border" className="spinner2" />}
							>
								<Masonry
									breakpointCols={this.state.breakpointsColumnsObj}
									className="my-masonry-grid"
									columnClassName="my-masonry-grid_column"
								>
									{this.state.imagesList.map((record) =>
										record.images && record.images.length > 0 ? (
											<GalleryItem showImage={this.showImage} image={record} url={record.primaryimageurl}></GalleryItem>
										) : null
									)}
								</Masonry>
							</InfiniteScroll>
						</StyledCol>
					</Row>
				</Container>
			</div>
		);
	}
}

// .filter((item) => {
// 	return (
// 		this.state.searchField === "" ||
// 		item.title.toLocaleLowerCase().includes(this.state.searchField.toLocaleLowerCase())
// 	);
// })
