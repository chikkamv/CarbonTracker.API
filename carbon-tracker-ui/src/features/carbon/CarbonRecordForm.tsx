import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { CarbonRecord } from './types';
import {
  createCarbonRecord,
  getCarbonRecordById,
  updateCarbonRecord,
} from '../../services/carbonRecordsApi';


interface CarbonRecordFormProps {
  onCreate?: (data: CarbonRecord) => void;
}

export const CarbonRecordForm: React.FC<CarbonRecordFormProps> = ({ onCreate }) => {
  const { register, handleSubmit, reset } = useForm<CarbonRecord>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getCarbonRecordById(parseInt(id)).then((res) => {
        const data = res.data;
        reset({
          timestamp: data.timestamp.slice(0, 16),
          fuelType: data.fuelType,
          intensity: data.intensity,
          percentage: data.percentage,
        });
      });
    }
  }, [id, reset]);

  const convertToUtcISOString = (localDateTime: string) => {
    const date = new Date(localDateTime);
    return date.toISOString();
  };

  const onSubmit = async (data: CarbonRecord) => {
    if (id) {
      console.log("Update Rord");
      await updateCarbonRecord(parseInt(id), {
        ...data,
        id: parseInt(id),
        timestamp: convertToUtcISOString(data.timestamp),
      });
    } else {
      console.log("Creating New Rord");
      const created = await createCarbonRecord({
        ...data,
        intensity: Number(data.intensity),
        percentage: Number(data.percentage),
        timestamp: convertToUtcISOString(data.timestamp),
      });

      console.log('Record created successfully');
      // Mock
      if (onCreate) onCreate(created.data);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label htmlFor="timestamp">Timestamp</label>
      <input
        id="timestamp"
        type="datetime-local"
        required
        className="border p-2 w-full"
        {...register('timestamp')}
      />
      <input
        {...register('fuelType')}
        placeholder="Fuel Type"
        className="border p-2 w-full"
        required
      />
      <input
        {...register('intensity')}
        type="number"
        placeholder="Intensity"
        className="border p-2 w-full"
        required
      />
      <input
        {...register('percentage')}
        type="number"
        placeholder="Percentage"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {id ? 'Update' : 'Submit'}
      </button>
    </form>
  );
};
