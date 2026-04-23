'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Upload, X, Loader2, ImagePlus } from 'lucide-react';
import { uploadMedia, type UploadedMedia } from '@/lib/studio-api';

interface ImageUploaderProps {
  /** Already-saved image URL (for edit forms) */
  existingUrl?: string | null;
  /** Called with the new media ID once uploaded */
  onUploaded: (mediaId: number) => void;
  /** Called when the existing image is cleared */
  onClear?: () => void;
  label?: string;
  required?: boolean;
}

export function ImageUploader({
  existingUrl,
  onUploaded,
  onClear,
  label = 'Image',
  required = false,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(existingUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setError('');
    setUploading(true);

    try {
      const media: UploadedMedia = await uploadMedia(file);
      onUploaded(media.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
      setPreview(existingUrl ?? null);
    } finally {
      setUploading(false);
      // Revoke if it was the object URL we created
      if (objectUrl !== existingUrl) URL.revokeObjectURL(objectUrl);
    }
  }

  function handleClear() {
    setPreview(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
    onClear?.();
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {preview ? (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 group">
          <Image
            src={preview}
            alt="Preview"
            fill
            sizes="(max-width: 640px) 100vw, 600px"
            className="object-cover"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Loader2 size={28} className="text-white animate-spin" />
            </div>
          )}
          {!uploading && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="flex items-center gap-1.5 bg-white text-gray-800 font-medium text-xs px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Upload size={13} />
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center gap-1.5 bg-red-500 text-white font-medium text-xs px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <X size={13} />
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full aspect-video rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-brand-caramel/40 transition-all flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-brand-caramel"
        >
          <ImagePlus size={32} strokeWidth={1.5} />
          <span className="text-sm font-medium">Click to upload image</span>
          <span className="text-xs">PNG, JPG, WEBP up to 10 MB</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
          <X size={12} /> {error}
        </p>
      )}
    </div>
  );
}
