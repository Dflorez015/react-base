import { motion, Variants } from 'framer-motion';
import Icons from '@assets/icons';
import { RenderIf } from '@components/core';
import { useTableContext } from '../table.context';

//#region config

const variants: Variants = {
  initial: {
    y: -40,
    opacity: 0,
  },
  animate: {
    y: 40,
    opacity: 1,
  },
  exit: {
    y: -40,
    opacity: 0,
  },
};

//#region components

export const EmptyComponent = () => {
  return (
    <tr className='relative h-[90px]'>
      <td className='absolute left-0 top-0 min-h-[40px] w-full'>
        <div className='relative mx-auto w-fit text-primary-1'>
          <Icons.Avatar />
          <h4 className='text-lg'>¡Oops!</h4>
          <p className='text-txtColor-main/60'>No hay registros por mostrar.</p>
        </div>
      </td>
    </tr>
  );
};

export const LoadingTableTest = () => {
  const [isLoading] = useTableContext(state => state.isLoading);
  return (
    <RenderIf>
      <RenderIf.WithAnimate>
        <RenderIf.WhenTrue condition={isLoading || false}>
          <motion.div
            variants={variants}
            initial='initial'
            animate='animate'
            exit={'exit'}
            transition={{ type: 'spring', stiffness: 100 }}
            className='absolute left-[43%] z-50 flex w-fit items-center gap-2 rounded-md border border-accent bg-white px-2 py-1.5 text-primary-1'>
            <Icons.Loading className='static' />
            <p>Cargando...</p>
          </motion.div>
        </RenderIf.WhenTrue>
      </RenderIf.WithAnimate>
    </RenderIf>
  );
};
