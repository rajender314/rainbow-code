import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { timestamp } from 'rxjs/operators';
import { Option, PaginatedResponse } from 'src/app/commons/models/common.models';
import { SortParam } from 'src/app/commons/models/sort.models';
import { PaginatedListComponent, PaginatedListConfig } from 'src/app/commons/paginated-list/paginated-list.component';
import { ModalService } from 'src/app/commons/services/modal-provider.service';
import { PopoverService } from 'src/app/commons/services/popover.service';
import { SortProviderService } from 'src/app/commons/services/sort.provider.service';
import { BaseAPI } from 'src/app/services/api/base.api';
import { OrganisationService } from 'src/app/services/organisation/organisation.service';
import { isFunction, isNotBlank, mapOf, SORT_PARAM_NAME, unsubscribeAll } from 'src/app/utils/utils-function';
import { EDIT_MODE, ERROR_TOAST_CLASS, RIGHT_ALIGNED_MODAL, SCOPE, SEARCH, SNAKE_BAR_TIMEOUT, STATUS, SUBMITTING, SUCCESS_TOAST_CLASS, USER_ACTION_ERROR, USER_ACTION_SUCCESS, VIEW_MODE } from 'src/constants';
import { apiDirectory, REMOVE_USER_DEVICE_PERM, CHANGE_EMPLOY_PERM } from 'src/global';
import { Status, UserDetail } from 'src/models/app.models';
import { UserFilter } from 'src/models/user.filter.model';
import { PasswordChangeComponent } from '../password-change/password-change.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'adj-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  public paginatedListConfig: PaginatedListConfig;
  public totalRecords: number;
  public sortParam: SortParam;
  public status: Status;
  public filter: UserFilter;
  public apiDirectory: any = apiDirectory;
  public searchInput: FormControl;
  public changeEmployPermissions: Array<string> = [CHANGE_EMPLOY_PERM]

  private subscriptions: Array<Subscription>;
  private sortOptions: Array<Option<string>>;
  @ViewChild(PaginatedListComponent)
  private paginatedList: PaginatedListComponent;

  constructor(
    private popoverService: PopoverService,
    private baseAPI: BaseAPI,
    private loadingCntrl: LoadingController,
    private alertCntrl: AlertController,
    private orgService: OrganisationService,
    private popover: PopoverService,
    private modalService: ModalService,
    private sortProvider: SortProviderService) {

    this.paginatedListConfig = { url: apiDirectory.users }
    this.sortOptions = this.intialiseSortOptions();
    this.sortParam = new SortParam('name', 'ASC', { label: 'User Name', value: 'name' });
    this.status = { value: true, label: 'Active', name: 'status' }
    this.subscriptions = new Array<Subscription>();
    this.filter = new UserFilter();
    this.searchInput = new FormControl();
  }

  private intialiseSortOptions(): Array<Option<string>> {
    const sortOptions = new Array<Option<string>>();
    sortOptions.push(
      { label: 'User Name', value: 'name', meta: {} },
      { label: 'Manager name', value: 'manager__name', meta: {} },
      { label: 'Role', value: 'role__name', meta: {} },
      { label: 'Location', value: 'place__name', meta: {} },
    )
    sortOptions.sort((a, b) => a.label.localeCompare(b.label))
    return sortOptions;
  }

  ngOnInit() { }

  public performSearch(): void {
    this.refresh();
  }

  public clear(): void {
    this.searchInput.reset();
    this.refresh();
  }

  public mapUser(user: UserDetail) {
    return user;
  }

  public handleResponse(response: PaginatedResponse<UserDetail>): void {
    this.totalRecords = response.page.count;
  }

  public refresh(): void {
    const params = new Map<string, any>(this.filter.toQureryMap());
    params.set(SORT_PARAM_NAME, this.sortParam.getQueryValue());
    if (this.status.value != null) {
      params.set(STATUS, new Boolean(this.status.value).toString());
    }
    if (isNotBlank(this.searchInput.value)) {
      params.set(SEARCH, this.searchInput.value);
      params.set(SCOPE, 'node');
    }
    this.paginatedList.setParams(params);
    this.paginatedList.refresh();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(this.orgService.organisation.subscribe(org => {
        this.refresh();
      }))
    }, 10)
  }

  public sort(event: Event): void {
    const params = { options: this.sortOptions, current: this.sortParam, header: 'Sort By' }
    this.sortProvider.open({
      params: params,
      event: event,
      selectHandler: (sortParam: SortParam) => {
        this.sortParam = sortParam;
        this.refresh();
      },
    });
  }

  public showStatusOptions($event: Event): void {
    this.popover.showActions({
      event: $event,
      params: {
        options: [
          { label: 'All', value: null, name: 'status', icon: "list-circle-outline" },
          { label: 'Active', value: true, name: 'status', icon: "checkmark-circle-outline" },
          { label: 'Inactive', value: false, name: 'status', icon: 'close-outline' },
        ],
        selectedValue: this.status
      },
      selectHandler: (option: Option<boolean>) => {
        this.status = { value: option.value, label: option.label, name: 'status' };
        this.refresh();
      }
    })
  }

  public showUserActions(event: Event, user: UserDetail) {
    event.stopPropagation();
    const options = [
      { label: 'Change Password', value: 'password', name: 'password'},
      { label: 'Edit', value: 'edit', name: 'edit',permissions: this.changeEmployPermissions },
      { label: 'View', value: 'view', name: 'view' },
      { label: 'Reset Device', value: 'reset_device', name: 'reset_device', permissions: [REMOVE_USER_DEVICE_PERM] },
    ]
    if (user.is_active) {
      options.push({ label: 'Mark Inactive', value: 'inactive', name: 'inactive'});
    } else {
      options.push({ label: 'Mark Active', value: 'active', name: 'active'});
    }
    this.popover.showActions({
      event: event,
      params: {
        options: options
      },
      selectHandler: (option: Option<string>) => {
        switch (option.value) {
          case 'edit':
            this.viewUser(event, user, EDIT_MODE)
            break;
          case 'view':
            this.viewUser(event, user, VIEW_MODE)
            break;
          case 'password':
            this.modalService.showModal({
              component: PasswordChangeComponent,
              event: event,
              params: {
                user: user
              },
              selectHandler: (option: any) => {
                this.refresh();
              }
            });
            break;
          case 'inactive':
            this.changeUserStatusAlert(
              event,
              { header: 'Inactive User', subheader: `Are you sure you want to mark ${user.name} inactive?` },
              user,
              false
            );
            break;

          case 'active':
            this.changeUserStatusAlert(
              event,
              { header: 'Activate User', subheader: `Are you sure you want to mark ${user.name} active?` },
              user,
              true
            );
            break;
          case 'reset_device':
            this.handleResetDeviceAction(event, user);
            break;
        }
      }
    });
  }


  public viewUser(event: Event, user: UserDetail, mode: string = VIEW_MODE): void {
    this.modalService.showModal({
      component: UserDetailComponent,
      event: event,
      params: {
        userId: user.id,
        mode: mode
      },
      selectHandler: (option: Option<any>) => {
        this.refresh();
      },
      cssClasses: [RIGHT_ALIGNED_MODAL]
    });
  }

  public showFilter(event: Event): void {
    // this.modalService.showModal({
    //   component: UserFilterComponent,
    //   event: event,
    //   params: {
    //     currentFilter: this.filter
    //   },
    //   selectHandler: (filter: UserFilter) => {
    //     this.filter = filter;
    //     this.refresh();
    //   },
    //   cssClasses: [RIGHT_ALIGNED_MODAL]
    // });
  }

  public async changeUserStatusAlert(
    event: Event,
    messages: { header: string, subheader: string },
    user: UserDetail,
    status: boolean) {
    const params = mapOf<string, any>({ key: 'user', value: user }, { key: 'status', value: status });
    const handlers = {
      cancel: () => { return true },
      submit: (params: Map<string, any>) => {
        const aUser = params.get('user');
        const aStatus = params.get('status');
        this.chageUserStatus(aUser, aStatus);
        return true;
      }
    }
    this.showOperationAlert(event, messages, params, handlers);
  }


  private async showOperationAlert(
    event: Event,
    messages: { header: string, subheader: string },
    params: Map<string, any>,
    handlers: { cancel: Function, submit: (params: Map<string, any>) => boolean }) {

    const alert = await this.alertCntrl.create({
      header: messages.header,
      subHeader: messages.subheader,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            if (handlers && isFunction(handlers.cancel)) {
              handlers.cancel();
            }
          }
        },

        {
          text: 'Submit',
          handler: () => {
            if (handlers && isFunction(handlers.submit)) {
              handlers.submit(params);
            }
          }
        }
      ]
    });
    alert.present();
  }

  private async chageUserStatus(user: UserDetail, status: boolean) {
    const loading = await this.loadingCntrl.create({ message: SUBMITTING })
    loading.present();
    this.baseAPI.executePatch({
      url: `${apiDirectory.user}${user.id}/`,
      body: { is_active: status }
    }).subscribe(response => {
      loading.dismiss();
      this.popoverService.showToast(USER_ACTION_SUCCESS('updated'), SNAKE_BAR_TIMEOUT, [SUCCESS_TOAST_CLASS])
      this.refresh();
    }, error => {
      console.log(error);
      loading.dismiss();
      this.popoverService.showToast(USER_ACTION_ERROR('updated'), SNAKE_BAR_TIMEOUT, [ERROR_TOAST_CLASS])
    })
  }

  private async resetUserDevice(user: UserDetail) {
    const loading = await this.loadingCntrl.create({ message: SUBMITTING })
    loading.present();
    this.baseAPI.executeDelete({
      url: `${apiDirectory.userDevice}${user.id}/`
    }).subscribe(response => {
      loading.dismiss();
      this.popoverService.showToast(USER_ACTION_SUCCESS('updated'), SNAKE_BAR_TIMEOUT, [SUCCESS_TOAST_CLASS])
      this.refresh();
    }, error => {
      console.log(error);
      loading.dismiss();

      this.popoverService.showToast(USER_ACTION_ERROR('updated'), SNAKE_BAR_TIMEOUT, [ERROR_TOAST_CLASS])
    })
  }

  private handleResetDeviceAction(event: Event, user: UserDetail) {
    const params = Map.from({ key: 'user', value: user });
    const handlers = {
      cancel: () => { return true },
      submit: (params: Map<string, any>) => {
        this.resetUserDevice(params.get('user'))
        return true;
      }
    };
    const messages = {
      header: 'Reset User Device', subheader: `Are you sure you want to reset ${user.name}'s device?`
    }

    this.showOperationAlert(event, messages, params, handlers);
  }


  ngOnDestroy(): void {
    unsubscribeAll(this.subscriptions);
  }
}