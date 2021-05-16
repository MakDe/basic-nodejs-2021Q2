const findBy = (key, value, arr) => arr.find((item) => item[key] === value);

const findByAll = (key, value, arr) => arr.filter((item) => item[key] === value);

const merge = (data, arr) => [...arr, data];

const removeBy = (key, value, arr) => arr.filter((item) => item[key] !== value);

const replaceBy = (key, value, newData, arr) => {
  const data = arr;
  const index = data.findIndex((item) => item[key] === value);

  if (index !== -1) {
    data[index] = {
      [key]: value,
      ...newData,
    };

    return data;
  }

  return null
};

module.exports = {
  findBy,
  merge,
  removeBy,
  replaceBy,
  findByAll
};
