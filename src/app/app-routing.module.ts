import { NgModule } from '@angular/core';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './modules/shared/enums';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo([AppRoutes.SignInPage]);
const redirectLoggedInToHome = () => redirectLoggedInTo([AppRoutes.Home]);

const routes: Routes = [
  { path: '', redirectTo: AppRoutes.SignInPage, pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: AppRoutes.Wallet,
    loadChildren: () =>
      import('./modules/wallet/wallet.module').then((m) => m.WalletModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
