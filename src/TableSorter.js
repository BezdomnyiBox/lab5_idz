import React, { useState } from 'react';

const TableSorter = ({ data }) => {
    const [sortColumn, setSortColumn] = useState(null);

    const handleSortChange = (column) => {
        if (column === sortColumn) {
            // Если выбранный столбец уже был выбран, снимаем сортировку
            setSortColumn(null);
        } else {
            // В противном случае, устанавливаем новый столбец для сортировки
            setSortColumn(column);
        }
    };

    // Функция для сортировки данных по выбранному столбцу
    const sortedData = [...data];
    if (sortColumn) {
        sortedData.sort((a, b) => {
            if (typeof a[sortColumn] === 'string' && typeof b[sortColumn] === 'string') {
                return a[sortColumn].localeCompare(b[sortColumn]);
            } else if (typeof a[sortColumn] === 'number' && typeof b[sortColumn] === 'string') {
                return a[sortColumn] - 0;
            }
            else if (typeof a[sortColumn] === 'string' && typeof b[sortColumn] === 'number') {
                return 0 - b[sortColumn];
            }
            else {
                return a[sortColumn] - b[sortColumn];
            }
        });
    }

    return (
        <div>
            <ul>
                {Object.keys(data[0]).map((column) => (
                    <li key={column}>
                        <label>
                            <input
                                type="radio"
                                name="sortColumn"
                                value={column}
                                checked={sortColumn === column}
                                onChange={() => handleSortChange(column)}
                            />
                            {column}
                        </label>
                    </li>
                ))}
                <li>
                    <label>
                        <input
                            type="radio"
                            name="sortColumn"
                            checked={sortColumn === null}
                            onChange={() => handleSortChange(null)}
                        />
                        Не сортировать
                    </label>
                </li>
            </ul>

            <table>
                <thead>
                    <tr>
                        {Object.keys(data[0]).map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, index) => (
                                <td key={index}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSorter;

