"use client";

import React, { useEffect, useState } from "react";
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
import { Card, CardContent } from "../ui/card";
import { Copy, QrCode } from "lucide-react";
import { shortenUrl } from "@/server/actions/urls/shorten-url";
import { toast } from "sonner";
import { QRCodeModal } from "./QrCodeModal";

export const UrlShortenerForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [shortCode, setShortCode] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [origin, setOrigin] = useState("");

  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false);

  useEffect(() => {
    // Safe to use window here
    setOrigin(window.location.origin);
  }, []);

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

        toast.success("URL shortened successfully!", {
          position: "top-right",
        });
      }
    } catch (error) {
      setError("Error occured while submitting");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shortUrl) return;

    try {
      toast.success("Copied to clipboard!", {
        position: "top-right",
      });

      console.log("Copying to clipboard:");

      await navigator.clipboard.writeText(shortUrl);
    } catch (error) {
      console.error(error);

      toast.error("Failed to copy URL.", {
        position: "top-right",
      });
    }
  };

  const showQrCode = () => {
    if (!shortUrl || !shortCode) return;

    setIsQrCodeModalOpen(true);
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

              <Button
                type="submit"
                className="hover:cursor-pointer active:scale-95 transition-all"
                disabled={isLoading}
              >
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
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center mx-1">
                      <span className="text-sm text-muted-foreground mr-2">
                        {process.env.NEXT_PUBLIC_APP_URL || origin}
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

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                {error}
              </div>
            )}

            {shortUrl && (
              <Card className="mt-10">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-4">
                    Your shortened URL:
                  </p>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={shortUrl}
                      readOnly
                      className="font-medium"
                    />

                    <Button
                      type="button"
                      variant={"outline"}
                      className="flex-shrink-0 hover:cursor-pointer active:scale-95 transition-all"
                      onClick={copyToClipboard}
                    >
                      <Copy className="size-4 mr-1" />
                      Copy
                    </Button>

                    <Button
                      type="button"
                      variant={"outline"}
                      className="flex-shrink-0 hover:cursor-pointer active:scale-95 transition-all"
                      onClick={showQrCode}
                    >
                      <QrCode className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </Form>
      </div>

      {shortUrl && (
        <QRCodeModal
          isOpen={isQrCodeModalOpen}
          onOpenChange={setIsQrCodeModalOpen}
          url={shortUrl}
          // shortCode={shortCode}
        />
      )}
    </>
  );
};
