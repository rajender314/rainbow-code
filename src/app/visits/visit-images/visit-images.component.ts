import { GridArray, ImageArray, LightBoxImage } from './../../../models/app.models';
import { BodyComponent } from './../../../app/commons/body/body.component';
import { Lightbox } from 'ngx-lightbox';
import { Component, OnInit, Input } from '@angular/core';
import { BaseAPI } from '../../services/api/base.api';
import { ActivatedRoute, Router } from '@angular/router';
import { apiDirectory } from '../../../global';
import { mapOf } from '../../utils/utils-function';
import { VisitDetails } from '../../../models/app.models';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'adj-visit-images',
  templateUrl: './visit-images.component.html',
  styleUrls: ['./visit-images.component.scss'],
})
export class VisitImagesComponent implements OnInit {
  @Input() visitObject;
	public expandOutlet: boolean = false;
  public showPreImages: boolean = false;
  public clonePreImgArray: Array<GridArray> = [];
  public imageParams: Array<string> = [];
  public imageLinks: Array<ImageArray> = [];
  public isImgLoaded: boolean;
  public noPreDataMsg: boolean;
  public preImgList: Array<LightBoxImage> = [];
	public preLabelNames: Array<string> = [];
	public preImgReq: Array<GridArray> = [];
  public body: BodyComponent;
  private subscription: Subscription;


  constructor(
    private baseAPI: BaseAPI,
		private route: ActivatedRoute,
    private router: Router,
    private lightbox: Lightbox,
  ) { }

  ngOnInit() {

    let preImg = this.convertToImg(this.visitObject.visitdata);
    this.preImgReq.push(preImg);
    
    this.clonePreImgArray = _.cloneDeep(this.preImgReq);
  }

  public showPreImgesSection(): void {
		this.showPreImages = !this.showPreImages;
	
			this.getImagesUrl(this.visitObject.imageProps);

    
  }
  
  public getImagesUrl(imgProps) {
		for (let i = 0; i < imgProps.length; i++) {
			if (this.clonePreImgArray[0].data[imgProps[i]]) {
				this.imageParams.push(this.clonePreImgArray[0].data[imgProps[i]] + '.jpeg');
			}

		}

    this.subscription	= this.baseAPI.executeGet({
			url: apiDirectory.imageUrl,
			params: mapOf({
					key: 'images',
					value: this.imageParams
				}

			)
		}).subscribe(response => {
			// console.log(this.imageParams);

			for (let i = 0; i < this.imageParams.length; i++) {
				if (Object.keys(response).length) {


					this.isImgLoaded = true;
					this.noPreDataMsg = false;
					this.imageLinks.push({
						img: response[this.imageParams[i]][0],
						name: this.imageParams[i]
					});



				} else {
					this.noPreDataMsg = true;
				}


			}

			for (let i = 0; i < this.imageLinks.length; i++) {

        // this.postImgReq[0].postimages[key] = this.postImageLinks[i];
        let obj = {
					src: this.imageLinks[i].img,
					caption: 'test',
					thumb: this.imageLinks[i].img + '-thumb.jpeg'
				}
				this.preImgList.push(obj)

			}


			this.preLabelNames = Object.keys(this.clonePreImgArray[0].data);

			for (let i = 0; i < this.preLabelNames.length; i++) {
				this.preImgList.map((obj, index) => {
					if (i == index) {
						obj['caption'] = this.getTitleCase(this.preLabelNames[i])

					}
				})
			}


			Object.keys(this.preImgReq[0].data).map((key) => {
				for (let i = 0; i < this.imageLinks.length; i++) {
					this.preImgReq[0].data[key] = this.imageLinks[i];
				}
			});

		}, error => this.body.error = error)
  }

  public openPostImgModel(imgArr: Array<any>, index: number): void {

		this.lightbox.open(imgArr, index);

	}
  
  public convertToImg(visit: VisitDetails) {
		const visitData = visit ? visit.data : {};
		const clientVisit: any = {}

		clientVisit.data = this.fillProperties(this.visitObject.imageProps, visitData, {});

		return clientVisit
  }
  
  private fillProperties(props: Array < string > , source: any, destination: any): any {
		props.forEach(propertyName => {

			destination[propertyName] = source[propertyName]

		});


		// console.log("Destination: "+JSON.stringify(destination));

		return destination;


  }
  
  public getTitleCase(key) {
		// console.log(key)
		var str = '';
		for (let i = 0; i < key.split('_').length; i++) {
			str = str + key.split('_')[i].charAt(0).toUpperCase() + key.split('_')[i].slice(1) + ' ';
		}
		return str;
	}


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    
  }

}
