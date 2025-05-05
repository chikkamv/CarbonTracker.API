import React, { useEffect, useState } from 'react';
import { getCarbonRecords } from '../../services/carbonRecordsApi';
import { deleteCarbonRecord } from '../../services/carbonRecordsApi';
import { CarbonRecord } from './types';

import { useNavigate } from 'react-router-dom';



const CarbonRecordsTable = () => {
  const [records, setRecords] = useState<CarbonRecord[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCarbonRecords(page, pageSize).then((res) => {
      setRecords(res.data.data);
      setTotal(res.data.total);
      setLoading(false);
    });
  }, [page]);

  const totalPages = Math.ceil(total / pageSize);
  const navigate = useNavigate();

  const handleEdit = (record: CarbonRecord) => {
    navigate(`/edit/${record.id}`);
  };
  
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
        deleteCarbonRecord(id);
      // Refresh the list
      getCarbonRecords(page, pageSize).then((res) => {
        setRecords(res.data.data);
        setTotal(res.data.total);
      });
    }
  };
  
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Carbon Intensity Records</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="w-full table-auto border">
          <thead>
  <tr className="bg-gray-200">
    <th className="border p-2">Timestamp</th>
    <th className="border p-2">Intensity (gCO2/kWh)</th>
    <th className="border p-2">Fuel Type</th>
    <th className="border p-2">Percentage</th>
    <th className="border p-2">Actions</th> 
  </tr>
</thead>
<tbody>
  {records.map((record) => (
    <tr key={record.id}>
      <td className="border p-2">{new Date(record.timestamp).toLocaleString()}</td>
      <td className="border p-2">{record.intensity}</td>
      <td className="border p-2">{record.fuelType}</td>
      <td className="border p-2">{record.percentage}%</td>
      <td className="border p-2 space-x-2">
        <button
          onClick={() => handleEdit(record)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(record.id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>

          <div className="mt-4 flex justify-center items-center space-x-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <button  onClick={() => navigate('/create')}
          className="bg-green-600 text-white px-4 py-2 rounded">
          Add New Record
          </button>
          
        </>
      )}
    </div>
  );
};

export default CarbonRecordsTable;
