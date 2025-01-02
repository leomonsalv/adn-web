'use client'
import { footerNavigation } from '@/lib/dummyData'
import { GlobeIcon } from 'lucide-react'
import { useState } from 'react'

export function LanguagePicker() {
  const [language, setLanguage] = useState('spanish') // This should be set by the global lang
  return (
    <div className="px-4 py-1 bg-transparent flex border-[#4A5467] border rounded-sm font-semibold">
      <GlobeIcon className="w-5 self-center" />
      <select className="border-none bg-transparent">
        {footerNavigation.translations.map((lang, idx) => (
          <option
            key={`${idx}-${lang.value}`}
            value={lang.value}
            onChange={() => setLanguage(lang.value)}
          >
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  )
}
