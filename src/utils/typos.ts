import { ReactNode } from "react";

export type TC<T> = (props: T) => JSX.Element | null;
export type TCchildren<T = object> = (props: T & { children: ReactNode }) => JSX.Element | null;
export type RenderFn<M> = ((modifiers: M) => ReactNode | null);
export type RenderProp<M, R = React.ReactNode> = R | ((modifiers: M) => R);
export type Only<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never
}[keyof T];
export type svgProps = TC<React.SVGProps<SVGSVGElement>>;
export type svgRefProps = React.SVGProps<SVGSVGElement>;
export type NonNullable<T> = { [P in keyof T]-?: Exclude<T[P], null | undefined> }; 