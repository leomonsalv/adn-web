import React, { useState, useRef } from 'react'

interface OTPInputProps {
  length?: number
  onComplete: (otp: string) => void
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 4, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''))
  const inputsRef = useRef<Array<HTMLInputElement | null>>(Array(length).fill(null))

  const handleInput = (index: number, value: string) => {
    const val = value.slice(-1).replace(/\D/g, '')
    const newOtp = [...otp]
    if (val) {
      newOtp[index] = val
      setOtp(newOtp)
      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus()
      } else {
        onComplete(newOtp.join(''))
      }
    } else {
      newOtp[index] = ''
      setOtp(newOtp)
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
    const pastedText = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)

    if (pastedText) {
      const newOtp = pastedText.split('')
      while (newOtp.length < length) {
        newOtp.push('')
      }
      setOtp(newOtp)
      const filledOtp = newOtp.join('')
      if (filledOtp.length === length && !filledOtp.includes('')) {
        onComplete(filledOtp)
      } else {
        const nextIndex = newOtp.findIndex((char) => !char)
        if (nextIndex >= 0) {
          inputsRef.current[nextIndex]?.focus()
        }
      }
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
          ref={(el) => {
            inputsRef.current[index] = el
          }}
          onInput={(e) => handleInput(index, (e.target as HTMLInputElement).value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          aria-label={`Dígito ${index + 1} de ${length}`}
          className="w-14 h-14 text-center text-2xl font-bold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          maxLength={1}
          inputMode="numeric"
        />
      ))}
    </form>
  )
}

export default OTPInput
