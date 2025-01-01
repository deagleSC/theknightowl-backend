interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  metadata?: {
    timestamp: string;
    path?: string;
  };
}

export const successResponse = <T>(data: T, path?: string): ApiResponse<T> => ({
  success: true,
  data,
  metadata: {
    timestamp: new Date().toISOString(),
    path,
  },
});

export const errorResponse = (
  message: string,
  code: string,
  path?: string,
): ApiResponse<null> => ({
  success: false,
  error: {
    code,
    message,
  },
  metadata: {
    timestamp: new Date().toISOString(),
    path,
  },
});
