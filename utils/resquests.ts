import { getTokenCookie } from './utils';
import axios from 'axios';
import { baseApiUrl } from './constants';

interface PaginationProps {
    current_page?: number;
    per_page?: number;
}

// ** Events

export const getFeaturedEvents = ({
    current_page = 1,
    per_page = 10,
}: PaginationProps): Promise<FeaturedEventsResponseType> => {
    return new Promise(async(resolve, reject) => {
        try {
            const res = await axios.get(`${baseApiUrl}featured?type=event&limit=${per_page}&page=${current_page}`);
            resolve(res.data);
        }
        catch (error) {
            reject(error);
        }
    });
}

export const getEventDetails = (id: number): Promise<EventDetailType> => {
    return new Promise(async(resolve, reject) => {
        try {
            const res = await axios.get(`${baseApiUrl}event/${id}`);
            
            resolve(res.data.event);
        }
        catch (error) {
            reject(error);
        }
    });
}

// ** Celebrity

export const getFeaturedCelebrities = ({
    current_page = 1,
    per_page = 10,
}: PaginationProps): Promise<FeaturedCelebrityResponse> => {
    return new Promise(async(resolve, reject) => {
        try {
            const res = await axios.get(`${baseApiUrl}featured?type=celebrity&limit=${per_page}&page=${current_page}`);
            resolve(res.data);
        }
        catch (error) {
            reject(error);
        }
    });
}

export const getCelebrityDetails = (id: number): Promise<CelebrityDetailsType> => {
    return new Promise(async(resolve, reject) => {
        try {
            const res = await axios.get(`${baseApiUrl}celebrities/${id}`);
            
            resolve(res.data);
        }
        catch (error) {
            reject(error);
        }
    });
}

export const celebrityRegistration = (data: any): Promise<any> => {
    return new Promise(async(resolve, reject) => {
        try {
            const res = await axios.post(`${baseApiUrl}register-celebrity/`, data);
            
            resolve(res.data);
        }
        catch (error) {
            reject(error);
        }
    });
}

// ** Video

export const getFeaturedVideos = ({
    current_page = 1,
    per_page = 10,
}: PaginationProps): Promise<FeaturedVideoResponse> => {
    return new Promise(async(resolve, reject) => {
        try {
            const res = await axios.get(`${baseApiUrl}featured?type=call&limit=${per_page}&page=${current_page}`);
            resolve(res.data);
        }
        catch (error) {
            reject(error);
        }
    });
}

export const getVideoDetails = (id: number): Promise<VidoeItemType> => {
    return new Promise(async(resolve, reject) => {
        try {
            const res = await axios.get(`${baseApiUrl}call/${id}`);
            
            resolve(res.data.call);
        }
        catch (error) {
            reject(error);
        }
    });
}

// ** Login
export const otpLogin = ({
    phone,
    code,
    voip,
}: {
    phone: string;
    code: string;
    voip: string;
}): Promise<LoginRes> => {
    return new Promise(async(resolve, reject) => {
        try {
            const res = await axios.post(`${baseApiUrl}check-otp?phone=${phone}&code=${code}&voip=${voip}`);
            resolve(res.data);
        }
        catch (error) {
            reject(error);
        }
    });
}

// ** Order

export const getOrders = (): Promise<OrderItem []> => {
    return new Promise(async(resolve, reject) => {
        const token = getTokenCookie();
        try {
            const res = await axios.get<OrderResData>(`${baseApiUrl}user/order`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            resolve(res.data.orders || []);
        }
        catch (error) {
            reject(error);
        }
    });
}

// ** NFTs

export const getNftDetails = (id: number): Promise<NftItemType> => {
    return new Promise(async(resolve, reject) => {
        try {
            const res = await axios.get(`${baseApiUrl}nft/${id}`);
            resolve(res.data.nft);
        }
        catch (error) {
            reject(error);
        }
    });
}

// ** card
export const getCardList = (): Promise<CardResData> => {
    return new Promise(async(resolve, reject) => {
        try {
            const res = await axios.get(`${baseApiUrl}user/card`, {
                headers: {
                    Authorization: `Bearer ${getTokenCookie()}`
                }
            });
            resolve(res.data);
        }
        catch (error) {
            reject(error);
        }
    });
}

// ** favorite
export const getFavoriteList = (): Promise<FavoroiteItem []> => {
    return new Promise(async(resolve, reject) => {
        try {
            const res = await axios.get(`${baseApiUrl}user/favourite?type=list`, {
                headers: {
                    Authorization: `Bearer ${getTokenCookie()}`
                }
            });

            resolve(res.data);
        }
        catch (error) {
            reject(error);
        }
    });
}