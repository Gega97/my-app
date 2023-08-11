export const convertToBase64 = (blob: Blob) => {
  return new Promise((resolve) => {
    var reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
};
