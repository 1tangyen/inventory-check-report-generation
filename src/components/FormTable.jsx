import React, { useState } from "react";

const FormTable = ({
  data,
  columns,
  onRowSelect,
  isSelectable,
  onSelectAll,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelect = (rowId) => {
    if (onRowSelect) {
      const newSelectedRows = selectedRows.includes(rowId)
        ? selectedRows.filter((id) => id !== rowId)
        : [...selectedRows, rowId];
      setSelectedRows(newSelectedRows);
      onRowSelect(newSelectedRows);
    }
  };

  const handleSelectAll = (e) => {
    if (onSelectAll) {
      if (e.target.checked) {
        const allRowIds = data.map((row) => row.id);
        setSelectedRows(allRowIds);
        onSelectAll(allRowIds);
      } else {
        setSelectedRows([]);
        onSelectAll([]);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* Head */}
        <thead>
          <tr>
            {isSelectable && (
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedRows.length === data.length}
                  />
                </label>
              </th>
            )}
            {columns.map((column) => (
              <th key={column.accessor}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        {/* Body */}
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {isSelectable && (
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleRowSelect(row.id)}
                    />
                  </label>
                </th>
              )}
              {columns.map((column) => (
                <td key={column.accessor}>{row[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormTable;
