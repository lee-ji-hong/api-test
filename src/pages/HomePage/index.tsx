import axios from "axios";
import React, { useEffect } from "react";

const HomePage = () => {
  const handlePostRequest = async () => {
    const data = {
      repaymentType: "AMORTIZING",
      principal: 3.0e8,
      term: 60,
      gracePeriod: 0,
      interestRatePercentage: 4.0,
      maturityPaymentAmount: 0.0,
    };

    try {
      const response = await axios.post("http://52.78.180.147:8080/api/v1/repaymentCalc", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Content-Length": 162,
          Host: "localhost:8080",
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const handleGetRequest = async () => {
    try {
      const response = await axios.get("http://52.78.180.147:8080/api/v1/loanAdvice", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          AccessToken:
            "eyJhbGciOiJIUzI1NiJ9.eyJBVVRIT1JJVFkiOiJST0xFX1VTRVIiLCJleHAiOjE3MjQzNjI3NTN9.daLLipEtSMOm1XmDPDsXAb2M6NyJQa84KQd1TKIYcfs", // 여기에 실제 액세스 토큰을 입력하세요
          RefreshToken:
            "eyJhbGciOiJIUzI1NiJ9.eyJFTUFJTCI6ImxnaDk4MDdAbmF0ZS5jb20iLCJBVVRIT1JJVFkiOiJST0xFX1VTRVIiLCJleHAiOjE3MjQ0MTMxNTN9.6Q3Q7p-6FDqQhe_tVKSN92TZAn1fhfQilQeWSWqe7ss", // 여기에 실제 리프레시 토큰을 입력하세요
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  useEffect(() => {
    handlePostRequest();
    handleGetRequest();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <button onClick={handlePostRequest}>POST 요청 보내기</button>
    </div>
  );
};

export default HomePage;
