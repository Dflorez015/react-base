import { Toaster } from 'sonner';

export const MyToast = () => (
  <Toaster
    visibleToasts={4}
    toastOptions={{
      unstyled: true,
      classNames: {
        title: 'font-bold',
        error: 'bg-red-50 text-red-600 border-red-600',
        success: 'bg-green-50 text-green-600 border-green-600',
        warning: 'bg-yellow-50 text-yellow-600 border-yellow-600',
        info: 'bg-blue-50 text-blue-600 border-blue-600',
        toast: 'w-full flex gap-3 font-main items-center py-2 px-4 rounded-md shadow-lg border group toast group-[.toaster]:pointer-events-auto',
      },
    }}
  />
);
