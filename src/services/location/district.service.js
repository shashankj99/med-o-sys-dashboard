import config from "../../config";
import axios from "axios";

export const get_all_districts = (provinceId) => {
    const districtUrl = `${config.oauthUrl}/districts?province_id=${provinceId}`;

    return axios.get(districtUrl)
        .then(res => { return res })
        .catch(err => { return err.response });
}
