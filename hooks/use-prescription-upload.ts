import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebaseConfig';
import { useAuth } from './use-auth';
import { useCartStore } from '@/stores/cart-store';
import { Product } from '@/types/product';

interface PrescriptionUploadState {
  isUploading: boolean;
  error: string | null;
  prescriptionImg: string | null;
  isPrescriptionUploaded: boolean;
}

export function usePrescriptionUpload() {
  const [state, setState] = useState<PrescriptionUploadState>({
    isUploading: false,
    error: null,
    prescriptionImg: null,
    isPrescriptionUploaded: false,
  });

  const { user } = useAuth();
  const { addToCart } = useCartStore();

  const uploadPrescription = async (file: File, product: Product) => {
    if (!file || !product.type || !['prescripcion', 'tienda'].includes(product.type)) {
      setState((prev) => ({ ...prev, error: 'Invalid file or product type' }));
      return null;
    }

    try {
      setState((prev) => ({ ...prev, isUploading: true, error: null }));

      const fileName = `prescriptions/${file.name}-${user?.uid || 'unauthenticated'}-${Date.now()}`;
      const storageRef = ref(storage, fileName);

      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      setState((prev) => ({
        ...prev,
        isUploading: false,
        prescriptionImg: downloadUrl,
        isPrescriptionUploaded: true,
      }));

      // Add product to cart with prescription URL
      addToCart({
        ...product,
        prescriptionImg: downloadUrl,
      });

      return downloadUrl;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isUploading: false,
        error: error instanceof Error ? error.message : 'Upload failed',
        isPrescriptionUploaded: false,
      }));
      return null;
    }
  };

  const resetState = () => {
    setState({
      isUploading: false,
      error: null,
      prescriptionImg: null,
      isPrescriptionUploaded: false,
    });
  };

  return {
    ...state,
    uploadPrescription,
    resetState,
  };
}
