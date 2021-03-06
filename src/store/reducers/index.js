import { combineReducers } from "redux";

import AuthReducer from "./user/auth.reducer";
import ProvinceReducer from "./location/province.reducer";
import DistrictReducer from "./location/district.reducer";
import CityReducer from "./location/city.reducer";
import UserReducer from "./user/user.reducer";

const RootReducer = combineReducers({
    auth: AuthReducer,
    province: ProvinceReducer,
    district: DistrictReducer,
    city: CityReducer,
    user: UserReducer
});

export default RootReducer;
