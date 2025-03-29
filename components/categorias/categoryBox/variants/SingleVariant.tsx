import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

interface SingleVariantProps {
  title: string;
  description: string;
  image: string;
  textColor?: string;
  background: string;
  link: string;
}

const SingleVariant = ({
  title,
  description,
  image,
  background,
  link,
  textColor = 'text-white',
}: SingleVariantProps) => {
  // Split title into first word and rest for styling

  return (
    <Link href={link} className="block h-full">
      <Card
        className="overflow-hidden transition-all duration-500 hover:shadow-lg p-6 w-full h-full rounded-md shadow-xs flex flex-col items-center  group relative"
        style={{ backgroundColor: background || '#EBF3ED' }}
      >
        <div className="p-4 md:p-6 flex flex-col justify-center min-h-[90px] md:min-h-[110px] z-10 relative mb-4">
          {' '}
          {/* AÑADIDO mb-4 */}
          <div>
            <h3
              className={`text-xl md:text-2xl lg:text-3xl ${textColor} font-extrabold uppercase tracking-tight mb-1`}
            >
              {title}
            </h3>
            {description && <p className={`text-sm md:text-base ${textColor}`}>{description}</p>}
          </div>
        </div>
        {image && (
          <div className="flex justify-center items-center w-full flex-grow">
            <Image
              height={600}
              width={600}
              src={image}
              alt={title}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain max-w-[80%] max-h-[600px]"
            />
          </div>
        )}
      </Card>
    </Link>
  );
};

export default SingleVariant;
