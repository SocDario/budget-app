import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../shared/enums';
import { WalletCreateComponent } from './views/wallet-create/wallet-create.component';
import { WalletComponent } from './views/wallet/wallet.component';

const routes: Routes = [
  {
    path: '',
    component: WalletComponent,
  },
  {
    path: AppRoutes.CreateWallet,
    component: WalletCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletRoutingModule {}
