export const generateTransactionId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `TXN${timestamp}${random}`;
};

export const generateReferenceNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear()
  const random = Math.floor(Math.random() * 1000000);
  return `REF${year}${String(random).padStart(6, "0")}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options : Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleDateString("en-US", options);


};

export const formatCurrency = (amount: number): string => {
return `₦${amount.toLocaleString()}`;}

// Get status color
export const getStatusColor = (status: TRANSACTIONSTATUS): string => {
  switch (status) {
    case "Completed":
      return "text-green-700 bg-green-50 border-green-200";
    case "Pending":
      return "text-yellow-700 bg-yellow-50 border-yellow-200";
    case "Failed":
      return "text-red-700 bg-red-50 border-red-200";
    default:
      return "text-gray-700 bg-gray-50 border-gray-200";
  }
};

export const getStatusIcon = (status: TRANSACTIONSTATUS): string => {
  switch (status) {
    case "Completed":
      return "✓";
    case "Pending":
      return "⏱";
    case "Failed":
      return "✗";
    default:
      return "?";
  }
};
