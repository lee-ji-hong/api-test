import { TabBarIconProps } from "@/type/type";

interface TabBarIconProps {
  title?: string;
  color: string;
}

const TabBarHomeIcon = ({ title, color }: TabBarIconProps) => {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path
        d="M11.2804 2.06698L17.9206 7.60046C18.6045 8.17044 19 9.01478 19 9.90512V17C19 18.1046 18.1046 19 17 19H3C1.89543 19 1 18.1046 1 17V9.90512C1 9.01479 1.39547 8.17044 2.07945 7.60046L8.71963 2.06697C9.46132 1.4489 10.5387 1.4489 11.2804 2.06698Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
      />
      <path d="M10 15L10 19.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};
export default TabBarHomeIcon;
