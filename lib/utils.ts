import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function validateInput<T>(
  schema: z.Schema<T>,
  data: unknown
): Promise<T> {
  try {
    return await schema.parseAsync(data);
  } catch (error) {
    if (!(error instanceof z.ZodError)) throw error;
    throw new Error(
      `Validation failed: ${error.errors.map((err) => err.message).join(", ")}`
    );
  }
}


// const pattern = /\(auth\/(.+)\)/i;
// if (pattern.test(errorMsg)) {
//   errorMsg = errorMsg.match(pattern)![1].replace(/-/g, " ");
// }
// return errorMsg[0].toUpperCase() + errorMsg.slice(1);

export function getErrorMessage(error: unknown): string {
  if (typeof error === "string" && error) return error;
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ("message" in error && typeof (error as any).message === "string") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (error as any).message;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ("error" in error && typeof (error as any).error === "string") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (error as any).error;
    }
  }
  return "An unknown error occurred";
}
