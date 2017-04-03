/**
 * Created by alessandrocolleoni on 03/04/2017.
 */
import AppNavigator from '../AppNavigator'

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

export default navReducer;