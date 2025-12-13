export type SweetCategory = 'chocolate' | 'swiss-western' | 'festival' | 'premium-dry-fruit' | 'regional-traditional';

export interface Sweet {
    _id: string;
    name: string;
    category: SweetCategory;
    price: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateSweetData {
    name: string;
    category: SweetCategory;
    price: number;
    quantity: number;
}

export interface UpdateSweetData {
    name?: string;
    category?: SweetCategory;
    price?: number;
    quantity?: number;
}

export interface PurchaseData {
    quantity: number;
}

export interface RestockData {
    quantity: number;
}

export interface SearchParams {
    name?: string;
    category?: SweetCategory;
    minPrice?: number;
    maxPrice?: number;
}

export interface PurchaseResponse {
    success: boolean;
    message: string;
    data: {
        sweet: Sweet;
        purchased: number;
        remaining: number;
    };
}

export interface RestockResponse {
    success: boolean;
    message: string;
    data: {
        sweet: Sweet;
        restocked: number;
        newQuantity: number;
    };
}
