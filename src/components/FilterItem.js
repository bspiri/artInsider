import React from "react";
import styled from "styled-components";

const StyledLi = styled.li`
	font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
	padding: 5px;
	color: #353535;
	list-style-type: none;
	margin-left: 60px;

	&:hover {
		cursor: pointer;
		color: #7c7c7c;
	}

	@media (max-width: 750px) {
		margin-left: 10px;
	}
`;

export default function FilterItem(props) {
	return <StyledLi onClick={props.function}>{props.name}</StyledLi>;
}
