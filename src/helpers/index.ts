/** Find first object by key value.
 * @param {string} key - Key
 * @param {string|number|null} value - Value
 * @param {Array<Object<string,string|number|null>>} arr - The array by which to search
 * @return {Object<string,string|number>|undefined} - Finded object
 */
const utilFindBy = <T, P extends keyof T>(
  key: P,
  value: T[P],
  arr: T[]
): T | null => {
  return arr.filter((item) => item[key] === value)[0] || null;
};
/** Find objects by key value.
 * @param {string} key - Key
 * @param {string|number|null} value - Value
 * @param {Array<Object<string,string|number|null>>} arr - The array by which to search
 * @return {Array<Object<string,string|number|null>>} - Finded objects
 */
const utilFindByAll = <T, P extends keyof T>(
  key: P,
  value: T[P],
  arr: T[]
): T[] => arr.filter((item) => item[key] === value);

/** Merge object with array objects.
 * @param {Object<string,string|number|null>} data - Object
 * @param {Array<Object<string,string|number|null>>} arr - Start array
 * @return {Array<Object<string,string|number|null>>} - Final array
 */
const utilMerge = <T>(data: T, arr: T[]): T[] => [...arr, data];

/** Delete object(s) by key value.
 * @param {string} key - Key
 * @param {string|number|null} value - Value
 * @param {Array<Object<string,string|number|null>>} arr - The array in which to replace the object
 * @return {Array<Object<string,string|number|null>>} - Filtered array
 */
const utilRemoveBy = <T, P extends keyof T>(
  key: P,
  value: T[P],
  arr: T[]
): T[] => arr.filter((item) => item[key] !== value);

/** Replace object in array by key value.
 * @param {string} key - Key
 * @param {string|number|null} value - Value
 * @param {Object<string,string|number|null>} newData - Object to replace with
 * @param {Array<Object<string,string|number|null>>} arr - The array by which to search
 * @return {Array<Object<string,string|number|null>>|null} - Modified array or null if nothing was found
 */
const utilReplaceBy = <T, P extends keyof T>(
  key: P,
  value: T[P],
  newData: T,
  arr: T[]
): T[] | null => {
  const data = arr;
  const index = data.findIndex((item) => item[key] === value);

  if (index !== -1) {
    data[index] = {
      [key]: value,
      ...newData,
    };

    return data;
  }

  return null;
};

export {
  utilFindBy as findBy,
  utilFindByAll as findByAll,
  utilMerge as merge,
  utilRemoveBy as removeBy,
  utilReplaceBy as replaceBy,
};
