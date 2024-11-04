"use server"

import { z } from "zod"
import { createSession } from "../lib/session"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).trim(),
})

const prisma = new PrismaClient()

export async function signup(prevState: any, formData: FormData) {
  // Validate input
  const result = loginSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { email, password } = result.data

  // Check user in DB
  const emailAlreadyExists = await prisma.user.findUnique({ where: { email } })

  if (emailAlreadyExists) {
    return {
      errors: {
        email: ["Email already registered"],
      },
    }
  }

  // Create user and session
  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword },
  })

  await createSession(email)

  redirect("/")
}