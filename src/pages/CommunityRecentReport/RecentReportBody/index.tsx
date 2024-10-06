import { LoanAdviceSummaryReport } from "@/api/model/CommunityResponse";
import LoanAdviceService from "@/api/service/LoanAdviceService";
import Spacing from "@/components/shared/Spacing";
import { CommunityDetail, LoanAdviceReport, LoanAdviceReportResponse } from "@/models";
import LoanCard from "@/pages/CommunityCommonComponent/LoanCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface RecentReportBodyProps {
  from: string;
  communityDetail: CommunityDetail;
}

const RecentReportBody: React.FC<RecentReportBodyProps> = ({ from, communityDetail }) => {
  // 상태로 loanAdviceList 관리
  const [loanAdviceList, setLoanAdviceList] = useState<LoanAdviceReport[]>([]);
  const navigate = useNavigate();

  function selectLoanAdvice(loanAdvice: LoanAdviceSummaryReport) {
    const updatedCommunityDetail = {
      ...communityDetail,
      loanAdviceSummaryReport: loanAdvice,
    };

    console.log("updatedCommunityDetail");
    console.log(updatedCommunityDetail);
    navigate(`/community/${from}`, { state: { communityDetail: updatedCommunityDetail }, replace: true });
  }

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
      {loanAdviceList &&
        loanAdviceList.map((loanAdvice: LoanAdviceSummaryReport) => {
          return (
            <div key={loanAdvice.loanAdviceResultId} onClick={() => selectLoanAdvice(loanAdvice)}>
              {<LoanCard {...loanAdvice}></LoanCard>} <Spacing size={16} />
            </div>
          );
        })}
    </div>
  );
};

export default RecentReportBody;
