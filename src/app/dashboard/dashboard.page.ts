import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication/auth.service';
// import { UserDetail } from 'src/models/app.models';
import { DateFunction, DateUtil } from '../commons/models/date.models';
import { OrganisationService } from '../services/organisation/organisation.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public user;
  public dateFunction: DateFunction;

  constructor(private authService: AuthenticationService, private orgService: OrganisationService,) {
    this.dateFunction = DateUtil.CURRENT_MONTH;
  }

  ngOnInit() {
    setTimeout(() => {
      this.authService.currentUser.subscribe(user => this.user = user);
    }, 10)
    this.orgService.myIndex = ''
  }



  public handleDateChange(dateFunction: DateFunction): void {
    this.dateFunction = dateFunction;
  }

}
