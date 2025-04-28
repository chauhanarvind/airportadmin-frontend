import { toast } from "sonner";
import api from "./api";
import { AxiosError } from "axios";

export async function handleCreate<T>(
  url: string,
  data: T,
  label: string,
  callback: () => void
) {
  try {
    const res = await api.post(url, data);
    console.log(res.data);

    if (res.status == 200) {
      toast.success(`${label} created successfully`);
      callback();
    } else {
      toast.error(`Failed to create ${label}`);
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    let errorMessage = error.message;
    if (error.response?.data.message) {
      errorMessage += `:${error.response.data.message}`;
    }
    console.log(`Error creating ${label} : `, error);
    toast.error(errorMessage);
  }
}

export async function handleUpdate<T>(
  url: string,
  data: T,
  label: string,
  callback: () => void
) {
  try {
    const res = await api.post(url, data);

    if (res.status == 200) {
      toast.success(`${label} updated successfully`);
      callback();
    } else {
      toast.error(`Failed to update ${label}`);
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    let errorMessage = error.message;
    if (error.response?.data.message) {
      errorMessage += `:${error.response.data.message}`;
    }
    console.log(`Error updating ${label} : `, error);
    toast.error(errorMessage);
  }
}

export async function handleDelete(
  url: string,
  label: string,
  callback: () => void
) {
  try {
    const res = await api.delete(url);
    console.log(res);

    if (res.status == 204) {
      toast.success(`${label} deleted successfully`);
      callback();
    } else {
      toast.error(`Failed to delete ${label}`);
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    let errorMessage = error.message;
    if (error.response?.data.message) {
      errorMessage += `:${error.response.data.message}`;
    }
    console.log(`Error deleting ${label} : `, error);
    toast.error(errorMessage);
  }
}
