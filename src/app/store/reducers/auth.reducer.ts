// import { Action, createReducer, on, State } from '@ngrx/store';
// import { removeUserData, getUserDataSuccess } from '../actions/auth.action';
// import { IUserData } from '../../services/users.types';
//
// export const initialState: IUserData[] = [];
//
// const _userReducer = createReducer(
//   initialState,
//   on(getUserDataSuccess, (state, action) => {
//     return action.user;
//   }),
//   on(removeUserData, (state) => []),
// );
//
// // tslint:disable-next-line:no-any
// export function userReducer(state: any, action: Action): any {
//   return _userReducer(state, action);
// }
