import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Reviews from '@/components/reviews/Reviews';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCT_DETAIL } from '@/lib/routes';
import { Product } from '@/types/product';
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
    <Card className="relative overflow-hidden">
      <Link href={`${PRODUCT_DETAIL}/${id}`}>
        <CardContent className="space-y-2 p-4">
          <div className="aspect-square overflow-hidden">
            <Image
              height={200}
              width={200}
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover object-center transition-opacity hover:opacity-75"
            />
          </div>
          <h3 className="text-sm font-medium text-foreground text-blue-400">{title}</h3>
          <Reviews rating={rating} reviewCount={reviewCount} showAllReviews={false} />
          <div className="flex flex-col gap-2">
            {offerType && (
              <Badge color="red" className="bg-red-600 text-white">
                Oferta {offerType}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2 text-lg font-medium text-foreground">
            {discountPercentage !== 0 && (
              <span className="text-red-600">-{discountPercentage}%</span>
            )}
            <span className="">{formatVefCurrency(Number(discountedPrice))}</span>
          </div>
          {discountPercentage !== 0 && (
            <span className="text-sm text-muted-foreground line-through">
              Precio regular: {formatVefCurrency(Number(originalPrice))}
            </span>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default CarouselCard;
