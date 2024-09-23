import Axios from "../axios";

class LoanAdviceService {
  static async requestLoanAdvice() {
    return Axios.get(`/api/v1/loanAdvice`, true);
  }
}

export default LoanAdviceService;
