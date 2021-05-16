let data = [];

const getAll = async () => data;

const getById = async (id) => data.find(item => item.id === id);

const set = async (newData) => {
  data.push(newData);

  return newData
};

const removeById = async (id) => {
  const removed = getById(id);

  data = data.filter((item) => item.id !== id);

  return removed
};

const updateById = async (id, newData) => {
  const foundId = data.findIndex(
    (item) => item.id === id
  );

  if (foundId !== -1) {
    data = {
      ...await getById(id),
      ...newData,
    };
  }

  return getById(id);
}

module.exports = { getAll, getById, set, removeById, updateById };
