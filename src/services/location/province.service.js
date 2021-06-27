import config from "../../config";
import axios from "axios";

export const get_all_provinces = () => {
    const provinceUrl = `${config.oauthUrl}/provinces`;

    return axios.get(provinceUrl)
        .then(res => { return res })
        .catch(err => { return err.response });
}
