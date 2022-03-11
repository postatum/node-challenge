export interface Expenses {
    id: string
    merchant_name: string
    amount_in_cents: number
    currency: string
    date_created: string
    status: string
}

export interface URLQuery {
    userId: string
    page: number
    perPage: number
    sort: string
    sortOrder: string
    merchant_name?: string
    currency?: string
    status?: string
}
