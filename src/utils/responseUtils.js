export const StatusCode = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    SERVICE_UNAVAILABLE: 503
};
export const ResponseMessage = {
    // Success Messages
    SUCCESS: "Operation completed successfully",
    CREATED: "Resource created successfully",
    UPDATED: "Resource updated successfully",
    DELETED: "Resource deleted successfully",
    RETRIEVED: "Data retrieved successfully",

    // Error Messages
    BAD_REQUEST: "Invalid request parameters",
    UNAUTHORIZED: "Authentication required",
    FORBIDDEN: "Access denied",
    NOT_FOUND: "Resource not found",
    CONFLICT: "Resource already exists",
    INTERNAL_ERROR: "Internal server error",
    VALIDATION_ERROR: "Validation failed",
    USER_NOT_UPDATE:"User not Update",
    USER_NAME_REQ:"Username is required",
    INVALID_USER:"Invalid user data",

    // User-specific Messages
    USER_CREATED: "User created successfully",
    USER_UPDATED: "User updated successfully",
    USER_DELETED: "User deleted successfully",
    USER_NOT_FOUND: "User not found",
    USER_EXISTS: "User already exists",
    CHANGE_PASS:'Change password successfully',
    USER_NAME_AVL:" User name valid",

    // Auth Messages
    LOGIN_SUCCESS: "Login successful",
    LOGIN_FAILED: "Invalid credentials",
    LOGOUT_SUCCESS: "Logout successful",
    TOKEN_INVALID: "Invalid token",
    TOKEN_EXPIRED: "Token expired. Please refresh your token.",
    INVALI_USER_NAME:"Invalid name",
    INVALI_USER_ROLE:"Invalid roal",
    INVALI_USER_PASS:"Invalid password"
};

export const sendResponse = (res, statusCode, message, data = null, error = null) => {
    const response = {
        success: statusCode >= 200 && statusCode < 300,
        message,
    };

    if (data !== null) {
        response.data = data;
    }

    if (error !== null && process.env.NODE_ENV === 'development') {
        response.error = error;
    }
    return res.status(statusCode).json(response);
};
