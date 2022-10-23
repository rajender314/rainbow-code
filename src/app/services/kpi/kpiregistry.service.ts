import { Injectable } from '@angular/core';
import { KPIDescriptor, KPIRole, KPIType } from 'src/app/commons/models/kpi.card.options';
import { Request } from '../api/base.api';
import { apiDirectory } from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class KPIRegistryService {

  private static CURRENCY_ROLE = new KPIRole(KPIType.CURRENCY, 100000, 'Lakh');
  private static NUMBER_ROLE = new KPIRole(KPIType.NUMBER, 1, "");
  private static PERCENTAGE_ROLE = new KPIRole(KPIType.PERCENTAGE, 1, "%");
  private static DECIMAL_ROLE = new KPIRole(KPIType.DECIMAL, 1, "");

  private kpis: Map<string, KPIDescriptor>;

  constructor() {
    this.kpis = new Map<string, KPIDescriptor>();
    this.kpis.set("nrv", this.getNRVKPI());
    this.kpis.set("ptr", this.getPTRKPI());
    this.kpis.set("orders", this.getOrdersKPI());
    this.kpis.set("stores", this.getStoresKPI());
    this.kpis.set("skuCount", this.getSKUCountKPI());
    this.kpis.set("actualCoverage", this.getActualCoverageKPI());
    this.kpis.set("targetCoverage", this.getTargetCoverageKPI());
    this.kpis.set("billedStores", this.getBilledStoresKPI());
    this.kpis.set("unbilledStores", this.getUnbilledStoresKPI());
    this.kpis.set("productivityRatio", this.getProductivityRatioKPI());
    this.kpis.set("coverageDeficit", this.getCoverageDeficitKPI());
    this.kpis.set("ordersPerStore", this.getOrderPerStoreKPI());
    this.kpis.set("ordersPerSalesman", this.getOrderPerSalesmanKPI());
    this.kpis.set("storesPerSalesman", this.getStoresPerSalesmanKPI());
    this.kpis.set("skuPerOrder", this.getSKUPerOrderKPI());

    // Digital KPIS
    this.kpis.set("outlet_count", this.getTotalStores());
    this.kpis.set("distinct_outlet", this.getTotalUniqueStores());
    this.kpis.set("total_credits", this.getSMSCreditUsed());
    this.kpis.set("delivered", this.getSMSDeliveredKPI());
    this.kpis.set("failed", this.getSMSFailedKPI());
    this.kpis.set("blocked", this.getSMSBlockeddKPI());
    this.kpis.set("total_cart", this.getTotalClickedKPI());
    this.kpis.set("cart_with_items", this.getTotalCartKPI());
    this.kpis.set("ordered", this.getTotalDigitalOrderKPI());
    this.kpis.set("order_ptr", this.getTotalDigitalPTRKPI());
    this.kpis.set("order_nrv", this.getTotalDigitalNRVKPI());
    this.kpis.set("deliverd_to_click", this.getDeliverToClickKPI());
    this.kpis.set("click_to_order", this.getClickToOrderKPI());
    this.kpis.set("average_order_nrv", this.getAverageOrderNRVKPI());
    this.kpis.set("average_order_ptr", this.getAverageOrderPTRKPI());
  }

  public getKPI(name: string): KPIDescriptor {
    const kpi = this.kpis.get(name)
    return (kpi) ? kpi.clone() : null;
  }

  private getAverageOrderPTRKPI(): KPIDescriptor {
    return this.buildKPI(
      "PTR per order",
      null,
      'average_order_ptr', KPIRegistryService.DECIMAL_ROLE,
      null,
      "average_order_ptr",
      'Average of PTR per order'
    )
  }

  private getAverageOrderNRVKPI(): KPIDescriptor {
    return this.buildKPI(
      "NRV per order",
      null,
      'average_order_nrv', KPIRegistryService.DECIMAL_ROLE,
      null,
      "average_order_nrv",
      'Average of NRV per order'
    )
  }

  private getClickToOrderKPI(): KPIDescriptor {
    return this.buildKPI(
      "Click to order",
      null,
      'click_to_order', KPIRegistryService.PERCENTAGE_ROLE,
      null,
      "click_to_order",
      'Number of clicks required for each order'
    )
  }

  private getDeliverToClickKPI(): KPIDescriptor {
    return this.buildKPI(
      "Delivered to click",
      null,
      'deliverd_to_click', KPIRegistryService.PERCENTAGE_ROLE,
      null,
      "deliverd_to_click",
      'Ratio of SMS delivered with click recieved'
    )
  }

  private getTotalDigitalPTRKPI(): KPIDescriptor {
    return this.buildKPI(
      "PTR",
      null,
      'order_ptr', KPIRegistryService.CURRENCY_ROLE,
      null,
      "order_ptr",
      'Price to retailer value is measured with the standard PTR for each SKU'
    )
  }

  private getTotalDigitalNRVKPI(): KPIDescriptor {
    return this.buildKPI(
      "NRV",
      null,
      'order_nrv', KPIRegistryService.CURRENCY_ROLE,
      null,
      "order_nrv", 'Net realised value as defined for each SKU'
    )
  }


  private getTotalDigitalOrderKPI(): KPIDescriptor {
    return this.buildKPI(
      "Total Orders",
      null,
      'ordered', KPIRegistryService.NUMBER_ROLE,
      null,
      "ordered", 'Total numbers of order received'
    )
  }

  private getTotalCartKPI(): KPIDescriptor {
    return this.buildKPI(
      "Cart Created",
      null,
      'cart_with_items', KPIRegistryService.NUMBER_ROLE,
      null,
      "cart_with_items", 'Total numbers of cart created'
    )
  }

  private getTotalClickedKPI(): KPIDescriptor {
    return this.buildKPI(
      "Total Clicks",
      null,
      'total_cart', KPIRegistryService.NUMBER_ROLE,
      null,
      "total_cart", 'Total numbers of clicks'
    )
  }

  private getSMSBlockeddKPI(): KPIDescriptor {
    return this.buildKPI(
      "SMS Blocked",
      null,
      'blocked', KPIRegistryService.NUMBER_ROLE,
      null,
      "blocked", 'Total numbers of store who have blocked the communication'
    )
  }

  private getSMSFailedKPI(): KPIDescriptor {
    return this.buildKPI(
      "SMS Failed",
      null,
      'failed', KPIRegistryService.NUMBER_ROLE,
      null,
      "failed", 'Total numbers of store who have not recieved the communication'
    )
  }


  private getSMSDeliveredKPI(): KPIDescriptor {
    return this.buildKPI(
      "SMS Delivered",
      null,
      'delivered', KPIRegistryService.NUMBER_ROLE,
      null,
      "delivered", 'Total numbers of store who have received the communication'
    )
  }

  private getSMSCreditUsed(): KPIDescriptor {
    return this.buildKPI(
      "SMS Credits",
      null,
      'total_credits', KPIRegistryService.NUMBER_ROLE,
      null,
      "total_credits", 'Total numbers of Credit used for the communication'
    )
  }

  private getTotalUniqueStores(): KPIDescriptor {
    return this.buildKPI(
      "Unique Stores",
      null,
      'distinct_outlet', KPIRegistryService.NUMBER_ROLE,
      null,
      "distinct_outlet", 'Total numbers of unique store communicated with hotline'
    )
  }

  private getTotalStores(): KPIDescriptor {
    return this.buildKPI(
      "Stores",
      null,
      'outlet_count', KPIRegistryService.NUMBER_ROLE,
      null,
      "outlet_count", 'Total numbers of store communicated with hotline'
    )
  }

  public getSKUPerOrderKPI(): KPIDescriptor {
    return this.buildKPI(
      "SKU per Order",
      null,
      'skuPerOrder', KPIRegistryService.DECIMAL_ROLE,
      null,
      "skuPerOrder", 'SKU per order'
    );
  }

  private getStoresPerSalesmanKPI(): KPIDescriptor {
    return this.buildKPI(
      "Stores per Salesman",
      null,
      'storesPerSalesman', KPIRegistryService.DECIMAL_ROLE,
      null,
      "storesPerSalesman", 'Billed stores per salesman'
    )
  }

  private getOrderPerSalesmanKPI(): KPIDescriptor {
    return this.buildKPI(
      "Orders per Salesman",
      null,
      'ordersPerSalesman', KPIRegistryService.DECIMAL_ROLE,
      null,
      "ordersPerSalesman", 'Order per salesman'
    )
  }

  private getOrderPerStoreKPI(): KPIDescriptor {
    return this.buildKPI(
      "Orders per Store",
      null,
      'ordersPerStore', KPIRegistryService.DECIMAL_ROLE,
      null,
      "ordersPerStore", 'Order per stores'
    )
  }

  private getCoverageDeficitKPI(): KPIDescriptor {
    return this.buildKPI(
      "Coverage Deficit",
      null,
      'coverageDeficit', KPIRegistryService.PERCENTAGE_ROLE,
      null,
      "coverageDeficit", 'Coverage Deficit'
    )
  }

  private getProductivityRatioKPI(): KPIDescriptor {
    return this.buildKPI(
      "Productivity Ratio",
      null,
      'productivityRatio', KPIRegistryService.PERCENTAGE_ROLE,
      null,
      "productivityRatio", 'Productivity Ratio'
    )
  }

  private getUnbilledStoresKPI(): KPIDescriptor {
    return this.buildKPI(
      "Unbilled Transactions",
      { url: apiDirectory.productivitySummaryReport },
      'unbilled_stores_visit', KPIRegistryService.NUMBER_ROLE,
      { url: apiDirectory.productivityHistoryReport },
      "unbilled_stores_visit", 'Total numbers of unbilled stores marked by salesman'
    )
  }

  private getBilledStoresKPI(): KPIDescriptor {
    return this.buildKPI(
      "Billed Transactions",
      { url: apiDirectory.productivitySummaryReport },
      'billed_stores_visit', KPIRegistryService.NUMBER_ROLE,
      { url: apiDirectory.productivityHistoryReport },
      "billed_stores_visit", 'Total numbers of stores billed by salesman'
    )
  }

  private getTargetCoverageKPI(): KPIDescriptor {
    return this.buildKPI(
      "Target Coverage",
      { url: apiDirectory.tagetCoverageSummaryReport },
      'target_coverage', KPIRegistryService.NUMBER_ROLE,
      { url: apiDirectory.tagetCoverageHistoryReport },
      "target_coverage", 'Total numbers of actives stores to be visited'
    )
  }

  private getActualCoverageKPI(): KPIDescriptor {
    return this.buildKPI(
      "Escalation Metrics",
      { url: apiDirectory.actualCoverageSummaryReport, params: new Map() },
      'coverage', KPIRegistryService.NUMBER_ROLE,
      { url: apiDirectory.actualCoverageHistoryReport, params: new Map() },
      "coverage", ''
    )
  }

  private getSKUCountKPI(): KPIDescriptor {

    return this.buildKPI("Escalation Metrics",
      {
        url: apiDirectory.salesSummaryReport,
        params: new Map(Object.entries({
          include_fields: ["sku_count"]
        }))
      },
      'sku_count', KPIRegistryService.NUMBER_ROLE,
      {
        url: apiDirectory.salesHistoryReport,
        params: new Map(Object.entries({
          include_fields: ["sku_count"]
        }))
      },
      "sku_count", 'Calculated Escalation Percentage'
    )
  }

  private getStoresKPI(): KPIDescriptor {
    return this.buildKPI("Outlet Health Score",
      {
        url: apiDirectory.salesSummaryReport,
        params: new Map(Object.entries({
          include_fields: ["stores"]
        }))
      },
      'stores', KPIRegistryService.NUMBER_ROLE,
      {
        url: apiDirectory.salesHistoryReport,
        params: new Map(Object.entries({
          include_fields: ["stores"]
        }))
      },
      "stores", 'Average of Outlet Health Score'
    )
  }

  private getOrdersKPI(): KPIDescriptor {
    return this.buildKPI("Visit Compliance",
      {
        url: apiDirectory.salesSummaryReport,
        params: new Map(Object.entries({
          include_fields: ["orders"]
        }))
      },
      'orders', KPIRegistryService.NUMBER_ROLE,
      {
        url: apiDirectory.salesHistoryReport,
        params: new Map(Object.entries({
          include_fields: ["orders"]
        }))
      },
      "orders", 'Calculated Score'
    )
  }

  private getNRVKPI(): KPIDescriptor {
    return this.buildKPI("Visits",
      {
        url: apiDirectory.salesSummaryReport,
        params: new Map(Object.entries({
          include_fields: ["total_nrv"]
        }))
      },
      'nrv', KPIRegistryService.NUMBER_ROLE,
      {
        url: apiDirectory.salesHistoryReport,
        params: new Map(Object.entries({
          include_fields: ["total_nrv"]
        }))
      },
      "nrv", 'Total number of Visits',
      true
    )
  }

  private getPTRKPI(): KPIDescriptor {
    return this.buildKPI("PTR",
      {
        url: apiDirectory.salesSummaryReport,
        params: new Map(Object.entries({
          include_fields: ["total_ptr"]
        }))
      },
      'ptr', KPIRegistryService.CURRENCY_ROLE,
      {
        url: apiDirectory.salesHistoryReport,
        params: new Map(Object.entries({
          include_fields: ["total_ptr"]
        }))
      },
      "ptr",
      'Price to retailer value is measured with the standard PTR for each SKU',
    )
  }


  public buildKPI(kpiName: string, valueRequest: Request,
    valueFieldName: string, role: KPIRole, seriesRequest: Request = null,
    seriesFieldName: string = null,
    description: string = "", isPrimary: boolean = false): KPIDescriptor {
    const kpi = new KPIDescriptor(kpiName, role, valueRequest, valueFieldName);
    kpi.seriesRequest = seriesRequest;
    kpi.seriesFieldName = seriesFieldName;
    kpi.primary = isPrimary;
    kpi.description = description;
    return kpi;
  }
}
