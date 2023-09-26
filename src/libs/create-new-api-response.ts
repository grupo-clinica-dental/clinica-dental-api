export function getNewResponseApi<T>(): ApiResponse<T> {
  return {
    data: {} as T,
    errors: null,
    message: "",
    succeded: false,
  };
}
