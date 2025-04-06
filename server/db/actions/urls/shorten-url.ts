"use server";

import { ensureHttps } from "@/lib/utils";
import { z } from "zod";
import { nanoid } from "nanoid";
import { db } from "../..";
import { urls } from "../../schema";
import { revalidatePath } from "next/cache";

type ShortenUrlResponse =
  | {
      success: true;
      data: {
        shortUrl: string;
      };
    }
  | {
      success: false;
      error: string;
    };

const shortenUrlSchema = z.object({
  url: z.string().url(),
});

export const shortenUrl = async (
  formData: FormData
): Promise<ShortenUrlResponse> => {
  try {
    const url = formData.get("url") as string;

    const validatedFields = shortenUrlSchema.safeParse({ url });

    if (!validatedFields.success) {
      return {
        success: false,
        error:
          validatedFields.error.flatten().fieldErrors.url?.[0] || "Invalid url",
      };
    }

    const originalUrl = ensureHttps(validatedFields.data.url);

    const shortCode = nanoid(6);

    const exisitingUrl = await db.query.urls.findFirst({
      where: (urls, { eq }) => eq(urls.shortCode, shortCode),
    });

    if (exisitingUrl) {
      return shortenUrl(formData);
    }

    await db.insert(urls).values({
      originalUrl,
      shortCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const shortUrl = `${baseUrl}/r/${shortCode}`;

    revalidatePath("/");

    return {
      success: true,
      data: {
        shortUrl,
      },
    };
  } catch (error) {
    console.log("failed to shorten url", error);

    return {
      success: false,
      error: "Failed to shorten URL",
    };
  }
};
