import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface FullcoverVariantProps {
  title: string;
  description: string;
  fullimage: string;
  background: string;
  textColor?: string;
  link: string;
}

const FullcoverVariant = ({
  title,
  description,
  fullimage,
  textColor = 'text-white',
  background,
  link,
}: FullcoverVariantProps) => {
  return (
    <Link href={link} className="block h-full">
      <Card
        className="overflow-hidden w-full h-full rounded-md shadow-xs relative group flex flex-col justify-end"
        style={{ backgroundColor: background || '#f5f5f5' }}
      >
        {/* Imagen de fondo cubriendo todo el Card */}
        {fullimage && (
          <Image
            src={fullimage}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Sombra para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 " />

        {/* Contenido (título + descripción) */}
        <div className="relative p-4 md:p-6 z-10">
          <h3
            className={`text-xl md:text-2xl lg:text-3xl ${textColor} font-extrabold uppercase tracking-tight mb-1`}
          >
            {title}
          </h3>
          {description && <p className={`text-sm md:text-base ${textColor}`}>{description}</p>}
        </div>
      </Card>
    </Link>
  );
};

export default FullcoverVariant;
