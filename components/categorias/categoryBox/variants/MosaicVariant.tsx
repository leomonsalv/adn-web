import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
interface HeroMosaicItem {
  id: string;
  image: string;
  alt: string;
  textColor?: string;
  slug?: string;
}

interface MosaicVariantProps {
  title: string;
  description: string;
  mosaic: HeroMosaicItem[];
  textColor?: string;
  background: string;
  link: string;
}

const MosaicVariant = ({
  title,
  description,
  mosaic,
  background,
  link,
  textColor = 'text-white',
}: MosaicVariantProps) => {
  const router = useRouter();
  return (
    <Link href={link} className="block h-full">
      <Card
        className="overflow-hidden transition-all duration-500 hover:shadow-lg p-6 w-full h-full rounded-lg shadow-xs flex flex-col justify-between text-left group relative"
        style={{ backgroundColor: background || '#EBF3ED' }}
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

        {/* Photo Collage Layout */}
        <div className="relative overflow-hidden rounded-md flex-grow">
          {mosaic && mosaic.length > 0 && (
            <div className="grid gap-1.5 h-full w-full">
              {/* Dynamic grid layout based on number of images */}
              {mosaic.length === 1 && (
                <div className="relative h-full w-full overflow-hidden rounded-md transform transition-transform duration-300 group-hover:scale-[1.02]">
                  <Image
                    fill
                    src={mosaic[0]?.image || '/images/placeholder.png'}
                    alt={mosaic[0]?.alt || ''}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {mosaic.length === 2 && (
                <div className="grid grid-cols-2 gap-1.5 h-full w-full">
                  {mosaic.map((item) => (
                    <div
                      key={item.id}
                      className="relative aspect-square overflow-hidden rounded-md group transform transition-transform duration-300"
                    >
                      <div
                        className="w-full h-full"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (item?.slug) {
                            router.push(item.slug);
                          }
                        }}
                      >
                        <Image
                          fill
                          src={item?.image || '/images/placeholder.png'}
                          alt={item?.alt || ''}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {mosaic.length === 3 && (
                <div className="grid grid-cols-2 grid-rows-2 gap-1.5 h-full w-full">
                  <div className="col-span-2 row-span-1 relative overflow-hidden rounded-md transform transition-transform duration-300 group-hover:scale-[1.02]">
                    <Image
                      fill
                      src={mosaic[0]?.image || '/images/placeholder.png'}
                      alt={mosaic[0]?.alt || ''}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {mosaic.slice(1).map((item, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-md transform transition-transform duration-300 group-hover:scale-[1.02] cursor-pointer"
                    >
                      <div
                        className="w-full h-full"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (item?.slug) {
                            router.push(item.slug);
                          }
                        }}
                      >
                        <Image
                          fill
                          src={item?.image || '/images/placeholder.png'}
                          alt={item?.alt || ''}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {mosaic.length === 4 && (
                <div className="grid grid-cols-2 grid-rows-2 gap-1.5 h-full w-full">
                  {mosaic.map((item) => (
                    <div
                      key={item.id}
                      className="relative aspect-square overflow-hidden rounded-md group transform transition-transform duration-300"
                    >
                      <div
                        className="w-full h-full"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (item?.slug) {
                            router.push(item.slug);
                          }
                        }}
                      >
                        <Image
                          fill
                          src={item?.image || '/images/placeholder.png'}
                          alt={item?.alt || ''}
                          className="object-cover rounded-md transition-transform duration-300 group-hover/item:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {mosaic.length === 5 && (
                <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-3 gap-2 h-full w-full">
                  {/* Main large image */}
                  <div className="col-span-2 row-span-3 relative overflow-hidden rounded-md transform transition-transform duration-300 group">
                    <Image
                      fill
                      src={mosaic[0]?.image || '/images/placeholder.png'}
                      alt={mosaic[0]?.alt || ''}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Top right image */}
                  <div className="col-span-2 row-span-1 relative overflow-hidden rounded-md transform transition-transform duration-300 group-hover:scale-[1.02]">
                    <Image
                      fill
                      src={mosaic[1]?.image || '/images/placeholder.png'}
                      alt={mosaic[1]?.alt || ''}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Middle right images */}
                  <div className="col-span-1 row-span-1 relative overflow-hidden rounded-md transform transition-transform duration-300 group-hover:scale-[1.02]">
                    <Image
                      fill
                      src={mosaic[2]?.image || '/images/placeholder.png'}
                      alt={mosaic[2]?.alt || ''}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="col-span-1 row-span-1 relative overflow-hidden rounded-md transform transition-transform duration-300 group-hover:scale-[1.02]">
                    <Image
                      fill
                      src={mosaic[3]?.image || '/images/placeholder.png'}
                      alt={mosaic[3]?.alt || ''}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Bottom right image */}
                  <div className="col-span-2 row-span-1 relative overflow-hidden rounded-md transform transition-transform duration-300 group-hover:scale-[1.02]">
                    <Image
                      fill
                      src={mosaic[4]?.image || '/images/placeholder.png'}
                      alt={mosaic[4]?.alt || ''}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              )}

              {mosaic.length > 5 && (
                <div className="grid grid-cols-3 auto-rows-fr gap-1.5 h-full w-full">
                  {/* First image is larger */}
                  <div className="col-span-2 row-span-2 relative overflow-hidden rounded-md transform transition-transform duration-300 group-hover:scale-[1.02]">
                    <Image
                      fill
                      src={mosaic[0]?.image || '/images/placeholder.png'}
                      alt={mosaic[0]?.alt || ''}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Remaining images in a grid */}
                  {mosaic.slice(1, 7).map((item) => (
                    <div
                      key={item.id}
                      className="relative overflow-hidden rounded-md transform transition-transform duration-300 group cursor-pointer"
                    >
                      <div
                        className="w-full h-full"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (item?.slug) {
                            router.push(item.slug);
                          }
                        }}
                      >
                        <Image
                          fill
                          src={item?.image || '/images/placeholder.png'}
                          alt={item?.alt || ''}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  ))}

                  {/* If there are more than 7 images, show a count of remaining images on the last visible slot */}
                  {mosaic.length > 7 && (
                    <div className="relative overflow-hidden rounded-md transform transition-transform duration-300 group-hover:scale-[1.02]">
                      <Image
                        fill
                        src={mosaic[6]?.image || '/images/placeholder.png'}
                        alt={mosaic[6]?.alt || ''}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover rounded-md transition-transform duration-500 group-hover:scale-105 opacity-60"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold text-xl">
                        +{mosaic.length - 6}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default MosaicVariant;
