import classNames from "classnames/bind";
import { useRef, useEffect } from "react"; // Don't forget to import useState and useEffect
import styles from "./CommunityModifyBody.module.scss";

const cx = classNames.bind(styles);

interface ModifyBodyProps {
  textareaValue: string;
  setTextareaValue: (value: string) => void;
  setIsModified: (value: boolean) => void;
}

const ModifyBody: React.FC<ModifyBodyProps> = (props) => {
  // State to store the textarea value

  return (
    <div className={cx("containerWriteBody")}>
      {/* Pass the state and its setter function as props to TextArea */}
      <TextArea
        textareaValue={props.textareaValue}
        setTextareaValue={props.setTextareaValue}
        setIsModified={props.setIsModified}
        maxLines={15}
      />
    </div>
  );
};

interface TextAreaProps {
  textareaValue: string;
  setTextareaValue: (value: string) => void;
  setIsModified: (value: boolean) => void;
  maxLines: number;
}

const TextArea: React.FC<TextAreaProps> = ({ textareaValue, setTextareaValue, setIsModified, maxLines }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Function to calculate the number of lines in the text area
  const getLineCount = (value: string) => {
    return value.split("\n").length;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const lineCount = getLineCount(newValue);

    // Update the value only if the line count does not exceed the maxLines limit
    if (lineCount <= maxLines) {
      setTextareaValue(newValue);
      setIsModified(true);
    }
  };

  // Automatically resize the textarea based on its content
  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height based on scroll height
    }
  };

  // Trigger autoResize whenever textareaValue changes
  useEffect(() => {
    autoResize();
  }, [textareaValue]);

  return (
    <textarea
      style={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}
      ref={textareaRef}
      onChange={handleInputChange}
      value={textareaValue}
      className={cx("inputArea", {
        gray: !textareaValue,
        black: textareaValue,
      })}
      placeholder="내용을 입력해주세요."
    />
  );
};

export default ModifyBody;
