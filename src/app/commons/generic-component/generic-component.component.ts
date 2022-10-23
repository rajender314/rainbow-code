import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { BaseAPI } from 'src/app/services/api/base.api';
import { Refreshable, UserSettings } from 'src/models/app.models';
import { BodyComponent } from '../body/body.component';
import { PopoverService } from '../services/popover.service';


@UntilDestroy()
@Component({
  selector: 'adj-generic-component',
  templateUrl: './generic-component.component.html',
  styleUrls: ['./generic-component.component.scss'],
})
export abstract class GenericComponentComponent<T> implements OnInit, AfterViewInit, Refreshable {

  @ViewChild(BodyComponent)
  protected body: BodyComponent

  public settings: UserSettings;

  constructor(protected baseAPI: BaseAPI, protected popover: PopoverService) { }

  ngOnInit() {
    // this.popover.userSettings.settings.pipe(untilDestroyed(this)).subscribe(settins => {
    //   this.settings = settins;
    // })
  }

  ngAfterViewInit(): void {
    // setTimeout(()=>{
    //   this.refresh(); 
    // },10);
  }

  public refresh(): void {
    this.body.startLoading();
    this.getObserable().subscribe((result) => {
      this.onResult(result);
      this.body.completeLoading();
    },
      error => this.body.error = error)
  }

  protected abstract getObserable(): Observable<T>

  protected abstract onResult(result: T): void;

}
