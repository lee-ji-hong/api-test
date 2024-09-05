import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const DepositResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { inputValue } = location.state || { inputValue: 0 };

  useEffect(() => {
    if (!inputValue || inputValue === 0) {
      navigate("/deposit-entry");
    }
  }, [inputValue, navigate]);

  return <div>{inputValue}</div>;
};

export default DepositResultPage;
