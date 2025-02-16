"use server";

import crypto from "crypto";
import { getCollection } from "../app/lib/db";
import { RegisterFormSchema } from "./rules";
import { redirect } from "next/navigation";
import type { Collection } from "mongodb";

type RegisterError = {
  errors: { [key: string]: string[] | string } | undefined;
  email?: string;
};

export async function register(
  state: unknown,
  formData: FormData
): Promise<RegisterError | void> {
  // Validate form fields
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email")?.toString() ?? "",
    };
  }

  // Extract form fields from validated data
  const { email, password } = validatedFields.data;

  // Get the "users" collection from your database
  const userCollection: Collection | null = await getCollection("users");
  if (!userCollection) {
    return { errors: { email: "Server error! (No collection found)" } };
  }

  // Check if email is already taken
  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return { errors: { email: "Email already exists in our database!" } };
  }

  // ❗ Deterministic SHA-256 hashing (not recommended for secure password storage)
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password, "utf8")
    .digest("hex");

  // Save user in DB
  await userCollection.insertOne({
    email,
    password: hashedPassword,
  });

  // Redirect to the dashboard (Adjust path as needed)
  redirect("/dashboard/somecode");
}
