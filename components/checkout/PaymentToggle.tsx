import * as React from 'react';
import * as Headless from '@headlessui/react';
import { cn } from '@/lib/utils';

interface PaymentToggleProps {
  onChange: (value: 'simple' | 'mixed') => void;
  value: 'simple' | 'mixed';
}

export function PaymentToggle({ onChange, value }: PaymentToggleProps) {
  return (
    <div className="relative w-full max-w-[600px] border border-gray-300 rounded-md p-1">
      <Headless.Switch
        checked={value === 'mixed'}
        onChange={(checked) => onChange(checked ? 'mixed' : 'simple')}
        className={cn(
          'relative w-full h-10 rounded-md transition-colors duration-200',

          'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
        )}
      >
        <div
          className={cn(
            'absolute z-0 inset-0 h-auto w-1/2 bg-[#F4F4F5] rounded-md transition-transform duration-200 ease-in-out',
            value === 'mixed' ? 'translate-x-full' : 'translate-x-0',
          )}
        />

        <div className="relative flex h-full z-10">
          <span
            className={cn(
              'flex-1 flex items-center justify-center text-sm font-medium transition-colors duration-200',
            )}
          >
            Pago Simple
          </span>
          <span
            className={cn(
              'flex-1 flex items-center justify-center text-sm font-medium transition-colors duration-200',
            )}
          >
            Pago Mixto
          </span>
        </div>
      </Headless.Switch>
    </div>
  );
}
