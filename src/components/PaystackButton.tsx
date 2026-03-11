import { usePaystackPayment } from "react-paystack";

interface PaystackButtonProps {
  email: string;
  amount: number; // in GHS
}

const PaystackButton: React.FC<PaystackButtonProps> = ({
  email,
  amount,
}) => {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string;

  if (!publicKey) {
    return <p>Paystack key missing</p>;
  }

  if (amount <= 0) {
    return <p>Cart is empty</p>;
  }

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: Math.round(amount * 100), // convert to pesewas
    publicKey: publicKey,
    currency: "GHS", // ✅ VERY IMPORTANT
  };

  const onSuccess = (reference: any) => {
    console.log("Payment successful:", reference);
    window.location.href = "/success";
  };

  const onClose = () => {
    console.log("Payment popup closed");
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <button
      type="button"
      onClick={() => initializePayment(onSuccess, onClose)}
      className="pay-btn paystack"
    >
      Pay with Paystack
    </button>
  );
};

export default PaystackButton;
