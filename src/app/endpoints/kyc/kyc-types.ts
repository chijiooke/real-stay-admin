export interface SelfieVerification {
  confidence_value: number;
  match: boolean;
}

export interface IdentityVerificationData {
  _id: string;
  user_id: string;
  id_type: "nin" | string;
  id_number: string;
  provider: string;
  selfie_image: string;
  phone_number: string;
  date_of_birth: string; // ISO date string (YYYY-MM-DD)

  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
  identity_data: IdentityData;
  __v: number;
}

export interface IdentityVerificationResponse {
  data: IdentityVerificationData;
  success: boolean;
}

export interface IdentityData {
  nin: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  date_of_birth?: string;
  gender?: string;
  phone_number?: string;
  selfie_verification: SelfieVerification;
  [key: string]: unknown; // allows provider-specific extra fields
}

export interface KycData {
  _id: string;
  user_id: string;
  id_type: "nin" | string;
  id_number: string;
  provider: string;
  selfie_image: string;
  identity_data: IdentityData;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
  __v: number;
}

export interface KycResponse {
  kycData: KycData;
}
