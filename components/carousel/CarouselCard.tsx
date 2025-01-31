import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Reviews from '@/components/reviews/Reviews';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCT_DETAIL } from '@/lib/routes';
import { formatVefCurrency } from '@/lib/utils';

interface CarouselCardProps {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  originalPrice: number;
  discountPercentage?: string | number;
  currentPrice: number;
  offerType?: string;
}

const CarouselCard = ({
  title,
  imageUrl,
  rating,
  reviewCount,
  originalPrice,
  discountPercentage = 0,
  currentPrice,
  offerType,
  id,
}: CarouselCardProps) => {
  const discountedPrice = discountPercentage
    ? (
        (Number(originalPrice) ?? Number(currentPrice)) *
        (1 - Number(discountPercentage) / 100)
      ).toFixed(2)
    : currentPrice;

  return (
    <Card className="h-[400px] w-full max-w-[250px] mx-auto overflow-hidden">
      <Link href={`${PRODUCT_DETAIL}/${id}`}>
        <CardContent className="p-4 h-full flex flex-col">
          <div className="relative w-full pt-[100%]">
            <Image
              fill
              src={imageUrl}
              alt={title}
              className="absolute top-0 left-0 object-contain transition-opacity hover:opacity-75"
            />
          </div>

          <div className="flex flex-col grow mt-4 space-y-2">
            <h3 className="text-sm font-medium text-blue-400 line-clamp-2">{title}</h3>

            <Reviews rating={rating} reviewCount={reviewCount} showAllReviews={false} />

            {offerType && (
              <Badge color="red" className="w-fit bg-red-600 text-white">
                Oferta {offerType}
              </Badge>
            )}

            <div className="mt-auto">
              <div className="flex items-center gap-2">
                {discountPercentage !== 0 && (
                  <span className="text-red-600 text-lg font-medium">-{discountPercentage}%</span>
                )}
                <span className="text-lg font-semibold">
                  {formatVefCurrency(Number(discountedPrice))}
                </span>
              </div>

              {discountPercentage !== 0 && (
                <span className="text-sm text-muted-foreground line-through block">
                  Precio regular: {formatVefCurrency(Number(originalPrice))}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CarouselCard;
