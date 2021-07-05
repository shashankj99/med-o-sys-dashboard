import React from "react";
import UserForm from "../../components/UserForm";

export default function Register(props) {
    const fields = {
        first_name: '',
        middle_name: '',
        last_name: '',
        nep_name: '',
        province_id: '',
        district_id: '',
        city_id: '',
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
        img: '',
        gender: ''
    };

    return (
        <UserForm 
            title="Register a new user ( नयाँ प्रयोगकर्ता दर्ता गर्नुहोस् )"
            fieldsState={fields} 
            provinceId={null}
            districtId={null}
            type={"create"}
            imgCaption="Click to select a profile image"
            props={props}
        />
    );
}
