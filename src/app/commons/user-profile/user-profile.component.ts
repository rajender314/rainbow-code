import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/auth.service';
// import { UserDetail } from 'src/models/app.models';
import { PopoverService } from '../services/popover.service';
import { Option } from '../models/common.models';

@Component({
  selector: 'adj-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  public user;

  constructor(
    private authService: AuthenticationService,
    private uiProvider: PopoverService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => this.user = user)
  }

  public showOptions($event: Event): void {
    const logoutOption: Option<string> = { label: 'Logout', icon: 'log-out-outline', value: 'logout' }
    this.uiProvider.showActions({
      event: $event,
      params: {
        options: [logoutOption]
      },
      selectHandler: (option: Option<string>) => {
        if (option.label == logoutOption.label) {
          this.authService.logout().subscribe();
        }
      }
    })
  }

}
