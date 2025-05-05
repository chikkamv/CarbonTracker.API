import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CarbonRecordForm } from './carbon/CarbonRecordForm';
import * as api from '../services/carbonRecordsApi';
//import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
//import CarbonRecordForm from './CarbonRecordForm';



import { createCarbonRecord } from '../services/carbonRecordsApi';


// Mock the API and navigation
jest.mock('../services/carbonRecordsApi', () => ({
  createCarbonRecord: jest.fn(),
  updateCarbonRecord: jest.fn(),
  getCarbonRecordById: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({}), // Simulate create mode (no ID)
}));


// Test 1

describe('CarbonRecordForm', () => {
  it('submits a new carbon record', async () => {
    // Mocking the API response for creating a new carbon record
    (api.createCarbonRecord as jest.Mock).mockResolvedValue({});

    render(
      <MemoryRouter>
        <CarbonRecordForm />
      </MemoryRouter>
    );

    
    const timestampInput = screen.getByLabelText(/timestamp/i);

    fireEvent.change(timestampInput, {
      target: { value: '2023-12-25T10:30' },
    });
    
    
    await userEvent.type(screen.getByPlaceholderText(/fuel type/i), 'Diesel');
    await userEvent.type(screen.getByPlaceholderText(/intensity/i), '30');
    await userEvent.type(screen.getByPlaceholderText(/percentage/i), '50');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    console.log("Excuting test");
    // Wait for the form submission to complete and API call to be made
    await waitFor(() => {
      expect(createCarbonRecord).toHaveBeenCalledWith(
        expect.objectContaining({
          fuelType: 'Diesel',
          intensity: 30,
          percentage: 50,
          timestamp: expect.stringMatching(/^2023-12-25T10:30.*Z$/), // ISO format
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith('/'); // Ensure navigation after submit
    });
  });
});


// Test 2
test('renders the CarbonRecordForm with all fields', () => {
  render(
    <MemoryRouter>
      <CarbonRecordForm />
    </MemoryRouter>
  );

  expect(screen.getByLabelText(/timestamp/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Fuel Type')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Intensity')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Percentage')).toBeInTheDocument();
  expect(screen.getByText('Submit')).toBeInTheDocument();
});

// Test 3
test('does not call create handler when required fields are empty', async () => {
  const mockCreate = jest.fn();

  render(
    <MemoryRouter>
      <CarbonRecordForm onCreate={mockCreate} />
    </MemoryRouter>
  );

  // Only fill in non-required field
  fireEvent.change(screen.getByPlaceholderText('Percentage'), {
    target: { value: '20' },
  });

  fireEvent.click(screen.getByText('Submit'));

  await waitFor(() => {
    expect(mockCreate).not.toHaveBeenCalled();
  });
});
