const z = require('zod');

const projectSchema = z.object({
    name: z.string()
        .min(3, 'Project name must be at least 3 characters')
        .max(100, 'Project name cannot exceed 100 characters')
        .trim(),
    description: z.string()
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description cannot exceed 500 characters')
        .optional(),
    type: z.enum(['DEVELOPMENT', 'DESIGN', 'MARKETING', 'RESEARCH']),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
    status: z.enum(['ACTIVE', 'ON_HOLD', 'COMPLETED']).default('ACTIVE'),
    startDate: z.string()
        .datetime({
            message: "Start date must be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)"
        }),
    endDate: z.string()
        .datetime({
            message: "End date must be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)"
        }),
    budget: z.number().positive().optional(),
    tags: z.array(z.string()).optional(),
    users: z.array(z.string()).optional(),
    tasks: z.array(z.string()).optional()
}).refine(data => new Date(data.startDate) < new Date(data.endDate), {
    message: "End date must be after start date",
    path: ["endDate"]
});

module.exports = projectSchema;

