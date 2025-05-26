import { type ChangeEvent, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { usePrescriptionUpload } from '@/hooks/use-prescription-upload';
import type { Product } from '@/types/product';

interface PrescriptionUploadProps {
  product: Product;
  onUploadSuccess: (url: string) => void;
}

export function PrescriptionUpload({ product, onUploadSuccess }: PrescriptionUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isUploading, error, uploadPrescription } = usePrescriptionUpload();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Por favor sube una imagen válida',
        variant: 'destructive',
      });
      return;
    }

    const url = await uploadPrescription(file, product);
    if (url) {
      onUploadSuccess(url);
      toast({
        title: '¡Éxito!',
        description: 'Prescripción subida correctamente. Producto agregado al carrito.',
      });
    } else if (error) {
      console.error('Error uploading prescription:', error);
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="mt-4">
      <input
        aria-label="Subir prescripción"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*, .pdf"
        className="hidden"
      />
      <Button
        type="button"
        color="teal"
        className="w-full h-12"
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploading ? 'Subiendo...' : 'Subir prescripción'}
      </Button>
      <p className="text-sm text-gray-600 mt-2">
        Este producto requiere una prescripción médica. Por favor, sube tu prescripción antes de
        agregarlo al carrito.
      </p>
    </div>
  );
}
