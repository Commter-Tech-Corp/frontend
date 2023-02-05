interface NftItemType {
    id:             number;
    title:          string;
    detail:         string;
    media:          string;
    price:          number;
    listing_id:     number;
    seller_address?: string;
    created_at:     string | null;
    updated_at:     string | null;
    deleted_at:     string | null;
    quantity:       number;
    celebrity_id:   number;
}
