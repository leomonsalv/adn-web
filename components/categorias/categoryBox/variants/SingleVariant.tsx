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
        {image && (
          <Image
            height={70}
            width={70}
            src={image}
            alt={title}
            className="w-16 h-16 absolute right-2 bottom-2 object-contain"
          />
        )}
      </Card>
    </Link>
  );
};

export default SingleVariant;
