import { Controller, useFormContext } from 'react-hook-form';
import { LabeledInput } from '@/components/ui/input';
import AmericanCardIcon from '@/components/icons/american_express.svg';
import VisaCardIcon from '@/components/icons/visa_card.svg';
import MaestroCardIcon from '@/components/icons/maestro.svg';
import MasterCardIcon from '@/components/icons/master_card.svg';
import Image from 'next/image';
interface VippoDetailsProps {
  totalBs: number;
}
export const VippoDetails = ({ totalBs }: VippoDetailsProps) => {
  const form = useFormContext();
  const cardMap = {
    4: <Image src={VisaCardIcon} alt="Cash payment method for Adan" />,
    5: <Image src={MaestroCardIcon} alt="Cash payment method for Adan" />,
    all: <Image src={MaestroCardIcon} alt="Cash payment method for Adan" />,
    3: <Image src={AmericanCardIcon} alt="Cash payment method for Adan" />,
  };
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <h6 className="text-sm font-semibold">Paga con Vippo</h6>
        <p className="text-sm">
          Introduzca los datos de su tarjeta, se le hara un cargo por el monto de{' '}
          <strong>Bs. {totalBs}</strong>
        </p>
      </div>
      <form className="flex flex-col gap-2">
        <Controller
          control={form.control}
          name="details.cardNumber"
          render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
            <LabeledInput
              label="Número de tarjeta"
              error={error?.message}
              inputProps={{
                placeholder: 'Número de tarjeta',
                value,
                onChange: (e) => {
                  const { value } = e.target;

                  const numericValue = value.replace(/\D/g, '');

                  let cardNumber = '';
                  for (let i = 0; i < numericValue.length; i += 4) {
                    cardNumber += numericValue.slice(i, i + 4) + ' ';
                  }

                  cardNumber = cardNumber.trim();

                  if (cardNumber.length <= 25) {
                    return onChange(cardNumber);
                  }
                },
              }}
              labelProps={{ className: 'text-sm font-semibold' }}
              suffix={cardMap[value?.[0] as keyof typeof cardMap] ?? cardMap.all}
            />
          )}
        />

        <Controller
          control={form.control}
          name="details.holderName"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <LabeledInput
              label="Nombre de titular"
              error={error?.message}
              inputProps={{
                placeholder: 'Ej: Juan Perez',
                value,
                onChange,
              }}
              labelProps={{ className: 'text-sm font-semibold' }}
            />
          )}
        />

        <div className="flex gap-2  justify-between">
          <div className="w-100">
            <Controller
              control={form.control}
              name="details.expiration"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <LabeledInput
                  label="Fecha de expiración"
                  error={error?.message}
                  inputProps={{
                    placeholder: 'MM/YY',
                    value,
                    onChange: (e) => {
                      const { value } = e.target;
                      if (!/^\d*\/?\d*$/.test(value)) return;
                      if (value.length > 5) return;

                      // Evitar agregar '/' si el usuario está borrando
                      if (
                        value.length === 2 &&
                        !value.includes('/') &&
                        (e.nativeEvent as InputEvent).inputType !== 'deleteContentBackward'
                      ) {
                        return onChange(value + '/');
                      }

                      return onChange(value);
                    },
                    type: 'text',
                  }}
                  labelProps={{ className: 'text-sm font-semibold' }}
                />
              )}
            />
          </div>
          <div className="w-100">
            <Controller
              control={form.control}
              name="details.codigoSeguridad"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <LabeledInput
                  label="CVV"
                  error={error?.message}
                  inputProps={{
                    placeholder: 'Ej: 123',
                    value,
                    onChange: (e) => {
                      const { value } = e.target;
                      if (!/^\d*$/.test(value)) return;
                      if (value.length > 3) return;

                      return onChange(value);
                    },
                    maxLength: 3,
                  }}
                  labelProps={{ className: 'text-sm font-semibold' }}
                />
              )}
            />
          </div>
        </div>
      </form>
    </>
  );
};
