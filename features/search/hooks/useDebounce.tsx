import { useEffect, useState } from "react";

const useDebounce = (val: string | undefined, delay: number) => {
  const [value, setValue] = useState<string | undefined>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(val);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [val]);

  return value;
};

export default useDebounce;
