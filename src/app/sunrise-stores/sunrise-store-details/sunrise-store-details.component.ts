import { ImageGalleryComponent } from './../../commons/image-gallery/image-gallery.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgxGalleryImage, NgxGalleryOptions } from '@ngx-gallery/core';
import { Observable, Subscription } from 'rxjs';
import { StoreDetails, StoreType, VisitDetails } from '../../../models/app.models';
import { ACTION_PARAMS } from '../../commons/services/data-provider.service';
import { UIActionParams } from '../../commons/models/common.models';
import { BaseAPI } from '../../services/api/base.api';
import { ModalService } from '../../commons/services/modal-provider.service';
import { OrganisationService } from '../../services/organisation/organisation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { apiDirectory } from '../../../global';
import { mapOf } from '../../utils/utils-function';
import { CENTER_ALIGNED_MODAL, RIGHT_ALIGNED_MODAL } from '../../../constants';
import { VisitDetailsComponent } from '../../visits/visit-details/visit-details.component';


@Component({
  selector: 'adj-sunrise-store-details.component',
  templateUrl: './sunrise-store-details.component.html',
  styleUrls: ['./sunrise-store-details.component.scss'],
})
export class SunriseStoreDetailsComponent implements OnInit {
  public title: string = 'Store Details';
  public mode: string;
  public store: StoreDetails;
  public element: Element;
  public formGroup: FormGroup;
  public storeType$: Observable<Array<StoreType>>;
  public readOnly: boolean;
  public visits: VisitDetails;
  public elements: Element;
  private body: any;
  private subscription: Subscription;
  public storeId: string;
  public storeData: StoreDetails;
  public allowDataPass: boolean = false;

  constructor(@Inject(ACTION_PARAMS) private inputData: UIActionParams,
    private formBuilder: FormBuilder, private baseAPI: BaseAPI,
    public modalService: ModalService, private orgService: OrganisationService, private route: ActivatedRoute,
    private router: Router) {
    this.subscription = this.route.url.subscribe(url => {
      this.storeId = url[0] ? url[0].path : '';
    });
  }

  ngOnInit() {
    // const parameters = this.inputData.data.parameters;
    // this.title = parameters.title;
    // this.mode = (parameters.mode) ? parameters.mode : 'VIEW';
    // this.store = (parameters.store) ? parameters.store : {};
    // this.readOnly = (this.mode == 'VIEW') ? true : false;
    // this.formGroup = this.initialisedForm(this.store);

    // const storeId = ;

    // const url = `${apiDirectory.storeDetailList}${'?store_id=' + storeId}`;
    // this.baseAPI.executeGet({
    //   url: url
    // }).subscribe(response => {
    //   this.visits = response.results.visit_details;
    //   this.elements = response.results.element_details;
    // }, error => this.body.error = error)
    this.formGroup = this.initialisedForm('');
    this.visitIdData(this.storeId);
    this.readOnly = (this.mode == 'VIEW') ? true : false;
  }
  public myRoute(visit) {

    const v = this.router.navigate(['/rainbow/visits', visit.visit_id])
    if (v) {
      this.orgService.myIndex = 456;
    }
  }
  public myRoute1(visit) {

    const v = this.router.navigate(['/rainbow/visits'])
    if (v) {
      this.orgService.myIndex = 456;
    }
  }
  public visitIdData(id): void {
    this.subscription = this.baseAPI.executeGet({
      url: apiDirectory.storeDetailList,
      params: mapOf({
        key: 'store_id',
        value: id
      }, {
        key: 'page_size',
        value: 40
      })
    }).subscribe(response => {
      this.storeData = response.results;
      this.visits = response.results.visit_details;
      this.elements = response.results.element_details;
      console.log(this.storeData)
      if (this.storeData) {
        this.formGroup = this.initialisedForm(this.storeData);
      }

      setTimeout(() => {
        this.allowDataPass = true;
      }, 500);
    }, error => this.body.error = error)
  }
  public showElementImages(mode, element) {
    this.modalService.showModal({
      component: ImageGalleryComponent,
      params: {
        mode: mode,
        element: element,
        title: 'Element Image'
      },
      cssClasses: [CENTER_ALIGNED_MODAL]
    })

  }





  private initialisedForm(store): FormGroup {
    return this.formBuilder.group({
      dhanush_id: [store.dhanush_id, Validators.required],
      name: [(store.store_name) ? store.store_name.trim() : null, Validators.required],
      branch: [store.branch],
      market_name: [store.market_name],
      owner_name: [store.owner_name],
      contact_no: [store.owner_mobile, Validators.required],
      alternate_no: [store.alternate_no],
      store_status: [{ value: store.store_status, disabled: this.readOnly }, Validators.required],
      beat_name: [store.beat_name],
      wd_id: [store.wd_id],
      created_at: [store.updated_on],
      outlet_type: [store.outlet_type, Validators.required],
    });
  }
  public close() {
    this.router.navigate(['/sunrise/stores']);

  }

  private showVisitDetails(mode: string, visit: VisitDetails, store: StoreDetails) {
    this.modalService.showModal({
      component: VisitDetailsComponent,
      params: {
        mode: mode,
        visit: visit,
        store: store,
        title: 'Visit Details'
      },
      cssClasses: [RIGHT_ALIGNED_MODAL]
    })
  }
  }
