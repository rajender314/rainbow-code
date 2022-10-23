import { Option } from './common.models';
import * as moment from 'moment'
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { DATE_FORMAT } from 'src/app/utils/utils-function';

export interface DateFunction extends Option<string> {
    name: string,
    start(): string;
    end(): string;
}

export class DateUtil {

    public static DATE_FORMAT = 'YYYY-MM-DD';

    public static ALL_DURATION: DateFunction = { name: "ALL_DURATION", label: 'Entire range', start: () => null, end: () => null }
    public static TODAY: DateFunction = { name: "TODAY", label: 'Today', start: () => DateUtil.getRelativeDate({}), end: () => DateUtil.getRelativeDate({}) }
    public static CURRENT_WEEK: DateFunction = { name: "CURRENT_WEEK", label: 'Current week', start: () => moment().startOf('week').format(DateUtil.DATE_FORMAT), end: () => DateUtil.getRelativeDate({}) }
    public static CURRENT_MONTH: DateFunction = { name: "CURRENT_MONTH", label: 'Current month', start: () => moment().startOf('month').format(DateUtil.DATE_FORMAT), end: () => DateUtil.getRelativeDate({}) }
    public static YESTERDAY: DateFunction = { name: "YESTERDAY", label: 'Yesterday', start: () => DateUtil.getRelativeDate({ days: 1 }), end: () => DateUtil.getRelativeDate({ days: 1 }) }
    public static LAST_WEEK: DateFunction = { name: "LAST_WEEK", label: 'Last week', start: () => moment().subtract(1, "weeks").startOf('week').format(DateUtil.DATE_FORMAT), end: () => moment().subtract(1, "weeks").endOf('week').format(DateUtil.DATE_FORMAT) }
    public static LAST_MONTH: DateFunction = { name: "LAST_MONTH", label: 'Last month', start: () => moment(DateUtil.getRelativeDate({ months: 1 })).startOf('month').format(DateUtil.DATE_FORMAT), end: () => moment().subtract(1, "months").endOf('month').format(DateUtil.DATE_FORMAT) }
    public static PAST_3_MONTHS: DateFunction = { name: "PAST_3_MONTHS", label: 'Past 3 months', start: () => moment().subtract(3, "months").startOf('month').format(DateUtil.DATE_FORMAT), end: () => DateUtil.getRelativeDate({}) }
    public static CUSTOM: DateFunction = { name: "CUSTOM", label: 'Select date range', start: () => null, end: () => null }
    public static NEXT_30_DAYS: DateFunction = { name: "NEXT_30_DAYS", label: 'Next 30 days', start: () => moment().format(DateUtil.DATE_FORMAT), end: () => moment().add(30, 'days').format(DateUtil.DATE_FORMAT) }

    public static DATE_FUNCTIONS: DateFunction[] =
        [
            DateUtil.TODAY,
            DateUtil.CURRENT_WEEK,
            DateUtil.CURRENT_MONTH,
            DateUtil.YESTERDAY,
            DateUtil.LAST_WEEK,
            DateUtil.LAST_MONTH,
            DateUtil.PAST_3_MONTHS,
            DateUtil.NEXT_30_DAYS,
            DateUtil.ALL_DURATION,
            DateUtil.CUSTOM
        ];

    public static getRelativeDate(dateParams: DateInput): string {
        return moment()
            .subtract(dateParams.years, 'years')
            .subtract(dateParams.months, 'months')
            .subtract(dateParams.weeks, 'weeks')
            .subtract(dateParams.days, 'days')
            .format(DateUtil.DATE_FORMAT);
    }

    public static convertToOption(dateFunction: DateFunction): Option<any> {
        return {
            label: dateFunction.label,
            value: {
                dateFunction: dateFunction,
                start: dateFunction.start(),
                end: dateFunction.end()
            },
            icon: 'calendar-outline'
        }
    }

    public static convertToOptions(dateFunctions: Array<DateFunction>): Array<Option<any>> {
        return dateFunctions.map<Option<any>>(dateFunction => DateUtil.convertToOption(dateFunction))
    }

    public static compareDateFunction(dateFunction: DateFunction): DateFunction {
        if (dateFunction.name != DateUtil.ALL_DURATION.name) {
            const currentStart = dateFunction.start();
            const currentEnd = dateFunction.end();
            const days = moment(currentEnd).diff(moment(currentStart), 'days')
            const end = moment(currentStart).subtract(1, 'days')
            const start = moment(end).subtract(days, 'days')
            return {
                name: DateUtil.CUSTOM.name,
                label: DateUtil.CUSTOM.label,
                start: () => start.format(DATE_FORMAT),
                end: () => end.format(DATE_FORMAT)
            }
        }
        return null;
    }
}

export interface DateInput {
    days?: number,
    weeks?: number,
    months?: number,
    years?: number,
}

export function minDate(refControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): {} | null => {
        let _currentDate = control.value;
        let days = moment(_currentDate).diff(moment(refControl.value), 'days');
        let error = { "mindate": refControl.value };
        return days < 0 ? error : null;
    };
}
