import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface FullcoverVariantProps {
  title: string;
  description: string;
  fullimage: string;
  background: string;
  link: string;
}

const FullcoverVariant = ({
  title,
  description,
  fullimage,
  background,
  link,
}: FullcoverVariantProps) => {
  return (
    <Link href={link} className="block h-full">
      <Card
        className="overflow-hidden w-full h-full rounded-md shadow-xs relative group flex flex-col"
        style={{ backgroundColor: background || '#f5f5f5' }}
      >
        <div className="p-6 flex flex-col">
          <div>
            <h3 className="text-lg font-medium text-gray-800 px-4 rounded-md ">{title}</h3>
            {description && <p className="text-sm px-4 rounded-md text-gray-800">{description}</p>}
          </div>
        </div>

        <div className="flex-grow"></div>

        {fullimage && (
          <div className="w-full h-full relative mt-auto">
            <Image
              fill
              src={fullimage}
              alt={title}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
          </div>
        )}
      </Card>
    </Link>
  );
};

export default FullcoverVariant;
