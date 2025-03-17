import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

interface SingleVariantProps {
  title: string;
  description: string;
  image: string;
  background: string;
  link: string;
}

const SingleVariant = ({ title, description, image, background, link }: SingleVariantProps) => {
  // Split title into first word and rest for styling

  return (
    <Link href={link} className="block h-full">
      <Card
        className={`overflow-hidden transition-all duration-500 hover:shadow-lg p-6 w-full h-full rounded-md shadow-xs flex flex-col items-center  group relative`}
        style={{ backgroundColor: background || '#EBF3ED' }}
      >
        <div className="z-10 w-full mb-4">
          <h3 className="text-lg font-medium">
            <span className="text-black ">{title}</span>{' '}
          </h3>
          {description && <p className="mt-1 text-sm text-gray-600 ">{description}</p>}
        </div>
        {image && (
          <div className="flex justify-center items-center w-full flex-grow">
            <Image
              height={600}
              width={600}
              src={image}
              alt={title}
              className="object-contain max-w-[80%] max-h-[600px]"
            />
          </div>
        )}
      </Card>
    </Link>
  );
};

export default SingleVariant;
