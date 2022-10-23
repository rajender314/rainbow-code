export interface ViewSupport {
    view?: any;
}

export interface Login {
    username: string;
    password: string
}
export interface LoginOtp {
    mobnum: string;
    otp: string
}

export interface ApplicationPage {
    icon: string;
    url: string;
    name: string;
    tooltip?: string;
    permissions?: Array<string>;
    val?: number
}

export interface SalesSummaryReport {
    date?: string
    orders?: number
    nrv?: number
    ptr?: number
    stores?: number
    salesman?: number
    salesman_id?: number
    salesman_name?: string
    storesPerSalesman?: number
    ordersPerSalesman?: number,
    ordersPerStore?: number,
    skuPerOrder?: number;

    skuCount?: number,
    actualCoverage?: number,
    targetCoverage?: number,
    coverageDeficit?: number,
    productivityRatio?: number,
    billedStores?: number,
    unbilledStores?: number,
}


export interface Refreshable {
    refresh(): void;
}

export interface Organisation {
    root: OrganisationNode;
}





export interface OrganisationNodeType {
    id: string;
    name: string;
    description: string;
    parent: string | OrganisationNodeType;
    parent_id?: string;
    created_at: string;
    updated_at: string;
}

export interface OrganisationNode {
    id: string;
    name: string;
    type: OrganisationNodeType;
    parent_id: string;
    created_at: string;
    updated_at: string;
    canChange: boolean;
    child: OrganisationNode;
    parent?: OrganisationNode;
}


export class Salesman {
    public user_id: string;
}


export interface Task {
    id: number;
    form: Form;
    instance: ProcessInstance;
    task_name: string;
    status: string;
    created_at: string;
    updated_at: string;
    start_date: string;
    expire_date: null;
    checksum: string;
    data: any;
    actor: null;
    group: number;
    step: number;
    submitted_by: any;
}


