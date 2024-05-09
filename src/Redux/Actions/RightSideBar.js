export const showRightSideBar = (data) => async (dispath) => {
  dispath({
    type: "SIDEBAR_SHOW",
    payload: data,
  });
};
