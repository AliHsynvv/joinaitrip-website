// =============================================================================
// AUTH TYPES
// =============================================================================

// -----------------------------------------------------------------------------
// Form Data Types
// -----------------------------------------------------------------------------

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
}

// -----------------------------------------------------------------------------
// Form State Types
// -----------------------------------------------------------------------------

export interface AuthFormState<T extends object> {
  data: T;
  isLoading: boolean;
  isSuccess: boolean;
  errors: Partial<Record<keyof T, string>>;
  generalError: string | null;
}

export interface AuthFormOptions<T extends object> {
  initialData: T;
  onSubmit: (data: T) => Promise<void>;
  validate?: (data: T) => Partial<Record<keyof T, string>>;
}

// -----------------------------------------------------------------------------
// API Response Types
// -----------------------------------------------------------------------------

export interface AuthApiResponse {
  success: boolean;
  message?: string;
  user?: AuthUser;
  token?: string;
  error?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  createdAt: string;
}

// -----------------------------------------------------------------------------
// Content Types
// -----------------------------------------------------------------------------

export interface AuthPageContent {
  title: string;
  subtitle: string;
  buttonText: string;
  alternateText: string;
  alternateLinkText: string;
  alternateLinkHref: string;
  image: string;
  imageAlt: string;
}

export interface AuthField {
  name: string;
  type: "text" | "email" | "password";
  placeholder: string;
  autoComplete?: string;
}
