/** Find first object by key value.
 * @param {string} key - Key
 * @param {string|number|null} value - Value
 * @param {Array<Object<string,string|number|null>>} arr - The array by which to search
 * @return {Object<string,string|number>|undefined} - Finded object
 */
const utilFindBy = (key, value, arr) => arr.find((item) => item[key] === value);

/** Find objects by key value.
 * @param {string} key - Key
 * @param {string|number|null} value - Value
 * @param {Array<Object<string,string|number|null>>} arr - The array by which to search
 * @return {Array<Object<string,string|number|null>>} - Finded objects
 */
const utilFindByAll = (key, value, arr) =>
  arr.filter((item) => item[key] === value);

/** Merge object with array objects.
 * @param {Object<string,string|number|null>} data - Object
 * @param {Array<Object<string,string|number|null>>} arr - Start array
 * @return {Array<Object<string,string|number|null>>} - Final array
 */
const utilMerge = (data, arr) => [...arr, data];

/** Delete object(s) by key value.
 * @param {string} key - Key
 * @param {string|number|null} value - Value
 * @param {Array<Object<string,string|number|null>>} arr - The array in which to replace the object
 * @return {Array<Object<string,string|number|null>>} - Filtered array
 */
const utilRemoveBy = (key, value, arr) =>
  arr.filter((item) => item[key] !== value);

/** Replace object in array by key value.
 * @param {string} key - Key
 * @param {string|number|null} value - Value
 * @param {Object<string,string|number|null>} newData - Object to replace with
 * @param {Array<Object<string,string|number|null>>} arr - The array by which to search
 * @return {Array<Object<string,string|number|null>>|null} - Modified array or null if nothing was found
 */
const utilReplaceBy = (key, value, newData, arr) => {
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

module.exports = {
  findBy: utilFindBy,
  findByAll: utilFindByAll,
  merge: utilMerge,
  removeBy: utilRemoveBy,
  replaceBy: utilReplaceBy,
};
