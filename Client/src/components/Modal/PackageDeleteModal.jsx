import PropTypes from "prop-types";
import { Fragment } from "react";
import { Dialog, Transition, DialogTitle, DialogPanel } from "@headlessui/react";

export const PackageDeleteModal = ({
  isOpen,
  closeModal,
  handleCancel,
  packageName,
  bookingId,
  payDisabled,
}) => {
  if (!bookingId) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-center text-gray-900"
                >
                  Cancel Booking
                </DialogTitle>

                <div className="mt-3 text-sm text-center text-gray-600">
                  Are you sure you want to cancel the booking for{" "}
                  <span className="font-semibold text-red-600">{packageName}</span>?
                  <br />
                  This action cannot be undone.
                </div>

                <div className="divider divider-neutral my-4"></div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleCancel(bookingId)}
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  >
                    Confirm Cancel
                  </button>

                  {!payDisabled && (
                    <button
                      onClick={closeModal}
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      Keep Booking
                    </button>
                  )}
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

PackageDeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  packageName: PropTypes.string,
  bookingId: PropTypes.string,
  payDisabled: PropTypes.bool,
};
