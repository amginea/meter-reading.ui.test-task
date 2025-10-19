import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UploadCSV from './upload-csv';
import { uploadMeterReaedings } from '../infrastructure/meterReadingService';

jest.mock('../infrastructure/meterReadingService', () => ({
    uploadMeterReaedings: jest.fn(),
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

const mockedUploadMeterReadings = uploadMeterReaedings as jest.Mock;
const mockedUseState = useState as jest.Mock;

describe('UploadCSV Component', () => {
    beforeEach(() => {
        mockedUseState.mockImplementation((initialValue) => [initialValue, jest.fn()]);
    });

    it('renders the component', () => {
        render(<UploadCSV />);
        expect(screen.getByText("Upload Meter Readings")).toBeInTheDocument();
    });

    it('calls setFile when a file is uploaded', () => {
        const useStatMock = useState as jest.Mock;
        const setFileMock = jest.fn();
        useStatMock.mockImplementation((initialValue) => [initialValue, setFileMock]);

        render(<UploadCSV />);

        const file = new File(['sample data'], 'sample.csv', { type: 'text/csv' });
        const input = screen.getByTestId("inputCsv");

        fireEvent.change(input, { target: { files: [file] } });

        expect(setFileMock).toHaveBeenCalledWith(file);
    });

    it('displays an error message if upload fails', async () => {
        mockedUploadMeterReadings.mockRejectedValueOnce(new Error('Upload failed'));

        render(<UploadCSV />);

        const file = new File(['sample data'], 'sample.csv', { type: 'text/csv' });
        const input = screen.getByTestId("inputCsv");

        fireEvent.change(input, { target: { files: [file] } });

        waitFor(async () => {
            const errorMessage = await screen.getByText("Failed to upload file.");
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it('triggers upload on button click', async () => {
        mockedUploadMeterReadings.mockResolvedValueOnce({ success: 10, failed: 2 });

        render(<UploadCSV />);

        const file = new File(['sample data'], 'sample.csv', { type: 'text/csv' });
        const input = screen.getByTestId("inputCsv");
        const button = screen.getByTestId("uploadButton");

        fireEvent.change(input, { target: { files: [file] } });
        fireEvent.click(button);

        waitFor(() => {
            expect(mockedUploadMeterReadings).toHaveBeenCalledWith(expect.any(FormData));
            expect(screen.getByText("File uploaded successfully!")).toBeInTheDocument();
        });
    });
});