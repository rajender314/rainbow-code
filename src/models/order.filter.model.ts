import { Option } from 'src/app/commons/models/common.models';
import { isNotBlank, isNotEmpty } from 'src/app/utils/utils-function';
import { Filter } from './filter.model';

export class OrderFilter extends Filter {
    public salesman: Array<any>;
    public stores: Array<any>;
    public storeType: Array<any>;
    public products: Array<any>;
    public brands: Array<any>;
    public schemes: Array<any>;
    public schemesType: Array<any>;
    public billType: Array<any>;
    public geofenceOrder: string;

    public static copy(filter: OrderFilter): OrderFilter {
        return Object.assign(new OrderFilter(), filter);
    }

    public copy(): OrderFilter {
        return Object.assign(new OrderFilter(), this);
    }

    public toQureryMap(): Map<string, any> {
        const queryMap = new Map<string, any>();
        queryMap.set('salesman', this.nullOrPrimaryKeys(this.salesman, (salesman) => salesman.user_id));
        queryMap.set('store', this.nullOrPrimaryKeys(this.stores, (store) => store.outlet_id));
        queryMap.set('store_type', this.nullOrPrimaryKeys(this.storeType));
        queryMap.set('products', this.nullOrPrimaryKeys(this.products));
        queryMap.set('brands', this.nullOrPrimaryKeys(this.brands));
        queryMap.set('schemes', this.nullOrPrimaryKeys(this.schemes));
        queryMap.set('scheme_type', this.nullOrPrimaryKeys(this.schemesType));
        queryMap.set('bill_type', this.nullOrPrimaryKeys(this.billType, (billType: Option<string>) => billType.value));
        queryMap.set('geofence_order', this.nullOrPrimaryKeys(this.geofenceOrder, (geoFence: Option<string>) => geoFence.value));
        return queryMap;
    }
}