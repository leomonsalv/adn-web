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
    <Link href={link} className="block h-full ">
      <Card
        className="overflow-hidden w-full h-full rounded-md shadow-xs relative group flex flex-col"
        style={{ backgroundColor: background || '#f5f5f5' }}
      >
        {/* Imagen de fondo cubriendo todo el Card */}
        {fullimage && (
          <div className="w-full relative mt-auto flex-grow min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
            <Image
              src={fullimage}
              alt={title}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
          </div>
        )}

        {/* Degradado solo en la parte superior para mejorar legibilidad */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/60 to-transparent" />

        {/* Contenido (título + descripción) en la parte superior */}
        <div className="absolute top-0 left-0 w-full p-4 md:p-6 z-10">
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
