import { Document } from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    forgotPassword: boolean;
    isSSO: boolean;
    verificationCodeLogin: string;
    googleAuthenticator: string | any;
    csrfTokenSecret: string | any;
    profile: string | any;
    matchPasswords(password: string): Promise<boolean>;
    matchVerificationCodeLogin(verificationCodeLogin: string): Promise<boolean>;
    social_id: string;
    /// major
    plan: string | any;
}

export interface UserPlan extends Document {
    plan: string | any;
    banks: string[] | null;
    integrations: string[] | null;
}


export interface Plan extends Document {
    name: string;
    transactionAmount: number;
    bankNumberAmount: number;
    integrationNumberAmount: number;
    apiCallPerMinute: number;
    emailNotification: boolean;
    bankLimited: boolean;
    chatTeamIntegration: boolean;
}

export interface Integration extends Document {
    name: string;
    description: string;
}


export interface userIntegration extends Document {
    userId: string | any;
    integrationId: string | any;
     
}

export interface Bank extends Document {
    name: string;
    logoUrl: string;
    type: 'personal' | 'business';
}



export interface Profile extends Document {
    fullName: string;
    profilePicture: string;
    user_id: string | any;
}

export interface GoogleAuthenticator extends Document {
    secret: string;
    encoding: string;
    qr_code: string;
    otpauth_url: string;
    isActivated: boolean;
    user_id: string | any;
}

export interface CsrfTokenSecret extends Document {
    secret: string;
    user_id: string | any;
}

/// major


export interface ValidationResult {
    error: any;
    value: any;
}
