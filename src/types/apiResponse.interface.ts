interface ApiError {
  code: string; // Código de error, por ejemplo: "INVALID_INPUT"
  message: string; // Descripción detallada del error
}

interface ApiResponse<T> {
  message: string;
  succeded: boolean;
  data: T | null; // El tipo de data es genérico y puede ser cualquier tipo (T)
  errors: null | string[]; // Puedes tener múltiples errores en una respuesta, por lo que es un array
}
