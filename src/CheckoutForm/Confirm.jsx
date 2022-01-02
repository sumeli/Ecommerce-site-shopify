import React from "react";
import { Link } from "react-router-dom";
import pic from "./confirm.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Confirm = () => {
    const main = {
        position: "relative",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        overflow: "hidden",
    };

    const btn = {
        backgroundColor: "#F9D371",
        color: "black",
        borderRadius: "15px",
        borderColor: "black"
    };

    return (
        <div
            style={{
                backgroundColor: "#fff",
                minHeight: "100vh",
                height: "100%",
                overflow: "hidden",
            }}
        >
            <Container style={main}>
                <Row
                    className="text-center"
                    style={{
                        alignItems: "center",
                        paddingTop: "20px",
                        paddingBottom: "50px",
                    }}
                >
                    <Col md={6}>
                        <img
                            src={pic}
                            className="img-fluid"
                            alt="main img"
                            style={{ justifyContent: "center", padding: "40px" }}
                        />
                    </Col>
                    <Col md={6}>
                        <h2 style={{ color: "black" }}> Your Order is Confirmed !</h2>
                        <h5
                            style={{
                                color: "black",
                                textAlign: "justify",
                                paddingTop: "20px",
                            }}
                        >
                           Thank you for purchasing. Hope to see you soon. Enjoy shopping 🛒🛍️!
                        </h5>
                        <Button variant="primary"
                            style={btn}
                            as={Link} to="/"
                            className="button">
                            Go Back
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Confirm;
