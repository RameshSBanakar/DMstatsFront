export const XmlDataAdd = (data) => async (dispath) => {
 
  dispath({
    type: "XML_DATA_ADD",
    payload: data,
  });
};
