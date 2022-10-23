import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Organisation, OrganisationNode } from "src/models/app.models";
import {
  isNull,
  isNotEmpty,
  isEmpty,
  unsubscribeAll,
} from "src/app/utils/utils-function";
import { OrganisationService } from "src/app/services/organisation/organisation.service";
import { PopoverService } from "../services/popover.service";
import { Option } from "../models/common.models";
import { iif, Subscription } from "rxjs";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "adj-organisation",
  templateUrl: "./organisation.component.html",
  styleUrls: ["./organisation.component.scss"],
})
export class OrganisationComponent implements OnInit {
  public organisation: Partial<Organisation>;
  public currentOrg: Array<Partial<OrganisationNode>>;
  private nodes: Array<OrganisationNode>;
  private subscriptions: Array<Subscription>;
  public status = { value: true, label: "Rainbow", name: "status" };
  public statusNmae: any;
  constructor(
    private orgService: OrganisationService,
    private popover: PopoverService,
    private router: Router,
    private _cdr: ChangeDetectorRef,
    private uiProvider: PopoverService,
    private route: ActivatedRoute
  ) {
    this.subscriptions = new Array<Subscription>();

    if (
      this.router.url == "/sunrise/dashboard" ||
      this.router.url == "/sunrise/stores"
    ) {
      this.statusNmae = { value: false, label: "Sunrise", name: "status" };
    } else {
      this.statusNmae = { value: true, label: "Rainbow", name: "status" };
    }
  }

  private processOrgChange(
    organisation: Partial<Organisation>,
    nodes: Array<OrganisationNode>
  ): Array<Partial<OrganisationNode>> {
    const currentOrg = new Array<Partial<OrganisationNode>>();

    let currentNode = organisation.root;
    while (currentNode != null) {
      currentOrg.push(currentNode);
      currentNode = currentNode.child;
    }
    const leafNode = this.getLeafNode(currentOrg[currentOrg.length - 1], nodes);
    if (leafNode) {
      currentOrg.push(leafNode);
    }
    return currentOrg;
  }

  ngOnInit() {
    const s = this.orgService.organisation.subscribe((org) => {
      this.organisation = org;

      if (this.nodes) {
        this.currentOrg = this.processOrgChange(org, this.nodes);
      }
    });

    const p = this.orgService.allOrganisationNodes.subscribe((nodes) => {
      if (isNotEmpty(nodes)) {
        this.nodes = nodes;
        this.currentOrg = this.processOrgChange(this.organisation, nodes);
      }
    });
    this.subscriptions.push(s, p);
  }

  private getLeafNode(
    parentNode: Partial<OrganisationNode>,
    nodes: Array<OrganisationNode>
  ): Partial<OrganisationNode> {
    const parentID = parentNode.id;
    const childNodes = nodes.filter((node) => node.parent_id == parentID);
    if (isNotEmpty(childNodes)) {
      return {
        name: "ALL",
        id: null,
        parent_id: parentID,
        type: childNodes[0].type,
        canChange: true,
      };
    }
    return null;
  }

  public showOptions(event: Event, currentNode: OrganisationNode): void {
    const parentId = currentNode.parent_id;
    if (isNull(parentId) || isEmpty(this.nodes) || !currentNode.canChange) {
      return;
    }
    const options = this.nodes
      .filter((node) => node.parent_id == parentId)
      .map((node) => {
        return {
          label: node.name,
          value: node,
          icon: "location-outline",
        } as Option<OrganisationNode>;
      });

    options.push({
      label: "ALL",
      value: { name: "all", id: "all" },
      icon: "location-outline",
    } as Option<OrganisationNode>);

    this.uiProvider.showActions({
      event: event,
      params: {
        options: options,
        selectedValue: {
          label: currentNode.name,
          value: currentNode,
          icon: "location-outline",
        },
      },
      selectHandler: (node: Option<OrganisationNode>) => {
        if (node.label == "ALL") {
          this.orgService.removeOrgName(currentNode);
        } else {
          const selectedNode = node.value;
          selectedNode.canChange = true;
          this.orgService.updateOrgNode(selectedNode);
        }
      },
    });
  }

  public projectOptions($event: Event): void {
    this.popover.showActions({
      event: $event,
      params: {
        options: [
          { label: "Rainbow", value: true, name: "status" },
          { label: "Sunrise", value: false, name: "status" },
        ],
        selectedValue: this.statusNmae ? this.statusNmae : this.status,
      },
      selectHandler: (option: Option<boolean>) => {
        this.status = {
          value: option.value,
          label: option.label,
          name: "status",
        };
        this.orgService.setProjName(this.status.value);
        this.goToPath(this.status.value);
      },
    });
  }
  public goToPath(value) {
    if (value == true) {
      this.router.navigate(["rainbow/dashboard"]);
    } else if (value == false) {
      this.router.navigate(["/sunrise/dashboard"]);
    }
  }
  ngOnDestroy(): void {
    unsubscribeAll(this.subscriptions);
  }
}
