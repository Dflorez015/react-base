import { createWithEqualityFn } from "zustand/traditional";
import { generalStore, IGeneralStore } from "./general/general.store";

type stateTypes = IGeneralStore

export const useBoundStore = createWithEqualityFn<stateTypes>((...store) => ({
    ...generalStore(...store),
}))