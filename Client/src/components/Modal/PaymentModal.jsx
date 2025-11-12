import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CreditCard, IndianRupee, X } from "lucide-react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const PaymentModal = ({ isOpen, closeModal, bookingInfo, refetch }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <DialogPanel className="relative w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-200">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
              >
                <X size={20} />
              </button>

              {/* Title */}
              <DialogTitle
                as="h3"
                className="text-xl font-semibold text-center text-gray-800 mb-4 flex items-center justify-center gap-2"
              >
                <CreditCard className="text-blue-500" size={22} />
                Confirm Your Payment
              </DialogTitle>

              {/* Booking Info */}
              <div className="bg-gray-50 rounded-lg p-4 shadow-inner text-gray-700 space-y-2 mb-4">
                <p>
                  <span className="font-semibold">Package:</span>{" "}
                  {bookingInfo?.packageName}
                </p>
                <p>
                  <span className="font-semibold">Guide:</span>{" "}
                  {bookingInfo?.guideName}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(bookingInfo?.tourDate).toLocaleDateString("en-GB")}
                </p>
                <p className="flex items-center gap-1 text-lg font-bold text-green-600">
                  <IndianRupee size={18} className="text-green-500" />
                  {bookingInfo?.totalPrice}
                </p>
              </div>

              {/* Stripe Form */}
              <div className="my-4">
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    bookingInfo={bookingInfo}
                    closeModal={closeModal}
                    refetch={refetch}
                  />
                </Elements>
              </div>

              
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
