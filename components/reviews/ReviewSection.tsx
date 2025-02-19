import { Product } from '@/types/product';
import { StarIcon } from '@heroicons/react/24/solid';
import { Button } from '../ui/button';
import Reviews from './Reviews';

type Props = {
  productData: Product;
};

function ReviewsSection({ productData }: Props) {
  const totalReviews = 3452;
  const averageRating = 4.6;
  const ratings = [
    { stars: 5, percentage: 63 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 6 },
    { stars: 2, percentage: 12 },
    { stars: 1, percentage: 9 },
  ];

  return (
    <div>
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-4">Calificaciones y comentarios</h2>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-lg">{averageRating}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-blue-600 ml-2">({totalReviews})</span>
        </div>
      </div>

      <section className="py-2 flex flex-row justify-between items-center mb-8">
        <div className="flex gap-8  border-r border-gray-200 w-1/2 px-8 items-center">
          {/* Left side - Average rating */}
          <div className="w-64 p-6 bg-gray-50 rounded-lg text-center">
            <div className="text-4xl font-bold mb-1">{averageRating}</div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">Basado en {totalReviews} reseñas</div>
          </div>

          {/* Right side - Rating breakdown */}
          <div className="flex-1">
            {ratings.map(({ stars, percentage }) => (
              <div key={stars} className="flex items-center mb-2">
                <div className="w-8 text-sm">{stars}</div>
                <StarIcon className="h-4 w-4 text-yellow-400 mr-2" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-12 text-sm text-right">{percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <section className="items-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-medium leading-7 mb-2">Comparte tu opinión</h3>
            <p className="text-gray-600 mb-4 font-normal leading-5">
              Si ha utilizado este producto, comparta su opinión con otros clientes.
            </p>
            <Button color="white" className="w-full bg-black text-white hover:bg-gray-800">
              Escribir una reseña
            </Button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default ReviewsSection;
