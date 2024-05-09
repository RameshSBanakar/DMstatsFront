export const dbDataAdd = (data) => async (dispath) => {
//   console.log(data);
  dispath({
    type: "DB_DATA_ADD",
    payload: data,
  });
};
