import classNames from "classnames/bind";
import styles from "./CommunityModifyFooter.module.scss";
import { useRef } from "react";
import Image from "@/components/shared/Image";
import { IMAGES } from "@/constants/images";
import SpacingWidth from "@/components/shared/SpacingWidth";

const cx = classNames.bind(styles);

interface WriteFooterProps {
  setSelectedImage: (file: File | null) => void;
  setImagePreview: (preview: string | null) => void;
}

const WriteFooter: React.FC<WriteFooterProps> = ({ setSelectedImage, setImagePreview }: WriteFooterProps) => {
  // 각 input 태그에 접근하기 위한 ref 생성
  const imagePickerRef = useRef(null);
  // const docPickerRef = useRef(null);
  // const keyboardPickerRef = useRef(null);

  // 파일 선택 처리 함수
  const handleImagePick = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref && ref.current) {
      ref.current.click(); // input 클릭을 트리거
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file); // Store the selected file

      // Create a preview URL for the image
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  return (
    <div className={cx("container-write-footer")}>
      <div className={cx("container-img-footer")}>
        {/* <Image className={cx("img-picture")} imageInfo={IMAGES?.PictureIcon} /> */}
        <div onClick={() => handleImagePick(imagePickerRef)}>
          <Image className={cx("img-picture")} imageInfo={IMAGES?.PictureIcon} />
        </div>
        <input
          type="file"
          ref={imagePickerRef}
          style={{ display: "none" }} // 파일 입력 창을 숨김
          accept="image/*" // 이미지 파일만 선택 가능
          multiple={false} // 사진 하나만 선택 가능 (사실 multiple 속성을 생략해도 됨)
          onChange={handleFileChange} // 파일 선택 시 처리 함수
        />
        <SpacingWidth size={24} />
        <Image className={cx("img-doc")} imageInfo={IMAGES?.DocumentIcon} />
      </div>
    </div>
  );
};

export default WriteFooter;
