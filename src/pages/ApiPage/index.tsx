import axios from "axios";
import React, { useEffect } from "react";

const ApiPage = () => {
  /*************
   * User API
   ************/
  const g_accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJBVVRIT1JJVFkiOiJST0xFX1VTRVIiLCJleHAiOjE3MjQ3MjQ5MDZ9.d3OJxX7yBcXaqSCkb6HkL9Fqn5Vz2hGBc-UiMt6jp4Q";
  const g_refreshToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJFTUFJTCI6ImxnaDk4MDdAbmF0ZS5jb20iLCJBVVRIT1JJVFkiOiJST0xFX1VTRVIiLCJleHAiOjE3MjQ3NzUzMDZ9.N5xKL82bKU9Kk8WLGMqhpjeOTi5o6SMygngukpRET8A";

  const handleLoginRequest = async () => {
    try {
      const response = await axios.get("http://52.78.180.147:8080/oauth2/authorization/kakao", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const handleTransferRequest = async () => {
    const data = {
      tempUserId: "tempUserId",
    };

    try {
      const response = await axios.post("http://52.78.180.147:8080/api/v1/transfer", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          AccessToken: g_accessToken, // 여기에 실제 액세스 토큰을 입력하세요
          RefreshToken: g_refreshToken, // 여기에 실제 리프레시 토큰을 입력하세요
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const handleLogoutRequest = async () => {
    try {
      const response = await axios.post("http://52.78.180.147:8080/api/v1/user/logout", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          AccessToken: g_accessToken, // 여기에 실제 액세스 토큰을 입력하세요
          RefreshToken: g_refreshToken, // 여기에 실제 리프레시 토큰을 입력하세요
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const handleWithdrawRequest = async () => {
    try {
      const response = await axios.post("http://52.78.180.147:8080/api/v1/user/withdraw", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          AccessToken: g_accessToken, // 여기에 실제 액세스 토큰을 입력하세요
          RefreshToken: g_refreshToken, // 여기에 실제 리프레시 토큰을 입력하세요
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  /*************
   * LoanAdvice API
   ************/

  // 최근 대출추천 보고서 목록 조회
  const handleLoanAdviceRequest = async () => {
    try {
      const response = await axios.get("http://52.78.180.147:8080/api/v1/loanAdvice", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          AccessToken: g_accessToken, // 여기에 실제 액세스 토큰을 입력하세요
          RefreshToken: g_refreshToken, // 여기에 실제 리프레시 토큰을 입력하세요
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  // 특정 대출추천 보고서 조회
  const handleSpecificRequest = async () => {
    try {
      const response = await axios.get("http://52.78.180.147:8080/api/v1/loanAdvice/specific/200", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          AccessToken: g_accessToken, // 여기에 실제 액세스 토큰을 입력하세요
          RefreshToken: g_refreshToken, // 여기에 실제 리프레시 토큰을 입력하세요
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  //전세대출상품 추천 보고서 산출
  const handleLoanAdvicePostRequest = async () => {
    const data = {
      rentalDeposit: 200000000,
      monthlyRent: 0,
      cashOnHand: 20000000,
      age: 30,
      maritalStatus: "MARRIED",
      annualIncome: 50000000,
      spouseAnnualIncome: 40000000,
      childStatus: "ONE_CHILD",
      hasNewborn: true,
      isSMEEmployee: false,
      isNetAssetOver345M: false,
      rentHousingType: "APARTMENT",
      exclusiveArea: 75.0,
      buildingName: "Sample Apartment",
      districtCode: "1168010100",
      dongName: "삼성동",
      jibun: "79-1",
    };
    try {
      const response = await axios.post("http://52.78.180.147:8080/api/v1/loanAdvice", data, {
        headers: {
          "Content-Type": "application/json",
          AccessToken: g_accessToken, // 여기에 실제 액세스 토큰을 입력하세요
          RefreshToken: g_refreshToken, // 여기에 실제 리프레시 토큰을 입력하세요
          tempUserId: "",
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  //특정 전세대출상품 추천 보고서 산출
  const handleSpecificPostRequest = async () => {
    const data = {
      loanAdviceResultId: 200,
      productCode: "HF0001",
    };
    try {
      const response = await axios.post("http://52.78.180.147:8080/api/v1/loanAdvice/specific", data, {
        headers: {
          "Content-Type": "application/json",
          AccessToken: g_accessToken, // 여기에 실제 액세스 토큰을 입력하세요
          RefreshToken: g_refreshToken, // 여기에 실제 리프레시 토큰을 입력하세요
          tempUserId: "",
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  /*************
   * UserInputInfo API
   ************/

  //마지막 유저투입정보 조회
  const handleUserInputInfoRequest = async () => {
    try {
      const response = await axios.get("http://52.78.180.147:8080/api/v1/userInputInfo", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          AccessToken: g_accessToken, // 여기에 실제 액세스 토큰을 입력하세요
          RefreshToken: g_refreshToken, // 여기에 실제 리프레시 토큰을 입력하세요
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // 최근 유저투입정보 목록 조회
  const handleRecentUserInputInfoRequest = async () => {
    try {
      const response = await axios.get("http://52.78.180.147:8080/api/v1/userInputInfo/recent-ten", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          AccessToken: g_accessToken, // 여기에 실제 액세스 토큰을 입력하세요
          RefreshToken: g_refreshToken, // 여기에 실제 리프레시 토큰을 입력하세요
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // 특정 유저투입정보 조회
  const handleSpecifictUserInputInfoRequest = async () => {
    try {
      const response = await axios.get("http://52.78.180.147:8080/api/v1/userInputInfo/specific/1234", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          AccessToken: g_accessToken, // 여기에 실제 액세스 토큰을 입력하세요
          RefreshToken: g_refreshToken, // 여기에 실제 리프레시 토큰을 입력하세요
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  /*************
   * HousingInfo API
   ************/

  // 주소 검색
  const handleAddressSearchRequest = async () => {
    const data = {
      keyword: "청라한내로 100번길",
    };
    try {
      const response = await axios.post("http://52.78.180.147:8080/api/v1/addressSearch", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // 주택 거래정보 조회
  const handleHousingInfoRequest = async () => {
    const data = {
      districtCode: "1168010100",
      jibun: "372-1",
      dongName: "역삼동",
    };
    try {
      const response = await axios.post("http://52.78.180.147:8080/api/v1/housing-info/info", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  /*************
   * Calculator API
   ************/

  //원리금 계산기
  const handleRepaymentCalctRequest = async () => {
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
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // LTV 계산기
  const handleLtvCalcCalcRequest = async () => {
    const data = {
      loanAmount: 3.0e8,
      collateralValue: 5.0e8,
      priorMortgage: 5.0e7,
      numberOfRooms: 3,
      housingType: "APARTMENT",
      regionType: "SEOUL",
      currentLeaseDeposit: 2.0e7,
    };

    try {
      const response = await axios.post("http://52.78.180.147:8080/api/v1/ltvCalc", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // DSR 계산기
  const handleDsrCalcRequest = async () => {
    const data = {
      loanStatuses: [
        {
          repaymentType: "AMORTIZING",
          loanType: "MORTGAGE",
          principal: 3.0e8,
          maturityPaymentAmount: 0.0,
          term: 360,
          gracePeriod: 0,
          interestRatePercentage: 3.5,
        },
      ],
      annualIncome: 50000000,
    };

    try {
      const response = await axios.post("http://52.78.180.147:8080/api/v1/dsrCalc", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // DTI 계산기
  const handleDtiCalcRequest = async () => {
    const data = {
      loanStatuses: [
        {
          repaymentType: "AMORTIZING",
          loanType: "MORTGAGE",
          principal: 3.0e8,
          term: 360,
          interestRatePercentage: 3.5,
        },
      ],
      annualIncome: 50000000,
    };

    try {
      const response = await axios.post("http://52.78.180.147:8080/api/v1/dtiCalc", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  /*************
   * Board API
   ************/

  // 게시글 목록 조회
  const handleBoardRequest = async () => {
    try {
      const response = await axios.get("http://52.78.180.147:8080/api/v1/board/posts?page=0&size=10", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          AccessToken: g_accessToken, // 여기에 실제 액세스 토큰을 입력하세요
          RefreshToken: g_refreshToken, // 여기에 실제 리프레시 토큰을 입력하세요
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // 게시글 조회
  const handlePostsRequest = async () => {
    try {
      const response = await axios.get("http://52.78.180.147:8080/api/v1/board/posts/1", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          AccessToken: g_accessToken, // 여기에 실제 액세스 토큰을 입력하세요
          RefreshToken: g_refreshToken, // 여기에 실제 리프레시 토큰을 입력하세요
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // 게시글 작성
  const handleWriteRequest = async () => {
    const data = {
      title: "New Title",
      content: "New Content",
      author: "New Author",
    };

    try {
      const response = await axios.post("http://52.78.180.147:8080/api/v1/board/posts", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          AccessToken: g_accessToken, // 여기에 실제 액세스 토큰을 입력하세요
          RefreshToken: g_refreshToken, // 여기에 실제 리프레시 토큰을 입력하세요
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // 게시글 삭제
  const handleDeleteRequest = async () => {
    try {
      const response = await axios.delete("http://52.78.180.147:8080/api/v1/board/posts/1", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          AccessToken: g_accessToken, // 여기에 실제 액세스 토큰을 입력하세요
          RefreshToken: g_refreshToken, // 여기에 실제 리프레시 토큰을 입력하세요
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // 게시글 수정
  const handleEditRequest = async () => {
    const data = {
      title: "Updated Title",
      content: "Updated Content",
      author: "Updated Author",
    };

    try {
      const response = await axios.put("http://52.78.180.147:8080/api/v1/board/posts/1", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          AccessToken: g_accessToken, // 여기에 실제 액세스 토큰을 입력하세요
          RefreshToken: g_refreshToken, // 여기에 실제 리프레시 토큰을 입력하세요
        },
      });
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  useEffect(() => {
    handleRepaymentCalctRequest();
    // handleLoanAdviceRequest();
    // handleTransferRequest();
  }, []);
  return (
    <div>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>User API </div>
      <button onClick={handleLoginRequest}>로그인</button>
      <button onClick={handleLogoutRequest}>로그아웃</button>
      <button onClick={handleTransferRequest}>최근 접속 유저</button>
      <button onClick={handleWithdrawRequest}>회원 탈퇴</button>

      <div style={{ fontSize: "20px", fontWeight: "bold" }}>LoanAdvice API </div>
      <button onClick={handleLoanAdviceRequest}>최근 대출추천 보고서 목록 조회</button>
      <button onClick={handleSpecificRequest}>특정 대출추천 보고서 조회</button>
      <button onClick={handleLoanAdvicePostRequest}>전세대출상품 추천 보고서 산출</button>
      <button onClick={handleSpecificPostRequest}>특정 전세대출상품 추천 보고서 산출</button>

      <div style={{ fontSize: "20px", fontWeight: "bold" }}>UserInputInfo API </div>
      <button onClick={handleUserInputInfoRequest}>마지막 유저투입정보 조회</button>
      <button onClick={handleRecentUserInputInfoRequest}>최근 유저투입정보 목록 조회</button>
      <button onClick={handleSpecifictUserInputInfoRequest}>특정 유저투입정보 조회</button>

      <div style={{ fontSize: "20px", fontWeight: "bold" }}>HousingInfo API </div>
      <button onClick={handleAddressSearchRequest}>주소 검색</button>
      <button onClick={handleHousingInfoRequest}>주택 거래정보 조회</button>

      <div style={{ fontSize: "20px", fontWeight: "bold" }}>Calculator API </div>
      <button onClick={handleRepaymentCalctRequest}>원리금 계산기</button>
      <button onClick={handleLtvCalcCalcRequest}>LTV 계산기</button>
      <button onClick={handleDsrCalcRequest}>DSR 계산기</button>
      <button onClick={handleDtiCalcRequest}>DTI 계산기</button>

      <div style={{ fontSize: "20px", fontWeight: "bold" }}>Board API </div>
      <button onClick={handleBoardRequest}>게시글 목록 조회</button>
      <button onClick={handlePostsRequest}>게시글 조회</button>
      <button onClick={handleWriteRequest}>게시글 작성</button>
      <button onClick={handleDeleteRequest}>게시글 삭제</button>
      <button onClick={handleEditRequest}>게시글 수정</button>
    </div>
  );
};

export default ApiPage;
