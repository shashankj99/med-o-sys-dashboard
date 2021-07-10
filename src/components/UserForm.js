import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { use_form_fields } from '../helpers/form.hook';
import { clear_city_response, get_all_cities_action } from '../store/actions/location/city.action';
import { clear_district_response, get_all_districts_action } from '../store/actions/location/district.action';
import { ClearAuthState, RegisterAction } from '../store/actions/user/auth.action';
import { clear_province_state, get_all_province_action } from '../store/actions/location/province.action';
import { Col, Row, Form, Button, Card, Container, Image } from '@themesberg/react-bootstrap';
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import { useDropzone } from "react-dropzone";
import { update_user_details_by_access_token_action } from '../store/actions/user/user.action';

const validationErrors = [],
    bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    genders = ['male', 'female', 'others'];

let totalWards = [],
    isDisabled = false;

/**
 * Function to change the date format
 * @param date
 * @returns {string}
 */
 function change_date_format(date) {
    const dateArray = date.split("-");
    return (dateArray.length > 1) 
        ? `${dateArray[0]}/${dateArray[1]}/${dateArray[2]}`
        : dateArray[0];
}

/**
 * Function to calculate age from date of birth
 * @param dob
 * @returns {number}
 */
function calculate_age(dob) {
    const dateOfBirth = new Date(dob);
    const monthDifference = Date.now() - dateOfBirth.getTime();
    const agedDt = new Date(monthDifference);
    const year = agedDt.getUTCFullYear();
    return Math.abs(year - 1970);
}

function get_wards(totalWards, fields) {
    return totalWards.map(wardNo =>
        <option 
            key={`ward-${wardNo}`} 
            value={wardNo}
            defaultValue={
                (fields.ward_no === wardNo) 
                    ? true 
                    : false
            }
        >
            {wardNo}
        </option>
    );
}

