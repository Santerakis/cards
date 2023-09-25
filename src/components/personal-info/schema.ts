import { z } from 'zod'
const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const profile = z.object({
  // name: z
  //   .string()
  //   .trim()
  //   .nonempty('Please enter a name for the pack')
  //   .min(3, 'Name should be at least 3 characters')
  //   .max(25, 'Name should not be more than 25 characters'),
  avatar: z
    .any()
    .refine(file => file?.size <= MAX_FILE_SIZE, `Max file-input-preview size is 5MB.`)
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
})
