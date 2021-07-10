import React from "react";
import Routes from "./routes";
import {BrowserRouter} from "react-router-dom";
import { Container, Row, Col } from "@themesberg/react-bootstrap";
import {Online, Offline} from 'react-detect-offline';

function App() {
    return (
        <>
            <Online>
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </Online>
            
            <Offline>
                <main>
                    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                        <Container>
                            <Row className="justify-content-center">
                                <Col xs={12} className="d-flex align-items-center justify-content-center">
                                    <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                        <div className="text-center text-md-center mb-4 mt-md-0">
                                            <h3 className="mb-0">Service Unavailable... It may have occured due to lack of internet connectivity</h3>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </main>
            </Offline>
        </>
    );
}

export default App;
