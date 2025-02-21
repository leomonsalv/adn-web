import { Dialog, DialogTitle, DialogBody, DialogActions } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateReviewDialogProps, ReviewFormData } from '@/types/review';

export function CreateReviewDialog({
  isOpen,
  onClose,
  onSubmit,
  productId,
}: CreateReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormData>();

  const handleFormSubmit = (data: ReviewFormData) => {
    onSubmit({
      ...data,
      rating,
      productId,
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Escribir una reseña</DialogTitle>
      <DialogBody>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">Calificación general</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-8 w-8 cursor-pointer ${
                    i < rating ? 'text-yellow-400' : 'text-gray-200'
                  }`}
                  onClick={() => setRating(i + 1)}
                />
              ))}
            </div>
          </div>

          <div>
            <Input
              placeholder="Título de la reseña"
              {...register('title', { required: 'El título es requerido' })}
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Textarea
              placeholder="Escribe tu opinión sobre el producto"
              className="min-h-[120px]"
              {...register('comment', { required: 'El comentario es requerido' })}
            />
            {errors.comment && (
              <p className="text-sm text-red-500 mt-1">{errors.comment.message}</p>
            )}
          </div>

          <DialogActions>
            <Button type="button" color="white" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={rating === 0}>
              Publicar reseña
            </Button>
          </DialogActions>
        </form>
      </DialogBody>
    </Dialog>
  );
}
