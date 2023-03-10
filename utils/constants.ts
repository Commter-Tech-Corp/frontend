export const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API || '';

export const envs = {
    DOMAIN_URL: process.env.NEXT_PUBLIC_DOMAIN_URL || '',
    LOGIN_PHONE: process.env.NEXT_PUBLIC_LOGIN_PHONE || '',
    LOGIN_CODE: process.env.NEXT_PUBLIC_LOGIN_CODE || '',
    LOGIN_VOIP: process.env.NEXT_PUBLIC_LOGIN_VOIP || '',
    BASE_API: process.env.NEXT_PUBLIC_BASE_API || '',
}

export const tokenKey = 'user-token';
export const expireDay = 365; // in days

export const placeholderImage = '/images/products/item_1.jpg';

export const mainTitle = 'Meet your favorite stars';