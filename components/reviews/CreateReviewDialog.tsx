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
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>();

  const comment = watch('comment');
  const title = watch('title');

  const handleFormSubmit = (data: ReviewFormData) => {
    onSubmit({
      ...data,
      rating,
      productId,
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle className="text-2xl font-bold">Escribir una reseña</DialogTitle>
      <DialogBody>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
          <div className="flex flex-col items-center gap-4">
            <span className="text-lg text-gray-600">Calificación general</span>
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-10 w-10 cursor-pointer transition-colors ${
                    i < rating ? 'text-yellow-400' : 'text-gray-200'
                  }`}
                  onClick={() => setRating(i + 1)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="relative">
              <Input
                placeholder="Título de la reseña"
                maxLength={40}
                {...register('title', {
                  required: 'El título es requerido',
                  maxLength: {
                    value: 40,
                    message: 'El título no puede exceder los 40 caracteres',
                  },
                })}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                {title?.length || 0}/40
              </span>
            </div>
            {errors.title && <p className="text-sm text-red-500 mt-2">{errors.title.message}</p>}
          </div>

          <div>
            <div className="relative">
              <Textarea
                placeholder="Escribe tu opinión sobre el producto"
                maxLength={100}
                rows={4}
                {...register('comment', {
                  required: 'El comentario es requerido',
                  maxLength: {
                    value: 100,
                    message: 'El comentario no puede exceder los 100 caracteres',
                  },
                })}
              />
              <span className="absolute right-4 bottom-4 text-sm text-gray-400">
                {comment?.length || 0}/100
              </span>
            </div>
            {errors.comment && (
              <p className="text-sm text-red-500 mt-2">{errors.comment.message}</p>
            )}
          </div>

          <DialogActions className="flex justify-end gap-4 mt-8">
            <Button
              type="button"
              color="white"
              onClick={onClose}
              className="px-6 py-2 rounded-full"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={rating === 0}
              className="px-6 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-800 disabled:bg-gray-400"
            >
              Publicar reseña
            </Button>
          </DialogActions>
        </form>
      </DialogBody>
    </Dialog>
  );
}
