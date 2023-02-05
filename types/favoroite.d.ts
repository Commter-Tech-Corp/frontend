interface FavoroiteItem {
    id:            number;
    user_id:       number;
    category_id:   number | null;
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
    created_at:    Date | null;
    status:        string;
    timezone:      null;
}
