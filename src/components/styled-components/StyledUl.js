import styled from "styled-components";

export const StyledUl = styled.ul`
	height: 250px;
	overflow: scroll;
	width: 100%;
	list-style-type: none;
	padding: 5px;
	margin: 0;
	margin-bottom: 30px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	background: #f5f5f5;

	@media (max-width: 1000px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
	@media (max-width: 750px) {
		grid-template-columns: 1fr 1fr;
	}

	overflow-x: hidden;
	&::-webkit-scrollbar {
		width: 0.3em;
	}
	&::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}
	&::-webkit-scrollbar-thumb {
		background-color: darkgrey;
		outline: 1px solid slategrey;
	}
`;
