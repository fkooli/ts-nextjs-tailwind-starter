import * as React from 'react';
import clsxm from "@/lib/clsxm";

export type DataTableProps = {
    rows: any[];
    headers: any;
} & React.ComponentPropsWithRef<'a'>;


const DataTable = React.forwardRef<HTMLAnchorElement, DataTableProps>(
    (
        {
            children,
            rows,
            headers,
            ...rest
        },
        ref) => {
        const headersList = headers.map((header: any, index: number) => {
            return <th
                className={clsxm('text-black-600', header.className ? header.className : 'px-4 py-2')}
                key={index}>
                {header.label}
            </th>;

        })
        const rowsList = rows.map((row: any, rowIndex: number) => {

            const tdList = row.map((value: string, index: number) => {
                const itemKey = rowIndex + "_" + index
                return <td
                    className={clsxm('border  border-gray-500  text-black-600 font-medium', headers[index].className ? headers[index].className : 'px-4 py-2')}
                    key={itemKey}>
                    {value}
                </td>
            })
            return <tr key={rowIndex}>
                {tdList}
            </tr>

        })


        return (
            <table className="table-auto mt-2">
                <thead>
                <tr>
                    {headersList}
                </tr>
                </thead>
                <tbody>
                {rowsList}
                </tbody>
            </table>
        );
    }
);


export default DataTable;
