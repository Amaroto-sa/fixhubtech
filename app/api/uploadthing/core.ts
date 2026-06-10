import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

if (process.env.UPLOADTHING_SECRET) {
  process.env.UPLOADTHING_SECRET = process.env.UPLOADTHING_SECRET.replace(/^['"]|['"]$/g, '');
}
if (process.env.UPLOADTHING_APP_ID) {
  process.env.UPLOADTHING_APP_ID = process.env.UPLOADTHING_APP_ID.replace(/^['"]|['"]$/g, '');
}

const f = createUploadthing({
  errorFormatter: (err) => {
    console.error("UploadThing SDK Error:", err);
    return { message: err.message };
  },
});

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  clientUploads: f({ image: { maxFileSize: "8MB", maxFileCount: 5 }, pdf: { maxFileSize: "16MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      let userId: string | null = null;
      
      try {
        const authData = auth();
        userId = authData.userId;
      } catch (error) {
        console.error("Clerk auth failed in UploadThing middleware:", error);
      }

      // If you throw, the user will not be able to upload
      if (!userId) {
        throw new UploadThingError("Unauthorized or authentication failed.");
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
