import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { td, th } from '@components/Table/table.module.css';
import { TC, TCchildren } from '@utils/typos';
import { TheadVariants } from './variant';

export const TheadCell: TCchildren<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ children, ...props }) => {
  return (
    <th className={th} {...props}>
      {children}
    </th>
  );
};

export const TbodyCell: TCchildren<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ children, ...props }) => {
  return (
    <td className={td} {...props}>
      {children}
    </td>
  );
};

const Table: TC<{ columns: ReactNode; body: ReactNode; variant?: TheadVariants['variant'] }> = ({ body, columns, variant = 'primary' }) => {
  return (
    <>
      <motion.table className={TheadVariants({ variant })} id='table' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <thead>{columns}</thead>
        <tbody>{body}</tbody>
      </motion.table>
    </>
  );
};

export default Table;
