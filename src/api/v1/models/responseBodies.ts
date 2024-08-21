export class ResponseSuccess<T> {
  success: boolean;
  message: string;
  data: T;

  constructor(message: string, data: T) {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}

export class ResponseError {
  success: boolean;
  message: string;
  name: string;
  place: string;

  constructor(message: string, name: string, place: string) {
    this.success = false;
    this.message = message;
    this.name = name;
    this.place = place;
  }
}
