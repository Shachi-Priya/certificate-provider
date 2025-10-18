// components/Table.js
export default function Table({ columns, rows }) {
  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="text-gray-500">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="border-b px-4 py-2">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id} className="hover:bg-gray-50">
              {columns.map((c) => (
                <td key={c.key} className="border-b px-4 py-2">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
