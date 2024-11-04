import { TrackDetails, useKeenSlider } from "keen-slider/react";
import React, { CSSProperties, memo, useRef, useState } from "react";
import Text from "@/components/shared/Text";
import styles from "./Wheel.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const DEFAULT_DIAL_DEGREE = 18;

type Perspective = "right" | "left" | "center";

interface Props {
  formatValue?: (value: number) => string;
  initialIndex?: number;
  options: number[];
  loop?: boolean;
  onChange: (value: number) => void;
  perspective?: Perspective;
  setValue?: (index: number) => number;
  dialDegree?: number;
}

const PERSPECTIVE_STYLE: Record<Perspective, CSSProperties> = {
  left: {
    perspectiveOrigin: "calc(50% - 100px) 50%",
    transform: "translateX(-10px)",
  },
  right: {
    perspectiveOrigin: "calc(50% + 100px) 50%",
    transform: "translateX(10px)",
  },
  center: {},
};

const Wheel: React.FC<Props> = memo(
  ({
    formatValue,
    initialIndex = 0,
    options = [],
    loop = false,
    onChange,
    perspective = "center",
    dialDegree = DEFAULT_DIAL_DEGREE,
  }) => {
    const slidesPerView = 5; // 슬라이드 뷰 설정을 통해 한 번에 보이는 슬라이드 수를 조정
    const [sliderState, setSliderState] = useState<TrackDetails | null>(null);
    const size = useRef(0);
    const [radius, setRadius] = useState(120); // 기본 radius 값을 설정

    const [sliderRef] = useKeenSlider<HTMLDivElement>({
      slides: {
        number: options.length,
        origin: loop ? "center" : "auto",
        perView: slidesPerView, // 슬라이드 뷰 설정
        spacing: 20, // 각 슬라이드 간격 추가
      },
      vertical: true,
      initial: initialIndex,
      loop,
      dragSpeed: (value) => {
        const height = size.current;
        return value * (height / ((height / 2) * Math.tan(dialDegree * (Math.PI / 180))) / slidesPerView);
      },
      created: (s) => {
        size.current = s.size;
        setRadius(s.size / 2); // 슬라이더가 생성되면 반지름 설정
      },
      updated: (s) => {
        size.current = s.size;
        setRadius(s.size / 2); // 슬라이더가 업데이트되면 반지름 설정
      },
      detailsChanged: (s) => {
        setSliderState(s.track.details);
      },
      rubberband: !loop,
      mode: "free-snap",
      slideChanged: (slider) => {
        const { rel } = slider.track.details;
        onChange(options[rel]!);
      },
    });

    const getSlideValues = () => {
      if (!sliderState) return [];

      const offset = loop ? 1 / 2 - 1 / slidesPerView / 2 : 0;

      return options.map((option, index) => {
        const distance =
          sliderState.slides[index] != null ? (sliderState.slides[index]!.distance - offset) * slidesPerView : 0;
        const rotate = Math.abs(distance) > 360 / dialDegree / 2 ? 180 : distance * dialDegree * -1;
        const style: CSSProperties = {
          transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
          WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
          color: rotate === 0 ? "black" : "#000000",
          height: "60px", // 슬라이드 항목의 높이를 명시적으로 설정
          lineHeight: "60px", // 텍스트의 세로 정렬을 위해 설정
        };
        return { value: option, style };
      });
    };

    return (
      <div className={cx("sliderContainer")} ref={sliderRef}>
        <div className={cx("overlayTop")} />
        <div
          className={cx("sliderPerspective")}
          style={{
            ...PERSPECTIVE_STYLE[perspective],
          }}>
          {getSlideValues().map(({ value, style }) => (
            <Text key={value} style={style} className={cx("sliderItem")} text={formatValue?.(value) ?? value} />
          ))}
        </div>
        <div className={cx("overlayBottom")} />
      </div>
    );
  },
);

export default Wheel;
