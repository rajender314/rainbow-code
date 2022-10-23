
import { Beat, Distributor, Identifiable, OrganisationNode, Store, StoreType, UserDetail } from './../../models/app.models';
import { Filter } from './../../models/filter.model';
import { PaginatedResponse } from '../commons/models/common.models';
import { BaseAPI } from '../services/api/base.api';
import { isNotEmpty, mapOf } from '../utils/utils-function';

export class VisitFilter extends Filter {

    public branch: Array<any>;
    public MarketName: Array<Identifiable>;
    public RAType: Array<Identifiable>;
    public RAColor: Array<Distributor>;
    public Beat: Array<Identifiable>;
    public Merchandiser: Array<Identifiable>;
  

    public toQureryMap(): Map<string, any> {
        const queryMap = new Map<string, any>();
        queryMap.set('branch', this.nullOrPrimaryKeys(this.branch, (branch: any) => branch.branch_id));
        queryMap.set('market_name', this.nullOrPrimaryKeys(this.MarketName, (instance: any) => instance.id));
        queryMap.set('ratype', this.nullOrPrimaryKeys(this.RAType, (instance: any) => instance.id));
        queryMap.set('racolor', this.nullOrPrimaryKeys(this.RAColor, (distributor) => distributor.id));
        queryMap.set('beat', this.nullOrPrimaryKeys(this.Beat, (instance: any) => instance.id));
        queryMap.set('merchantiser', this.nullOrPrimaryKeys(this.Merchandiser, (instance: any) => instance.id));
        
        return queryMap;
    }


    public toNameMap(): Map<string, any> {
        const queryMap = new Map<string, any>();
        queryMap.set('branch', this.nullOrPrimaryKeys(this.branch, (branch: any) => branch.branch_id));
        queryMap.set('market_name', this.nullOrPrimaryKeys(this.MarketName, (instance: any) => instance.id));
        queryMap.set('ratype', this.nullOrPrimaryKeys(this.RAType, (instance: any) => instance.id));
        queryMap.set('racolor', this.nullOrPrimaryKeys(this.RAColor, (distributor) => distributor.id));
        queryMap.set('beat', this.nullOrPrimaryKeys(this.Beat, (instance: any) => instance.id));
        queryMap.set('merchantiser', this.nullOrPrimaryKeys(this.Merchandiser, (instance: any) => instance.id));
        
        
        return queryMap;
    }


    public copy(): VisitFilter {
        return Object.assign(new VisitFilter(), this);
    }

    public toIdentifibleIterator(): Array<{ name: string, values: Array<Identifiable> }> {
        const identifiableIterator = new Array<{ name: string, values: Array<Identifiable> }>();
        if ((isNotEmpty(this.branch))) {
            identifiableIterator.push({
                name: 'Branch',
                values: this.branch.map(type => {
                    return { id: type.branch_id + "", name: type.branch }
                })
            })
        }
        if ((isNotEmpty(this.MarketName))) {
            identifiableIterator.push({
                name: 'Beat Type',
                values: this.MarketName
            })
        }
        if ((isNotEmpty(this.RAType))) {
            identifiableIterator.push({
                name: 'Beat Name',
                values: this.RAType
            })
        }
        if ((isNotEmpty(this.RAColor))) {
            identifiableIterator.push({
                name: 'Distributors',
                values: this.RAColor.map(type => {
                    return { id: type.id + "", name: type.name }
                })
            })
        }
        if ((isNotEmpty(this.Beat))) {
            identifiableIterator.push({
                name: 'Day of delivery',
                values: this.Beat.map(type => {
                    return { id: type.id + "", name: type.name }
                })
            })
        }

        if ((isNotEmpty(this.Merchandiser))) {
            identifiableIterator.push({
                name: 'Stores',
                values: this.Merchandiser.map(store => {
                    return { id: store.id + "", name: store.name }
                })
            })
        }
        
        return identifiableIterator;
    }

    // public static fill(values: any, baseAPI: BaseAPI, VisitFilter: VisitFilter): void {
    //     if (isNotEmpty(values['store_type'])) {
    //         const storeTypeIds = values['store_type'] as Array<number>;
    //         baseAPI.get<PaginatedResponse<StoreType>>({
    //             url: apiDirectory.storeType
    //         }).subscribe(storeTypes => {
    //             VisitFilter.storeType = storeTypes.results.filter(storeType => storeTypeIds.indexOf(storeType.id) > -1);
    //         })
    //     }

    //     if (isNotEmpty(values['beat_type'])) {
    //         const beatTypeIds = values['beat_type'] as Array<string>;
    //         VisitFilter.beatType = beatTypeIds.map(beatTypeId => {
    //             return { id: beatTypeId, name: beatTypeId };
    //         })
    //     }

    //     if (isNotEmpty(values['beat_name'])) {
    //         const beatNameIds = values['beat_name'] as Array<number>;
    //         baseAPI.get<PaginatedResponse<Beat>>({
    //             url: apiDirectory.beatList,
    //             params: mapOf({ key: 'id', value: beatNameIds })
    //         }).subscribe(pageList => {
    //             VisitFilter.beatName = pageList.results.map(beat => {
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
    //             VisitFilter.distributor = pageList.results;
    //         })
    //     }

    //     if (isNotEmpty(values['outlet'])) {
    //         const storeIds = values['outlet'] as Array<number>;
    //         baseAPI.get<PaginatedResponse<Store>>({
    //             url: apiDirectory.storesList,
    //             params: mapOf({ key: 'outlet', value: storeIds })
    //         }).subscribe(pageList => {
    //             VisitFilter.stores = pageList.results;
    //         })
    //     }

    //     if (isNotEmpty(values['node'])) {
    //         const nodeIds = values['node'] as Array<number>;
    //         baseAPI.get<Array<OrganisationNode>>({
    //             url: apiDirectory.organisationNodes,
    //             params: mapOf({ key: 'id', value: nodeIds })
    //         }).subscribe(pageList => {
    //             VisitFilter.node = pageList;
    //         });
    //     }

    //     if (values['distributor_absent'] == 'False') {
    //         VisitFilter.onlyDistributorPresent = true;
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