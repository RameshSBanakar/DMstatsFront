export const showRightSideBar = (data) => async (dispath) => {
  // console.log(data)
  dispath({
    type: "SIDEBAR_SHOW",
    payload: data,
  });
};
