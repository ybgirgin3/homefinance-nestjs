export interface MessageResponse {
  status: number;
  message: string;
  response?: any; // null | Promise<Expense> | Promise<Expense>[];
}
