import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication/auth.service';
// import { UserDetail } from 'src/models/app.models';
import { DateFunction, DateUtil } from '../commons/models/date.models';


@Component({
  selector: 'app-sunrise-dashboard',
  templateUrl: './sunrise-dashboard.page.html',
  styleUrls: ['./sunrise-dashboard.page.scss'],
})
export class SunriseDashboardPage implements OnInit {

  public user;
  public dateFunction: DateFunction;

  constructor(private authService: AuthenticationService) {
    this.dateFunction = DateUtil.CURRENT_MONTH;
  }

  ngOnInit() {
    setTimeout(() => {
      this.authService.currentUser.subscribe(user => this.user = user);
    }, 10)
  }

  

  public handleDateChange(dateFunction: DateFunction): void {
    this.dateFunction = dateFunction;
  }

}
