const z = require('zod');

const userSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }).min(2, 'Name must be at least 2 characters'),

    email: z.string({
        required_error: "Email is required"
    }).email('Invalid email format'),

    password: z.string({
        required_error: "Password is required"
    }).min(6, 'Password must be at least 6 characters'),

    confirmPassword: z.string({
        required_error: "Password confirmation is required"
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

module.exports = userSchema;
