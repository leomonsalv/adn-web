'use client';

import { useState } from 'react';
import { Giftcard } from '@/types/giftcard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';

interface GiftcardListProps {
  giftcards?: Giftcard[];
  isLoading: boolean;
  error: unknown;
  title?: string;
  description?: string;
}

/**
 * Componente para mostrar el listado de tarjetas de regalo del usuario
 */
export default function GiftcardList({
  giftcards,
  isLoading,
  error,
  title = 'Mis Tarjetas de Regalo',
  description = 'Aquí puedes ver todas tus tarjetas de regalo y su saldo disponible.',
}: GiftcardListProps) {
  // Estado para controlar la visibilidad del código de cada tarjeta
  const [visibleCodes, setVisibleCodes] = useState<Record<string, boolean>>({});
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center py-4">Cargando tarjetas de regalo...</p>
        ) : error ? (
          <p className="text-center py-4 text-red-600">Error al cargar las tarjetas de regalo</p>
        ) : giftcards && giftcards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {giftcards.map((giftcard) => (
              <div
                key={giftcard.id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">
                        {visibleCodes[giftcard.id]
                          ? giftcard.code
                          : giftcard.code.replace(/./g, '*')}
                      </h3>
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleCodes((prev) => ({
                            ...prev,
                            [giftcard.id]: !prev[giftcard.id],
                          }))
                        }
                        className="text-gray-500 hover:text-primary transition-colors"
                        aria-label={visibleCodes[giftcard.id] ? 'Ocultar código' : 'Mostrar código'}
                      >
                        {visibleCodes[giftcard.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {giftcard.description && (
                      <p className="text-sm text-gray-600">{giftcard.description}</p>
                    )}
                  </div>
                  <div className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm">
                    ${giftcard.amount}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Estado:</p>
                    <p
                      className={`font-medium ${giftcard.status === 'active' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {giftcard.status === 'active' ? 'Disponible' : 'Canjeada'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Creada:</p>
                    <p className="font-medium">
                      {new Date(giftcard.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Expira:</p>
                    <p className="font-medium">
                      {giftcard.expires_at
                        ? new Date(giftcard.expires_at).toLocaleDateString()
                        : 'Sin expiración'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-4">No tienes tarjetas de regalo disponibles</p>
        )}
      </CardContent>
    </Card>
  );
}
