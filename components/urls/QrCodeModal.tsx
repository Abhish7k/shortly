"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import QRCode from "qrcode";

interface QRCodeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  //   shortCode: string;
}

export function QRCodeModal({
  isOpen,
  onOpenChange,
  url,
}: //   shortCode,
QRCodeModalProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = useCallback(async () => {
    if (!url) return;
    setIsGenerating(true);
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      setQrCodeDataUrl(dataUrl);
    } catch (error) {
      console.error("Failed to generate QR code", error);
      toast.error("Failed to generate QR code", {
        description: "An error occurred while generating the QR code",
      });
    } finally {
      setIsGenerating(false);
    }
  }, [url]);

  useEffect(() => {
    if (isOpen && url) {
      generateQRCode();
    }
  }, [isOpen, url, generateQRCode]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs sm:max-w-md top-[45%] transition-all">
        <DialogHeader>
          <DialogTitle className="text-center">
            QR Code for your Short URL
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center p-4">
          {isGenerating ? (
            <div className="flex items-center justify-center w-[300px] h-[300px]">
              <div className="size-8 animate-spin rounded-full border-4 border-primary border-t border-t-transparent" />
            </div>
          ) : qrCodeDataUrl ? (
            <div className="flex flex-col items-center space-y-4">
              <Image
                src={qrCodeDataUrl}
                alt="QR code"
                width={300}
                height={300}
                className="border rounded-md"
                unoptimized
              />
              <p className="text-sm text-center text-muted-foreground">
                Scan the QR code to open the link in your device&apos;s browser.
              </p>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              Failed to generate QR code
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
