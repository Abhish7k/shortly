import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UrlShortenerForm } from "@/components/urls/UrlShortenerForm";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import Link from "next/link";
import React from "react";

const DashboardPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const role = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  console.log(session);
  console.log(role?.role);

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>

      <div className="grid gap-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Create New Short URL</CardTitle>

            <CardDescription>
              Enter a long URL to create a shortened link. You can also
              customize the short code.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <UrlShortenerForm />
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-dashed">
          <CardHeader>
            <CardTitle>Your URLs</CardTitle>

            <CardDescription>
              Manage and track your shortened URLs.
            </CardDescription>
          </CardHeader>

          <CardContent>{/* <UserUrlsTable urls={userUrls} /> */}</CardContent>
        </Card>

        {process.env.NODE_ENV === "development" && role?.role === "admin" && (
          <div className="text-center mt-4">
            <Link
              href={"/admin"}
              className="text-sm text-muted-foreground hover:text-primary underline"
            >
              Admin Tools
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
