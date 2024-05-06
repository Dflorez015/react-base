import { StateCreator } from "zustand";

/**
 * Zustand StateCreator with devtools and immer middlewares
 */
export type WithDevtoolsImmer<S> = StateCreator<
    S,
    [["zustand/devtools", never], ["zustand/immer", never]],
    [],
    S
>;