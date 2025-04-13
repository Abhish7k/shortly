"use server";

import { ensureHttps } from "@/lib/utils";
import { z } from "zod";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { auth } from "@/server/auth";

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
    const session = await auth();
    const userId = session?.user?.id ?? null;

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

    const exisitingUrl = await db.url.findFirst({
      where: {
        shortCode,
      },
    });

    if (exisitingUrl) {
      return shortenUrl(formData);
    }

    await db.url.create({
      data: {
        originalUrl,
        shortCode,
        userId,
      },
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
