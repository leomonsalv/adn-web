import { cn } from '@/lib/utils';

interface CheckoutSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function CheckoutSection({ title, children, className }: CheckoutSectionProps) {
  return (
    <section aria-labelledby={`${title}-heading`} className={className}>
      <h2 id={`${title}-heading`} className="text-lg font-medium text-gray-900">
        {title}
      </h2>
      {children}
    </section>
  );
}
