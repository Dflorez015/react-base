// const
const radioDimention = "22px"
const paddingForLabelFloating = "15px"

// config
export const twComponents = ({theme, addComponents}) =>{
  const components = {
    // skeleton loading
    '.loader': {
      'background': '#f3f3f3',
      'position': 'relative',
      'overflow': 'hidden',
      '&::before': {
        'content': '""',
        'position': 'absolute',
        'top': '0',
        'left': '-100%',
        'width': '100%',
        'height': '100%',
        'background': 'linear-gradient(to right, #f3f3f3, #e0e0e0, #f3f3f3)',
        'animation': 'loading 1.5s linear infinite'
      }
    },
    // input radio
    '.form-radio': {
      'height': radioDimention,
      'width': radioDimention,
      'aspectRatio': "1",
      'padding': '3px',
      'background': `radial-gradient(farthest-side, ${theme('colors.primary.1')} 94%, #0000) 50%/0 0 no-repeat content-box`,
      'borderRadius': '50%',
      'border': `calc(${radioDimention}/8) solid`,
      '@apply border-primary':'',
      'outlineOffset': `calc(${radioDimention}/10)`,
      'cursor': 'pointer',
      'fontSize': 'inherit',
      '@apply appearance-none': '',
      'transition': '.3s',
      '@apply outline-none': '',
      '&:checked': {
        '@apply border-primary': '',
        'backgroundSize': '100% 100%',
      },
      '&:disabled': {
        '@apply border-slate-100':'',
        '@apply cursor-not-allowed':'',
        '& + p': {
          '@apply text-txtColor-main/20': '',
          '@apply cursor-not-allowed': ''
        }
      },          
    },
    // input checkbox
    '.form-checkbox': {    
      '@apply h-5': '',
      '@apply w-5': '',
      '@apply appearance-none': '',
      '@apply bg-white':'',
      '@apply rounded':'',
      '@apply border-2':'',
      '@apply border-primary':'',
      '@apply cursor-pointer':'',
      '@apply relative': '',      
      '@apply outline-none': '',
      'transition': '.3s',
      '&:disabled': {
        '@apply cursor-not-allowed': '',
        '@apply border-slate-100': '',
        '& + p': {
          '@apply text-txtColor-main/20': '',
          '@apply cursor-not-allowed': ''
        }
      },
      '&:checked': {
        '@apply bg-primary': '',
        '&:disabled': {
          '@apply bg-slate-200': '',
        },
        '&::after': {
          // 'content': '"✓"',
          'content': 'url("/checkbox.svg")',
          'color': 'white',
          'position': 'absolute',
          'top': '-2px',
          'right': '-1px'
        }
      },
    },
    // input switch
    '.form-switch': {
      '@apply w-[36px]': '',
      '@apply h-[20px]': '',
      '@apply flex': '',
      '@apply items-center': '',
      '@apply justify-start': '',
      '@apply rounded-xl': '',
      '@apply p-[2px]': ''
    },
  }
  addComponents(components)
}