import { ReactNode } from 'react';
import { ColumnSort, getCoreRowModel, PaginationState, RowSelectionState, Table, TableOptions, useReactTable } from '@tanstack/react-table';
import { createCustomerStore } from '@utils/index';
import useShallowEffect from '@hooks/useShallowEffect';
import { useFilteringGrahpCase, usePaginationGrahpCase, useRowSelectionTable, useSortingGrahpCase } from './cases/useGraphqlTable';

/*------ config ------*/
export type basicFilterConfig = { id: string; value: string };
export type betweenFilterConfig = { id: string; value: { major?: string; minor?: string } };
export type twoFilterConfig = { id: string; value: [basicFilterConfig, basicFilterConfig] };
type dataTable = Record<string, any>;

type tableOptions<T> = Pick<TableOptions<T>, 'columns'> & { data?: T[]; metaPagination?: any };

type tableStateType<T> = {
  table?: Table<T>;
  sorting: ColumnSort[];
  filters: Array<basicFilterConfig | twoFilterConfig | betweenFilterConfig>;
  data?: T[];
  metaPagination?: any;
  filtersMenu?: boolean;
  secundaryView?: boolean;
  pagination: PaginationState;

  checkData?: RowSelectionState;
  enableMultiRowSelection: boolean;
  isLoading: boolean;
};

type dataTableProps<T = dataTable> = tableOptions<T> & {
  children: ReactNode;
  sorting?: ColumnSort[];
  filters?: Array<basicFilterConfig | twoFilterConfig>;
  pagination?: PaginationState;
  enableMultiRowSelection?: boolean;
};

export const { Provider, useSelectorContext: useTableContext } = createCustomerStore<tableStateType<dataTable>>({
  sorting: [],
  filters: [],
  pagination: { pageIndex: 1, pageSize: 50 },
  filtersMenu: false,
  secundaryView: false,
  enableMultiRowSelection: true,
  isLoading: false,
});

/*------ context ------*/

export function SsrTableProvider<T>({ children, sorting = [], pagination, metaPagination, filters, enableMultiRowSelection = true, ...res }: dataTableProps<T>) {
  return (
    <Provider defaultValue={{ sorting, filtersMenu: false, secundaryView: false, pagination, metaPagination, filters, enableMultiRowSelection }}>
      {children}
      <SsrUseCases {...res} />
    </Provider>
  );
}

function SsrUseCases<T = dataTable>({ data, ...props }: tableOptions<T>) {
  // hooks
  const [tableData, setContext] = useTableContext(s => (s.data ?? data) as T[]);
  const [enableMultiRowSelection] = useTableContext(s => s.enableMultiRowSelection);
  const { sorting, setSorting } = useSortingGrahpCase();
  const { onRowSelectionChange, rowSelection } = useRowSelectionTable();
  const { columnFilters, setFiltering } = useFilteringGrahpCase();
  const { pagination, setPagination } = usePaginationGrahpCase();

  // table configuration
  const table = useReactTable<T>({
    data: tableData,
    onRowSelectionChange: onRowSelectionChange,
    state: { sorting, columnFilters, pagination, rowSelection },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setFiltering,
    manualSorting: true,
    manualFiltering: true,
    debugTable: true,
    enableMultiSort: false,
    autoResetPageIndex: false,
    enableMultiRowSelection,
    ...props,
  });

  //settingData
  useShallowEffect(() => {
    const newTable = Object.assign({}, table) as Table<dataTable>;
    setContext(draft => {
      draft.data = (tableData ?? []) as dataTable[];
      draft.table = newTable;
    });
  }, [tableData, rowSelection]);

  return null;
}
