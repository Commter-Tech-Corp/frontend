interface FeaturedVideoResponse {
    data:  VidoeItemType [];
    links: VideoLinks;
    meta:  VideoMeta;
}

interface VidoeItemType  {
    id:           number;
    celebrity_id: number;
    type?:        string;
    name:         string;
    detail:       string;
    duration?:    number;
    price:        number;
    deleted_at:   null;
    created_at:   Date;
    updated_at:   Date;
    video?:       string;
    photo?:       string;
}

interface VideoLinks {
    first: string;
    last:  string;
    prev:  null;
    next:  string;
}

interface VideoMeta {
    current_page: number;
    from:         number;
    last_page:    number;
    path:         string;
    per_page:     number;
    to:           number;
    total:        number;
}