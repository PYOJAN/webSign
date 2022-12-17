// check valid file extension for drag and drop
const format = ["pdf", "PDF"];
export const isPdfFile = (fileName) => {
  return format.some((ext) =>
    fileName.toLowerCase().endsWith(ext.toLowerCase())
  );
};
// check valid file extension for file picker {input}
export const fileHandle = async (e) => {
  const file = e.target.files;
  // value is not an object
  if (typeof e !== "object")
    return { status: true, message: "invalid selection, please try again." };

  // if user select multiple files
  if (file.length > 1)
    return { status: true, message: "Only ONE file is allowed" };

  const { lastModified, name, size, type } = e.target.files[0];
  // if user has select invalid file type
  if (!isPdfFile(name))
    return { status: true, message: "Only PDF file format is allowed" };

  // converting into base64
  let base64;
  try {
    base64 = await getBase64(file[0]);
  } catch (err) {
    console.error(err.message);
    return {
      status: true,
      message: "Unable to convert file to base64. try again",
    };
  }
  return { lastModified, name, size, type, base64 };
};

// converting PDF file to base64 encode
export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// validation string is base64
export function isBase64(str) {
  if (str === "" || str.trim() === "") {
    return false;
  }
  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
}
