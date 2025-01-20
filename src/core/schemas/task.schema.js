const z = require('zod');

const taskSchema = z.object({
  title: z.string().min(3, 'Task title must be at least 3 characters'),
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).default('TODO'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  projectId: z.string(),
  assignedTo: z.string().optional(),
  dueDate: z.string().datetime().optional()
});

module.exports = taskSchema;
