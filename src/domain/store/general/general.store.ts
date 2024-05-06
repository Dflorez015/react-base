
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { WithDevtoolsImmer } from "@store/store.utils";

/*------------ config ------------*/

export interface IGeneral {
}

export interface IGeneralActions {
}

export type IGeneralStore = IGeneral & IGeneralActions

/*------------ store ------------*/

export const generalStore: WithDevtoolsImmer<IGeneralStore> = (set, get) => ({

})

export const useGeneral = createWithEqualityFn<IGeneralStore>()(
    devtools(
        immer(generalStore),
        { name: "general-store" }
    ), shallow
)
