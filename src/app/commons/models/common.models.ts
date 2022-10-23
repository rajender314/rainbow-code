export interface Option<T> {
    label: string,
    description?: string,
    value?: T,
    icon?: string,
    meta?: any,
    permissions?: string[];
}

export interface UIAction {
    component?: any,
    event?: any,
    params?: any;
    selectHandler?: any,
    cssClasses?: string[]
}

export interface UIActionParams {
    data?: ComponentInput
}

export interface ComponentInput {
    parameters: any,
    css: Array<string>,
    onClose: (data: any, role: 'selected' | 'closed' | string) => void
}

export interface PaginatedResponse<T> {
    page: Page,
    links: Links,
    results: Array<T>
}

export interface Page {
    current_page: number,
    next_page: number,
    prev_page: number,
    total_pages: number,
    page_size: number,
    count: number
}

export interface Links {
    next: string,
    prev: string
}

