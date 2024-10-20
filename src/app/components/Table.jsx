const Table = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="container">No data to display.</p>;
  }

  const propertyNames = Object.keys(data[0]);

  return (
    <table className="relative overflow-y-auto table-fixed w-full">
      <thead className="sticky top-0 z-[1] bg-gray-200 text-xs outline-1 outline-gray-200">
        <tr>
          {propertyNames.map((propName, index) => (
            <th
              key={propName}
              className={`text-left p-2 ${index === 0 ? "w-[40%]" : ""} ${
                data[0][propName]?.align || ""
              }`}
            >
              {propName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-y border-gray-200">
            {propertyNames.map((propName) => (
              <td
                key={`${propName}-${index}`}
                className={`text-left p-2 ${row[propName]?.align || ""}`}
              >
                {row[propName]?.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
