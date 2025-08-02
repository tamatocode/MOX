import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy.io/react-auth";


export default function ConnectWalletButton({ connectWallet }) {
  const { login, authenticated, user } = usePrivy();

  const handleConnect = async () => {
    await login();
    if (user?.wallet?.address) {
      await connectWallet(user.wallet.address);
      
    }
  };

  return (
    <div>
      {authenticated ? (
        <p>Connected: {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)}</p>
      ) : (
        <Button onClick={handleConnect} className="bg-blue-500 text-white hover:bg-blue-600">
          Connect Wallet
        </Button>
      )}
    </div>
  );
}