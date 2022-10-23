import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Permission, UserDetail } from 'src/models/app.models';
import { isNull } from 'src/app/utils/utils-function';
import { AuthenticationService } from '../authentication/auth.service';

@Injectable({ providedIn: 'root' })
export class UserPermissionService {

    private permissions: BehaviorSubject<Array<Permission>>;

    constructor(private auth: AuthenticationService) {
        this.permissions = new BehaviorSubject<Array<Permission>>(null);
        this.auth.currentUser.subscribe(user => this.handleUserChange(user))
    }

    public get userPermissions(): Observable<Array<Permission>> {
        return this.permissions.asObservable();
    }

    private handleUserChange(user: UserDetail): void {
        if (isNull(user)) {
            this.permissions.next([]);
            return;
        }
        const permissions = user.groups
            .map(group => group.permissions)
            .reduce((flatten, array) => [...flatten, ...array], []).map((permission: Permission) => {
                permission.qualified_name = this.getQualifiedName(permission);
                return permission;
            });
        this.permissions.next(permissions);
    }

    private getQualifiedName(permission: Permission): string {
        const [module, model] = (permission.content_type as string).split("|").map(s => s.trim());
        const qualifiedName = module + '.' + permission.codename.toLowerCase();
        return qualifiedName;
    }


}