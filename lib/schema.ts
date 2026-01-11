import {email, z} from "zod"


export const userSchema = z.object({
     name : z.string().min(2 , "Name is required").max(100 , "Maximum  is 100 character"),
     about : z.string().optional(),
     country : z.string().min(1 , "country is required"),
     industryType :   z.string().min(1 , "industry type is required"),
     email : z.email("invalid email"),
     role : z.string().min(1 , "role is required "),
  image : z.string().optional()
})