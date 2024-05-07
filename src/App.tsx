import { useState } from 'react';
import { Button } from '@components/Buttons';
import { BasicFormProvider } from '@components/Form';
import { app__container, AsideMenuLayout, HeaderLayout, MainLayout } from '@components/index';
import { CheckBoxFormCntx, DataTable, DatesFilter, DisplayThMenu, RadioFormCntx, SsrTableProvider, SwitchFormCntx, TextFilter } from '@composables/index';

function App() {
  return (
    <section className={app__container}>
      <HeaderLayout>
        <div>
          <h3>PCT</h3>
        </div>
        <div className='ml-auto'>
          user
        </div>
      </HeaderLayout>

      <AsideMenuLayout active={false}>a</AsideMenuLayout>
      <MainLayout>
        <Test />
      </MainLayout>
    </section>
  );
}

const Test = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <BasicFormProvider defaultValue={{}} className='flex-1'>
        <h1 className='text-primary'>Vite + React</h1>
        <h2 className='text-primary'>Vite + React</h2>
        <h3 className='text-primary'>Vite + React</h3>
        <h4 className='text-primary'>Vite + React</h4>
        <h5 className='text-primary'>Vite + React</h5>
        <div className='card'>
          <RadioFormCntx currentId='s' label='radio' />
          <CheckBoxFormCntx currentId='d' label='check' />
          <SwitchFormCntx currentId='f' label='switch' />
          <Button onClick={() => setCount(count => count + 1)}>count is {count}</Button>
        </div>
      </BasicFormProvider>

      <SsrTableProvider
        columns={[
          { id: 'id', accessorKey: 'id', header: ({ column }) => <DisplayThMenu Filter={TextFilter} {...column} label='ID' />, cell: info => `${info.getValue()}` },
          { id: 'createAt', accessorKey: 'createAt', header: ({ column }) => <DisplayThMenu Filter={DatesFilter} {...column} label='Fecha de creación' />, cell: info => `${info.getValue()}` },
        ]}
        data={[{ id: 1 }]}>
        <DataTable />
      </SsrTableProvider>
    </>
  );
};

export default App;
