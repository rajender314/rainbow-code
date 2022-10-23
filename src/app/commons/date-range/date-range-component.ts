import { Component, OnInit, Inject } from '@angular/core';
import { Option, UIActionParams, ComponentInput } from '../models/common.models';
import { ACTION_PARAMS } from '../services/data-provider.service';
import { DateUtil, DateFunction } from '../models/date.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment'

@Component({
  selector: 'adj-date-range',
  templateUrl: './date-range-component.html',
  styleUrls: ['./date-range-component.scss'],
})
export class DateRangeComponent implements OnInit {

  public showDateRange: boolean;
  public dateRangeForm: FormGroup;
  public dateOptions: Array<Option<any>>;
  private componentInput: ComponentInput;
  public currentFunction: DateFunction;

  constructor(
    @Inject(ACTION_PARAMS) private inputData: UIActionParams,
    private formBuilder: FormBuilder) {
    this.componentInput = this.inputData.data;
  }

  ngOnInit() {
    this.dateOptions = DateUtil.convertToOptions(DateUtil.DATE_FUNCTIONS);
  }

  public selectDateFunction(option: Option<any>): void {
    this.currentFunction = option.value.dateFunction;
    if (option.label == DateUtil.CUSTOM.label) {
      this.initialiseDateForm(null);
      this.showDateRange = true;
      return;
    }
    this.showDateRange = false;
  }

  private initialiseDateForm(dateFunction: DateFunction): void {
    let defaultSV = (dateFunction) ? dateFunction.start() : "";
    let defaultEV = (dateFunction) ? dateFunction.end() : "";
    this.dateRangeForm = this.formBuilder.group({
      startDate: [defaultSV, Validators.required],
      endDate: [defaultEV, [Validators.required]]
    });
  }

  public close(): void {
    if (this.currentFunction) {
      const option = DateUtil.convertToOption(this.currentFunction);
      if (this.currentFunction.label == DateUtil.CUSTOM.label) {
        if (this.dateRangeForm.valid) {
          let formValue = this.dateRangeForm.value;
          let startDate = moment(formValue.startDate).format(DateUtil.DATE_FORMAT);
          let endDate = moment(formValue.endDate).format(DateUtil.DATE_FORMAT);
          let dateRangeFunction: DateFunction = { name: DateUtil.CUSTOM.name, label: DateUtil.CUSTOM.label, start: () => startDate, end: () => endDate };
          option.value.dateFunction = dateRangeFunction;
        } else {
          console.log('not a valid date');
          return;
        }
      }
      this.componentInput.onClose(option, 'selected');
      return;
    }
    this.componentInput.onClose(null, 'closed');
  }

}
