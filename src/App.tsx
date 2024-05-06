import { useState } from 'react';
import { Button } from '@components/Buttons';
import { BasicFormProvider } from '@components/Form';
import { app__container, HeaderLayout, MainLayout } from '@components/index';
import { CheckBoxFormCntx, DataTable, DatesFilter, DisplayThMenu, RadioFormCntx, SsrTableProvider, SwitchFormCntx, TextFilter } from '@composables/index';

function App() {
  return (
    <section className={app__container}>
      <HeaderLayout>
        <></>
      </HeaderLayout>

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
        <h1>Vite + React</h1>
        <div className='card'>
          <RadioFormCntx currentId='s' label='radio'/>
          <CheckBoxFormCntx currentId='d' label='check'/>
          <SwitchFormCntx currentId='f' label='switch'/>
          <Button onClick={() => setCount(count => count + 1)}>count is {count}</Button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className=''>Click on the Vite and React logos to learn more</p>
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
