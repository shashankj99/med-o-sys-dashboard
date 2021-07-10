import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {clear_user_state, get_user_details_by_access_token_action} from '../../store/actions/user/user.action';
import UserForm from "../../components/UserForm";

export default function Profile(props) {
    const fields = {};
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_user_details_by_access_token_action());
        return () => {
            dispatch(clear_user_state())
        }
    }, [dispatch]);

    let userResponse = useSelector(state => state.user.userResponse);

    if (userResponse.hasOwnProperty('user')) {
        fields.first_name= userResponse.user.first_name;
        fields.middle_name= userResponse.user.middle_name;
        fields.last_name= userResponse.user.last_name;
        fields.nep_name= userResponse.user.nep_name;
        fields.province_id= userResponse.user.province_id;
        fields.district_id= userResponse.user.district_id;
        fields.city_id= userResponse.user.city_id;
        fields.ward_no= userResponse.user.ward_no;
        fields.dob_ad= userResponse.user.dob_ad;
        fields.dob_bs= userResponse.user.dob_bs;
        fields.age= userResponse.user.age;
        fields.blood_group= userResponse.user.blood_group;
        fields.mobile= userResponse.user.mobile;
        fields.email= userResponse.user.email;
        fields.img= userResponse.user.img;
        fields.gender = userResponse.user.gender;
    }

    return (
        <>
            {
                (userResponse.hasOwnProperty('user'))
                    ? <UserForm 
                        title="Update Profile Details"
                        fieldsState={fields} 
                        provinceId={userResponse.user.province_id}
                        districtId={userResponse.user.district_id}
                        type="update"
                        imgCaption="Click here to change your profile image"
                        props={props}
                    />
                    : ''
            }
            
        </>
    );
}