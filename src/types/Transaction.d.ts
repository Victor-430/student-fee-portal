interface TRANSACTION {
  id: string;
  date: string;
  fees: FEEDATA[];
  totalAmount: number;
  status: TRANSACTIONSTATUS;
  paymentMethod: "Card" | "Bank Transfer" | "Cash";
  studentName: string;
  studentId: string;
  session: string;
}
