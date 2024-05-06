import { useEffect, useMemo } from 'react';
import { ColumnFiltersState, functionalUpdate, OnChangeFn, PaginationState, RowSelectionState, SortingState } from '@tanstack/react-table';
import { useTableContext } from '@composables/ssrTable/table.context';
// import { dateFilter, orderTypes, pagination, stringFilter } from '@graphql/graphql';

/**
 * utils hook than returns the sorting value and sorting function
 * -- this sorting is for mixin structure in graphql --
 * @returns
 */
export const useSortingGrahpCase = () => {
  // hooks
  const [sorting, setContext] = useTableContext(s => s.sorting);

  // sorting function. Single sorting
  const setSorting: OnChangeFn<SortingState> = updaterOrValue => {
    const newSort = functionalUpdate(updaterOrValue, sorting)[0];

    if (sorting.length === 0) {
      setContext(draft => {
        draft.sorting = [newSort];
      });
      return;
    }

    // const newSortingState = typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue;
    const newSorting = sorting.reduce((accu, sort) => {
      if (sort.id === newSort.id) {
        switch (true) {
          case newSort.desc && !sort.desc:
            accu.push(newSort);
            break;
          case !newSort.desc && sort.desc:
            accu.push(newSort);
            break;
          default:
            break;
        }
        return accu;
      }
      accu.push(newSort);
      return accu;
    }, [] as SortingState);

    setContext(draft => {
      draft.sorting = newSorting;
    });
  };

  return { sorting, setSorting };
};

/**
 * utils hook than returns the filtering value and filtering function
 * -- this filtering is for mixin structure in graphql --
 * @returns
 */
export const useFilteringGrahpCase = () => {
  // hooks
  const [columnFilters, setContext] = useTableContext(s => s.filters);

  // filtering function. working on it 🚧
  const setFiltering: OnChangeFn<ColumnFiltersState> = updaterOrValue => {
    const newFilt = functionalUpdate(updaterOrValue, columnFilters);
    setContext(draft => {
      draft.filters = newFilt as any[];
    });
  };

  return { columnFilters, setFiltering };
};

/**
 * utils hook than returns the pagination value and pagination function
 * -- this pagination is for mixin structure in graphql --
 * @returns
 */
export const usePaginationGrahpCase = () => {
  // hooks
  const [pagination, setContext] = useTableContext(s => s.pagination);

  // pagination function.
  const setPagination: OnChangeFn<PaginationState> = updaterOrValue => {
    const newPaginate = functionalUpdate(updaterOrValue, pagination);
    setContext(draft => {
      draft.pagination = newPaginate;
    });
  };

  return { pagination, setPagination };
};

/**
 * hook than feedback the current query with pagination, sorting and filtering from the current table
 * @returns
 */
export const useTableQueryVariables = () => {
  const [currentPagination, setContext] = useTableContext(s => s.pagination);
  const [currentSorting] = useTableContext(s => s.sorting);
  const [currentFilters] = useTableContext(s => s.filters);

  const pagination = useMemo<any | undefined>(() => {
    const { pageIndex, pageSize } = currentPagination;
    return { skip: (pageIndex - 1) * pageSize, take: pageSize };
  }, [currentPagination]);

  const sorting = useMemo<Record<string, any>[]>(() => {
    return currentSorting.map(sort => ({ [sort.id]: sort.desc ? 'DESC' : 'ASC' }));
  }, [currentSorting]);

  const filters = useMemo(() => {
    return currentFilters?.reduce(
      (acc, current) => {
        switch (true) {
          case typeof current.value == 'string': {
            const filt: any = {
              _contains: current.value,
            };
            acc[current.id] = filt;
            return acc;
          }
          case typeof current.value == 'object' && ('minor' in current.value || 'major' in current.value): {
            const filt: any = {
              _gte: current.value.major,
              _lte: current.value.minor,
            };
            acc[current.id] = filt;
            return acc;
          }
        }
        return acc;
      },
      {} as Record<string, any>,
    );
  }, [currentFilters]);

  return { pagination, sorting, filters, setContext };
};

/**
 * Hook that manage
 * @returns
 */
export const useRowSelectionTable = () => {
  const [checkData, setContext] = useTableContext(state => state.checkData);

  const onRowSelectionChange: OnChangeFn<RowSelectionState> = updaterOrValue => {
    const newRowSelection = functionalUpdate(updaterOrValue, checkData || {});

    setContext(draft => {
      draft.checkData = newRowSelection;
    });
  };

  // const memoizedFunc = useCallback(onRowSelectionChange, [checkData])

  return {
    rowSelection: checkData || {},
    onRowSelectionChange: onRowSelectionChange,
  };
};

/**
 * Hook that manage loading table state
 * @param isLoading
 */
export const useLoadingTable = (isLoading: boolean) => {
  const [_, setContext] = useTableContext(state => state.isLoading);

  useEffect(() => {
    setContext(state => {
      state.isLoading = isLoading;
    });
  }, [isLoading]);
};
