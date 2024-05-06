import { ComponentType } from 'react';
import { Column } from '@tanstack/react-table';
import Icons from '@assets/icons';
import { Button, RenderIf } from '@components/index';
import { ControlledMenu } from '@composables/common';
import { cn, TC } from '@utils/index';
import { useTableContext } from '../table.context';
import { filterProps } from './InputFilters';

//#region display menu

type displayThMenuProps = Column<any, any> & { label?: string | null; Filter?: ComponentType<filterProps> };

/*----- components -----*/

export const DisplayThMenu = ({ label = null, Filter, ...column }: displayThMenuProps) => {
  if (!column.id) return null;

  return (
    <ControlledMenu
      gap={4}
      boundingBoxPadding='10'
      viewScroll='close'
      triggerElement={({ ref, anchorProps }) => (
        <>
          {label}
          <Button ref={ref} {...anchorProps} size='ico' variant='blank' className='ml-[8px]'>
            <Icons.PopOverMenuFilter className='h-[12px] w-[12px]' />
          </Button>
        </>
      )}>
      {({ toggle }) => {
        return (
          <div className='px-2.5 pb-2.5 pt-1'>
            <RenderIf condition={Boolean(column.columnDef.enableSorting)} children={<OrderTh id={column.id} />} />
            {Filter ? <Filter id={column.id} onClose={toggle} /> : null}
          </div>
        );
      }}
    </ControlledMenu>
  );
};

//#region order

type orderProps = { id: string };

const paragrahp = {
  className: 'flex cursor-pointer items-center gap-1 py-1 transition-colors hover:bg-disabled/20',
  activeClassName: 'bg-primary/20 hover:text-white hover:fill-white hover:bg-red-500',
};

/*------ components ------*/

export const OrderTh: TC<orderProps> = ({ id }) => {
  // hooks
  const { isSorted, changeFn } = useOrderTh(id);

  return (
    <div className='flex flex-col gap-1'>
      <p className='text-med font-medium'>Ordenar</p>
      <div className='text-min font-light'>
        <p className={cn(paragrahp.className, { [paragrahp.activeClassName]: isSorted === 'asc' })} onClick={() => changeFn(false)}>
          <Icons.Ascendant /> Ascendente
        </p>
        <p className={cn(paragrahp.className, { [paragrahp.activeClassName]: isSorted === 'desc' })} onClick={() => changeFn(true)}>
          <Icons.Descendant /> Descendente
        </p>
      </div>
    </div>
  );
};

/*------ controller ------*/

const useOrderTh = (id: string) => {
  // hooks
  const [columnConfig] = useTableContext(state => state.table?.getColumn(id)!);
  useTableContext(state => state.table?.getState());
  useTableContext(state => state.sorting);

  const isSorted = columnConfig.getIsSorted(); // if the current column is being ordered

  // functions
  const changeFn = (desc?: boolean) => {
    columnConfig.toggleSorting(desc);
  };

  return { isSorted, changeFn };
};
