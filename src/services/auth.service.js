import config from "../config";
import axios from "axios";

/**
 * Register User API
 * @param credentials
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
export const Register = (credentials) => {
    const registerUrl = `${config.oauthUrl}/register`;

    return axios.post(registerUrl, credentials)
        .then(res => { return res })
        .catch(err => { return err.response });
}

/**
 * OTP verification API
 * @param credentials
 * @returns {Promise<AxiosResponse<any>>}
 */
export const verify_otp = (credentials) => {
    const mobileVerificationUrl = `${config.oauthUrl}/mobile/verify`;

    return axios.post(mobileVerificationUrl, credentials)
        .then(res => { return res })
        .catch(err => { return err.response });
}

/**
 * Email verification API
 * @param credentials
 * @returns {Promise<AxiosResponse<any>>}
 */
export const verify_email_token = (credentials) => {
    const emailVerificationUrl = `${config.oauthUrl}/email/verify`;

    return axios.post(emailVerificationUrl, credentials)
        .then(res => { return res })
        .catch(err => { return err.response });
}

/**
 * Login API
 * @param credentials
 * @returns {Promise<AxiosResponse<any>>}
 */
export const login = (credentials) => {
    const loginUrl = `${config.oauthUrl}/login`;

    return axios.post(loginUrl, credentials)
        .then(res => { return res })
        .catch(err => { return err.response });
}
