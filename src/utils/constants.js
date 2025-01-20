const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
};

const USER_MESSAGES = {
    EMAIL_EXISTS: 'Email is already registered',
    INVALID_EMAIL: 'Please enter a valid email address',
    PASSWORD_LENGTH: 'Password must be at least 6 characters',
    USER_NOT_FOUND: 'User not found',
    USER_DELETED: 'User deleted successfully',
    USER_UPDATED: 'User updated successfully',
    USERS_FETCHED: 'Users fetched successfully'
};

const AUTH_MESSAGES = {
    SIGNUP_SUCCESS: 'Registration successful',
    SIGNIN_SUCCESS: 'Login successful',
    SIGNOUT_SUCCESS: 'Logout successful',
    INVALID_CREDENTIALS: 'Invalid email or password',
    USER_EXISTS: 'User already exists',
    USER_NOT_FOUND: 'User not found'
};

const PROJECT_MESSAGES = {
    CREATED: 'Project created successfully',
    UPDATED: 'Project updated successfully',
    DELETED: 'Project deleted successfully',
    FETCHED: 'Projects fetched successfully',
    NOT_FOUND: 'Project not found',
    USER_ADDED: 'User added to project successfully',
    USER_REMOVED: 'User removed from project successfully',
    NAME_EXISTS: 'Project name already exists',
    INVALID_DATES: 'Start date must be before end date',
    INVALID_USERS: 'One or more users are invalid',
    USER_NOT_FOUND: 'User not found',
    USER_EXISTS: 'User already added to project',
    USER_NOT_IN_PROJECT: 'User not found in project',
};

const TASK_MESSAGES = {
    CREATED: 'Task created successfully',
    UPDATED: 'Task updated successfully',
    DELETED: 'Task deleted successfully',
    FETCHED: 'Tasks fetched successfully',
    NOT_FOUND: 'Task not found',
    STATUS_UPDATED: 'Task status updated successfully',
    USER_ASSIGNED: 'User assigned to task successfully',
    TASK_MESSAGES: 'Task with this name already exists in the project'
};

const TOKEN_CONFIG = {
    EXPIRES_IN: '24h',
    COOKIE_MAX_AGE: 24 * 60 * 60 * 1000
};

module.exports = {
    HTTP_STATUS,
    USER_MESSAGES,
    AUTH_MESSAGES,
    PROJECT_MESSAGES,
    TASK_MESSAGES,
    TOKEN_CONFIG
};

