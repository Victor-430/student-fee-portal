export const generateTransaactionId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `TXN${timestamp}${random}`;
};

export const generateReferenceNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear;
  const random = Math.floor(Math.random() * 1000000);
  return `REF${year}${String(random).padStart(6, "0")}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options = (Intl.DateTimeFormat = {
    // year: "numeric",
    // month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return date.toLocaleDateString("en-US", options);
};
