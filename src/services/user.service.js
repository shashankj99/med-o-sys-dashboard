import config from '../config';
import axios from 'axios';

/**
 * Function to call user detail API
 * @param {*} token 
 * @returns 
 */
export const get_user_details_by_access_token = (token) => {
    const profileUrl = `${config.oauthUrl}/user`;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };

    return axios.get(profileUrl, {headers})
        .then(res => { return res })
        .catch(err => { return err.response });
}

/**
 * Fundtion to update profile by access token
 * @param {*} token 
 * @param {*} data 
 * @returns 
 */
export const update_user_details_by_access_token = (token, data) => {
    const updateprofileUrl = `${config.oauthUrl}/profile`;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };

    return axios.put(updateprofileUrl, data, { headers })
        .then(res => { return res })
        .catch(err => { return err.response });
}
