import Coin from "./features/coin/pages/Coin";
const token = localStorage.getItem("accessToken");
export const LayoutWithCoin = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    {token &&  <Coin /> }
  </>
);
