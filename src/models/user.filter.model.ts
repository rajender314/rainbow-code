import { Group, Place, Role, UserDetail } from 'src/models/app.models';
import { Filter } from './filter.model';

export class UserFilter extends Filter {

    public groups: Array<Group>;
    public role: any;
    public manager: UserDetail;
    public place: Place;

    public copy(): UserFilter {
        return Object.assign(new UserFilter(), this);
    }

    public toQureryMap(): Map<string, any> {
        const queryMap = new Map<string, any>();
        queryMap.set('groups', this.nullOrPrimaryKeys(this.groups, (group: Group) => group.id));
        queryMap.set('role', (this.role) ? this.role.role_id : null);
        queryMap.set('manager', (this.manager) ? this.manager.id : null);
        queryMap.set('place', (this.place) ? this.place.id : null);
        return queryMap;
    }
}