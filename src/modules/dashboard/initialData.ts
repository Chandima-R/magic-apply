export interface RegisterData{
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    personalWebsite: string;
    country: string;
    state: string;
    city: string;
    role: string;
    company: string;
    startDate: any;
    endDate: any;
    companyLocation: string;
    jobDescription: string;
    projectTitle: string;
    organization: string;
    projectStartDate: any;
    projectEndDate: any;
    projectUrl: string;
    projectDescription: string;
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
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    companyLocation: '',
    jobDescription: '',
    projectTitle: '',
    organization: '',
    projectStartDate: '',
    projectEndDate: '',
    projectUrl: '',
    projectDescription: '',
}
