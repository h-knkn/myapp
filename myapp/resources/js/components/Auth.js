import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getSignedIn} from "../../../redux/users/selectors";
import {listenAuthState} from "../../../redux/users/operations";

const Auth = ({children}) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    const isSignedIn = getSignedIn(selector)

    useEffect(() => {
        if (!isSignedIn) {
            dispatch(listenAuthState())
        }
    }, []);

    if (!isSignedIn) {
        return <></>
    } else {
        return children
    }
};
export default Auth;