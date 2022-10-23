import { Component, OnInit, Inject } from '@angular/core';
import { ACTION_PARAMS } from '../services/data-provider.service';
import { UIActionParams, Option, ComponentInput } from '../models/common.models';
import { isEmpty, isNotEmpty, isNotNull } from 'src/app/utils/utils-function';
import { AuthCheckDirective } from '../directives/auth-check/auth-check.directive';

@Component({
  selector: 'adj-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {

  public options: Array<Option<any>>;
  public selectedValue: Option<any>;
  private componentInput: ComponentInput;
  public header: string;

  constructor(@Inject(ACTION_PARAMS) private inputData: UIActionParams) {
  }

  ngOnInit() {
    this.componentInput = this.inputData.data;
    const parameters = this.componentInput.parameters;
    if (isNotNull(parameters)) {
      this.options = parameters.options;
      this.header = parameters.header ? parameters.header : null;
      this.selectedValue = parameters.selectedValue;
      if (isNotEmpty(this.options) && Array.isArray(this.options)) {
        this.options = this.options.map(option => {
          option.permissions = (option.permissions) ? option.permissions : [AuthCheckDirective.ALLOWED]
          return option;
        });
      }
    }
  }

  public selectOption(option: Option<any>) {
    this.componentInput.onClose(option, 'selected');
  }

}
