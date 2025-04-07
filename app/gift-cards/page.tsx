'use client';

import { useState } from 'react';
import useGiftcards from '@/hooks/use-giftcards';
import { useAuth } from '@/hooks/use-auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { GiftcardRedeemRequest } from '@/types/giftcard';
import GiftcardList from '@/components/giftcards/GiftcardList';

export default function GiftCardsPage() {
  const { user } = useAuth();
  const { useGetUserGiftcards, useRedeemGiftcard, useValidateGiftcard } = useGiftcards();

  // Estado para el código de la gift card a canjear
  const [giftCardCode, setGiftCardCode] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [validationStatus, setValidationStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Obtener las gift cards del usuario
  const { data: userGiftcards, isLoading, error } = useGetUserGiftcards();

  // Mutaciones para canjear y validar gift cards
  const redeemMutation = useRedeemGiftcard();
  const validateMutation = useValidateGiftcard();

  // Función para validar una gift card
  const handleValidateGiftCard = async () => {
    if (!giftCardCode.trim()) {
      setValidationMessage('Por favor, ingresa un código de tarjeta de regalo');
      setValidationStatus('error');
      return;
    }

    try {
      const result = await validateMutation.mutateAsync({ code: giftCardCode });

      if (result.valid) {
        setValidationMessage('Tarjeta de regalo válida');
        setValidationStatus('success');
      } else {
        setValidationMessage(result.message || 'Tarjeta de regalo inválida');
        setValidationStatus('error');
      }
    } catch (error) {
      setValidationMessage('Error al validar la tarjeta de regalo');
      setValidationStatus('error');
    }
  };

  const handleRedeemGiftCard = async () => {
    if (!giftCardCode.trim()) {
      setValidationMessage('Por favor, ingresa un código de tarjeta de regalo');
      setValidationStatus('error');
      return;
    }

    try {
      const data: GiftcardRedeemRequest = { code: giftCardCode };
      const result = await redeemMutation.mutateAsync(data);

      setValidationMessage(`¡Tarjeta canjeada con éxito! Monto: $${result.amount}`);
      setValidationStatus('success');
      setGiftCardCode('');
    } catch (error: any) {
      setValidationMessage(error.message || 'Error al canjear la tarjeta de regalo');
      setValidationStatus('error');
    }
  };

  // Si el usuario no está autenticado, mostrar mensaje
  if (!user || user.isAnonymous) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Tarjetas de Regalo</CardTitle>
            <CardDescription>
              Inicia sesión para ver y canjear tus tarjetas de regalo.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Tarjetas de Regalo</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Canjear Tarjeta de Regalo</CardTitle>
          <CardDescription>
            Ingresa el código de tu tarjeta de regalo para añadir el saldo a tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="giftcard-code">Código de Tarjeta de Regalo</Label>
              <Input
                id="giftcard-code"
                placeholder="Ingresa el código de tu tarjeta de regalo"
                value={giftCardCode}
                onChange={(e) => setGiftCardCode(e.target.value)}
              />
            </div>
            {validationMessage && (
              <p
                className={`text-sm ${validationStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}
              >
                {validationMessage}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button
            variant="outline"
            onClick={handleValidateGiftCard}
            disabled={validateMutation.isPending}
          >
            {validateMutation.isPending ? 'Validando...' : 'Validar'}
          </Button> */}
          <Button onClick={handleRedeemGiftCard} disabled={redeemMutation.isPending}>
            {redeemMutation.isPending ? 'Canjeando...' : 'Canjear Tarjeta'}
          </Button>
        </CardFooter>
      </Card>

      {/* Listado de gift cards del usuario */}
      <GiftcardList giftcards={userGiftcards} isLoading={isLoading} error={error} />
    </div>
  );
}
