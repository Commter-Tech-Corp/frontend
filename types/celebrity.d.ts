interface CelebrityDetailsType {
    id:            number;
    user_id:       number;
    category_id:   null;
    title:         string;
    sub_title:     string;
    profile_photo: string;
    profile_video: string;
    response_time: string;
    rating:        number;
    review:        number;
    complete:      number;
    earning:       number;
    deleted_at:    null;
    updated_at:    Date;
    created_at:    Date;
    status:        string;
    timezone:      null;
    days:          Day[];
    calls:         VidoeItemType [];
    videos?:        VidoeItemType [];
    events:        EventDetailType [];
}

interface FeaturedCelebrityResponse {
    data:  CelebrityDetailsType [];
    links: CelebrityLinks;
    meta:  CelebrityMeta;
}

interface CelebrityLinks {
    first: string;
    last:  string;
    prev:  null;
    next:  string;
}

interface CelebrityMeta {
    current_page: number;
    from:         number;
    last_page:    number;
    path:         string;
    per_page:     number;
    to:           number;
    total:        number;
}

interface Day {
    id:           number;
    celebrity_id: number;
    start:        Date;
    end:          Date;
    track:        Date;
    status:       string;
    type:         string;
}

