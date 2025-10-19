import axiosInstance from "./axiosInstance";

export const uploadMeterReaedings = async (formData: FormData) => {
  const response = await axiosInstance.post('uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}