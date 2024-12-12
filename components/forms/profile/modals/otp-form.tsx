import React, { useState, useEffect, useRef } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Edit, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SkeletonCard } from '@/components/ui/skeleton-card'
import { useToast } from '@/hooks/use-toast'
import { useOTPVerification } from '@/hooks/use-otp-verification'
import OTPInput from '@/components/ui/otp-input'
interface ProfileFieldWithOTPProps {
  id: string
  label: string
  icon: React.ReactNode
  defaultValue: string
  onSuccess?: () => void
  initialVerified?: boolean
  otpType: 'phone' | 'email'
}

export const ProfileFieldWithOTP = ({
  id,
  label,
  icon,
  defaultValue,
  onSuccess,
  initialVerified = false,
  otpType,
}: ProfileFieldWithOTPProps) => {
  const [open, setOpen] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [verified, setVerified] = useState(initialVerified)
  const { toast } = useToast()

  const { sendOTPMutation, validateOTPMutation } = useOTPVerification(otpType)

  const isLoading = sendOTPMutation.isPending || validateOTPMutation.isPending

  const isPhone = otpType === 'phone'
  const modalDescription = isPhone
    ? 'Ingresa el código que enviamos a tu número.'
    : 'Ingresa el código que enviamos a tu correo.'

  const successMessage = isPhone
    ? 'Tu número de teléfono se ha verificado correctamente.'
    : 'Tu correo electrónico se ha verificado correctamente.'

  // Manejo del Skeleton
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isLoading) {
      setShowSkeleton(true)
    } else {
      timer = setTimeout(() => setShowSkeleton(false), 300)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isLoading])

  const handleOTPComplete = async (otp: string) => {
    setErrorMessage(null)
    const res = await validateOTPMutation.mutateAsync(otp)
    if (res.validation) {
      setOpen(false)
      setVerified(true)
      onSuccess?.()
      toast({ title: 'Verificación exitosa', description: successMessage })
    } else {
      setErrorMessage(res.message || 'Hubo un error al validar el código.')
    }
  }

  const handleSendOtp = async () => {
    if (verified) return
    setErrorMessage(null)
    const res = await sendOTPMutation.mutateAsync(defaultValue)
    if (res.validation) {
      setOpen(true)
    } else {
      setErrorMessage('No pudimos enviar el OTP. Por favor, intenta más tarde.')
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center border rounded-md px-3 py-2 bg-gray-50">
          <span className="mr-3">{icon}</span>
          <input
            id={id}
            name={id}
            type="text"
            defaultValue={defaultValue}
            disabled
            className="flex-1 bg-transparent border-0 focus:ring-0 sm:text-sm text-gray-400"
          />
        </div>
        {verified ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 />
            <span className="text-sm">Verificado</span>
          </div>
        ) : (
          <Button
            type="button"
            onClick={handleSendOtp}
            className="p-2 rounded-md shadow-sm focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : <Edit className="text-gray-600 hover:text-gray-500" />}
          </Button>
        )}
      </div>
      {errorMessage && <p className="mt-1 text-red-500 text-sm">{errorMessage}</p>}

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Title>
            <Dialog.Content className="fixed left-1/2 top-1/2 max-w-sm w-full bg-white rounded-lg shadow-lg p-6 transform -translate-x-1/2 -translate-y-1/2">
              {showSkeleton ? (
                <SkeletonCard />
              ) : (
                <>
                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    Verifica tu dispositivo
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 text-sm text-gray-500">
                    {modalDescription}
                  </Dialog.Description>
                  <div className="mt-4">
                    <OTPInput length={4} onComplete={handleOTPComplete} />
                  </div>
                  {errorMessage && <p className="mt-2 text-red-500 text-sm">{errorMessage}</p>}
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="px-4 py-2 bg-gray-200 rounded-md text-gray-700"
                      disabled={isLoading}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Reenviando...' : 'Reenviar OTP'}
                    </button>
                  </div>
                </>
              )}
            </Dialog.Content>
          </Dialog.Title>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
