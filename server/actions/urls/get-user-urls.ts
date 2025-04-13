import { auth } from "@/server/auth";
import { db } from "@/server/db";

export const getUserUrls = async (userId: string) => {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("User not authenticated");
    }

    if (!session.user || !session.user.id || session.user.id !== userId) {
      return {
        error: "User ID does not match session user ID",
        success: false,
      };
    }

    const userUrls = await db.url.findMany({
      where: { userId: userId },

      select: {
        id: true,
        originalUrl: true,
        shortCode: true,
        createdAt: true,
        updatedAt: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      urls: userUrls,
    };
  } catch (error) {
    console.error("Error fetching user URLs:", error);
    throw new Error("Failed to fetch user URLs");
  }
};
