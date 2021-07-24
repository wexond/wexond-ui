export const fileToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const filesToBase64 = (files: File[]) => {
  return Promise.all(
    files.map(async (r) => ({ data: await fileToBase64(r), filename: r.name })),
  );
};
