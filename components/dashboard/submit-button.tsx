"use client";
import { useFormStatus } from "react-dom";
import { Save } from "lucide-react";

export function SubmitButton({ label = "Save Changes" }: { label?: string }) {
    const { pending } = useFormStatus();

    return (
        <button 
            type="submit" 
            disabled={pending}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-medium rounded-lg text-sm transition-colors shadow-lg shadow-indigo-500/20"
        >
            <Save className="w-4 h-4" /> 
            {pending ? "Saving..." : label}
        </button>
    );
}
