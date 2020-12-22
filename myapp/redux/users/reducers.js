
import * as Actions from './actions';
import {initialState} from '../store/initialState';

export const UsersReducer = (state = initialState.users, action)  => {
    switch (action.type) {
        case Actions.SIGN_IN:
            return {
                ...state,
                icon_path: action.payload.icon_path,
                username: action.payload.username
            };
        default:
            return state
    }
};