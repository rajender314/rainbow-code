import { apiDirectory } from 'src/global';
import { Beat, Distributor, Identifiable, OrganisationNode, Store, StoreType, UserDetail } from 'src/models/app.models';
import { Filter } from 'src/models/filter.model';
import { PaginatedResponse } from '../commons/models/common.models';
import { BaseAPI } from '../services/api/base.api';
import { isNotEmpty, mapOf } from '../utils/utils-function';

export class StoreFilter extends Filter {

    public storeType: Array<StoreType>;
    public beatType: Array<Identifiable>;
    public beatName: Array<Identifiable>;
    public distributor: Array<Distributor>;
    public day: Array<Identifiable>;
    public week: Array<Identifiable>;
    public onlyDistributorPresent: boolean;
    public stores: Array<Store>;
    public node: Array<OrganisationNode>;

    public toQureryMap(): Map<string, any> {
        const queryMap = new Map<string, any>();
        queryMap.set('store_type', this.nullOrPrimaryKeys(this.storeType, (storeType: StoreType) => storeType.id));
        queryMap.set('beat_type', this.nullOrPrimaryKeys(this.beatType, (instance: any) => instance.id));
        queryMap.set('beat_name', this.nullOrPrimaryKeys(this.beatName, (instance: any) => instance.id));
        queryMap.set('distributor', this.nullOrPrimaryKeys(this.distributor, (distributor: Distributor) => distributor.id));
        queryMap.set('day', this.nullOrPrimaryKeys(this.day, (instance: any) => instance.id));
        queryMap.set('week', this.nullOrPrimaryKeys(this.week, (instance: any) => instance.id));
        queryMap.set('outlet', this.nullOrPrimaryKeys(this.stores, (instance: Store) => instance.outlet_id));
        queryMap.set('node', this.nullOrPrimaryKeys(this.node, (instance: OrganisationNode) => instance.id));
        if (this.onlyDistributorPresent) {
            queryMap.set('distributor_absent', 'False');
        }
        return queryMap;
    }


    public toNameMap(): Map<string, any> {
        const queryMap = new Map<string, any>();
        queryMap.set('store_type', this.nullOrNameValue(this.storeType, (storeType: StoreType) => storeType.name));
        queryMap.set('beat_type', this.nullOrNameValue(this.beatType));
        queryMap.set('beat_name', this.nullOrNameValue(this.beatName));
        queryMap.set('distributor', this.nullOrNameValue(this.distributor, (distributor: Distributor) => distributor.name));
        queryMap.set('day', this.nullOrNameValue(this.day));
        queryMap.set('week', this.nullOrNameValue(this.week));
        queryMap.set('outlet', this.nullOrNameValue(this.stores));
        queryMap.set('node', this.nullOrNameValue(this.node, (instance: OrganisationNode) => instance.name));
        if (this.onlyDistributorPresent) {
            queryMap.set('distributor_absent', 'False');
        }
        return queryMap;
    }


    public copy(): StoreFilter {
        return Object.assign(new StoreFilter(), this);
    }

    public toIdentifibleIterator(): Array<{ name: string, values: Array<Identifiable> }> {
        const identifiableIterator = new Array<{ name: string, values: Array<Identifiable> }>();
        if ((isNotEmpty(this.storeType))) {
            identifiableIterator.push({
                name: 'Store Type',
                values: this.storeType.map(type => {
                    return { id: type.id + "", name: type.name }
                })
            })
        }
        if ((isNotEmpty(this.beatType))) {
            identifiableIterator.push({
                name: 'Beat Type',
                values: this.beatType
            })
        }
        if ((isNotEmpty(this.beatName))) {
            identifiableIterator.push({
                name: 'Beat Name',
                values: this.beatName
            })
        }
        if ((isNotEmpty(this.distributor))) {
            identifiableIterator.push({
                name: 'Distributors',
                values: this.distributor.map(type => {
                    return { id: type.id + "", name: type.name }
                })
            })
        }
        if ((isNotEmpty(this.day))) {
            identifiableIterator.push({
                name: 'Day of delivery',
                values: this.day.map(type => {
                    return { id: type.id + "", name: type.name }
                })
            })
        }

        if ((isNotEmpty(this.stores))) {
            identifiableIterator.push({
                name: 'Stores',
                values: this.stores.map(store => {
                    return { id: store.outlet_id + "", name: store.name }
                })
            })
        }
        if ((isNotEmpty(this.node))) {
            identifiableIterator.push({
                name: 'Geography',
                values: this.node.map(node => {
                    return { id: node.id + "", name: node.name }
                })
            })
        }

        if (this.onlyDistributorPresent) {
            identifiableIterator.push({
                name: 'Distributor Present',
                values: [{ id: 'True', name: 'True' }]
            });
        }
        return identifiableIterator;
    }

