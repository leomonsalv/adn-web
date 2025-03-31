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
        className="overflow-hidden w-full h-full rounded-md shadow-xs relative group flex flex-col"
        style={{ backgroundColor: background || '#f5f5f5' }}
      >
        <div className="p-4 md:p-6 flex flex-col justify-center min-h-[90px] md:min-h-[110px] z-10 relative mb-4">
          {' '}
          <div>
            <h3
              className={`text-xl md:text-2xl lg:text-3xl ${textColor} font-extrabold uppercase tracking-tight mb-1`}
            >
              {title}
            </h3>
            {description && <p className={`text-sm md:text-base ${textColor}`}>{description}</p>}
          </div>
        </div>

        {fullimage && (
          <div className="w-full relative mt-auto flex-grow min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
            <Image
              fill
              src={fullimage}
              alt={title}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
          </div>
        )}
      </Card>
    </Link>
  );
};

export default FullcoverVariant;
