interface EventDetailType {
    id:           number;
    celebrity_id: number;
    name:         string;
    detail:       string;
    event_photo:  string;
    duration:     number;
    schedule:     string;
    price:        number;
    limit:        number;
    booked:       number;
    status:       string;
    deleted_at:   null | string;
    created_at:   string;
    updated_at:   string;
    agora_id:     null | string;
}

interface FeaturedEventsResponseType {
    data:  EventDetailType [];
    links: EventsLinks;
    meta:  EventsMeta;
}

interface EventsLinks {
    first: string;
    last:  string;
    prev:  null;
    next:  string;
}

interface EventsMeta {
    current_page: number;
    from:         number;
    last_page:    number;
    path:         string;
    per_page:     number;
    to:           number;
    total:        number;
}