    // public static fill(values: any, baseAPI: BaseAPI, storeFilter: StoreFilter): void {
    //     if (isNotEmpty(values['store_type'])) {
    //         const storeTypeIds = values['store_type'] as Array<number>;
    //         baseAPI.get<PaginatedResponse<StoreType>>({
    //             url: apiDirectory.storeType
    //         }).subscribe(storeTypes => {
    //             storeFilter.storeType = storeTypes.results.filter(storeType => storeTypeIds.indexOf(storeType.id) > -1);
    //         })
    //     }

    //     if (isNotEmpty(values['beat_type'])) {
    //         const beatTypeIds = values['beat_type'] as Array<string>;
    //         storeFilter.beatType = beatTypeIds.map(beatTypeId => {
    //             return { id: beatTypeId, name: beatTypeId };
    //         })
    //     }

    //     if (isNotEmpty(values['beat_name'])) {
    //         const beatNameIds = values['beat_name'] as Array<number>;
    //         baseAPI.get<PaginatedResponse<Beat>>({
    //             url: apiDirectory.beatList,
    //             params: mapOf({ key: 'id', value: beatNameIds })
    //         }).subscribe(pageList => {
    //             storeFilter.beatName = pageList.results.map(beat => {
    //                 return { ...beat, id: beat.id + "", name: beat.name + " - " + beat.type }
    //             });
    //         })
    //     }

    //     if (isNotEmpty(values['distributor'])) {
    //         const distributorIds = values['distributor'] as Array<number>;
    //         baseAPI.get<PaginatedResponse<Distributor>>({
    //             url: apiDirectory.distributorList,
    //             params: mapOf({ key: 'id', value: distributorIds })
    //         }).subscribe(pageList => {
    //             storeFilter.distributor = pageList.results;
    //         })
    //     }

    //     if (isNotEmpty(values['outlet'])) {
    //         const storeIds = values['outlet'] as Array<number>;
    //         baseAPI.get<PaginatedResponse<Store>>({
    //             url: apiDirectory.storesList,
    //             params: mapOf({ key: 'outlet', value: storeIds })
    //         }).subscribe(pageList => {
    //             storeFilter.stores = pageList.results;
    //         })
    //     }

    //     if (isNotEmpty(values['node'])) {
    //         const nodeIds = values['node'] as Array<number>;
    //         baseAPI.get<Array<OrganisationNode>>({
    //             url: apiDirectory.organisationNodes,
    //             params: mapOf({ key: 'id', value: nodeIds })
    //         }).subscribe(pageList => {
    //             storeFilter.node = pageList;
    //         });
    //     }

    //     if (values['distributor_absent'] == 'False') {
    //         storeFilter.onlyDistributorPresent = true;
    //     }
    // }


}

export class StoreOnboardingFilter extends Filter {

    public status: Identifiable;
    public steps: Array<Identifiable>;
    public salesman: Array<UserDetail>;

    public copy(): Filter {
        return Object.assign(new StoreOnboardingFilter(), this);
    }
    public toQureryMap(): Map<string, any> {
        const queryMap = new Map<string, any>();
        queryMap.set('status', (this.status) ? this.status.id : "");
        queryMap.set('asm_status', this.nullOrPrimaryKeys(this.steps));
        queryMap.set('salesman', this.nullOrPrimaryKeys(this.salesman, (user: UserDetail) => user.id));
        return queryMap;
    }

}