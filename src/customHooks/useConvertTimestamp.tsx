import { useState, useEffect } from "react";

const useConvertTimestamp = (
  timestamp: firebase.firestore.Timestamp | null
) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    if (timestamp) {
      const day = timestamp.toDate().getDate().toString().padStart(2, "0");
      const month = (timestamp.toDate().getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const year = timestamp.toDate().getFullYear();
      const createdAtFormatted = `${day}/${month}/${year.toString().slice(2, 4)}`;
      setFormattedDate(createdAtFormatted);
    }
  }, [timestamp]);

  return formattedDate;
};

export default useConvertTimestamp;
