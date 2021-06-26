import config from "../config";
import axios from "axios";

export const Register = (credentials) => {
    const registerUrl = `${config.oauthUrl}/register`;

    return axios.post(registerUrl, credentials)
        .then(res => { return res })
        .catch(err => { return err });
}