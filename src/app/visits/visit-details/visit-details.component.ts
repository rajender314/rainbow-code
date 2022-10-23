import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UIActionParams } from 'src/app/commons/models/common.models';
import { ACTION_PARAMS } from 'src/app/commons/services/data-provider.service';
import { BaseAPI } from 'src/app/services/api/base.api';
import { apiDirectory } from 'src/global';
import { KdeChangeRequests, StoreDetails, VisitDetails } from 'src/models/app.models';
import { Pipe, PipeTransform } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { RIGHT_ALIGNED_MODAL } from 'src/constants';
import { NgImageSliderComponent } from 'ng-image-slider';

@Pipe({ name: 'removeUnderscore' })
export class RemoveUnderscorePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value.replace(/_/g, " ");
  }
}
@Component({
  selector: 'adj-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.scss'],
})
export class VisitDetailsComponent implements OnInit {
  @ViewChild('nav') slider: NgImageSliderComponent;

  public title:string;
  public mode:string;
  public formGroup: FormGroup;
  public visit:VisitDetails;
  public store:StoreDetails;
  public readOnly: boolean;
  public kdeRequests:KdeChangeRequests;
  public visitPreImages;
  public visitPostImages;
  private body: any;
  public visitResponse:any;
  public outletHealthScoreProperties = ["backwall_door_cleaning_status","backwall_light_repair_request"]
  public data:any;
  public imageUrl: any;
  modalService: any;
  public photoLabel;
  public imagesList;
  
  
  constructor(@Inject(ACTION_PARAMS) private inputData: UIActionParams,
  private formBuilder: FormBuilder, private baseAPI: BaseAPI,
  private _lightbox: Lightbox) { }

  ngOnInit() {
    const parameters = this.inputData.data.parameters;
    console.log(parameters)
    this.title = parameters.title;
    this.imageUrl = parameters.imgUrl;
    this.photoLabel = parameters.photolabel;
    this.imagesList = parameters.imgArr;
    console.log(this.imagesList)
    // this.mode = (parameters.mode) ? parameters.mode : 'VIEW';
    // this.visit = (parameters.visit) ? parameters.visit : {};
    // this.store = (parameters.store) ? parameters.store: {};
    // this.readOnly = (this.mode == 'VIEW') ? true : false;
    // this.formGroup = this.initialisedForm(this.visit,this.store);
    

    
    // this.loadVisit();
    
  }

  public async loadVisit(){
    
    const param = new Map<string,string>();
    param.set("visit_id",this.visit.visit_id);
    const url = `${apiDirectory.visitsList}`;
    const clientVisit = this.baseAPI.executeGet({
      url: url,
      params:param
    }).pipe(
      map(response => response.results),
      map(visits => visits.map(visit => this.convertToClientVisit(visit))))
      this.visitResponse = await clientVisit.toPromise();
  }


  private showVisitDetails(mode:string, visit:VisitDetails, store:StoreDetails){
    this.modalService.showModal({
      component: VisitDetailsComponent,
      params: {
        mode: mode,
        visit: visit,
        store:store,
        title: 'Visit Details'
      },
      cssClasses: [RIGHT_ALIGNED_MODAL]
    })
  }
  
  public convertToClientVisit(visit: VisitDetails) {
    const visitData = visit.data;
    const clientVisit: any = {}
    
    clientVisit.outletHealthScore = this.fillProperties(this.outletHealthScoreProperties, visitData, {});
    
    return clientVisit
  }

  private fillProperties(props:Array<string>, source:any, destination:any):any{
    props.forEach(propertyName => {
      
      destination[propertyName] = source[propertyName]
      
    });
    
    
    console.log("Destination: "+JSON.stringify(destination));
     
    return destination;
    
    
  }

  private initialisedForm(visit: VisitDetails, store:StoreDetails): FormGroup { 
      
    return this.formBuilder.group({
      outlet_id: [visit.visit_id, Validators.required],
      name: [(store.store_name) ? store.store_name.trim() : null, Validators.required],
      wd_id:[store.wd_id, Validators.required],
      merchandiser_name:[visit.visited_user_name, Validators.required],
      market_name:[store.market_name, Validators.required],
      created_at:[visit.created_at, Validators.required],
      beat_name:[visit.beat_name, Validators.required],
      
    });
  }
  public close(value: any = null, role: string = "closed") {
    this.inputData.data.onClose(value, role);
  }

}
