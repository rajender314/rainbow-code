import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Organisation, OrganisationNode, OrganisationNodeType, UserDetail } from 'src/models/app.models';
import { isNotNull } from 'src/app/utils/utils-function';
import { map, catchError } from 'rxjs/operators';
import { BaseAPI, Request } from '../api/base.api';
import { apiDirectory } from 'src/global';
import { OrganisationImpl } from 'src/models/organisation.models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  private currentOrgnisation: BehaviorSubject<Readonly<Organisation>>;
  private organisationNodes: BehaviorSubject<Array<OrganisationNode>>;
  projNameSubject = new Subject<any>();
  constructor(private authService: AuthenticationService, private baseAPI: BaseAPI) {
    this.currentOrgnisation = new BehaviorSubject(null);
    this.organisationNodes = new BehaviorSubject([]);
    this.authService.currentUser.subscribe((user: UserDetail) => {
      const org = this.loadOrganisation(user);
      if (isNotNull(org)) {
        this.currentOrgnisation.next(org);
      }
    });
  }
  myIndex: any
  public get organisation(): Observable<Readonly<Partial<Organisation>>> {
    return this.currentOrgnisation.asObservable()
      .pipe(map(organisation => OrganisationImpl.copy(organisation)));
  }

  public getChildren(nodeId: string): Array<OrganisationNode> {
    if (this.organisationNodes.value) {
      return this.organisationNodes.value.filter(node => node.parent_id == nodeId);
    }
    return [];
  }

  public updateOrgNode(newNode: OrganisationNode): void {
    if (isNotNull(newNode)) {
      const result = this.findParentNode(newNode, this.currentOrgnisation.getValue())
      if (result && result.parentNode) {
        result.parentNode.child = { ...newNode };
        this.currentOrgnisation.next(result.org);
      }
    }
  }


  private findParentNode(orgNode: OrganisationNode, organisation: Organisation): { org: Organisation, parentNode: OrganisationNode } {
    if (isNotNull(orgNode)) {
      const currentValue = new OrganisationImpl(organisation);
      let node = currentValue.root;
      while (node.id != orgNode.parent_id) {
        node = node.child;
      }
      return { org: currentValue, parentNode: node };
    }
    return null;
  }

  public removeOrgName(orgNode: OrganisationNode): void {
    if (isNotNull(orgNode)) {
      const result = this.findParentNode(orgNode, this.currentOrgnisation.getValue())
      if (result && result.parentNode) {
        result.parentNode.child = null;
        this.currentOrgnisation.next(result.org);
      }
    }
  }

  public loadOrgNodes(): Promise<any> {
    return this.baseAPI.executeGet({
      url: apiDirectory.organisationNodes,
    }).pipe(
      map(nodes => {
        this.organisationNodes.next(nodes);
        return nodes;
      }),
      catchError(error => of([]))
    )
      .toPromise();
  }

  public get allOrganisationNodes(): Observable<Array<OrganisationNode>> {
    return this.organisationNodes.asObservable();
  }

  private loadOrganisation(user: UserDetail): Organisation {
    let organisation: Organisation = null;
    if (isNotNull(user) && isNotNull(user.place_data)) {
      organisation = new OrganisationImpl(user.place_data)
    }
    console.log(organisation)
    return Object.freeze(organisation);
  }


  public getOrganisationParams(org: Partial<Organisation>): Map<string, string> {
    const params = new Map<string, string>();
    if (isNotNull(org)) {
      let currentNode = org.root;
      let orgNodeID = null;
      while (currentNode) {
        orgNodeID = currentNode.id;
        currentNode = currentNode.child;
      }
      params.set('org_node', orgNodeID)
    }
    return params;
  }
  getProjName() {
    return this.projNameSubject.asObservable();
  }

  setProjName(value) {
    this.projNameSubject.next(value);
  }
}
