"use server";

import bcrypt from "bcryptjs";
import { getCollection } from "../app/lib/db";
import { RegisterFormSchema } from "./rules";
import { redirect } from "next/navigation";
import type { Collection } from "mongodb";

// Define a type for the error object returned in case of validation or server errors.
type RegisterError = {
  errors: { [key: string]: string[] | string } | undefined;
  email?: string;
};

export async function register(
  state: unknown,
  formData: FormData
): Promise<RegisterError | void> {
  // Optionally simulate a delay (e.g., for debugging)
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // Validate form fields
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // If any form fields are invalid, return an error object.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email")?.toString() ?? "",
    };
  }

  // Extract form fields from the validated data.
  const { email, password } = validatedFields.data;

  // Get the "users" collection from your database.
  const userCollection: Collection | null = await getCollection("users");
  if (!userCollection) {
    return { errors: { email: "Server error!" } };
  }
  console.log(userCollection);

  // Check if the email is already registered.
  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return {
      errors: {
        email: "Email already exists in our database!",
      },
    };
  }

  // Hash the password using bcrypt.
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the new user in the database.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const results = await userCollection.insertOne({
    email,
    password: hashedPassword,
  });

  // Create a session here if needed.

  // Redirect to the dashboard.
  redirect("/dashboard/${user.code}");
}
