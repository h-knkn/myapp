import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getUsersId = createSelector(
    [usersSelector],
    state => state.uid
);
