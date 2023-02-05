interface OrderResData {
    orders: OrderItem [];
}

interface OrderItem {
    id:            number;
    user_id:       number;
    celebrity_id:  number;
    item_id:       number;
    type:          OrderType;
    name:          string;
    duration:      number;
    price:         number;
    note:          null;
    schedule:      string;
    pi_id:         string;
    trnx_id:       null;
    status:        OrderStatus;
    completed_at:  string | null;
    video_url:     null | string;
    agora_id:      number;
    rating:        null;
    review:        null;
    cancel_reason: null;
    deleted_at:    null;
    created_at:    string;
    updated_at:    string | null;
    day_id:        number | null;
}

type OrderStatus = "scheduled" | "completed" | "cancelled" | "going" | "placed";

type OrderType = "video" | "event";