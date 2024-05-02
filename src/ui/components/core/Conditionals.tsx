import { Children, FC } from 'react';

//#region config

type subConditionals = { condition: boolean; children: React.ReactNode };

type renderIf = FC<{ condition?: boolean; children: React.ReactNode }> & {
  WhenTrue: FC<subConditionals>;
  WhenFalse: FC<subConditionals>;
  WhenUndefined: FC<subConditionals>;
  ObjectIsEmpty: FC<subConditionals>;
};

//#region components

const RenderIf: renderIf = ({ condition = true, children }) => {
  if (!condition) return null;

  /**
   * Array of components to render.
   * @type {React.ReactElement[]}
   */
  const renderedItems = subComponentList.map(key => {
    return Children.map(children, child => {
      return (child as any)?.type?.displayName === key ? child : null;
    });
  });

  return <>{renderedItems.map(component => component)}</>;
};

RenderIf.displayName = 'RenderIf';

RenderIf.WhenTrue = ({ children, condition }) => (condition ? children : null);
RenderIf.WhenTrue.displayName = 'WhenTrue';
RenderIf.WhenFalse = ({ children, condition }) => (!condition ? children : null);
RenderIf.WhenFalse.displayName = 'WhenFalse';
RenderIf.WhenUndefined = ({ children, condition }) => (condition === undefined ? children : null);
RenderIf.WhenUndefined.displayName = 'WhenUndefined';
RenderIf.ObjectIsEmpty = ({ children, condition }) => (Object.keys(condition).length === 0 ? children : null);
RenderIf.ObjectIsEmpty.displayName = 'ObjectIsEmpty';

const subComponentList = Object.keys(RenderIf);

export default RenderIf;
