import { Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ACTION_PARAMS } from '../services/data-provider.service';

@Component({
  selector: 'adj-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input()
  public componentClass: any;

  @Input()
  public data: any;

  @ViewChild('container', { read: ViewContainerRef })
  private viewContaniner: ViewContainerRef;

  public readOnlyConfig: any = {};

  public title: string;

  constructor(
    private factory: ComponentFactoryResolver,
    private injector: Injector, private modalContrl: ModalController) { }

  ngOnInit() {
    this.title = (this.data) ? this.data.title : "";
  }

  public close(value: any = null, role: string = 'closed'): void {
    this.modalContrl.dismiss(value, role);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const componentFactory = this.factory.resolveComponentFactory(this.componentClass);
      this.viewContaniner.clear();
      const injector = Injector.create({
        parent: this.injector,
        providers: [{
          provide: ACTION_PARAMS, useValue: {
            data: {
              parameters: this.data,
              onClose: (value: any, role: string) => {
                this.close(value, role)
              }
            }
          }
        }],
      });
      this.viewContaniner.createComponent(componentFactory, 0, injector);
    });
  }

}
