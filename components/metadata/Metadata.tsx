// File: metadata.tsx
import type { Metadata } from 'next';

type MetadataProps = {
  title: string;
  description: string;
};

export const getMetadata = ({ title, description }: MetadataProps): Metadata => ({
  title,
  description,
});