export default function UserForm({ fieldsState, provinceId, districtId, type, imgCaption, props }) {
    const [fields, handleFieldChange] = use_form_fields(fieldsState);
    const [files, setFiles] = React.useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ClearAuthState());
        dispatch(clear_city_response());
        dispatch(clear_district_response());
        dispatch(get_all_province_action());

        if (provinceId)
            dispatch(get_all_districts_action(provinceId));

        if (districtId)
            dispatch(get_all_cities_action(districtId))

        return () => {
            dispatch(clear_province_state);

            if (provinceId)
                dispatch(clear_district_response());

            if (districtId)
                dispatch(clear_city_response())
        }
    }, [dispatch, provinceId, districtId]);

    let userAuthResponse = useSelector(state => state.auth.userAuthResponse),
        provinceResponse = useSelector(state => state.province.provinceResponse),
        districtResponse = useSelector(state => state.district.districtResponse),
        cityResponse = useSelector(state => state.city.cityResponse);

    // generate the list of provinces
    const get_provinces = () => {
        if (Array.isArray(provinceResponse))
            return provinceResponse.map(province =>
                <option 
                    key={province.slug} 
                    value={province.id}
                    defaultValue={
                        (fields.province_id === province.id) 
                            ? true 
                            : false
                    }
                >
                    {province.name} ( {province.nep_name} )
                </option>
            );
    }

    // get all districts from the district API after province is selected
    const fetch_districts = (e) => {
        const provinceId = e.target.value;

        dispatch(get_all_districts_action(provinceId));

        handleFieldChange(e);
    }

    // generate the list of districts
    const get_districts = () => {
        if (Array.isArray(districtResponse))
            return districtResponse.map(district =>
                <option 
                    key={district.slug} 
                    value={district.id}
                    defaultValue={
                        (fields.district_id === district.id) 
                            ? true 
                            : false
                    }
                >
                    {district.name} ( {district.nep_name} )
                </option>
            );
    }

    // get all cities from the city API
    const fetch_cities = (e) => {
        const districtId = e.target.value;

        dispatch(get_all_cities_action(districtId));

        handleFieldChange(e);
    }

    // dynamically append city once district is selected
    const get_cities = () => {
        if (Array.isArray(cityResponse))
            return cityResponse.map(city =>
                <option 
                    key={city.slug} 
                    value={city.id}
                    defaultValue={
                        (fields.city_id === city.id) 
                            ? true 
                            : false
                    }
                >
                    {city.name} ( {city.nep_name} )
                </option>
            );
    }

    // get ward numbers from the city
    const set_total_ward_no = (e) => {
        const cityId = e.target.value;
        cityResponse.forEach(city => {
            if (city.id === cityId) {
                for (let i = 1; i <= city.total_ward_no; i++)
                    totalWards.push(i);
            }
        });

        handleFieldChange(e);
    }

    // append ward number once city is selcted
    const get_wards_dynamic = () => {
        if (fields.wardNo !== 0) {
            for (let i = 1; i <= fieldsState.ward_no; i++)
                totalWards.push(i);

            return get_wards(totalWards, fieldsState);
            
        }else if (totalWards.length > 0) {
            return get_wards(totalWards, fieldsState);
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (files) => {

            setFiles(files.map(file => ({
                ...files,
                preview: URL.createObjectURL(file)
            })));

            const reader = new FileReader();
            const file = files[0];
            reader.onloadend = () => {
                fields.img = reader.result;
            }
            reader.readAsDataURL(file);
        }
    });

    const DropzoneFile = (props) => {
        const { path, preview } = props;

        return (
            <Col xs={3} className="dropzone-preview">
            <Image src={preview} className="dropzone-image" />
            <Card.Text className="dropzone-filename">
                {path}
            </Card.Text>
            </Col>
        );
    };

    // function that calls the register API
    const handle_user_create_or_update = (e) => {
        isDisabled = true;
        e.preventDefault();

        if (fields.password !== fields.password_confirmation) {
            alert('Your password didn\'t match.');
            isDisabled = false;
        } else {
            fields.dob_ad = change_date_format(fields.dob_ad);
            fields.age = calculate_age(fields.dob_ad);

            if (type === "create") {
                dispatch(RegisterAction(fields));
            } else if (type === "update") {
                dispatch(update_user_details_by_access_token_action(fields));
            }
        }
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
            if (userAuthResponse.status === 200) {
                if (type === "create")
                    alert("create");
                    // props.history.push('/mobile/verify');
                else if (type === "update")
                    alert("update");
                    // window.location.reload();
            }
            dispatch(ClearAuthState());
        }
    }

    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5">
                                <div className="mb-4 mt-md-0">
                                    <Form className="mt-4" onSubmit={handle_user_create_or_update}>
                                        <Row>
                                            <Col md={3} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="text" 
                                                        placeholder="Your first name"
                                                        id="first_name"
                                                        value={fields.first_name}
                                                        onChange={handleFieldChange}
                                                        isInvalid={
                                                            validationErrors.first_name
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {
                                                        validationErrors.first_name
                                                            ? <Form.Control.Feedback type="invalid">{validationErrors.first_name[0]}</Form.Control.Feedback>
                                                            : ''
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={3} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Middle Name</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Your middle name"
                                                        id="middle_name"
                                                        value={fields.middle_name}
                                                        onChange={handleFieldChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={3} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="text" 
                                                        placeholder="Your last name"
                                                        id="last_name"
                                                        value={fields.last_name}
                                                        onChange={handleFieldChange}
                                                        isInvalid={
                                                            validationErrors.last_name
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {
                                                        validationErrors.last_name
                                                            ? <Form.Control.Feedback type="invalid">{validationErrors.last_name[0]}</Form.Control.Feedback>
                                                            : ''
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={3} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Nepali Name</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="तपाईको पूरा नाम नेपालीमा लेख्नुहोस्"
                                                        id="nep_name"
                                                        value={fields.nep_name}
                                                        onChange={handleFieldChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={3} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Province</Form.Label>
                                                    <Form.Select
                                                        required
                                                        id="province_id"
                                                        value={fields.province_id}
                                                        onChange={fetch_districts}
                                                        isInvalid={
                                                            validationErrors.province_id
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <option value="">Select your province</option>
                                                        {get_provinces()}
                                                    </Form.Select>
                                                    {
                                                        validationErrors.province_id
                                                            ? <Form.Control.Feedback type="invalid">{validationErrors.province_id[0]}</Form.Control.Feedback>
                                                            : ''
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={3} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>District</Form.Label>
                                                    <Form.Select
                                                        required
                                                        id="district_id"
                                                        value={fields.district_id}
                                                        onChange={fetch_cities}
                                                        isInvalid={
                                                            validationErrors.district_id
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <option value="">Select your district</option>
                                                        {get_districts()}
                                                    </Form.Select>
                                                    {
                                                        validationErrors.district_id
                                                            ? <Form.Control.Feedback type="invalid">{validationErrors.district_id[0]}</Form.Control.Feedback>
                                                            : ''
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={3} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>City</Form.Label>
                                                    <Form.Select
                                                        required
                                                        id="city_id"
                                                        value={fields.city_id}
                                                        onChange={set_total_ward_no}
                                                        isInvalid={
                                                            validationErrors.city_id
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <option value="">Select your city</option>
                                                        {get_cities()}
                                                    </Form.Select>
                                                    {
                                                        validationErrors.city_id
                                                            ? <Form.Control.Feedback type="invalid">{validationErrors.city_id[0]}</Form.Control.Feedback>
                                                            : ''
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={3} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Ward Number</Form.Label>
                                                    <Form.Select
                                                        required
                                                        id="ward_no"
                                                        value={fields.ward_no}
                                                        onChange={handleFieldChange}
                                                        isInvalid={
                                                            validationErrors.ward_no
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <option value="">Select your ward_no</option>
                                                        {get_wards_dynamic()}
                                                    </Form.Select>
                                                    {
                                                        validationErrors.ward_no
                                                            ? <Form.Control.Feedback type="invalid">{validationErrors.ward_no[0]}</Form.Control.Feedback>
                                                            : ''
                                                    }
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={3} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Birthday</Form.Label>
                                                    <Calendar type="text"
                                                        className={
                                                            validationErrors.dob_bs
                                                                ? `form-control is-invalid`
                                                                : `form-control`
                                                        }
                                                        id="dob_bs"
                                                        theme="deepdark"
                                                        required={true}
                                                        value={fields.dob_bs}
                                                        onChange={handleFieldChange}
                                                        dateFormat="YYYY/MM/DD" 
                                                        language="en"
                                                        defaultDate={fields.dob_bs}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={3} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Gender</Form.Label>
                                                    <Form.Select
                                                        required
                                                        id="gender"
                                                        value={fields.gender}
                                                        onChange={handleFieldChange}
                                                        isInvalid={
                                                            validationErrors.gender
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <option value="">Select your Gender</option>
                                                        {
                                                            genders.map(gender =>
                                                                <option 
                                                                    key={gender} 
                                                                    value={gender}
                                                                    defaultValue={
                                                                        (fields.gender === gender)
                                                                            ? true
                                                                            : false
                                                                    }
                                                                >
                                                                    {gender}
                                                                </option>
                                                            )
                                                        }
                                                    </Form.Select>
                                                    {
                                                        validationErrors.blood_group
                                                            ? <Form.Control.Feedback type="invalid">{validationErrors.blood_group[0]}</Form.Control.Feedback>
                                                            : ''
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={3} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Blood Group</Form.Label>
                                                    <Form.Select
                                                        required
                                                        id="blood_group"
                                                        value={fields.blood_group}
                                                        onChange={handleFieldChange}
                                                        isInvalid={
                                                            validationErrors.blood_group
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <option value="">Select your Blood group</option>
                                                        {
                                                            bloodGroups.map(bloodGroup =>
                                                                <option 
                                                                    key={bloodGroup} 
                                                                    value={bloodGroup}
                                                                    defaultValye = {
                                                                        (fields.blood_group === bloodGroup)
                                                                            ? true
                                                                            : false
                                                                    }
                                                                >
                                                                    {bloodGroup}
                                                                </option>
                                                            )
                                                        }
                                                    </Form.Select>
                                                    {
                                                        validationErrors.blood_group
                                                            ? <Form.Control.Feedback type="invalid">{validationErrors.blood_group[0]}</Form.Control.Feedback>
                                                            : ''
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={3} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Mobile Number</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="text" 
                                                        placeholder="Your mobile number"
                                                        id="mobile"
                                                        value={fields.mobile}
                                                        onChange={handleFieldChange}
                                                        isInvalid={
                                                            validationErrors.mobile
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {
                                                        validationErrors.mobile
                                                            ? <Form.Control.Feedback type="invalid">{validationErrors.mobile[0]}</Form.Control.Feedback>
                                                            : ''
                                                    }
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={3} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Email Address</Form.Label>
                                                    <Form.Control 
                                                        required
                                                        type="email" 
                                                        placeholder="Your email address"
                                                        id="email"
                                                        value={fields.email}
                                                        onChange={handleFieldChange}
                                                        isInvalid={
                                                            validationErrors.email
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {
                                                        validationErrors.email
                                                            ? <Form.Control.Feedback type="invalid">{validationErrors.email[0]}</Form.Control.Feedback>
                                                            : ''
                                                    }
                                                </Form.Group>
                                            </Col>
                                            <Col md={3} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control 
                                                        required={
                                                            type === "create"
                                                                ? true
                                                                : false
                                                        }
                                                        type="password" 
                                                        placeholder="Your password"
                                                        id="password"
                                                        value={fields.password}
                                                        onChange={handleFieldChange}
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
                                                </Form.Group>
                                            </Col>
                                            <Col md={3} xs={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control 
                                                        required={
                                                            type === "create"
                                                                ? true
                                                                : false
                                                        }
                                                        type="password" 
                                                        placeholder="Confirm your password"
                                                        id="password_confirmation"
                                                        value={fields.password_confirmation}
                                                        onChange={handleFieldChange}
                                                        isInvalid={
                                                            validationErrors.password_confirmation
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {
                                                        validationErrors.password_confirmation
                                                            ? <Form.Control.Feedback type="invalid">{validationErrors.password_confirmation[0]}</Form.Control.Feedback>
                                                            : ''
                                                    }
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col xs={12}>
                                                <div {...getRootProps()}>
                                                    <Form.Control {...getInputProps() } />
                                                    {/* <div style={{cursor: 'pointer'}}>
                                                        <p>Click here to upload avatar image</p>
                                                    </div> */}
                                                    <Button variant="secondary" type="button">
                                                        {imgCaption}
                                                    </Button>
                                                    <Row className="dropzone-files">
                                                        {
                                                            files.map(file => <DropzoneFile key={file.path} {...file} />)
                                                        }
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={4} xs={12} />
                                            <Col md={4} xs={12}>
                                                <Button variant="primary" type="submit" className="w-100" disabled={isDisabled}>
                                                    {type === "create" ? "Register" : "Update"}
                                                </Button>
                                            </Col>
                                            <Col md={4} xs={12} />
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
}
