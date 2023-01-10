import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.scss'],
})
export class GoogleButtonComponent {
  @Input() label = '';
  @Input() isGoogleAuthenticationLoading?: boolean;
  @Input() isDisabled?: boolean;
}
