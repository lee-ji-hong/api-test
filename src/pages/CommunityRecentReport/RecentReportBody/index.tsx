import { LoanAdviceSummaryReport } from "@/api/model/CommunityResponse";
import LoanAdviceService from "@/api/service/LoanAdviceService";
import Spacing from "@/components/shared/Spacing";
import LoanCard from "@/pages/CommunityCommonComponent/LoanCard";
import { useEffect, useState } from "react";
import { LoanAdviceReport, LoanAdviceReportResponse } from "@/models";

const RecentReportBody = () => {
  // 상태로 loanAdviceList 관리
  const [loanAdviceList, setLoanAdviceList] = useState<LoanAdviceReport[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res: LoanAdviceReportResponse = await LoanAdviceService.requestLoanAdvice();
      console.log(res.data);
      console.log(res.data);

      // 상태 업데이트
      setLoanAdviceList(res.data);
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
