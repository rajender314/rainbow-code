import { VisitDetails, GridArray } from './../../../models/app.models';

import {
	Lightbox
} from 'ngx-lightbox';
import {
	NgImageSliderComponent
} from 'ng-image-slider';

import {
	 preImageProps, postImageProps, elementsPresenceProps, assetReportProps, stockAvailabilityProps, kdeChangeRequestProps
} from './../../../constants';
import {
	ModalService
} from './../../commons/services/modal-provider.service';

import {
	outletHealthScoreProperties
} from './../../../constants';

import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import {
	ActivatedRoute,
	Router
} from '@angular/router';
import {
	BaseAPI
} from './../../services/api/base.api';
import {
	Component,
	OnInit,
	ViewChild
} from '@angular/core';

import {
	apiDirectory
} from '../../../global';
import {
	mapOf
} from '../../utils/utils-function';


import * as _ from 'lodash';
import { Subscription } from 'rxjs';

// import { Ng2ImgMaxService } from 'ng2-img-max';


@Component({
	selector: 'adj-visit-details-page',
	templateUrl: './visit-details-page.component.html',
	styleUrls: ['./visit-details-page.component.scss'],
})
export class VisitDetailsPageComponent implements OnInit {

	private body: any;
	public visitId: string;
	public formGroup: FormGroup;
	public visitData: VisitDetails;
	public mode: string;
	public readOnly: boolean;
	public visitResponse: Array<GridArray> = [];
	public imagesParameters: object = {}
	public postImagesParameters: object = {};
	public outletHealthData: object = {};
	public elePresenceArray: object = {};
	public assetReportArray: object = {};
	public stockAvailableArray: object = {};
	public kdeChangeReqArray: object = {};
	public title: string = 'Visit Details';
	public elePresenceData: Array<GridArray> = [];
	public assetReport: Array<GridArray> = [];
	public stockAvailability: Array<GridArray> = [];
	public kdeChangeRequest: Array<GridArray> = [];
	public allowDataPass: boolean = false;
	private subscription: Subscription;





	constructor(private baseAPI: BaseAPI,
		private route: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder,
		private lightbox: Lightbox,
	) {
	this.subscription = this.route.url.subscribe(url => {
			this.visitId = url[0] ? url[0].path : '';
		});
	}

	ngOnInit() {
		this.formGroup = this.initialisedForm('');
		this.rowData(this.visitId);
		this.readOnly = (this.mode == 'VIEW') ? true : false;
	}


	public rowData(id): void {
		this.subscription = this.baseAPI.executeGet({
			url: apiDirectory.visitsList,
			params: mapOf({
				key: 'visit_id',
				value: id
			}, {
				key: 'page_size',
				value: 40
			})
		}).subscribe(response => {
			this.visitData = response.results[0];
				this.loadVisit();
				this.componentPassedData();
				if (this.visitData) {
					this.formGroup = this.initialisedForm(this.visitData);
				}

			setTimeout(() => {
				this.allowDataPass = true;
			}, 500);
		}, error => this.body.error = error)
	}

	
	private componentPassedData(): void {
		// console.log(this.visitResponse)
		this.imagesParameters = {
			visitdata: this.visitData,
			imageProps: preImageProps,
			title: 'Pre Images'

		}
		this.postImagesParameters = {
			visitdata: this.visitData,
			imageProps: postImageProps,
			title: 'Post Images'

		}
		this.outletHealthData = {
			visitdata: this.visitData,
			displayData: this.titleConversion(this.visitResponse[0].data),
			title: 'Outlet Health Score'

		}
		this.elePresenceArray = {
			visitdata: this.visitData,
			displayData: this.titleConversion(this.elePresenceData[0].data),
			title: 'Element Presence'

		}
		this.assetReportArray = {
			visitdata: this.visitData,
			displayData: this.titleConversion(this.assetReport[0].data),
			title: 'Assert Report'

		}
		this.stockAvailableArray = {
			visitdata: this.visitData,
			displayData: this.titleConversion(this.stockAvailability[0].data),
			title: 'Stock Availablity'

		}
		this.kdeChangeReqArray = {
			visitdata: this.visitData,
			displayData: this.titleConversion(this.kdeChangeRequest[0].data),
			title: 'Kde Change Request'

		}
	}

