import { z } from 'zod'
const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const cardSchema = z.object({
  question: z
    .string()
    .trim()
    .nonempty('Please enter a question')
    .min(3, 'Question must be at least 3 characters')
    .max(50, 'Question must be at more 50 characters'),
  answer: z
    .string()
    .trim()
    .nonempty('Please enter a answer')
    .min(3, 'Answer must be at least 3 characters')
    .max(100, 'Answer must be at more 100 characters'),
  questionImg: z
    .any()
    .refine(file => file?.size <= MAX_FILE_SIZE, `Max file-input-preview size is 5MB.`)
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
  answerImg: z
    .any()
    .refine(file => file?.size <= MAX_FILE_SIZE, `Max file-input-preview size is 5MB.`)
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
})
