import { toast } from "sonner";
import api from "./api";
import { AxiosError } from "axios";

export async function handleCreate<TRequest, TResponse = void>(
  url: string,
  data: TRequest,
  label: string,
  callback?: () => void
): Promise<TResponse | undefined> {
  try {
    const res = await api.post<TResponse>(url, data);
    if (res.status === 200 || res.status === 201) {
      toast.success(`${label} created successfully`);
      callback?.();
      return res.data;
    } else {
      toast.error(`Failed to create ${label}`);
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string; error?: string }>;
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message;

    toast.error(`${label} creation failed: ${errorMessage}`);
    console.error(`Error creating ${label}:`, error);
  }
}

export async function handleUpdate<TResponse, TData>(
  url: string,
  method: "POST" | "PUT" = "POST",
  data?: TData,
  label: string = "Item",
  onSuccess?: (resData: TResponse) => void
) {
  try {
    const res = await api.request<TResponse>({ method, url, data });

    if (res.status === 200) {
      toast.success(`${label} updated successfully`);
      if (onSuccess) onSuccess(res.data);
      return res.data;
    } else {
      toast.error(`Failed to update ${label}`);
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string; error?: string }>;
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message;

    toast.error(`${label} creation failed: ${errorMessage}`);
    console.error(`Error creating ${label}:`, error);
  }
}

export async function handleDeleteCRUD(
  url: string,
  label: string,
  callback: () => void
) {
  try {
    const res = await api.delete(url);
    if (res.status === 204) {
      toast.success(`${label} deleted successfully`);
      callback();
    } else {
      toast.error(`Failed to delete ${label}`);
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(`${label} deletion failed: ${errorMessage}`);
    console.error(`Error deleting ${label}:`, error);
  }
}

export async function handleFetchList<T>(
  url: string,
  label: string,
  onSuccess?: (data: T) => void
) {
  try {
    const res = await api.get<T>(url);
    if (res.status === 200) {
      onSuccess?.(res.data);
      return res.data;
    } else {
      toast.error(`Failed to fetch ${label}`);
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(`${label} fetch failed: ${errorMessage}`);
    console.error(`Error fetching ${label}:`, error);
  }
}

export async function handleFetchPaged<T>(
  url: string,
  label: string,
  onSuccess?: (data: T) => void
) {
  try {
    const res = await api.get<T>(url);
    if (res.status === 200) {
      onSuccess?.(res.data);
      return res.data;
    } else {
      toast.error(`Failed to fetch ${label}`);
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(`${label} fetch failed: ${errorMessage}`);
    console.error(`Error fetching ${label}:`, error);
  }
}

export async function handleGetById<T>(
  url: string,
  label: string,
  onSuccess?: (data: T) => void
) {
  try {
    const res = await api.get<T>(url);
    if (res.status === 200) {
      onSuccess?.(res.data);
      return res.data;
    } else {
      toast.error(`Failed to fetch ${label} details`);
    }
  } catch (err: unknown) {
    const error = err as AxiosError<{ message?: string }>;
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(`${label} fetch failed: ${errorMessage}`);
    console.error(`Error fetching ${label}:`, error);
  }
}
