import { AnimationProps, motion, Variants } from 'framer-motion';
import { TCchildren } from '@utils/typos';

/*---- config ----*/
type directions = 'left' | 'right' | 'up' | 'down';
type innerAnimationProps = { direction?: directions };

// const ----

const moveToVariants: Variants = {
  initial: (direction: directions) => {
    if (direction == 'up' || direction == 'down') {
      return { y: direction === 'up' ? 50 : -50, opacity: 0 };
    }
    return { x: direction === 'left' ? 50 : -50, opacity: 0 };
  },
  enter: (direction: directions) => {
    if (direction == 'up' || direction == 'down') {
      return { opacity: 1, y: 0 };
    }
    return { opacity: 1, x: 0 };
  },
  exit: (direction: directions) => {
    if (direction == 'up' || direction == 'down') {
      return { y: direction === 'up' ? -50 : 50, opacity: 0 };
    }
    return { opacity: 0, x: direction === 'left' ? -50 : 50 };
  },
};

const animateTransition = (variants: Variants): AnimationProps => {
  return {
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants,
  };
};

/*---- components ----*/

export const InnerAnimation: TCchildren<innerAnimationProps> = ({ children, direction = 'left' }) => {
  return (
    <motion.div custom={direction} {...animateTransition(moveToVariants)}>
      {children}
    </motion.div>
  );
};
