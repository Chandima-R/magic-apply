export interface RegisterData{
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    personalWebsite: string;
    country: string;
    state: string;
    city: string;
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
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    personalWebsite: '',
    country: '',
    state: '',
    city: '',
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
