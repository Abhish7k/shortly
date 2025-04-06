"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UrlFormData, urlSchema } from "@/lib/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { shortenUrl } from "@/server/db/actions/urls/shorten-url";

export const UrlShortenerForm = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(false);

  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [shortCode, setShortCode] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const form = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (data: UrlFormData) => {
    setIsLoading(true);
    setError(null);
    setShortUrl(null);
    setShortCode(null);

    try {
      const formData = new FormData();
      formData.append("url", data.url);

      const res = await shortenUrl(formData);

      if (res.success && res.data) {
        setShortUrl(res.data.shortUrl);

        // extract the short code from the short url
        const shortCodeMatch = res.data.shortUrl.match(/\/r\/([^/]+)$/);

        if (shortCodeMatch && shortCodeMatch[1]) {
          setShortCode(shortCodeMatch[1]);
        }
      }
    } catch (error) {
      setError("Error occured while submitting");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full mx-auto max-w-3xl mt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-2 mb-5">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Enter your url"
                        {...field}
                        disabled={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="url" // New field for custom code
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Enter custom code (optional)"
                        {...field}
                        disabled={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Shortening...
                  </>
                ) : (
                  "Shorten"
                )}
              </Button>
            </div>

            <FormField
              control={form.control}
              name="customCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center mx-1">
                      <span className="text-sm text-muted-foreground mr-2">
                        {process.env.NEXT_PUBLIC_APP_URL ||
                          window.location.origin}
                        /r/
                      </span>
                      <Input
                        placeholder="Custom code (optional)"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value || "")}
                        disabled={isLoading}
                        className="flex-1"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
};
