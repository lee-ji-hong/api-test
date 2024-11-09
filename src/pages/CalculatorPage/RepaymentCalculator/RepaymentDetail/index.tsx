const LoanDetails = ({ data }) => {
  return (
    <div className="loan-details">
      <h1>총 원금 {data.totalPrincipal}</h1>
      <h2>총 이자 {data.totalInterest}</h2>
      <h3>총 상환 회차 {data.totalInstallments}</h3>
      <table>
        <thead>
          <tr>
            <th>회차</th>
            <th>월상환금</th>
            <th>원금</th>
            <th>이자</th>
            <th>대출 잔금</th>
          </tr>
        </thead>
        <tbody>
          {data.installments.map((installment) => (
            <tr key={installment.id}>
              <td>{installment.id}</td>
              <td>{installment.monthlyPayment}</td>
              <td>{installment.principal}</td>
              <td>{installment.interest}</td>
              <td>{installment.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanDetails;
