import { Component, OnInit, ViewChild } from '@angular/core';
import { PageConfig } from 'src/models/app.models';
import { ModalService } from '../commons/services/modal-provider.service';
import { OrganisationService } from '../services/organisation/organisation.service';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'adj-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage implements OnInit {

  public config: PageConfig;

  @ViewChild(UserListComponent)
  private userList: UserListComponent;
  constructor(private modalService: ModalService, private orgService: OrganisationService) {
    this.config = { title: 'User Management', subtitle: 'User access management for your application' }
  }

  ngOnInit() {
    this.orgService.myIndex = ''
  }
  public addUser(event: Event): void {
    this.modalService.showModal({
      component: AddUserComponent,
      event: event,
      cssClasses: ['right-aligned-full-height'],
      selectHandler: (option: any) => {
        if (this.userList) {
          this.userList.refresh();
        }
      }
    })
  }

}
