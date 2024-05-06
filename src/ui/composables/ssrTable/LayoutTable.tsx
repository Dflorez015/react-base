import { flexRender } from '@tanstack/react-table';
import Table, { TbodyCell, TheadCell } from '@components/Table';
import { TheadVariants } from '@components/Table/variant';
import { useTableContext } from './table.context';
import { EmptyComponent, LoadingTableTest } from './utilities/Content';

/*-------- components --------*/

export function DataTable({ variant = 'primary' }: { variant?: TheadVariants['variant'] }) {
  // const table = useReactTable({ ...res, getCoreRowModel: getCoreRowModel() });
  const [table] = useTableContext(state => state.table);

  if (!table) return <>Sin provider tonoto 💀</>;
  return (
    <>
      <LoadingTableTest />

      <Table
        variant={variant}
        columns={table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <TheadCell key={header.id} style={{ width: header.getSize() }} colSpan={index}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TheadCell>
            ))}
          </tr>
        ))}
        body={
          table.getRowModel().rows.length === 0 ? (
            <EmptyComponent />
          ) : (
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  <TbodyCell key={cell.id} style={{ width: cell.column.getSize() }} colSpan={index}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TbodyCell>
                ))}
              </tr>
            ))
          )
        }
      />
    </>
  );
}
