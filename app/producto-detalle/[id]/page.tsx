'use client'

import { Fragment, useState } from 'react'
import { use } from 'react'
import { useCartStore } from '@/stores/cart-store'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import {
  BreadcrumbLink,
  BreadcrumbSeparator,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { BreadcrumbList } from '@/components/ui/breadcrumb'
import Reviews from '@/components/reviews/Reviews'
import { classNames, formatUsdCurrency } from '@/lib/utils'
import useProducts from '@/hooks/use-products'
import useCart from '@/hooks/use-cart'
import Image from 'next/image'
import { FlameIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { policies, product } from '@/lib/dummyData'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SkeletonCard } from '@/components/ui/skeleton-card'
import ProductColorSelector from '@/components/products/ProductDetail/ProductColorSelector'
import ProductSizePicker from '@/components/products/ProductDetail/ProductSizePicker'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailsPage({ params }: ProductPageProps) {
  const productId = Number(use(params).id)
  const { useGetProductById } = useProducts()
  const { useMutateCart, useGetCart } = useCart()

  const router = useRouter()

  const {
    data: productData,
    isLoading: isProductLoading,
    error: productError,
  } = useGetProductById(productId)
  console.log('🚀 ~ ProductDetailsPage ~ productData:', productData)

  const { data: cartData, isLoading: isCartLoading, error: cartError } = useGetCart()
  const { mutateAsync: updateCart } = useMutateCart()

  const { addToCart, getItemCount, updateQuantity, isItemInCart, cart } = useCartStore()
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])

  const isInCart = productData ? isItemInCart(productData.id) : false
  const itemCount = productData ? getItemCount(productData.id) : 0

  const handleAddToCart = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!productData) return

    try {
      if (isInCart) {
        updateQuantity(productData.id, itemCount + 1)
      } else {
        addToCart(productData)
      }

      await updateCart({
        cartId: cartData?.id || '',
        product: productData,
      })
      router.push('/carrito')
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  if (isProductLoading || isCartLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SkeletonCard />
      </div>
    )
  }

  if (productError || cartError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Ocurrió un error al cargar los datos. Por favor, inténtalo más tarde.</p>
      </div>
    )
  }

  if (!productData) {
    return <div className="text-center py-16">No se encontró el producto</div>
  }

  const breadcrumbs = productData.categ_route ? productData.categ_route.split('/') : []

  return (
    <div className="bg-white">
      <div className="pb-16 pt-6 sm:pb-24">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb) => (
              <Fragment key={breadcrumb}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/categoria/${breadcrumb}`}>{breadcrumb}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            ))}
            <BreadcrumbPage className="font-medium text-gray-500 hover:text-gray-600">
              {productData.name}
            </BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Product details */}
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              {productData.saleslast7days > 0 && productData.saleslast7days !== null ? (
                <div className="flex justify-start items-center py-2">
                  <FlameIcon color="red" aria-hidden="true" />
                  <h2 className="text-red-500 text-sm font-semibold">
                    +{productData.saleslast7days} comprados en el último mes
                  </h2>
                </div>
              ) : null}
              <h1 className="text-xl font-bold text-gray-900">{productData.name}</h1>
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900 py-2">
                  Distribuido por: <strong>{productData.laboratory}</strong>
                </p>
              </div>
              {/* Reviews */}
              <section aria-labelledby="reviews-heading" className="my-2">
                <h2 id="reviews-heading" className="sr-only">
                  Reseñas y Calificaciones
                </h2>
                <Reviews rating={product.rating} reviewCount={product.reviewCount} />
              </section>
              <section aria-labelledby="description-heading" className="my-10">
                <h2 id="description-heading" className="sr-only">
                  Descripción del producto
                </h2>
                {productData.description ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: productData.description }}
                    className="prose prose-base mt-4 text-gray-900"
                  />
                ) : (
                  <p className="text-gray-500">No hay descripción disponible.</p>
                )}
              </section>
              {/* THIS IS A WIP FUNCTION THAT CAN CHANGE BECAUSE THERE IS NO DESIGN OF YET*/}
              <ProductColorSelector
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                product={product}
              />
              {/* THIS IS A WIP FUNCTION THAT CAN CHANGE BECAUSE THERE IS NO DESIGN OF YET*/}
              <ProductSizePicker
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                product={product}
              />
            </div>

            {/* Price tags */}
            <div className="lg:col-span-5 lg:col-start-8 mt-4">
              <h2 className="sr-only">Información de precios</h2>
              <div className="flex flex-row gap-1">
                <span className="text-sm">Precio regular:</span>
                <p className="text-sm text-gray-500 line-through">
                  {formatUsdCurrency(productData.price_extra)}
                </p>
              </div>
              <div className="flex flex-row gap-1 items-baseline">
                <p className="text-3xl font-semibold text-red-700">
                  {formatUsdCurrency(Number(productData.price_ref))}
                </p>
                {productData.discount_rate && productData.discount_rate !== '0' && (
                  <Badge color="blue" className="font-semibold font-sans">
                    % {productData.discount_rate} OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <section aria-labelledby="gallery-heading">
                <h2 id="gallery-heading" className="sr-only">
                  Galería de Imágenes del Producto
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                  {productData.imageLarge ? (
                    <Image
                      key={productData.id}
                      alt={`Imagen del producto ${productData.name} vendido por ${productData.laboratory}`}
                      src={productData.imageLarge}
                      height={500}
                      width={500}
                      className={classNames('lg:col-span-2 lg:row-span-2 rounded-lg')}
                    />
                  ) : (
                    <div className="bg-gray-200 rounded-lg flex items-center justify-center h-64">
                      <span className="text-gray-500">No hay imagen disponible</span>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className="mt-8 lg:col-span-5">
              <form onSubmit={handleAddToCart}>
                <Button type="submit" color="dark/white" className="mt-8 w-full h-12">
                  Agregar al carrito
                </Button>
              </form>

              {/* Accordion details */}
              <section
                aria-labelledby="details-heading"
                className="mt-8 border-t border-gray-200 pt-8"
              >
                <Accordion id="details-heading" type="single" collapsible className="mt-4">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium text-gray-900">
                      Acerca de este artículo
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-sm mt-4 text-gray-500">
                      {product.details && product.details.length > 0 ? (
                        <ul role="list">
                          {product.details.map((item) => (
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
                      Sí, cumple con el patrón de diseño WAI-ARIA.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium text-gray-900">
                      Devoluciones
                    </AccordionTrigger>
                    <AccordionContent>
                      Sí, cumple con el patrón de diseño WAI-ARIA.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>

              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10">
                <h2 id="policies-heading" className="text-lg font-medium text-gray-900">
                  Nuestras Políticas
                </h2>
                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 mt-4">
                  {policies.map((policy) => (
                    <div
                      key={policy.name}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
                    >
                      <dt>
                        <policy.icon
                          aria-hidden="true"
                          className="mx-auto size-6 shrink-0 text-gray-400"
                        />
                        <span className="mt-4 text-sm font-medium text-gray-900">
                          {policy.name}
                        </span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-500">{policy.description}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
