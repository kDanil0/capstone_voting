import React from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender,
  getPaginationRowModel
} from '@tanstack/react-table';

const StudentTable = ({ students }) => {
  const columns = [
    {
      accessorKey: 'studentNumber',
      header: 'STUDENT NUMBER',
    },
    {
      accessorKey: 'fullName',
      header: 'STUDENT NAME',
      cell: info => {
        const student = info.row.original;
        return `${student.lastName}, ${student.firstName}`;
      }
    },
    {
      accessorKey: 'token',
      header: 'TOKEN',
    },
    {
      accessorKey: 'department',
      header: 'DEPARTMENT',
    },
  ];

  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="h-full flex flex-col border border-gray-300 rounded">
      <div className="flex-grow overflow-auto">
        <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id}
                    className="px-4 py-3 text-left text-white bg-[#38438c] font-medium uppercase"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-blue-300">
            {table.getRowModel().rows.map((row, index) => (
              <tr 
                key={row.id} 
                className={index % 2 === 1 ? 'bg-blue-100' : 'bg-white'}
              >
                {row.getVisibleCells().map(cell => (
                  <td 
                    key={cell.id} 
                    className="px-4 py-3 border-x border-blue-300"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-300">
        <div className="flex items-center text-sm text-gray-700">
          <span>
            Page{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentTable; 