export const FROM_DATE = "from_date";
export const TO_DATE = "to_date";
export const JSON_CONTENT_TYPE = 'application/json';
export const PDF_CONTENT_TYPE = 'application/pdf';
export const CSV_CONTENT_TYPE = 'text/csv';
export const ZIP_CONTENT_TYPE = "application/zip"
export const PDF = 'pdf';
export const CSV = 'csv';
export const ZIP = 'zip';
export const JSON = 'json';
export const OBJECT = 'object';
export const VIEW_MODE = 'view';
export const EDIT_MODE = 'edit';
export const RIGHT_ALIGNED_MODAL = 'right-aligned-full-height';
export const CENTER_ALIGNED_MODAL = 'center-aligned-full-height';
export const REPORT_MODAL = "report-view-modal";
export const STATUS = 'status';
export const SEARCH = 'search';
export const SCOPE = 'scope';
export const SNAKE_BAR_TIMEOUT = 1500;
export const SUBMITTING = 'Submitting...';
export const SUCCESS_TOAST_CLASS = 'success-toast';
export const ERROR_TOAST_CLASS = 'error-toast';
export const INCLUDE_FIELDS = 'include_fields';
export const DIGITAL = 'Digital';
export const RECURRING: string = 'CRON';
export const SINGLE_EXECUTION: string = 'TIME';
export const RECURRING_EXPR: string = 'Recurring';
export const SINGLE_EXECUTION_EXPR: string = 'One Time';
export const GROUP_BY: string = 'group_by';
export const CAMPAIGN: string = 'campaign';

export const outletHealthScoreProperties = ["is_ed_alignment_correct", "does_ed_have_any_obstruction", "is_ed_light_working", "is_backwall_fabric_light_working",
"is_backwall_fabric_clean_and_not_damaged", "is_there_any_obsruction_in_backwall_visibility", "is_planogram_as_per_guideline",
"cbo_available", "pack_available", "no_competition_presence_in_backwall", "is_counter_vinyl_clean_and_not_damaged", "is_kde_counter_damaged",
"does_counter_have_any_stickers_etc_including_brand_board", "is_pillar_clean_and_not_damaged", "is_kde_on_pillar_damaged",
"does_pillars_have_any_stickers",

"backwall_door_cleaning_status","backwall_light_repair_request"];

export const elementsPresenceProps = ["is_ed_present_in_the_store","are_pillars_present_in_the_store", "is_false_ceiling_present_in_the_store"];
export const assetReportProps = ["ed_-_lit/elt_cleaning_done","ed_-_lit/elt_element_condition", "ed_-_lit/elt_repair_request,backwall_type",
"backwall_light_cleaning_status", "backwall_light_element_condition", "backwall_light_repair_request", "backwall_fabric_cleaning_status", "backwall_fabric_element_condition",
"backwall_fabric_repair_request", "backwall_door_cleaning_status", "backwall_door_element_condition",
"backwall_door_repair_request", "backwall_shelf_cleaning_status", "backwall_shelf_element_condition", "backwall_shelf_repair_request", "counter_vinyl_cleaning_status", "counter_vinyl_element_condition", "counter_vinyl_repair_request", "counter_brandboard_cleaning_status",
"counter_brandboard_element_condition", "counter_brandboard_repair_request", "counter_kde_cleaning_status", "counter_kde_element_condition", "counter_kde_repair_request"];
export const stockAvailabilityProps = ["classic_rich_and_smooth_stock","classic_connect_stock", "classic_balanced_taste_stock", "classic_ice_burst_stock",
"classic_double_burst_stock", "classic_rich_taste_stock", "classic_refined_taste_stock", "gfk_red_stock", "gfk_blue_stock", "gf_smart_stock",
"gf_indie_mint_stock", "gf_premium_filter_blue_stock", "marlboro_advance_gold_stock", "marlboro_lights_stock",
"marlboro_clove_stock", "marlboro_fuse_beyond_stock", "marlboro_fine_touch_stock", "marlboro_advanced_compact_stock"
];
export const kdeChangeRequestProps = ["fabric_kde_units","cbo_kde_units", "classic_pillar_kde_units", "counter_brandboard_kde_units"];

export const preImageProps = ["pre_backwall_photo_name","pre_counter_photo_name", "pre_ed_photo_name", "pre_false_ceiling_photo_name", "pre_outlet_close_photo_name",
"pre_side_1_left_side_pillar_photo_name", "pre_side_1_right_side_pillar_photo_name", "pre_side_2_left_side_pillar_photo_name", "pre_side_2_right_side_pillar_photo_name",
"pre_side_3_left_side_pillar_photo_name"];


export const postImageProps = ["post_backwall_photo_name","post_counter_photo_name", "post_ed_photo_name", "post_false_ceiling_photo_name", "post_outlet_close_photo_name",
"post_outlet_long_photo_name", "post_plano_photo_name", "post_side_1_left_side_pillar_photo_name", "post_side_1_right_side_pillar_photo_name",
"post_side_2_left_side_pillar_photo_name", "post_side_2_right_side_pillar_photo_name", "post_side_3_left_side_pillar_photo_name"];


export function USER_ACTION_SUCCESS(action: string): string {
    return `The user has been ${action} successfully.`
}

export function USER_ACTION_ERROR(action: string): string {
    return `The user could not be ${action}. Please try later.`
}