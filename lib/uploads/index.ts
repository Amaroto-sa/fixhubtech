// FixHub Technology — File Upload Abstraction
// Uses Cloudflare R2 (S3-compatible) for file storage

interface UploadResult {
    url: string;
    key: string;
    size: number;
    type: string;
}

/**
 * Generate a presigned upload URL for R2
 */
export async function getUploadUrl(
    fileName: string,
    fileType: string
): Promise<{ url: string; key: string }> {
    const key = `uploads/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    // In production, this would use @aws-sdk/client-s3 with R2 credentials
    // For now, return the structure
    return {
        url: `${process.env.R2_PUBLIC_URL}/${key}`,
        key,
    };
}

/**
 * Delete a file from R2
 */
export async function deleteFile(key: string): Promise<boolean> {
    try {
        // In production: use S3 DeleteObject command with R2 credentials
        console.log(`[R2] Deleting file: ${key}`);
        return true;
    } catch (err) {
        console.error("[R2 DELETE ERROR]", err);
        return false;
    }
}

/**
 * Get the public URL for a stored file
 */
export function getFileUrl(key: string): string {
    return `${process.env.R2_PUBLIC_URL}/${key}`;
}

/**
 * Validate file type and size
 */
export function validateFile(
    file: { type: string; size: number },
    options: {
        maxSizeMB?: number;
        allowedTypes?: string[];
    } = {}
): { valid: boolean; error?: string } {
    const { maxSizeMB = 10, allowedTypes } = options;
    const maxBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxBytes) {
        return {
            valid: false,
            error: `File size exceeds ${maxSizeMB}MB limit`,
        };
    }

    if (allowedTypes && !allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: `File type ${file.type} is not allowed`,
        };
    }

    return { valid: true };
}
