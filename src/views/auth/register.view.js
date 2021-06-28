import React, {useEffect} from "react";
import {use_form_fields} from "../../helpers/form.hook";
import {useDispatch, useSelector} from "react-redux";
import {RegisterAction, ClearAuthState} from "../../store/actions/user/auth.action";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import {get_all_province_action, clear_province_state} from "../../store/actions/location/province.action";
import {get_all_districts_action, clear_district_response} from "../../store/actions/location/district.action";
import {clear_city_response, get_all_cities_action} from "../../store/actions/location/city.action";

const validationErrors = [],
    bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

let isDisabled = false,
    totalWardNo = [];

/**
 * Function to change the date format
 * @param date
 * @returns {string}
 */
function change_date_format(date) {
    const dateArray = date.split("-");
    return `${dateArray[0]}/${dateArray[1]}/${dateArray[2]}`;
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

export default function Register(props) {
    // Form hook
    const [fields, handleFieldChange] = use_form_fields({
        first_name: '',
        middle_name: '',
        last_name: '',
        nep_name: '',
        province: '',
        district: '',
        city: '',
        ward_no: '',
        dob_ad: '',
        dob_bs: '',
        age: 0,
        blood_group: '',
        mobile: '',
        email: '',
        password: '',
        password_confirmation: '',
        img_file: {},
        img: ''
    });

    const dispatch = useDispatch();

    // dispatch action when page loads... only once
    useEffect(() => {
        dispatch(ClearAuthState());
        dispatch(clear_district_response());
        dispatch(clear_city_response());
        dispatch(get_all_province_action());
        return () => {
            dispatch(clear_province_state());
        }
    }, []);

    // get responses from reducers
    let userAuthResponse = useSelector(state => state.auth.userAuthResponse),
        provinceResponse = useSelector(state => state.province.provinceResponse),
        districtResponse = useSelector(state => state.district.districtResponse),
        cityResponse = useSelector(state => state.city.cityResponse);

    // dynamically generate the list of provinces
    const get_provinces = () => {
        if (Array.isArray(provinceResponse))
            return provinceResponse.map(province =>
                <option key={province.id} value={province.slug}>{province.name} ( {province.nep_name} )</option>
            );
    }

    // get all districts from the district API
    const fetch_districts = (e) => {
        const provinceValue = e.target.value;
        let provinceId = 0;
        provinceResponse.forEach(province => {
            if (province.slug === provinceValue)
                provinceId = province.id;
        });

        dispatch(get_all_districts_action(provinceId));

        handleFieldChange(e);

    }

    // dynamically append district once province is selected
    const get_districts = () => {
        if (Array.isArray(districtResponse))
            return districtResponse.map(district =>
                <option key={district.id} value={district.slug}>{district.name} ( {district.nep_name} )</option>
            );
    }

    // get all cities from the city API
    const fetch_cities = (e) => {
        const districtValue = e.target.value;
        let districtId = 0;
        districtResponse.forEach(district => {
            if (district.slug === districtValue)
                districtId = district.id;
        })

        dispatch(get_all_cities_action(districtId));

        handleFieldChange(e);
    }

    // dynamically append city once district is selected
    const get_cities = () => {
        if (Array.isArray(cityResponse))
            return cityResponse.map(city =>
                <option key={city.id} value={city.slug}>{city.name} ( {city.nep_name} )</option>
            );
    }

    // get ward numbers from the city
    const set_total_ward_no = (e) => {
        const cityValue = e.target.value;
        cityResponse.forEach(city => {
            if (city.slug === cityValue) {
                for (let i = 1; i <= city.total_ward_no; i++)
                    totalWardNo.push(i);
            }
        });

        handleFieldChange(e);
    }

    // append ward number once city is selcted
    const get_wards = () => {
        if (totalWardNo.length > 0) {
            return totalWardNo.map(wardNo =>
                <option key={wardNo} value={wardNo}>{wardNo}</option>
            );
        }
    }

    // convert image to base64 string
    const handle_image_upload = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            fields.img = reader.result;
        }
        reader.readAsDataURL(file);
    }

    // function that calls the register API
    const register_user = (e) => {
        isDisabled = true;
        e.preventDefault();

        if (fields.password !== fields.password_confirmation) {
            alert('Your password didn\'t match.');
            isDisabled = false;
        } else {
            fields.dob_ad = change_date_format(fields.dob_ad);
            fields.age = calculate_age(fields.dob_ad);

            dispatch(RegisterAction(fields));
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
            dispatch(ClearAuthState());
            if (userAuthResponse.status === 200)
                props.history.push('/mobile/verify');
        }
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12">
                    <p className="login-box-msg">
                        Register a new user ( नयाँ प्रयोगकर्ता दर्ता गर्नुहोस् )
                    </p>
                    <hr/>

                    <h5 className="login-box-msg text-lightblue">General Information</h5>

                    <form onSubmit={register_user} method="post">
                        <div className="row">
                            <div className="col-md-3 col-12 mb-2">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={
                                            validationErrors.first_name
                                                ? `form-control is-invalid`
                                                : `form-control`
                                        }
                                        id="first_name"
                                        placeholder="Enter your first name"
                                        required={true}
                                        value={fields.first_name}
                                        onChange={handleFieldChange}
                                    />
                                    {
                                        validationErrors.first_name
                                            ? <span
                                                className="error invalid-feedback">{validationErrors.first_name[0]}</span>
                                            : ``
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 col-12 mb-2">
                                <div className="form-group">
                                    <input type="text"
                                           className="form-control"
                                           id="middle_name"
                                           placeholder="Enter your middle name"
                                           value={fields.middle_name}
                                           onChange={handleFieldChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-12 mb-2">
                                <div className="form-group">
                                    <input type="text"
                                           className={
                                               validationErrors.last_name
                                                   ? `form-control is-invalid`
                                                   : `form-control`
                                           }
                                           id="last_name"
                                           placeholder="Enter your last name"
                                           required={true}
                                           value={fields.last_name}
                                           onChange={handleFieldChange}
                                    />
                                    {
                                        validationErrors.last_name
                                            ? <span
                                                className="error invalid-feedback">{validationErrors.last_name[0]}</span>
                                            : ``
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 col-12 mb-2">
                                <div className="form-group">
                                    <input type="text"
                                           className="form-control"
                                           id="nep_name"
                                           placeholder="तपाईको पूरा नाम नेपालीमा लेख्नुहोस्"
                                           value={fields.nep_name}
                                           onChange={handleFieldChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 col-12 mb-2">
                                <div className="form-group">
                                    <select className={
                                        validationErrors.province
                                            ? `custom-select border-width-2 is-invalid`
                                            : `custom-select border-width-2`
                                    }
                                            id="province"
                                            required={true}
                                            value={fields.province}
                                            onChange={fetch_districts}
                                    >
                                        <option value="">Select your province</option>
                                        {get_provinces()}
                                    </select>
                                    {
                                        validationErrors.province
                                            ? <span
                                                className="error invalid-feedback">{validationErrors.province[0]}</span>
                                            : ``
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 col-12 mb-2">
                                <div className="form-group">
                                    <select className={
                                        validationErrors.district
                                            ? `custom-select border-width-2 is-invalid`
                                            : `custom-select border-width-2`
                                    }
                                            id="district"
                                            required={true}
                                            value={fields.district}
                                            onChange={fetch_cities}
                                    >
                                        <option value="">Select your district</option>
                                        {get_districts()}
                                    </select>
                                </div>
                                {
                                    validationErrors.district
                                        ? <span className="error invalid-feedback">{validationErrors.district[0]}</span>
                                        : ``
                                }
                            </div>
                            <div className="col-md-3 col-12 mb-2">
                                <div className="form-group">
                                    <select className={
                                        validationErrors.city
                                            ? `custom-select border-width-2 is-invalid`
                                            : `custom-select border-width-2`
                                    }
                                            id="city"
                                            required={true}
                                            value={fields.city}
                                            onChange={set_total_ward_no}
                                    >
                                        <option value="">Select your city</option>
                                        {get_cities()}
                                    </select>
                                </div>
                                {
                                    validationErrors.city
                                        ? <span className="error invalid-feedback">{validationErrors.city[0]}</span>
                                        : ``
                                }
                            </div>
                            <div className="col-md-3 col-12 mb-2">
                                <div className="form-group">
                                    <select className={
                                        validationErrors.ward_no
                                            ? `custom-select border-width-2 is-invalid`
                                            : `custom-select border-width-2`
                                    }
                                            id="ward_no"
                                            required={true}
                                            value={fields.ward_no}
                                            onChange={handleFieldChange}
                                    >
                                        <option value="">Select your ward number</option>
                                        {get_wards()}
                                    </select>
                                    {
                                        validationErrors.ward_no
                                            ? <span
                                                className="error invalid-feedback">{validationErrors.ward_no[0]}</span>
                                            : ``
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="mt-2 col-md-3 col-12 mb-2 text-right">
                                <span className="text-muted">
                                    <i>
                                        Select your date of birth
                                    </i>
                                </span>
                            </div>
                            <div className="col-md-3 col-12 mb-2">
                                <div className="form-group">
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
                                              dateFormat="YYYY/MM/DD" language="en"
                                    />
                                </div>
                                {
                                    validationErrors.dob_bs
                                        ? <span className="error invalid-feedback">{validationErrors.dob_bs[0]}</span>
                                        : ``
                                }
                            </div>
                            <div className="col-md-3 col-12 mb-2">
                                <select className={
                                    validationErrors.blood_group
                                        ? `custom-select border-width-2 is-invalid`
                                        : `custom-select border-width-2`
                                }
                                        id="blood_group"
                                        required={true}
                                        value={fields.blood_group}
                                        onChange={handleFieldChange}
                                >
                                    <option value="">Select your Blood group</option>
                                    {
                                        bloodGroups.map(bloodGroup =>
                                            <option key={bloodGroup} value={bloodGroup}>{bloodGroup}</option>
                                        )
                                    }
                                </select>
                                {
                                    validationErrors.blood_group
                                        ? <span
                                            className="error invalid-feedback">{validationErrors.blood_group[0]}</span>
                                        : ``
                                }
                            </div>
                        </div>

                        <h5 className="login-box-msg text-lightblue mt-2">Credential Information</h5>

                        <div className="row">
                            <div className="col-md-3 col-12 mb-2">
                                <div className="form-group">
                                    <input type="text"
                                           className={
                                               validationErrors.mobile
                                                   ? `form-control is-invalid`
                                                   : `form-control`
                                           }
                                           id="mobile"
                                           placeholder="Enter your mobile no"
                                           required={true}
                                           value={fields.mobile}
                                           onChange={handleFieldChange}
                                    />
                                    {
                                        validationErrors.mobile
                                            ?
                                            <span className="error invalid-feedback">{validationErrors.mobile[0]}</span>
                                            : ``
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 col-12 mb-2">
                                <div className="form-group">
                                    <input type="email"
                                           className={
                                               validationErrors.email
                                                   ? `form-control is-invalid`
                                                   : `form-control`
                                           }
                                           id="email"
                                           placeholder="Enter your email address"
                                           required={true}
                                           value={fields.email}
                                           onChange={handleFieldChange}
                                    />
                                    {
                                        validationErrors.email
                                            ?
                                            <span className="error invalid-feedback">{validationErrors.email[0]}</span>
                                            : ``
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 col-12 mb-2">
                                <div className="form-group">
                                    <input type="password"
                                           className={
                                               validationErrors.password
                                                   ? `form-control is-invalid`
                                                   : `form-control`
                                           }
                                           id="password"
                                           placeholder="Enter your password"
                                           required={true}
                                           value={fields.password}
                                           onChange={handleFieldChange}
                                    />
                                </div>
                                {
                                    validationErrors.password
                                        ? <span className="error invalid-feedback">{validationErrors.password[0]}</span>
                                        : ``
                                }
                            </div>
                            <div className="col-md-3 col-12 mb-2">
                                <div className="form-group">
                                    <input type="password"
                                           className={
                                               validationErrors.password_confirmation
                                                   ? `form-control is-invalid`
                                                   : `from-control`
                                           }
                                           id="password_confirmation"
                                           placeholder="Re-enter your password"
                                           required={true}
                                           value={fields.password_confirmation}
                                           onChange={handleFieldChange}
                                    />
                                    {
                                        validationErrors.password_confirmation
                                            ? <span
                                                className="error invalid-feedback">{validationErrors.password_confirmation[0]}</span>
                                            : ``
                                    }
                                </div>
                            </div>
                        </div>

                        <h5 className="login-box-msg text-lightblue mt-2">User display picture</h5>

                        <div className="row">
                            <div className="col-md-3 col-12 mb-2">
                                <div className="form-group">
                                    <input type="file"
                                           className="form-control"
                                           id="img_file"
                                           required={true}
                                           onChange={handle_image_upload}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row my-2">
                            <div className="col-md-4 col-12"></div>
                            <div className="col-md-4 col-12">
                                <button type="submit" className="btn btn-primary btn-block"
                                        disabled={isDisabled}>Register
                                </button>
                            </div>
                            <div className="col-md-4 col-12"></div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
