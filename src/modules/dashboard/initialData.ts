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
    degree: string;
    institute: string;
    instituteLocation: string;
    completionDate: string;
    minorDegree: string;
    gpa: string;
    additionalInformation: string;
    certificateName: string;
    certificateInstitute: string;
    certificateDate: string;
    certificateDescription: string
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
    degree: '',
    institute: '',
    instituteLocation: '',
    completionDate: '',
    minorDegree: '',
    gpa: '',
    additionalInformation: '',
    certificateName: '',
    certificateInstitute: '',
    certificateDate: '',
    certificateDescription:'',
}