"use server";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterUserResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export const registerUser = async (
  formData: FormData
): Promise<RegisterUserResponse<{ userId: string }>> => {
  try {
    const validedFields = registerSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validedFields.success) {
      return {
        success: false,
        error:
          validedFields.error.flatten().fieldErrors.name?.[0] ||
          validedFields.error.flatten().fieldErrors.email?.[0] ||
          validedFields.error.flatten().fieldErrors.password?.[0] ||
          "Invalid input",
      };
    }

    const { name, email, password } = validedFields.data;

    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (existingUser) {
      return {
        success: false,
        error: "User already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = nanoid();

    await db.insert(users).values({
      id: userId,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      success: true,
      data: {
        userId,
      },
    };
  } catch (error) {
    console.log("error while registering user", error);
    return {
      success: false,
      error: "Error while registering user",
    };
  }
};
