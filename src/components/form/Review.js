import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Review = ({ name, email, phone, location, steps }) => {
  const documentDetails = {};

  if (steps) {
    Object.keys(steps).forEach((key) => {
      if (key !== "start" && key !== "review" && key !== "confirm") {
        documentDetails[key] = steps[key].value;
      }
    });
  }

  return (
    <div style={{ width: "100%" }}>
      <h4>Summary</h4>
      <table>
        <tbody>
          <tr>
            <td>
              <div>
                <label className="fw-semibold">Name:</label>
                <div>{name}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <label className="fw-semibold">Email:</label>
                <div>{email}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <label className="fw-semibold">Phone:</label>
                <div>{phone}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>
                <label className="fw-semibold">Location:</label>
                <div>{location}</div>
              </div>
            </td>
          </tr>
          {Object.entries(documentDetails).map(
            ([key, value]) =>
              value && (
                <tr key={key}>
                  <td>
                    <div>
                      <label className="fw-semibold">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </label>
                      <div>{value}</div>
                    </div>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

Review.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

const mapStateToProps = (state) => ({
  name: state.formData.name,
  email: state.formData.email,
  phone: state.formData.phone,
  location: state.formData.location,
});

export default connect(mapStateToProps)(Review);
