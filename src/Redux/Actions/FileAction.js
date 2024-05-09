export const fileListAdd = (data) =>async(dispath)=> {
    const folderStructure = {};
    
    Object.keys(data).forEach((key) => {
      const file = data[key];
      const pathParts = file.webkitRelativePath.split("/");
      let currentFolder = folderStructure;
      for (let i = 0; i < pathParts.length - 1; i++) {
        const folderName = pathParts[i];
        if (!currentFolder[folderName]) {
          currentFolder[folderName] = {};
        }
        currentFolder = currentFolder[folderName];
      }

      const fileName = pathParts[pathParts.length - 1];
      currentFolder[fileName] = file;
    });

    dispath({
        type: "DM_FOLDER",
        payload:folderStructure
    });


}