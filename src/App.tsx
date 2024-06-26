import { useState } from 'react';
import { Button } from '@components/Buttons';
import { BasicFormProvider } from '@components/Form';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BasicFormProvider defaultValue={{}}>
        <h1>Vite + React</h1>
        <div className='card'>
          <Button onClick={() => setCount(count => count + 1)}>count is {count}</Button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
      </BasicFormProvider>
    </>
  );
}

export default App;
