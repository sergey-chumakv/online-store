// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { AuthService } from '../../services/auth/auth.service';
// import { getUserDataPending, getUserDataSuccess } from '../actions/auth.action';
// import { map, mergeMap } from 'rxjs/operators';
//
// @Injectable()
// export class AuthEffect {
//   public getUserData$ = createEffect(() =>
//     this.actions$.pipe(
//       // ofType(getUserDataPending),
//       mergeMap(() =>
//         this.authService
//           .getUserData(this.authService.token)
//           .pipe(map((data) => getUserDataSuccess({ user: data.users }))),
//       ),
//     ),
//   );
//
//   constructor(private actions$: Actions, private authService: AuthService) {}
// }
