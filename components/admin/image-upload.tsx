"use client";

import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";

export function ImageUpload({ defaultValue }: { defaultValue?: string }) {
    const [imageUrl, setImageUrl] = useState<string>(defaultValue || "");
    const [isUploading, setIsUploading] = useState(false);

    return (
        <div className="space-y-4">
            {imageUrl ? (
                <div className="relative border border-white/10 rounded-lg overflow-hidden max-w-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageUrl} alt="Preview" className="w-full h-auto object-cover" />
                    <button 
                        type="button"
                        onClick={() => setImageUrl("")}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/80 text-white p-1.5 rounded-md text-xs transition-colors backdrop-blur-sm"
                    >
                        Remove Image
                    </button>
                </div>
            ) : (
                <div className="border border-white/10 rounded-xl bg-white/[0.02] p-2 w-full">
                    <UploadDropzone
                        endpoint="clientUploads"
                        onUploadBegin={() => setIsUploading(true)}
                        onClientUploadComplete={(res) => {
                            if (res && res.length > 0) {
                                setImageUrl(res[0].url);
                            }
                            setIsUploading(false);
                        }}
                        onUploadError={(error: Error) => {
                            alert(`Upload failed: ${error.message}`);
                            setIsUploading(false);
                        }}
                        appearance={{
                            container: "border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors py-6 w-full",
                            label: "text-indigo-400 hover:text-indigo-300 font-medium",
                            allowedContent: "text-muted-foreground mt-2 text-xs",
                            button: "bg-indigo-500 text-white mt-4 ut-uploading:bg-indigo-500/50"
                        }}
                    />
                </div>
            )}
            
            {/* Hidden input to pass the URL back to the Server Action FormData */}
            <input type="hidden" name="imageUrl" value={imageUrl} />
        </div>
    );
}
