// import { useState, useEffect } from "react";
// import { Timestamp } from "firebase/firestore";

// const useConvertTimestamp = (timestamp: Timestamp | null) => {
//   const [formattedDate, setFormattedDate] = useState<string | null>(null);

//   useEffect(() => {
//     if (timestamp) {
//       const day = timestamp.toDate().getDate().toString().padStart(2, "0");
//       const month = (timestamp.toDate().getMonth() + 1)
//         .toString()
//         .padStart(2, "0");
//       const year = timestamp.toDate().getFullYear();
//       const createdAtFormatted = `${day}/${month}/${year.toString().slice(2, 4)}`;
//       setFormattedDate(createdAtFormatted);
//     }
//   }, [timestamp]);

//   return formattedDate;
// };

// export default useConvertTimestamp;

import { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";

const useConvertTimestamp = (timestamp: Timestamp | number | null) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    if (!timestamp) return;

    let date: Date;

    if (timestamp instanceof Timestamp) {
      date = timestamp.toDate();
    } else {
      // number → milliseconds
      date = new Date(timestamp);
    }

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(2, 4);

    setFormattedDate(`${day}/${month}/${year}`);
  }, [timestamp]);

  return formattedDate;
};

export default useConvertTimestamp;
