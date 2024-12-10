import React, { useState, useRef, useTransition, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Edit } from 'lucide-react'
import { requestUserOTPAction, validatedUserPhoneOTP } from '@/app/_actions/profile'
import { Button } from '@/components/ui/button'
import { SkeletonCard } from '@/components/ui/skeleton-card'
import { OtpDataResponse } from '@/types/profile'
import { useToast } from '@/hooks/use-toast'

interface OTPInputProps {
  length?: number
  onComplete: (otp: string) => void
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 4, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''))
  const inputsRef = useRef<Array<HTMLInputElement | null>>(Array(length).fill(null))

  const handleInput = (index: number, value: string) => {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus()
      } else {
        onComplete(newOtp.join(''))
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const newOtp = [...otp]
      newOtp[index] = ''
      setOtp(newOtp)
      if (index > 0) {
        inputsRef.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text').slice(0, length)
    if (/^\d+$/.test(pastedText)) {
      const newOtp = pastedText.split('').slice(0, length)
      setOtp(newOtp)
      inputsRef.current[newOtp.length - 1]?.focus()
      onComplete(newOtp.join(''))
    }
  }

  return (
    <form
      className="flex items-center justify-center gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        onComplete(otp.join(''))
      }}
    >
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          ref={(el) => (inputsRef.current[index] = el)}
          onChange={(e) => handleInput(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          maxLength={1}
          pattern="\d*"
        />
      ))}
    </form>
  )
}

export const ProfileFieldWithOTP = ({
  id,
  label,
  icon,
  defaultValue,
  onSuccess,
}: {
  id: string
  label: string
  icon: React.ReactNode
  defaultValue: string
  onSuccess?: () => void
}) => {
  // TODO: NEED TO ADD DISABLE WHEN USER IS ALREADY VERIFIED
  const [open, setOpen] = useState(false)
  const [formState, formAction] = useTransition()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<OtpDataResponse | undefined>()
  console.log('🚀 ~ error:', error)
  const [showSkeleton, setShowSkeleton] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (isPending) {
      setShowSkeleton(true)
    } else {
      const timer = setTimeout(() => setShowSkeleton(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isPending])

  const handleOTPComplete = async (otp: string) => {
    const formData = new FormData()
    formData.set('otp', otp)

    const response = await validatedUserPhoneOTP(undefined, formData)

    if (response.data.validation) {
      setOpen(false)
      onSuccess?.()
    } else {
      console.error('Error al enviar el OTP:', response.data.message)
      setError(response.data)
    }
  }

  const handleSendOtp = async () => {
    setError(undefined)
    startTransition(async () => {
      const formData = new FormData()
      formData.set('phoneNumber', defaultValue)

      const response = await requestUserOTPAction(undefined, formData)

      if (response.validation) {
        setOpen(true)
      } else {
        console.error('Error al enviar el OTP:', response)
      }
    })
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div className={`flex flex-1 items-center border rounded-md px-3 py-2 bg-gray-50`}>
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
        <Button
          type="button"
          onClick={handleSendOtp}
          className="p-2 rounded-md shadow-sm focus:outline-none"
        >
          <Edit className="text-gray-600 hover:text-gray-500" />
        </Button>
      </div>

      {/* Modal */}
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
                    Ingresa el número que enviamos a tu dispositivo asociado.
                  </Dialog.Description>
                  <div className="mt-4">
                    <OTPInput length={4} onComplete={handleOTPComplete} />
                  </div>
                  {!error?.validation && !!error?.message && (
                    <p className="mt-2 text-red-500 text-sm">{error?.message}</p>
                  )}
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="px-4 py-2 bg-gray-200 rounded-md text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                    >
                      Resend OTP
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
