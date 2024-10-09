export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas context를 생성할 수 없습니다."));
          return;
        }

        // 이미지 크기를 조정 (최대 800x800px)
        const maxWidth = 800;
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // canvas를 압축된 Blob으로 변환 (품질 0.7)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              console.log("압축된 파일 크기:", compressedFile.size / 1024, "KB");

              resolve(compressedFile);
            } else {
              reject(new Error("Blob 생성 실패"));
            }
          },
          "image/jpeg",
          0.7, // 이미지 품질을 70%로 압축
        );
      };

      img.onerror = (error) => {
        reject(new Error(`이미지를 로드하는 데 실패했습니다. ${error}`));
      };
    };

    reader.onerror = () => {
      reject(new Error("파일을 읽는 데 실패했습니다."));
    };
  });
};

export const isFileSizeExceeding1MB = (file: File): boolean => {
  const sizeThreshold = 1 * 1024 * 1024; // 1MB in bytes
  return file.size >= sizeThreshold;
};
