import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import {use_form_fields} from "../../helpers/form.hook";
import {useDispatch, useSelector} from "react-redux";
import {ClearAuthState, login_action} from "../../store/actions/user/auth.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Card, Container, InputGroup } from '@themesberg/react-bootstrap';

let isDisabled = false,
    validationErrors = [];

export default function Login(props) {
    // form hook
    const [fields, handleFieldChange] = use_form_fields({
        username: '',
        password: ''
    });

    const dispatch = useDispatch();

    // dispatch action when page loads... only once
    useEffect(() => {
        dispatch(ClearAuthState());
    }, [dispatch]);

    // auth response from reducer
    let userAuthResponse = useSelector(state => state.auth.userAuthResponse);

    // function to call on form submit
    const login_user = (e) => {
        isDisabled = true;
        e.preventDefault();

        dispatch(login_action(fields));
    }

    // responses
    if (userAuthResponse.hasOwnProperty('status')) {
        if (userAuthResponse.status === 422) {
            isDisabled = false;
            for (const [key, value] of Object.entries(userAuthResponse.errors)) {
                validationErrors[key] = value;
            }
        } else {
            isDisabled = false;
            dispatch(ClearAuthState());
            if (userAuthResponse.status === 200) {
                localStorage.setItem('access_token', `Bearer ${userAuthResponse.access_token}`);
                localStorage.setItem('roles', JSON.stringify(userAuthResponse.roles));
                props.history.push('/');
            }
            else {
                alert(userAuthResponse.message);
            }
        }
    }

    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h5 className="mb-0">Sign in to start your session</h5>
                                </div>

                                <Form className="mt-4" onSubmit={login_user}>
                                    <Form.Group id="email" className="mb-4">
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputGroup.Text >
                                            <Form.Control
                                                required
                                                type="text" 
                                                placeholder="email or mobile number"
                                                id="username"
                                                value={fields.username}
                                                onChange={handleFieldChange}
                                                isInvalid={
                                                    validationErrors.username
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {
                                                validationErrors.username
                                                    ? <Form.Control.Feedback type="invalid">{validationErrors.username[0]}</Form.Control.Feedback>
                                                    : ''
                                            }
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="email" className="mb-4">
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt} />
                                            </InputGroup.Text>
                                            <Form.Control 
                                                required 
                                                type="password" 
                                                placeholder="password"
                                                id="password"
                                                value = {fields.password}
                                                onChange = {handleFieldChange}
                                                isInvalid={
                                                    validationErrors.password
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {
                                                validationErrors.password
                                                    ? <Form.Control.Feedback type="invalid">{validationErrors.password[0]}</Form.Control.Feedback>
                                                    : ''
                                            }
                                        </InputGroup>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100" disabled={isDisabled}>
                                        Sign in
                                    </Button>
                                </Form>

                                <div className="d-flex justify-content-center align-items-center mt-4">
                                    <span className="fw-normal">
                                        Not registered?
                                        <Card.Link as={Link} to="/register" className="fw-bold">
                                            {` Register `}
                                        </Card.Link>
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
}
