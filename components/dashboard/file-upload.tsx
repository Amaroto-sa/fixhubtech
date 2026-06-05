"use client";

import { UploadButton } from "@/lib/uploadthing";

export function FileUploadAction() {
    return (
        <UploadButton
            endpoint="clientUploads"
            onClientUploadComplete={(res) => {
                alert("Upload Completed successfully!");
            }}
            onUploadError={(error: Error) => {
                alert(`Upload failed: ${error.message}`);
            }}
            appearance={{
                button: "bg-indigo-500 text-white text-xs px-4 py-2 h-auto rounded transition-colors hover:bg-indigo-600 outline-none w-auto shadow-none",
                allowedContent: "hidden",
                container: "flex flex-row items-center w-auto m-0 p-0"
            }}
            content={{
                button({ ready }) {
                    if (ready) return <div>Upload</div>;
                    return <div>Loading...</div>;
                }
            }}
        />
    );
}
