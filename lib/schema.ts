import { email, z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, "Maximum  is 100 character"),
  about: z.string().optional(),
  country: z.string().min(1, "country is required"),
  industryType: z.string().min(1, "industry type is required"),
  email: z.email("invalid email"),
  role: z.string().min(1, "role is required "),
  image: z.string().optional(),
});

export const workspaceSchmea = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, "Maximum is 100 character"),
  description: z.string().optional(),
});

export const ProjectSchema = z.object({
  name: z.string().min(3, "Workspace name will be atlest 3 character"),
  workspaceId: z.string(),
  description: z.string().optional(),
  memberAccess: z.array(z.string()).optional(),
});

export const taskSchema = z.object({
   title : z.string().min(1 , "Title is Required"),
   description : z.string().optional(),
   assignedId : z.string().optional(),
   status : z.enum([
    "TODO",
    "IN_PROGRESS",
    "COMPLETED",
    "IN_REVIEW",
    "BLOCKED",
    "BACKLOG"
   ]),
   dueDate : z.date(),
   startDate : z.date(),
priority : z.enum(["LOW" , "MEDIUM" , "HIGH" , "CRITICAL"]),
attachments : z.array(
  z.object({
    name : z.string(),
    url : z.string(),
    type : z.enum(["IMAGE" , "PDF"])
  })
).optional()
})
