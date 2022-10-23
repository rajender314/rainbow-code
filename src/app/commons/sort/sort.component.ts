import { Component, OnInit, Inject } from '@angular/core';
import { ACTION_PARAMS } from '../services/data-provider.service';
import { UIActionParams, Option } from '../models/common.models';
import { isNotNull } from 'src/app/utils/utils-function';
import { SortParam } from '../models/sort.models';

@Component({
  selector: 'adj-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent implements OnInit {

  public options: Array<Option<string>>;
  public current: SortParam;

  constructor(@Inject(ACTION_PARAMS) private inputData: UIActionParams) { }

  ngOnInit() {
    const componentInput = this.inputData.data;
    const parameters = componentInput.parameters;
    if (isNotNull(parameters)) {
      this.current = parameters.current;
      const options = (parameters.options as Array<Option<string>>);
      this.options = options.map(option => {
        option.meta = {
          order: (this.current && this.current.fieldName == option.value) ? this.current.order : 'ASC'
        }; return option;
      });
    }
  }

  public selectOption(option: Option<string>) {
    const sortParam = new SortParam(option.value, option.meta.order, option);
    this.inputData.data.onClose(sortParam, 'selected');
  }

  public changeOrder(event: Event, item: Option<string>): void {
    event.stopPropagation();
    item.meta.order = item.meta.order == 'ASC' ? 'DESC' : 'ASC';
  }

}
