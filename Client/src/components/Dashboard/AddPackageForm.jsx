import PropTypes from "prop-types";
import { TbFidgetSpinner } from "react-icons/tb";
import { shortImageName } from "../../utilities";

export const AddPackageForm = ({
  handleSubmit,
  uploadImage,
  setUploadImage,
  loading,
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center  text-gray-800 rounded-xl px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md rounded-xl p-8 border border-blue-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Side */}
          <div className="space-y-6">
            {/* Package Name */}
            <div className="space-y-1 text-sm">
              <label
                htmlFor="spotName"
                className="block text-sm font-medium text-gray-600"
              >
                Package Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                name="spotName"
                id="spotName"
                type="text"
                placeholder="Enter package name"
                required
              />
            </div>

            {/* City */}
            <div className="space-y-1 text-sm">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-600"
              >
                City
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                name="city"
                id="city"
                type="text"
                placeholder="City or Town name"
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-1 text-sm">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-600"
              >
                Location
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                name="location"
                id="location"
                type="text"
                placeholder="Place name"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-1 text-sm">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-600"
              >
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                name="category"
              >
                <option value="Hill">Hill</option>
                <option value="Beach">Beach</option>
                <option value="Historical">Historical</option>
                <option value="Forest">Forest</option>
              </select>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6 flex flex-col">
            {/* Price & Travel Time */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm w-1/2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-600"
                >
                  Price Amount (ParParson in BDT)
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price (BDT)"
                  required
                />
              </div>

              {/* Travel Time */}
              <div className="space-y-1 text-sm w-1/2">
                <label
                  htmlFor="travelTime"
                  className="block text-sm font-medium text-gray-600"
                >
                  Travel Time (Days)
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                  name="travelTime"
                  id="travelTime"
                  type="number"
                  placeholder="e.g. 3"
                  required
                />
              </div>
            </div>

            {/* Best Season */}
            <div className="space-y-1 text-sm">
              <label
                htmlFor="seasonality"
                className="block text-sm font-medium text-gray-600"
              >
                Best Season to Visit
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                name="seasonality"
                id="seasonality"
                type="text"
                placeholder="e.g. Winter or Summer"
              />
            </div>

            {/* Visitors */}
            <div className="space-y-1 text-sm">
              <label
                htmlFor="visitors"
                className="block text-sm font-medium text-gray-600"
              >
                Visitors per Year (optional)
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                name="visitors"
                id="visitors"
                type="number"
                placeholder="Approx. visitor count"
              />
            </div>

            {/* Image Upload */}
            <div className="p-4 w-full m-auto rounded-lg flex-grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      onChange={(e) => setUploadImage(e.target.files[0])}
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="inline-block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-3 px-5 rounded-xl hover:from-indigo-500 hover:to-blue-600 font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                      {shortImageName(uploadImage)}
                    </div>
                  </label>
                </div>
              </div>

              {uploadImage instanceof File && (
                <div className="flex items-center justify-center">
                  <img
                    src={URL.createObjectURL(uploadImage)}
                    alt={uploadImage.name}
                    className="mt-3 w-32 h-32 object-cover rounded-lg border-2 border-blue-300 shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Write about this tourist spot or package..."
            className="block rounded-md w-full h-32 px-4 py-3 text-gray-800 placeholder-gray-400 border border-blue-300 bg-white focus:outline-blue-500"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center pt-6">
          <button
            type="submit"
            className="btn-wide inline-block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-3 rounded-xl hover:from-indigo-500 hover:to-blue-600 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Add Tourist Spot"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

AddPackageForm.propTypes = {
  handleSubmit: PropTypes.func,
  uploadImage: PropTypes.any,
  setUploadImage: PropTypes.func,
  loading: PropTypes.bool,
};
