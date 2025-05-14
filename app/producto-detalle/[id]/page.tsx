'use client';

import { Fragment, useState, useEffect } from 'react';
import { use } from 'react';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  BreadcrumbLink,
  BreadcrumbSeparator,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { BreadcrumbList } from '@/components/ui/breadcrumb';
import { formatUsdCurrency, formatVefCurrency, generateSlug } from '@/lib/utils';
import useProducts from '@/hooks/use-products';
import useCart from '@/hooks/use-cart';
import Image from 'next/image';
import { TruckIcon, HandCoins, RotateCcwIcon } from 'lucide-react';
import { dummyReviews, product } from '@/lib/dummyData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import DisponibilityCounter from '@/components/products/ProductDetail/DisponibilityCounter';
import ProductDetailSkeleton from '@/components/products/ProductDetail/ProductDetailSkeleton';
import { SupportLink } from '@/components/products/ProductDetail/SupportLink';
import { CARRITO } from '@/lib/routes';
import CarouselRecommened from '@/components/carousel/CarouselRecommened';
import { PrescriptionUpload } from '@/components/products/ProductDetail/PrescriptionUpload';
import { usePrescriptionUpload } from '@/hooks/use-prescription-upload';
import type { SuggestionsProductsPayload, RecommendedForUserPayload } from '@/types/product';
import { anonymousSignIn } from '@/api/auth';
import { useAuth } from '@/hooks/use-auth';
import { getCart, getOrCreateCart } from '@/api/cart';
import useReviews from '@/hooks/use-reviews';
import Reviews from '@/components/reviews/Reviews';
import ReviewsSection from '@/components/reviews/ReviewSection';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import ProductImageGallery from '@/components/products/ProductDetail/ProductImageGallery';
import {
  ProductColorSelector,
  ProductSizePicker,
} from '@/components/products/ProductDetail/ProductVariantSelectors';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: ProductPageProps) {
  const { user } = useAuth();
  const productId = use(params).id;
  const { useGetProductReviews } = useReviews();

  //SUGGESTIONS PRODUCTS
  const suggestionPayload: SuggestionsProductsPayload = {
    type: 'Details',
    products: user?.uid ? [user.uid] : [],
    productBased: true,
  };

  const router = useRouter();
  const { useMutateCart, useGetCart } = useCart();
  const { useGetProductById, useGetRecommendations, useGetSuggestions } = useProducts();

  const {
    data: productData,
    isLoading: isProductLoading,
    error: productError,
  } = useGetProductById(productId);

  // RECOMMENDED FOR USERS
  const recommendedForUserPayload: RecommendedForUserPayload = {
    active: true,
    priceRange: [0, 3000],
    productId: productData?.productId?.toString(),
  };

  const { isPrescriptionUploaded } = usePrescriptionUpload();
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);

  const {
    data: suggestionsData,
    isLoading: isSuggestionsLoading,
    error: suggestionsError,
  } = useGetRecommendations(suggestionPayload);

  const suggestedProducts = suggestionsData ? [suggestionsData].flat() : [];

  const {
    data: recommendedForUserData,
    isLoading: isRecommendedForUserLoading,
    error: isRecommendedForUserError,
  } = useGetSuggestions(recommendedForUserPayload);

  const recommendedForUserProducts = recommendedForUserData ? [recommendedForUserData].flat() : [];

  const { data: reviewsData, isLoading: isReviewsLoading } = useGetProductReviews({
    productId: productData?.productId.toString() ?? '',
    page: 1,
    pageSize: 10,
    sort: 'newest',
  });

  const { data: cartData, isLoading: isCartLoading, error: cartError } = useGetCart();

  const { mutateAsync: updateCart } = useMutateCart();

  const { addToCart, getItemCount, updateQuantity, isItemInCart } = useCartStore();
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);

  useEffect(() => {
    if (productData?.variantOptions) {
      if (productData.variantOptions.color?.values?.length > 0) {
        setSelectedColor({
          name: 'color',
          value: productData.variantOptions.color.values[0],
          type: productData.variantOptions.color.type,
        });
      }

      if (productData.variantOptions.size?.values?.length > 0) {
        setSelectedSize({
          name: 'size',
          value: productData.variantOptions.size.values[0],
          type: productData.variantOptions.size.type,
        });
      }
    }
  }, [productData]);

  if (isProductLoading || isCartLoading) {
    return <ProductDetailSkeleton />;
  }

  if (productError || cartError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Ocurrió un error al cargar los datos. Por favor, inténtalo más tarde.</p>
      </div>
    );
  }
  if (!productData) {
    return <div className="text-center py-16">No se encontró el producto</div>;
  }

  const isInCart = isItemInCart(productData.productId);
  const itemCount = getItemCount(productData.productId);

  const handleAddToCart = async (e: React.FormEvent<HTMLFormElement>) => {
    let userId = user?.uid;
    e.preventDefault();

    if (!productData) return;

    try {
      if (!user) {
        await anonymousSignIn().then(async (user) => {
          userId = user?.user.uid;
        });
      }

      if (userId) {
        const cart = await getOrCreateCart(userId);

        // Primero actualizamos el estado local con todos los datos del producto
        if (isInCart) {
          updateQuantity(productData.productId, itemCount + 1);
        } else {
          addToCart({
            userId: userId,
            products: {
              id: productData.productId,
              prescriptionImg: prescriptionUploaded ? productData.prescriptionImg : '',
              quantity: 1,
            },
          });
        }

        // Luego enviamos solo los datos mínimos a Firebase
        await updateCart({
          cartId: cart?.id,
          userId: userId,
          products: {
            id: productData.productId,
            prescriptionImg: prescriptionUploaded ? productData.prescriptionImg : '',
            quantity: 1,
          },
        });

        router.push(CARRITO);
      } else {
        throw new Error('No se pudo agregar el producto al carrito');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const paths = productData.category.full_name
    .split('/')
    .map((crumb) => crumb.trim())
    .filter((crumb) => crumb !== 'All');

  const breadcrumbs = paths.map((path, index) => ({
    name: path,
    href: `/${paths
      .slice(0, index + 1)
      .map(generateSlug)
      .join('-')}`,
  }));

  const noStock = productData.inventary.total <= 0;
  const requiresRecipe = productData.type === 'prescripcion';
  // const requiresRecipe =
  //   productData.required_recipe === true || productData.product_type === 'prescripcion';

  const disableAddToCart =
    noStock || (requiresRecipe && !prescriptionUploaded && !isPrescriptionUploaded);

  const regularPrice = Number(productData.bsPrice);
  const refPrice = productData.refPrice;

  const TAX_CALC =
    productData.taxes && Array.isArray(productData.taxes) && productData.taxes.length > 0
      ? Number(productData.bsPrice) * (Number(productData.taxes[0].amount) / 100)
      : 0;

  const TAX_CALC_REF =
    productData.taxes && Array.isArray(productData.taxes) && productData.taxes.length > 0
      ? Number(productData.refPrice) * (Number(productData.taxes[0].amount) / 100)
      : 0;
  const totalPrice = (price: number) => {
    return price + TAX_CALC;
  };

  const totalRefPrice = (refPrice: number) => {
    return refPrice + TAX_CALC_REF;
  };
  return (
    <div className="bg-white">
      <div className="pb-16 pt-6 sm:pb-24">
        {/* Breadcrumb
        FIXME: ENABLE THIS WHEN BE IS DONE
        */}
        {/* <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <Fragment key={breadcrumb.name}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.name}</BreadcrumbLink>
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            ))}
            <BreadcrumbSeparator />
            <BreadcrumbPage className="font-medium text-gray-500 hover:text-gray-600">
              {productData.name}
            </BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb> */}

        {/* Product details */}
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0 p-4 rounded-lg">
              <section aria-labelledby="gallery-heading">
                <h2 id="gallery-heading" className="sr-only">
                  Galería de Imágenes del Producto
                </h2>
                <ProductImageGallery
                  images={productData.images || []}
                  productName={productData.name}
                  laboratory={productData.laboratory}
                  variant={{
                    color: selectedColor?.name,
                    size: selectedSize?.name,
                  }}
                  variantOptionsMap={productData.variantOptionsMap}
                />
              </section>
            </div>

            <div className="lg:col-span-5 lg:col-start-8 mt-4 bg-slate-50 p-4 rounded-lg">
              {/* Sales info FIXME: THIS WAS DISABLED IN BE*/}
              {/* {productData.saleslast7days > 0 && productData.saleslast7days !== null ? (
                <div className="flex justify-start items-center py-2">
                  <FlameIcon color="red" aria-hidden="true" />
                  <h2 className="text-red-500 text-sm font-semibold">
                    +{productData.saleslast7days} comprados en el último mes
                  </h2>
                </div>
              ) : null} */}
              <h1 className="text-xl font-bold text-gray-900">{productData.name}</h1>
              {!!productData.laboratory && (
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900 py-2">
                    Distribuido por: <strong>{productData.laboratory}</strong>
                  </p>
                </div>
              )}

              {/* Reviews */}
              <section aria-labelledby="reviews-heading" className="my-2">
                <h2 id="reviews-heading" className="sr-only">
                  Reseñas y Calificaciones
                </h2>
                <Reviews
                  rating={reviewsData?.metadata.averageRating ?? 0}
                  reviewCount={reviewsData?.totalItems ?? 0}
                />
              </section>

              {/* Descripción */}
              <section aria-labelledby="description-heading" className="my-10">
                <h2 id="description-heading" className="sr-only">
                  Descripción del producto
                </h2>
                <div className="prose prose-base mt-4 text-gray-900">
                  <p>{productData.description}</p>
                  {productData.activeIngredients && (
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold">Ingredientes activos:</h3>
                      <p>{productData.activeIngredients}</p>
                    </div>
                  )}
                  {productData.attack && (
                    <div className="mt-2">
                      <h3 className="text-sm font-semibold">Acción terapéutica:</h3>
                      <p>{productData.attack}</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Color & Size pickers */}
              {productData.variantOptions && (
                <>
                  <ProductColorSelector
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    variantOptions={productData.variantOptions}
                    variantOptionsMap={productData.variantOptionsMap}
                  />
                  <ProductSizePicker
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    variantOptions={productData.variantOptions}
                    variantOptionsMap={productData.variantOptionsMap}
                    selectedColor={selectedColor}
                  />
                </>
              )}
              <DisponibilityCounter productQuantity={productData.inventary.total} />

              {/* Price tags */}
              <div className="mt-4">
                <h2 className="sr-only">Información de precios</h2>
                {/* <div className="flex flex-row gap-1">
                  <span className="text-sm">Precio regular:</span>
                  <p className="text-sm text-gray-500 line-through">
                    {formatVefCurrency(regularPrice)}
                  </p>
                </div> */}
                <div className="flex flex-row gap-1 items-center">
                  <p className="text-3xl font-semibold text-red-700">
                    {formatVefCurrency(totalPrice(regularPrice))}
                  </p>
                  <Badge color="green" className="mt-1">
                    {formatUsdCurrency(totalRefPrice(refPrice))}
                  </Badge>
                </div>
                {TAX_CALC > 0 && (
                  <div className="flex flex-row gap-1">
                    <span className="text-sm">Precio:</span>
                    <p className="text-sm text-gray-500">{formatVefCurrency(regularPrice)}</p>
                    <span className="text-sm">+ IVA:</span>
                    <p className="text-sm text-gray-500">{formatVefCurrency(TAX_CALC)}</p>
                  </div>
                )}
              </div>

              {/* Add to cart */}
              <form onSubmit={handleAddToCart} className="mt-8">
                <Button
                  type="submit"
                  color="dark/white"
                  className="w-full h-12 hover:bg-gray-800"
                  disabled={disableAddToCart}
                >
                  Agregar al carrito
                </Button>
              </form>

              {requiresRecipe && (
                <PrescriptionUpload
                  product={productData}
                  onUploadSuccess={() => setPrescriptionUploaded(true)}
                />
              )}

              {/* Delivery details */}
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <TruckIcon className="w-5 h-5 mr-2" color="green" />
                  <span className="font-semibold">
                    <span className="text-green-700">Envío gratis</span> en todas las ordenes
                    mayores a ${process.env.NEXT_PUBLIC_DELIVERY_PRICE}
                  </span>
                </div>
                <div className="flex items-center">
                  <HandCoins className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Opción de pagar al recibir tu pedido</span>
                </div>
                <div className="flex items-center">
                  <RotateCcwIcon className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Garantía de devolución de 24 horas</span>
                </div>
              </div>

              {/* Payment details */}
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <Image
                    src={'/product-detail/payments_accepted.png'}
                    alt="Métodos de pago aceptados: efectivo, pago móvil, MasterCard, Visa, Zelle."
                    width={600}
                    height={100}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {/* <div className="flex items-center">
                  <Image
                    src={'/product-detail/money_back_guarantee.png'}
                    alt="Garantía de reembolso en 24 horas."
                    width={800}
                    height={400}
                  />
                </div> */}
                <div className="flex flex-col justify-center items-center py-4 text-sm leading-none">
                  <div className="text-center text-zinc-700">
                    ¿Tienes alguna duda sobre el producto?{' '}
                  </div>
                  <div className="flex overflow-hidden flex-col mt-1.5 max-w-full font-medium text-blue-500 w-[155px]">
                    <SupportLink
                      text="Contactar a soporte"
                      url="https://api.whatsapp.com/send/?phone=584241613016&text&type=phone_number&app_absent=0"
                    />
                    <div className="flex w-full bg-blue-300 min-h-[1px]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Accordion details */}
            <div className="lg:col-span-5 lg:col-start-8 mt-8 border-t border-gray-200 pt-8">
              <section aria-labelledby="details-heading" className="mt-4">
                <Accordion id="details-heading" type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium text-gray-900">
                      Acerca de este artículo
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-sm mt-4 text-gray-500">
                      {productData.details && productData.details.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {productData.details.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No hay detalles adicionales.</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-medium text-gray-900">
                      Envío
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside">
                        <li>
                          <strong>Caracas y Guarenas:</strong> Envío gratis en compras superiores a
                          $10, con un plazo de entrega no mayor a 1 hora para Caracas y 2 horas para
                          Guarenas.
                        </li>
                        <li>
                          <strong>Interior del país:</strong> Envío gratis a través de Zoom en
                          compras que no superen los 2 kg y monto superior a $20, con un plazo de
                          entrega no mayor a 48 horas.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium text-gray-900">
                      Devoluciones
                    </AccordionTrigger>
                    <AccordionContent>
                      Para obtener información sobre las políticas de devolución de algún producto,
                      haz clic aquí{' '}
                      <Link className="text-blue-500" href="/terminoscondiciones">
                        Políticas de devolución
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
            </div>
          </div>
          {/* Recommended products carousel */}
          <section className="py-2">
            {isRecommendedForUserLoading || isRecommendedForUserError ? (
              <div className="flex justify-center items-center min-h-screen">
                <p>Cargando productos similares...</p>
              </div>
            ) : (
              <CarouselRecommened
                title="Productos similares a"
                subtitle={productData.name}
                products={recommendedForUserProducts}
              />
            )}
          </section>
          {/* Reviews section */}
          <section className="py-2">
            <ReviewsSection
              productData={productData}
              reviews={reviewsData}
              isLoading={isReviewsLoading}
            />
          </section>
          {/* Top sellers products carousel */}
          {!suggestionsError && suggestedProducts.length > 0 && (
            <section className="py-2">
              {isSuggestionsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <p>Cargando productos recomendados...</p>
                </div>
              ) : (
                <CarouselRecommened
                  title="Usuarios como tú también compraron"
                  subtitle={''}
                  products={suggestedProducts}
                />
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
