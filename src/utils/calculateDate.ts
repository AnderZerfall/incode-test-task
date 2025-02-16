import { formatDistance } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const CalculateDate = (date: Date) => {
  const currentDate = new Date();

  return formatDistance(currentDate, date, { locale: enUS });
}

