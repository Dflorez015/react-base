// config
export const twUtilities = ({addUtilities}) => {
    const utilities = {
        '.animate-fade-in':{
          'animation': 'fade-in 0.5s ease-in-out'
        },
        '.animate-fade-out': {
          'animation': 'fade-out 0.5s ease-in-out'
        },
        '.animate-spin': {
          'animation': 'spin 1s linear infinite'
        },
        '.styled-link': {
         '@apply underline': '',
         '@apply ml-1': '',
         '@apply leading-tight': '',
         '@apply text-primary': '',
         '@apply font-main': '',
        },
        '.card': {
          '@apply bg-white': '',
          '@apply border': '',
          '@apply border-accent-1': '',
          '@apply rounded-[5px]': '',
        },
        '.system-loading': {          
          '@apply fixed': '',
          '@apply top-0': '',
          '@apply left-0': '',
          '@apply w-screen': '',
          '@apply h-screen': '',  
          '&:before': {            
            '@apply block': '',
            '@apply content-[""]': '',
            '@apply bg-gradient-to-b': '',
            '@apply from-primary/20': '',
            '@apply to-white': '',
            '@apply blur-lg': '',
            '@apply w-full': '',
            '@apply h-full': '',    
          },
          '&:after': {
            '@apply bg-loading': '',
            '@apply bg-no-repeat': '',
            '@apply bg-contain': '',
            '@apply block': '',
            '@apply content-[""]': '',
            '@apply w-[200px]': '',
            '@apply h-[200px]': '',
            '@apply absolute': '',
            '@apply top-1/2': '',
            '@apply left-1/2': '',
            'transform': 'translate(-50%, -50%)',
          },
        },
        '.vertical-scrollbar': {
          '@apply scrollbar': '',
          '@apply scrollbar-w-2': '',
          '@apply overflow-y-scroll': '',
          '@apply scrollbar-thumb-rounded-full': '',
          '@apply scrollbar-thumb-black/25': '',              
        },
        '.section-height': {
          'height': 'var(--section-height)',
        },
        '.section-aside-height': {
          'height': 'var(--aside-section-height)',
        },
    }
    addUtilities(utilities)
}