export interface Form {
    id: number;
    fields: Field[];
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface Field {
    id: number;
    field_name: string;
    field_type: string;
    default_value: null;
    required: boolean;
    meta: string;
    created_at: string;
    updated_at: string;
    form: number;
}

export interface ProcessInstance {
    id: number;
    document_id: string;
    document_type: string;
    status: string;
    data: any;
    created_at: string;
    updated_at: string;
    process: ProcessDefinition;
    created_by: number;
    updated_by: number;
    step: number;
    activity: null;
    displayStatus?: string,
    extra_columns: Array<ColumnDefinition>;
}

export interface ColumnDefinition {
    display_name: string;
    value_lookup: string;
}
export interface ProcessDefinition {
    id: number;
    name: string;
    description: string;
    status: boolean;
    params: string;
    created_at: string;
    updated_at: string;
}


export interface InstanceData {

}

export interface ReportDefinition {
    id: number;
    name: string;
    group: string;
    model: string;
    filters: any;
    permissions: string[];
    count?: number;
    extra_columns?: any[];
    download_options: ReportDownloadOptions;
}

export interface ReportDownloadOptions {
    instance: DownloadParams | Array<DownloadParams>;
    report: DownloadParams | Array<DownloadParams>;
}

export interface Order {
    id: number;
    transaction_id: string;
    store: Store;
    salesman: Salesman;
    bill_date: string;
    bill_time: string;
    created_at: string;
    products: Product[];
    schemes: string[] | Array<any>;
    is_geofence_order: boolean;
    ordered_ptr: number;
    ordered_nrv: number;
}

export interface Product {
    id: number;
    created_at: string;
    ptr: number;
    nrv: number;
    is_free: boolean;
    product_id: number;
    ordered_quantity: number;
    product: ProductDetail;
}

export interface Merchandiser {
    user_id: string;
    name: string;
    mobile_number: string;
    is_active: boolean;
}

export interface Store {
    outlet_id: string;
    name: string;
    zone: string;
    asm_territory: string;
    territory_id: number;
    territory_name: string;
    type: string;
    outlet_type: number;
}

export interface DownloadParams {
    name?: string;
    url: string;
    params?: any;
}

export interface ProductDetail {
    id: number;
    brand: Brand;
    name: string;
    barcode_number: string;
    billing_sap_code: string;
    is_feature_product: boolean;
    description: string;
    uom_kg_number_ltr: string;
    mrp: string;
    ptr: string;
    pts: string;
    nrv: string;
    net_price: string;
    hsn_number: string;
    retailer_margin_slab: string;
    stockist_margin_slab: string;
    is_qps: boolean;
    product_status: boolean;
    created_at: string;
    updated_at: string;
    tax: number;
    created_by: number;
}

export interface Brand {
    id: number;
    name: string;
    brand_franchise: string;
    manufacturer: string;
    created_at: string;
    updated_at: string;
}

export interface Status {
    value: boolean;
    name: string;
    label: string;
}

// Generated by https://quicktype.io

export interface Scheme {
    id: number;
    type: SchemeType;
    name: string;
    start_date: string;
    end_date: string;
    description: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    created_by: number;
    update_by: number;
}

export interface SchemeType {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface PageConfig {
    title: string,
    subtitle: string
}

// Generated by https://quicktype.io

export interface UserDetail {
    id: number;
    groups: Group[];
    role: Role;
    place: Place;
    last_login: string;
    user_id: string;
    name: string;
    mobile_number: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
    created_at: string;
    updated_at: string;
    user_permissions: any[];
    place_data: any;
    settings?: any;
    device_id: string;
    manager: string;
}

export interface Group {
    id: number;
    name: string;
    permissions: number[] | Permission[];
}

export interface Permission {
    id: number;
    name: string;
    codename: string;
    content_type: number | string;
    qualified_name?: string;
}

export interface Place {
    id: number;
    name: string;
    type: Role;
    parent_id: number;
    created_at: null;
    updated_at: string;
}

export interface Role {
    id: number;
    name: string;
    description: string;
    parent: number;
    created_at: string;
    updated_at: string;
    location?: number | OrganisationNodeType;
}

export interface StoreDetails {
    store_id: string;
    outlet_type: number | StoreType;
    store_name: string;
    owner_name: string;
    manager_name: string;
    owner_mobile: string;
    alternate_no: string;
    market_name: string;
    district: string;
    ra_color: string;
    location: string;
    outlet_latitude: string;
    outlet_longitude: string;
    outlet_accuracy: string;
    store_status: boolean;
    description: string;
    survey_status: boolean;
    color_status: number;
    salesman: string;
    otp_sent: boolean;
    otp_verified: boolean;
    otp_sent_alternate: boolean;
    otp_verified_alternate: boolean;
    zone: string;
    created_on: string;
    updated_on: string;
    beat: number | Beat;
    beat_name: string | Beat;
    created_by: number;
    updated_by: number;
    wd_id?: string;
    outer_image: string;
    innner_image: string;
}

export interface StoreType {
    id: number;
    name: string;
    description: string;
    created_at: null | string;
    updated_at: null | string;
    created_by?: number;
    parent?: number;
}

export interface Beat {
    id: number;
    name: string;
    description: string;
    type: string;
    created_at: string;
    updated_at: string;
    created_by: number;
    schedule: Array<BeatSchedule>;
    calendar: Array<BeatSchedule>;
}

export interface BeatSchedule {
    id: number,
    day_name: string,
    weak_no: number,
    created_at: string,
    updated_at: string,
    beat: number,
    created_by: number
}
export interface Distributor {
    id: number;
    name: string;
    description: string;
    code: string;
    contact_number: string;
    type: string;
    email_id: string;
    distributor_status: boolean;
    created_at: null;
    updated_at: null;
    territory: number | OrganisationNode;
    outlet_count: number;
}

export interface KdeChangeRequests {
    element_name: string;
    brand_name: string;
    kde_color: string;
}

export interface VisitDetails {
    data: any;
    visit_id: string;
    transaction_id: string;
    store: Store;
    visited_user_name: string;
    beat_name: string;
    location: string;
    visit_date: string;
    visit_time: string;
    created_at: string;
    elements: Element[];
}
export interface Element {
    id: number;
    name: String;
    length: number;
    width: number;
}

export interface Identifiable {
    id: string,
    name: string
}
export interface TaxInfo {
    id: number;
    type: string;
    slab: number;
    value: string;
    created_at: string;
    updated_at: string;
}


export type UserSettings = {
    currency: string;
    geo_fence_radius: number;
    gps_accuracy: number
    is_gps_check: boolean
    onboard_alternate_otp_flag: boolean;
    onboard_otp_flag: boolean;
    time_zone: string;
    dial_code: string;
    country_code: string;

}

export interface FilteredData {
    name: string
}

export interface GridArray {
    data: object
}

export interface ImageArray {
    img: string,
    name: string
}

export interface LightBoxImage {
    src: string,
    caption: string,
    thumb: string
}


