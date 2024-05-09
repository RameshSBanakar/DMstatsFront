export const adddmpath = (data) => async (dispath) => {
  dispath({
    type: "ADD_DMPATH",
    payload: data,
  });
};
