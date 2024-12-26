import { useMemo, useState } from 'react';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Method } from '@/schemas/payment-method-schema';
import { Radio, RadioField, RadioGroup } from '../ui/radio';

import {
  Accordion,
  AccordionContent,
  AccordionTriggerContent,
  AccordionItem,
} from '../ui/accordion';
import { LabeledInput } from '../ui/input';

export function PaymentMethodSelector({ paymentMethods }: { paymentMethods: Method[] }) {
  const [selectedMethod, setSelectedMethod] = useState<string>(paymentMethods[0].value);

  const handleRadioChange = (value: string) => {
    setSelectedMethod(value);
  };

  const filteredPaymentMethods = useMemo(
    () =>
      paymentMethods.filter((method) => ['zelle', 'mBinance', 'motopos'].includes(method.value)),
    [paymentMethods],
  );

  return (
    <RadioGroup
      className="flex flex-col w-full border rounded-lg"
      value={selectedMethod}
      onChange={handleRadioChange}
    >
      <Accordion type="single" value={selectedMethod} onValueChange={setSelectedMethod}>
        {filteredPaymentMethods.map((method, index) => (
          <AccordionItem
            key={method.value}
            value={method.value}
            className="border-0 focus:ring-0 shadow-none"
          >
            <Card
              className={cn(
                'border-0 rounded-none focus:ring-0 shadow-none',
                selectedMethod === method.value || filteredPaymentMethods.length - 1 !== index
                  ? 'border-b'
                  : '',
              )}
            >
              <AccordionTriggerContent className="flex w-full px-4 py-3 items-center justify-between">
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-x-3">
                    <RadioField>
                      <Radio value={method.value} />
                    </RadioField>
                    <Image src={method.icon} alt={method.name} width={24} height={24} />
                    <span className="font-medium">{method.name}</span>
                  </div>
                </div>
              </AccordionTriggerContent>
            </Card>
            <AccordionContent
              className={cn(
                'px-3 border-b bg-gray-50',
                selectedMethod === method.value || filteredPaymentMethods.length - 1 !== index
                  ? 'border-b-0'
                  : 'border-b',
              )}
            >
              <form className="flex flex-col p-4">
                <LabeledInput
                  label="Nombre del titular"
                  inputProps={{ placeholder: 'Nombre del titular' }}
                  labelProps={{ className: 'text-sm' }}
                />
              </form>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </RadioGroup>
  );
}
