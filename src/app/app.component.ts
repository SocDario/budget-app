import { Component } from '@angular/core';
import { AuthStoreService } from './modules/auth/services/auth-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoadingUser$ = this.authStoreService.isLoadingUser$;

  constructor(private readonly authStoreService: AuthStoreService) {}
}
