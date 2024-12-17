interface BadgeItem {
  label: string;
  value: number;
}

export const MONEY: Record<string, BadgeItem[]> = {
  default: [
    { label: "+10만", value: 10 },
    { label: "+100만", value: 100 },
    { label: "+1000만", value: 1000 },
    { label: "+1억", value: 10000 },
  ],
  monthlyRent: [
    { label: "+40만", value: 40 },
    { label: "+50만", value: 50 },
    { label: "+60만", value: 60 },
    { label: "+70만", value: 70 },
  ],
  rentalDeposit: [
    { label: "+1000만", value: 1000 },
    { label: "+2000만", value: 2000 },
    { label: "+5000만", value: 5000 },
    { label: "+1억", value: 10000 },
  ],
};
