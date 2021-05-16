let data = [];

const getAll = () => data;

const getById = (id) => data.find(item => item.id === id);

const set = (newData) => {
  data.push(newData);

  return newData
};

const removeById = (id) => {
  const removed = getById(id);

  data = data.filter((item) => item.id !== id);

  return removed
};

const updateById = (id, newData) => {
  const foundId = data.findIndex(
    (item) => item.id === id
  );

  if (foundId !== -1) {
    data = {
      ...getById(id),
      ...newData,
    };
  }

  return getById(id);
}

module.exports = { getAll, getById, set, removeById, updateById };
