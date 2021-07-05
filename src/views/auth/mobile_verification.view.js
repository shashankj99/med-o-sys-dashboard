import React, {useEffect} from "react";
import {use_form_fields} from "../../helpers/form.hook";
import {useDispatch, useSelector} from "react-redux";
import {ClearAuthState, verify_otp_action} from "../../store/actions/user/auth.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup } from '@themesberg/react-bootstrap';

let isDisabled = false,
    validationErrors = [];

export default function MobileVerification(props) {
    const [fields, handleFieldChange] = use_form_fields({
        otp: ''
    });

    const dispatch = useDispatch();

    // dispatch action when page loads... only once
    useEffect(() => {
        dispatch(ClearAuthState());
    }, [dispatch]);

    // get auth response
    let userAuthResponse = useSelector(state => state.auth.userAuthResponse);

    // function that calls the verification API
    const verify_otp = (e) => {
        isDisabled = true;
        e.preventDefault();

        dispatch(verify_otp_action(fields));
    }

    // errors
    if (userAuthResponse.hasOwnProperty('status')) {
        if (userAuthResponse.status === 422) {
            for (const [key, value] of Object.entries(userAuthResponse.errors)) {
                validationErrors[key] = value;
            }
            isDisabled = false;
        } else {
            isDisabled = false;
            alert(userAuthResponse.message);
            dispatch(ClearAuthState());
            if (userAuthResponse.status === 200)
                props.history.push('/login');
            else
                window.location.reload();
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
                                    <h3 className="mb-0">Enter the verification code</h3>
                                </div>

                                <Form className="mt-4" onSubmit={verify_otp}>
                                    <Form.Group id="email" className="mb-4">
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faShieldAlt} />
                                            </InputGroup.Text >
                                            <Form.Control
                                                required
                                                type="text" 
                                                placeholder="xxxxxx"
                                                id="otp"
                                                value={fields.otp}
                                                onChange={handleFieldChange}
                                                isInvalid={
                                                    validationErrors.otp
                                                        ? true
                                                        : false
                                                }
                                            />
                                            {
                                                validationErrors.otp
                                                    ? <Form.Control.Feedback type="invalid">{validationErrors.otp[0]}</Form.Control.Feedback>
                                                    : ''
                                            }
                                        </InputGroup>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100" disabled={isDisabled}>
                                        Verify
                                    </Button>
                                </Form>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
}