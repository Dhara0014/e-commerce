import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/utils/validators/common-rules';

export const emailForOtpSchema = z.object({
  email: validateEmail
})

// form zod validation schema
export const resetPasswordSchema = z
  .object({
    // email: validateEmail,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: messages.passwordsDidNotMatch,
    path: ['confirmPassword'],
  });

  export const otpVarifySchema = z.object({
    otp: z.string().length(6, { message: 'OTP must be exactly 6 digits.' })
  })

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export type EmailForOtpSchema = z.infer<typeof emailForOtpSchema>

export type OtpVerifySchema = z.infer<typeof otpVarifySchema>;
