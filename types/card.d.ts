interface CardResData {
    default_source: string;
    sources:        CardSources;
}

interface CardSources {
    object:   string;
    data:     CardItem[];
    has_more: boolean;
    url:      string;
}

interface CardItem {
    id:                  string;
    object:              string;
    address_city:        null;
    address_country:     null;
    address_line1:       null;
    address_line1_check: null;
    address_line2:       null;
    address_state:       null;
    address_zip:         null;
    address_zip_check:   null;
    brand:               string;
    country:             string;
    customer:            string;
    cvc_check:           string;
    dynamic_last4:       null;
    exp_month:           number;
    exp_year:            number;
    fingerprint:         string;
    funding:             string;
    last4:               string;
    metadata:            any[];
    name:                null;
    tokenization_method: null;
}