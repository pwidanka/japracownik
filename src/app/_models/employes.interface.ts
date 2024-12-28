export interface Employer {
    companyName: string;
    nip: string;
    fullName: string;
    email: string;
    uid: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
}