import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface FullcoverVariantProps {
  title: string;
  description: string;
  fullimage: string;
  background: string;
  textColor?: string;
  link: string;
}

const FullcoverVariant = ({
  title,
  description,
  fullimage,
  textColor = 'text-black', // Ajustado a negro como en la imagen de ejemplo
  background,
  link,
}: FullcoverVariantProps) => {
  return (
    // 5. Considera quitar h-full si tu layout lo permite
    <Link href={link} className="block h-full">
      <Card
        // 5. Considera quitar h-full de aquí también
        className="overflow-hidden w-full h-full rounded-md shadow-xs relative flex flex-col"
        style={{ backgroundColor: background || '#f5f5f5' }}
      >
        {/* Área de Texto */}
        {/* 4. Margen inferior para separar del área de imagen */}
        <div className="p-4 md:p-6 flex flex-col justify-center min-h-[90px] md:min-h-[110px] z-10 relative mb-4">
          <div>
            <h3
              className={`text-xl md:text-2xl lg:text-3xl ${textColor} font-extrabold uppercase tracking-tight mb-1`}
            >
              {title}
            </h3>
            {description && <p className={`text-sm md:text-base ${textColor}`}>{description}</p>}
          </div>
        </div>

        {/* 1. ELIMINADO el div con flex-grow */}
        {/* <div className="flex-grow" /> */}

        {/* Área de Imagen */}
        {fullimage && (
          // 2. ELIMINADO h-full y mt-auto
          // 3. AÑADIDO aspect-* (¡AJUSTA ESTOS VALORES!)
          <div className="w-full relative aspect-square sm:aspect-video md:aspect-[4/3]">
            {' '}
            {/* EJEMPLO: Cuadrado en móvil, video en tablet, 4:3 en desktop */}
            <Image
              fill
              src={fullimage}
              alt={title}
              // Asegúrate que 'sizes' esté presente y ajustado
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw" // ¡AJUSTA ESTOS VALORES!
              className="object-cover" // Manten object-cover si quieres llenar el área (o prueba object-contain si el recorte es inaceptable)
            />
            {/* Gradiente opcional */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" /> */}
          </div>
        )}
      </Card>
    </Link>
  );
};

export default FullcoverVariant;
