import { FC, useState } from 'react';
import { InputSearch, SearchInputProps } from '@components/core';
import { useDebouncedValue } from '@hooks/index';
import useShallowEffect from '@hooks/useShallowEffect';

/*-------- config --------*/

type PropsSearchComponent = Pick<SearchInputProps, 'className' | 'iconClass' | 'labelClass' | 'containerClass'> & {
  placeholder?: string;
  wait?: number;
  callBack: (value?: string | number) => void;
  defaultValue?: string | number;
};

/*-------- components --------*/

export const SearchWithDebounce: FC<PropsSearchComponent> = ({ placeholder, callBack, wait = 1000, defaultValue = '', ...res }) => {
  // hooks
  const [search, setSearch] = useState<string | number>(defaultValue);
  const { _value, loading } = useDebouncedValue({ value: search, wait, options: { leading: true } });

  useShallowEffect(() => {
    _value && callBack(_value);
  }, [_value]);

  const cancelToogle = () => {
    setSearch('');
    callBack(undefined);
  };

  return <InputSearch {...res} placeholder={placeholder} value={search} isSearching={loading} onChange={e => setSearch(e.target.value)} onCancel={cancelToogle} />;
};
