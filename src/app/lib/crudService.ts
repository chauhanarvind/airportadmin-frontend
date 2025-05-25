import { toast } from "sonner";
import api from "./api";
import { AxiosError } from "axios";

export async function handleCreate<T>(
  url: string,
  data: T,
  label: string,
  callback?: () => void
) {
  try {
    const res = await api.post(url, data);
    console.log(res.data);

    if (res.status == 200) {
      toast.success(`${label} created successfully`);
      if (callback) callback();
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

export async function handleUpdate<TResponse = any>(
  url: string,
  method: "POST" | "PUT" = "POST",
  data?: any,
  label: string = "Item",
  onSuccess?: (resData: TResponse) => void
) {
  try {
    const res = await api.request<TResponse>({
      method,
      url,
      data,
    });

    if (res.status === 200) {
      toast.success(`${label} updated successfully`);
      if (onSuccess) onSuccess(res.data);
    } else {
      toast.error(`Failed to update ${label}`);
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    const errorMessage = error.response?.data?.message
      ? `${label} update failed: ${error.response.data.message}`
      : `Error updating ${label}`;
    console.error(errorMessage, error);
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
