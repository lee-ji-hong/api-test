import { LoanAdviceSummaryReport } from "@/api/model/CommunityResponse";
import LoanAdviceService from "@/api/service/LoanAdviceService";
import Spacing from "@/components/shared/Spacing";
import LoanCard from "@/pages/CommunityCommonComponent/LoanCard";
import { useEffect, useState } from "react";

const RecentReportBody = () => {
  // 상태로 loanAdviceList 관리
  const [loanAdviceList, setLoanAdviceList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await LoanAdviceService.requestLoanAdvice();
      console.log(response.data);
      console.log(response.data.data);

      // 상태 업데이트
      setLoanAdviceList(response.data.data);
    };

    fetchData().then(() => console.log("Data fetched"));
  }, []);

  return (
    <div>
      {loanAdviceList.map((loanAdvice: LoanAdviceSummaryReport) => {
        return (
          <div key={loanAdvice.loanAdviceResultId}>
            {<LoanCard {...loanAdvice}></LoanCard>} <Spacing size={16} />
          </div>
        );
      })}
    </div>
  );
};

export default RecentReportBody;
