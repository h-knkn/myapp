import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
);
export const getUsersId = createSelector(
    [usersSelector],
    state => state.id
);
export const getUsersName = createSelector(
    [usersSelector],
    state => state.name
);
