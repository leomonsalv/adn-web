import { X as XIcon, Check as CheckIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

type Props = {
  productQuantity: number;
};

function DisponibilityCounter({ productQuantity }: Props) {
  if (productQuantity === 0) {
    return (
      <div className="flex items-center mt-4 bg-red-50 border border-red-200 rounded p-2">
        <XIcon className="text-red-600 mr-2" />
        <span className="text-red-700 text-sm font-medium">
          No disponible. Este producto no se encuentra en stock actualmente.
        </span>
      </div>
    );
  }

  const now = dayjs();
  const currentHour = now.hour();
  const currentDay = now.day();
  const cutoffHour = 19; // 7 PM

  let deliveryDayText = 'Hoy';
  let showCountdown = false;
  let timeLeftSeconds = 0;

  if (currentDay === 6 || currentDay === 0) {
    // Sábado (6) o Domingo (0) => entrega el lunes (sin countdown)
    deliveryDayText = 'el Lunes';
    showCountdown = false;
  } else if (currentDay === 5 && currentHour >= cutoffHour) {
    // Viernes después de las 7 pm => entrega Lunes
    deliveryDayText = 'el Lunes';
    showCountdown = false;
  } else if (currentHour >= cutoffHour) {
    // Después de las 7 pm en lunes a jueves => entrega Mañana
    deliveryDayText = 'Mañana';
    showCountdown = false;
  } else {
    // Antes de las 7 pm (lunes a viernes) => entrega Hoy, con countdown a las 7 pm
    showCountdown = true;
    const cutoffTime = now.hour(cutoffHour).minute(0).second(0).millisecond(0);
    const diff = cutoffTime.diff(now, 'second');
    timeLeftSeconds = diff > 0 ? diff : 0;
  }

  const [timeLeft, setTimeLeft] = useState(timeLeftSeconds);

  useEffect(() => {
    if (!showCountdown) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [showCountdown]);

  let countdownText = '';
  if (showCountdown && timeLeft > 0) {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    countdownText = `${hours}h ${minutes}m ${seconds}s`;
  }

  // Si llega a 0 el countdown, se puede actualizar el texto
  // if (showCountdown && timeLeft === 0) {
  //   deliveryDayText = 'Hoy'
  //   countdownText = ''
  // }

  return (
    <div className="flex items-center mt-4 rounded p-2 ">
      <CheckIcon className="text-green-700 mr-2" />
      <span className=" text-sm font-medium">
        {showCountdown && timeLeft > 0 ? (
          <>
            <span className="text-green-700 font-semibold">Disponible.</span> Ordena en las próximas{' '}
            <strong>{countdownText}</strong> y el producto estará contigo{' '}
            <strong>{deliveryDayText}</strong>
          </>
        ) : (
          <>
            Disponible. Si ordenas ahora el producto estará contigo{' '}
            <strong>{deliveryDayText}</strong>
          </>
        )}
      </span>
    </div>
  );
}

export default DisponibilityCounter;
