import { useEffect, useRef, useState } from 'react';

/*------ config ------*/

type debounceType<T> = { value: T; wait: number; options: { leading: boolean } | undefined; fn?: () => void };

/*------ hooks ------*/

function useDebouncedValue<T = any>({ value, options = { leading: false }, wait, fn }: debounceType<T>) {
  // hooks
  const [_value, setValue] = useState(value);
  const mountedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const cooldownRef = useRef(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mountedRef.current) {
      if (!cooldownRef.current && options.leading) {
        setLoading(true);

        cooldownRef.current = true;
        if (fn) {
          fn();
        }
        setValue(value);
        setLoading(false);
      } else {
        cancel();
        setLoading(true);

        timeoutRef.current = window.setTimeout(() => {
          cooldownRef.current = false;
          if (fn) {
            fn();
          }
          setValue(value);
          setLoading(false);
        }, wait);
      }
    }
  }, [value, options.leading, wait]);

  useEffect(() => {
    mountedRef.current = true;
    return cancel;
  }, []);

  // functions
  const cancel = () => window.clearTimeout(timeoutRef.current!);

  return { _value, cancel, loading } as const;
}

export default useDebouncedValue;
