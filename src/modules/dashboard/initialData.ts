export interface RegisterData{
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    personalWebsite: string;
    country: string;
    state: string;
    city: string;
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
}
