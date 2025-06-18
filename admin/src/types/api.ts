export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface ApiError {
  success: boolean;
  message: string;
  error?: string;
  data?: any;
} 