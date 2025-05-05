import React from 'react';
import CarbonRecordsTable from './features/carbon/CarbonRecordsTable';
import { CarbonRecordForm } from './features/carbon/CarbonRecordForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <div className="p-6 max-w-5xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Carbon Intensity Tracker</h1>
        <Routes>
          <Route path="/" element={<CarbonRecordsTable />} />
          <Route path="/create" element={<CarbonRecordForm />} />
          <Route path="/edit/:id" element={<CarbonRecordForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

