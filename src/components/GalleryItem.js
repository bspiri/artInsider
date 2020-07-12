import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Tilt from "react-tilt";

const GalleryItem = (props) => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <Tilt
            className="Tilt"
            options={{ max: 20, speed: 500, transition: true }}
          >
            {" "}
            <Image
              onClick={() => props.showImage(props.image)}
              id="imageId"
              className="padded-image"
              src={props.url}
              fluid
            />
            <div className="imageDetails">
              <h5>{props.image.title}</h5>
              {/* <h6>{props.image.classification}</h6> */}
              <h6>
                {props.image.people !== undefined
                  ? props.image.people[0].name
                  : "Unknown Artist"}
              </h6>
            </div>
          </Tilt>
        </Col>
      </Row>
    </Container>
  );
};

export default GalleryItem;
