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

export const UrlShortenerForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: "",
    },
  });

  return (
    <>
      <div className="w-full mx-auto max-w-3xl mt-10    ">
        <Form {...form}>
          <form>
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
          </form>
        </Form>
      </div>
    </>
  );
};
