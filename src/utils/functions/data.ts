import { produce } from "immer";

/**
 * utility function than performs a shallow equality comparison between two values
 * @param a
 * @param b
 * @returns
 */
export function shallowEqual(a: any, b: any) {
    if (a === b) {
        return true;
    }

    if (!(a instanceof Object) || !(b instanceof Object)) {
        return false;
    }

    const keys = Object.keys(a);
    const { length } = keys;

    if (length !== Object.keys(b).length) {
        return false;
    }

    for (let i = 0; i < length; i += 1) {
        const key = keys[i];

        if (!(key in b)) {
            return false;
        }

        if (a[key] !== b[key]) {
            return false;
        }
    }

    return true;
}

/**
 * utility for evluate fields in a react hook form array
 * @param mObject 
 * @param way 
 * @returns 
 */
export function getInputIdFormContext(mObject: any, way: string): any | undefined {
    const parts = way.split('.')
    let currentValue = mObject

    for (const part of parts) {
        if (currentValue && typeof currentValue === 'object' && part in currentValue) {
            currentValue = currentValue[part]
        } else {
            return undefined
        }
    }

    return currentValue
}

/**
 * utility function that returns a object merged with the original
 */
export const partialMerge = <T extends Record<string, any> = {}>(target: T, updates: Record<string, any>) => {
    return produce(target, (draft: any) => {
        for (const key in updates) {
            if (updates[key] instanceof Object) draft[key] = partialMerge(target[key], updates[key]);
            else draft[key] = updates[key];
        }
    });
};

/**
 * get bas4 without headers
 * @param str
 * @returns
 */
export const getBase64Code = (str: string): string => {
    return str.split(',')[1];
};