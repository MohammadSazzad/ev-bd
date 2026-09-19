export interface JWTPayload {
  sub: string;
  email: string;
  name: string;
  roles: string[];
  [key: string]: unknown;
}

export interface UserRoleDTO {
  id: string;
  name: string;
  description: string | null;
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  isEmailVerified: boolean;
  emailVerifiedAt: string | null;
  lastLoginAt: string | null;
  createdAt: string;
  roles: string[];
  profileImage?: {
    id: string;
    filePath: string;
    originalName: string;
  } | null;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
}

export interface SigninResponseData {
  user: UserDTO;
  token?: string;
}