	public titleConversion(gridData) {
		let gridtype = Object.keys(gridData).map((key) => {
			const newKey = this.getTitleCase(key) || key
			return {
				[newKey]: gridData[key]
			};
		});
		return gridtype.reduce((a, b) => Object.assign({}, a, b))	
	}


	public loadVisit() {



		let clientvistData = this.convertToClientVisit(this.visitData, outletHealthScoreProperties);
		this.visitResponse.push(clientvistData);

		let elepresenceData = this.convertToClientVisit(this.visitData, elementsPresenceProps);
		this.elePresenceData.push(elepresenceData);

		let assetReport = this.convertToClientVisit(this.visitData, assetReportProps);
		this.assetReport.push(assetReport);

		let stockAvailable = this.convertToClientVisit(this.visitData, stockAvailabilityProps);
		this.stockAvailability.push(stockAvailable);

		let kdeChangeReq = this.convertToClientVisit(this.visitData, kdeChangeRequestProps);
		this.kdeChangeRequest.push(kdeChangeReq);



		// converting to title cases


		

		// let outletHealthNames = this.titleConversion(this.visitResponse[0].data)
		// this.visitResponse[0].data = outletHealthNames.reduce((a, b) => Object.assign({}, a, b));


		// let elePresenceNames =this.titleConversion(this.elePresenceData[0].data)
		// this.elePresenceData[0].data = elePresenceNames.reduce((a, b) => Object.assign({}, a, b));



		// let asserReportNames = this.titleConversion(this.assetReport[0].data) 
		// this.assetReport[0].data = asserReportNames.reduce((a, b) => Object.assign({}, a, b));



		// let stockAvilParams = this.titleConversion(this.stockAvailability[0].data) 
		// this.stockAvailability[0].data = stockAvilParams.reduce((a, b) => Object.assign({}, a, b));


		// let kdeChangeNames = this.titleConversion(this.kdeChangeRequest[0].data) 
		// this.kdeChangeRequest[0].data = kdeChangeNames.reduce((a, b) => Object.assign({}, a, b));




	}

	
	


	public getTitleCase(key) {
		// console.log(key)
		var str = '';
		for (let i = 0; i < key.split('_').length; i++) {
			str = str + key.split('_')[i].charAt(0).toUpperCase() + key.split('_')[i].slice(1) + ' ';
		}
		return str;
	}

	public convertToClientVisit(visit: VisitDetails, constProps) {
		const visitData = visit.data;
		const clientVisit: any = {}

		clientVisit.data = this.fillProperties(constProps, visitData, {});
		// console.log(clientVisit)
		return clientVisit
	}





	
	private fillProperties(props: Array < string > , source: any, destination: any): any {
		props.forEach(propertyName => {

			destination[propertyName] = source[propertyName]

		});
		// console.log("Destination: "+JSON.stringify(destination));
		return destination;

	}


	private initialisedForm(visit): FormGroup {

		return this.formBuilder.group({
			outlet_id: [visit ? visit.dhanush_id: null],
			name: [(visit.store_name) ? visit.store_name.trim() : null],
			wd_id: [visit ? visit.wd_id : null],
			merchandiser_name: [visit ? visit.marchendiser_name: null],
			market_name: [visit ? visit.market_name: null],
			created_at: [visit ? visit.visited_on: null],
			beat_name: [visit ? visit.beat_name: null],

		});
	}

	public close() {
		this.router.navigate(['/rainbow/visits']);

	}
	
	ngOnDestroy(): void {
		if (this.subscription) {
		  this.subscription.unsubscribe();
		}
		
	  }

}