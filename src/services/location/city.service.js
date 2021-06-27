import config from "../../config";
import axios from "axios";

export const get_all_cities = (districtId) => {
    const cityUrl = `${config.oauthUrl}/cities?district_id=${districtId}`;

    return axios.get(cityUrl)
        .then(res => { return res })
        .catch(err => { return err.response });
}
