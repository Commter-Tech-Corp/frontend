interface LoginRes {
    success:      string;
    user:         User;
    access_token: string;
}

interface User {
    id:             number;
    name:           string;
    type:           string;
    email:          string;
    photo:          string;
    phone:          string;
    status:         string | null;
    created_at:     string | null;
    deleted_at:     string | null;
    updated_at:     string | null;
    timezone:       string | null;
    latest_call_id: number;
}