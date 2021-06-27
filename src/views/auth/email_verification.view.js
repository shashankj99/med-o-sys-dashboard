import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {ClearAuthState, verify_email_token_action} from "../../store/actions/user/auth.action";

export default function EmailVerification(props) {
    // get token from url
    let {token} = useParams();

    const dispatch = useDispatch();

    // get user auth response
    const userAuthResponse = useSelector(state => state.auth.userAuthResponse);

    // dispatch action when page loads... only once
    useEffect(() => {
        dispatch(ClearAuthState());
        dispatch(verify_email_token_action(token));
    },[]);

    // response alert
    if (userAuthResponse.hasOwnProperty('status')) {
        alert(userAuthResponse.message);
        dispatch(ClearAuthState());
        if (userAuthResponse.status === 200)
            props.history.push('/login');
    }

    return (
        <div>
            {console.log(token)}
        </div>
    );
}
