import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { HeroMosaicItem } from '@/types/home';

interface MosaicVariantProps {
  title: string;
  description: string;
  mosaic: HeroMosaicItem[];
  background: string;
  link: string;
}

const MosaicVariant = ({ title, description, mosaic, background, link }: MosaicVariantProps) => {
  // Split title into first word and rest for styling
  const words = title.split(' ');
  const firstWord = words[0];
  const restWords = words.slice(1).join(' ');

  return (
    <Link href={link} className="block h-full">
      <Card
        className={`overflow-hidden transition-all duration-500 hover:shadow-lg p-6 w-full h-full rounded-md shadow-xs flex flex-col justify-between text-left group relative`}
        style={{ backgroundColor: background || '#EBF3ED' }}
      >
        <div className="z-10">
          <h3 className="text-lg font-medium">
            <span className="text-black group-hover:text-[#7B8967] transition-colors">
              {firstWord}
            </span>{' '}
            <span className="text-[#7B8967] group-hover:text-white transition-colors">
              {restWords}
            </span>
          </h3>
          {description && (
            <p className="mt-1 text-sm text-gray-600 group-hover:text-gray-200 transition-colors">
              {description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {mosaic && mosaic.length > 0 && (
            <>
              {/* Larger image on the left */}
              <div className="col-span-1 row-span-2 relative h-32">
                <Image
                  fill
                  src={mosaic[0]?.image || ''}
                  alt={mosaic[0]?.alt || ''}
                  className="object-cover rounded-sm"
                />
              </div>

              {/* 2x2 grid of smaller images on the right */}
              <div className="col-span-2 grid grid-cols-2 gap-2">
                {mosaic.slice(1, 5).map((item, index) => (
                  <div key={index} className="relative h-[60px]">
                    <Image
                      fill
                      src={item.image}
                      alt={item.alt}
                      className="object-cover rounded-sm"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default MosaicVariant;
