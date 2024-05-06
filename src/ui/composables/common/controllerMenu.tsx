import { useRef } from 'react';
import { ControlledMenu as Controlled, ControlledMenuProps, MenuState, useClick, useMenuState } from '@szhsin/react-menu';
import { RenderFn, TC } from '@utils/typos';
import useShallowEffect from '@hooks/useShallowEffect';

/*----- config -----*/
type controlledMenuProps = {
  triggerElement: RenderFn<{ ref: React.MutableRefObject<null>; anchorProps: Required<Pick<React.HTMLAttributes<Element>, 'onMouseDown' | 'onClick'>> }>;
  children: RenderFn<{ toggle: () => void; state?: MenuState }>;
} & Omit<ControlledMenuProps, 'children'>;

const toolTipConfig: ControlledMenuProps = { captureFocus: false, arrow: true, role: 'tooltip', align: 'center', viewScroll: 'auto', position: 'anchor', boundingBoxPadding: '1 8 1 1' };

/*----- components -----*/
export const ControlledMenu: TC<controlledMenuProps> = ({ children, triggerElement, ...props }) => {
  // hooks
  const ref = useRef(null);
  const [menuState, toggleMenu] = useMenuState({ transition: true });
  const anchorProps = useClick(menuState.state, toggleMenu);

  return (
    <>
      {triggerElement({ ref, anchorProps })}

      <Controlled {...menuState} anchorRef={ref} onClose={() => toggleMenu(false)} {...props}>
        {children({ toggle: toggleMenu, state: menuState.state })}
      </Controlled>
    </>
  );
};

export const ToolTipMenu: TC<ControlledMenuProps & { isOpen?: boolean }> = ({ isOpen, ...props }) => {
  // hooks
  const [{ state }, toggleMenu] = useMenuState({ transition: true });

  useShallowEffect(() => {
    toggleMenu(isOpen);
  }, [isOpen]);

  return <Controlled {...toolTipConfig} direction='top' state={state} {...props} />;
};
