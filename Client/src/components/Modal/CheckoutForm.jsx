import PropTypes from "prop-types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ bookingInfo, closeModal, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // Create Payment Intent
  useEffect(() => {
    if (bookingInfo?.totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { amount: bookingInfo.totalPrice })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => toast.error(err.message));
    }
  }, [axiosSecure, bookingInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: bookingInfo?.touristName,
            email: bookingInfo?.touristEmail,
          },
        },
      }
    );

    if (error) {
      toast.error(error.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // Payment success → update booking in DB
      const paymentUpdate = {
        transactionId: paymentIntent.id,
        paidAt: new Date(),
        status: "in review",
        customerEmail: bookingInfo.touristEmail,
      };

      try {
        await axiosSecure.patch(
          `/bookings/payment/${bookingInfo._id}`,
          paymentUpdate
        );
        toast.success("Payment Successful!");
        refetch();
        closeModal();
        navigate("/dashboard/myOrder");
        // Page reload after success
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } catch (err) {
        toast.error("Failed to update booking." + err.message);
      }
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <CardElement
        options={{
          disableLink: true,
          disableAutofill: true,
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
      />

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 rounded-lg bg-gray-200 text-red-700 hover:bg-red-200 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="font-medium px-10 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
        >
          {processing ? "Processing..." : `Pay $${bookingInfo?.totalPrice}`}
        </button>
      </div>
    </form>
  );
};

CheckoutForm.propTypes = {
  bookingInfo: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default CheckoutForm;
