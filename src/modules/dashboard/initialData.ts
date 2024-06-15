export interface RegisterData{
    country: string;
    countryCode: string;
    passportNumber: string;
    email: string;
    cardType: string;
    cardNumber: string;
    monthYear: string;
    cvv: string;
    cardCountry: string;
    zipCode: string;
    ticketNumber: string;
    flightNumber: string;
    takeOffFrom: string;
    takeOffTime: string;
    landingTo: string;
    landingTime: string;
}

export const REGISTER_INITIAL_DATA: RegisterData = {
    country: '',
    countryCode: '',
    passportNumber: '',
    email: '',
    cardType: '',
    cardNumber: '',
    monthYear: '',
    cvv: '',
    cardCountry: '',
    zipCode: '',
    ticketNumber: '',
    flightNumber: '',
    takeOffFrom: '',
    takeOffTime: '',
    landingTo: '',
    landingTime: ''
}
