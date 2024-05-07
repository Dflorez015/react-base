import { motion, Variant, Variants } from 'framer-motion';
import Icons from '@assets/icons';
import { RenderIf } from '@components/core';
import { aside__section, header__section, main__section } from './layout.module.css';
import { cn, TC, TCchildren } from '@utils/index';

//#region config
type asideMenuProps = { className?: string; active?: boolean };
type asideMenuItemProps = { icon: (props: any) => React.ReactNode; label: string; hiddeLabel?: boolean };
type avatarProps = { className?: string };

//variants -----
const menuVariants: Variants = {
  animate: (custom: boolean) => {
    if (custom) {
      return {
        width: 63,
        height: 'fit-content',
        overflowX: 'hidden',
      };
    }
    return {
      width: 346,
      overflowX: 'hidden',
    };
  },
};

const exitItemMenuVariant: Variant = { opacity: 0, width: 0, height: 0, overflow: 'hidden', transition: { duration: 0.2, opacity: { duration: 0.1 } } };

//#region layouts

export const HeaderLayout: TCchildren = ({ children }) => {
  return <header className={header__section}>{children}</header>;
};

export const MainLayout: TCchildren = ({ children }) => {
  return <main className={main__section}>{children}</main>;
};

export const Avatar: TC<avatarProps> = ({ className }) => {
  return (
    <div className={cn('inline-flex h-[34px] min-w-[34px] items-center rounded-full p-[4px]', className)}>
      <Icons.Avatar className='m-auto' />
    </div>
  );
};

// #region components
export const AsideMenuLayout: TCchildren<asideMenuProps> = ({ children, className, active }) => {
  return (
    <motion.nav custom={active} variants={menuVariants} className={cn(aside__section, className)} initial={false} animate='animate'>
      {children}
    </motion.nav>
  );
};

export const AsideMenuItem: TC<asideMenuItemProps> = ({ icon: Icon, label, hiddeLabel = false }) => {
  return (
    // secondary_color text if the option is active
    <motion.li layout='position' className='inline-flex cursor-pointer flex-nowrap items-center gap-2 text-nowrap rounded-sm p-2 [&>svg]:h-5 [&>svg]:w-5'>
      <Icon className='h-5 min-w-5' />
      <RenderIf condition={!hiddeLabel}>
        <RenderIf.WhenTrue condition={!hiddeLabel}>
          <motion.p className='w-full' exit={exitItemMenuVariant} key={label}>
            {label}
          </motion.p>
        </RenderIf.WhenTrue>

        <RenderIf.WhenFalse condition={hiddeLabel}>
          <></>
        </RenderIf.WhenFalse>
      </RenderIf>
    </motion.li>
  );
};
