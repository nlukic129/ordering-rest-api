export class Err extends Error {
  statusCode: number;
  name: string;
  place: string;

  constructor(message?: string, options?: Partial<{ statusCode: number; name: string; place: string; details: string }>) {
    super(message);

    this.statusCode = options?.statusCode || 500;
    this.name = options?.name || "Error";
    this.place = options?.place || "Unknown Location";
  }
}

export default Err;
