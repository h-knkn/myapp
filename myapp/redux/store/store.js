import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import {UsersReducer} from '../users/reducers';
import {connectRouter, routerMiddleware} from 'connected-react-router'

export default function createStore(history) {

    // Define individual settings of redux-logger
    let middleWares = [routerMiddleware(history), thunk];
    // if (process.env.NODE_ENV === 'development') {
    //     const logger = createLogger({
    //         collapsed: true,
    //         diff: true
    //     });
    //     middleWares.push(logger)
    // }

    return reduxCreateStore( // オリジナル createStore の別名
        combineReducers({
            router: connectRouter(history),
            users: UsersReducer,
        }),
        applyMiddleware(
            ...middleWares
        )
    );
}