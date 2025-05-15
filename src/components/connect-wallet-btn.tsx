import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Wallet } from "@phosphor-icons/react";
import { ComponentProps, FC } from "react";

type ConnectWalletBtnProps = {
  className?: ComponentProps<"button">["className"];
}

export const ConnectWalletBtn: FC<ConnectWalletBtnProps> = ({ className }) => {
  return (
    <Button disabled variant="outline" aria-label="Connect wallet" className={cn("mr-6", className)}>
      <Wallet className="text-white" />
      <span className="max-sm:hidden">Connect wallet</span>
    </Button>
  )
}
