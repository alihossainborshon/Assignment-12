import React from "react";

export const GuideDescriptionModal = ({ guide, onClose }) => {
  if (!guide) return null;

  const {
    name,
    email,
    photo,
    role,
    guideApplication,
    requestedAt,
    status,
    approvedAt,
  } = guide;

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleString() : "N/A";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row gap-6 ">
          <div className="flex-shrink-0">
            <img
              src={photo}
              alt={name}
              className="w-32 h-32 rounded-full object-cover border-2 p-[3px] bg-gradient-to-r from-[#ff9639] to-[#d21f1f]"
            />
          </div>

          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Role:</strong> {role}
            </p>
            <p>
              <strong>Requested At:</strong> {formatDate(requestedAt)}
            </p>
            {approvedAt && (
              <p>
                <strong>Approved At:</strong> {formatDate(approvedAt)}
              </p>
            )}

            <hr className="my-2" />

            <p>
              <strong>Title:</strong> {guideApplication?.title || "N/A"}
            </p>
            <p>
              <strong>Reason:</strong> {guideApplication?.reason || "N/A"}  
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`${
                  status === "Approved"
                    ? "text-green-600"
                    : status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {status || "Pending"}
              </span>
            </p>
            {guideApplication?.cvLink && (
              <p>
                <strong>CV:</strong>{" "}
                <a
                  href={guideApplication.cvLink}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  View CV
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
