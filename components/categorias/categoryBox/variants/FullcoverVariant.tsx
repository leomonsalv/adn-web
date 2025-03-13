import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

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
  // Split title into first word and rest for styling
  const words = title.split(' ');
  const firstWord = words[0];
  const restWords = words.slice(1).join(' ');

  return (
    <Link href={link} className="block h-full">
      <Card className="overflow-hidden w-full h-full rounded-md shadow-xs relative group">
        {fullimage && (
          <div className="absolute inset-0 w-full h-full">
            <Image
              fill
              src={fullimage}
              alt={title}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
        )}
        <div className="relative z-10 p-6 flex flex-col h-full justify-end">
          <h3 className="text-lg font-medium text-white">
            <span className="group-hover:text-[#7B8967] transition-colors">{firstWord}</span>{' '}
            <span className="text-[#7B8967] group-hover:text-white transition-colors">
              {restWords}
            </span>
          </h3>
          {description && <p className="mt-1 text-sm text-gray-200">{description}</p>}
        </div>
      </Card>
    </Link>
  );
};

export default FullcoverVariant;
