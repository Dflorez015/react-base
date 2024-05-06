import { useMemo, useState } from 'react';
import { Button } from '@components/Buttons';
import { SearchWithDebounce, twoFilterConfig, useTableContext } from '@composables/index';
import { getCurrentDate } from '@utils/index';
import { TC } from '@utils/typos';

/*------ config ------*/

export type filterProps = { id?: string; onClose?: () => void };
type dateFilterValue = { major?: string; minor?: string };

/*------ components ------*/

export const TextFilter: TC<filterProps> = ({ id = '' }) => {
  // hooks
  const [columnConfig] = useTableContext(state => state.table?.getColumn(id)!);

  return (
    <>
      <p className='text-med'>Filtrar por</p>

      <SearchWithDebounce
        defaultValue={(columnConfig.getFilterValue() ?? '') as string}
        callBack={value => {
          columnConfig.setFilterValue(value);
        }}
        containerClass='py-1 px-1 mx-2 w-[150px] [&>div]:w-[38px] rounded-sm'
        className='text-med w-full rounded-none font-medium'
        iconClass='size-3'
      />
    </>
  );
};

export const DatesFilter: TC<filterProps> = ({ id = '', onClose }) => {
  // hooks
  const { dateFilters, handleDates, submitDateFilters } = useDateFilter({ id, onClose: onClose! });
  const currentDate = useMemo(() => getCurrentDate(), []);

  return (
    <>
      <p className='text-med font-medium'>Filtrar fecha</p>

      <div className='flex flex-col gap-1  font-normal'>
        <label htmlFor='major' className='text-min flex flex-col'>
          <strong>Mayor a</strong>
          <input type='datetime-local' id='major' value={dateFilters?.major ?? ''} onChange={handleDates} max={dateFilters?.minor === '' ? currentDate : dateFilters?.minor} />
        </label>

        <label htmlFor='minor' className='text-min flex flex-col'>
          <strong>Menor a</strong>
          <input type='datetime-local' id='minor' value={dateFilters?.minor ?? ''} onChange={handleDates} min={dateFilters?.major} max={currentDate} />
        </label>

        <Button size={'xs'} onClick={submitDateFilters}>
          Filtrar
        </Button>
      </div>
    </>
  );
};

/*----- hooks -----*/
/**
 * hook than save into table context the
 * @param id
 * @returns
 */
const useDateFilter = ({ id, onClose }: Required<filterProps>) => {
  // hooks
  const [table] = useTableContext(state => state.table);
  const [columnConfig] = useTableContext(state => state.table?.getColumn(id)!);

  const defaultValue = useMemo<dateFilterValue>(() => {
    // default value from the table
    return (
      (columnConfig.getFilterValue() as twoFilterConfig)?.value.reduce(
        (acc, filt) => {
          acc[filt.id] = filt.value;
          return acc;
        },
        {} as Record<string, string>,
      ) ?? {}
    );
  }, []);

  const [dateFilters, setDateFilters] = useState<dateFilterValue>(defaultValue); // value than submit;

  // functions ----

  // set state values
  const handleDates = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setDateFilters(currentDates => {
      let newDates = Object.assign({}, currentDates);
      if (!value) {
        delete newDates[id as keyof dateFilterValue];
        return newDates;
      }
      if (id in currentDates) return Object.assign(newDates, { [id]: value });
      return Object.assign({ [id]: value }, newDates);
    });
  };

  // submit the values to table
  const submitDateFilters = () => {
    const hasValue = Object.keys(dateFilters).length;
    table?.setPagination({ pageIndex: 1, pageSize: table?.getState().pagination.pageSize });
    columnConfig.setFilterValue(hasValue ? dateFilters : undefined);
    onClose();
  };

  return { dateFilters, handleDates, submitDateFilters };
};
