import { Component, Inject, OnInit } from '@angular/core';
import { BaseAPI } from 'src/app/services/api/base.api';
import { apiDirectory } from 'src/global';
import { UIActionParams } from '../models/common.models';
import { ACTION_PARAMS } from '../services/data-provider.service';

@Component({
  selector: 'adj-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit {

  public title:string;
  public selectedImgUrl:string;
  public selectedImageName:string;
  public imageURLs:any;
  private body: any;

  constructor(@Inject(ACTION_PARAMS) private inputData: UIActionParams,private baseAPI: BaseAPI) { }

  ngOnInit() {
    const parameters = this.inputData.data.parameters;
    this.title = parameters.title;
    this.selectedImgUrl = "https://firebasestorage.googleapis.com/v0/b/project-sunshine-7c5a0.appspot.com/o/imagesV2%2FVEC50611593865143824%2FVEC0001580891298-side1_counter_front_photo.jpeg?alt=media&token=b17ff4d9-5ad0-4166-8e3d-abb57bf6bc02";
    this.selectedImageName = "Counter";

    this.baseAPI.executeGet({
      url: apiDirectory.visitPreImages
    }).subscribe(response => {
      this.imageURLs = response;
    }, error => this.body.error = error)
  }
  public close(value: any = null, role: string = "closed") {
    this.inputData.data.onClose(value, role);
  }

  public showSelectedImage(selectedImageURL, selectedImageName){
    this.selectedImgUrl = selectedImageURL;
    this.selectedImageName = selectedImageName;
    
  }
}
