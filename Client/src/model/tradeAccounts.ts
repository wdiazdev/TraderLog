export interface TradeAccount {
  id: number;
  userId: number;
  name: string;
  nickname: string;
  createdDate: string;
  initialBalance: number;
  balance: number;
  trades: Trade[];
}

export interface Trade {
  id: number;
  tradeDate: string;
  amount: number;
}
