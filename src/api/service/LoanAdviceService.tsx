import { LoanAdviceReportResponse } from "@/models";
import Axios from "../axios";

class LoanAdviceService {
  static async requestLoanAdvice(): Promise<LoanAdviceReportResponse> {
    return Axios.get<LoanAdviceReportResponse>(`/api/v1/loanAdvice`, true);
  }
}

export default LoanAdviceService;
