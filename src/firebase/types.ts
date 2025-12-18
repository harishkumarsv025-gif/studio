
export type UserProfile = {
    displayName: string;
    email: string;
    phoneNumber?: string;
    jobStatus: 'student' | 'employed' | 'unemployed' | 'other';
    psyCoins: number;
};
