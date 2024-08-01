import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { setFormData } from "../../redux/action";
import Autocomplete from "react-google-autocomplete";

const UserDetailsForm = ({ triggerNextStep, setFormData }) => {
  const [formData, setFormDataState] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [errors, setErrors] = useState({});

  const [defaultCountry, setDefaultCountry] = useState("");

  const extractCountryFromLocation = (place) => {
    handleChange("location", place.formatted_address);
if(place){
 // Extract the country short code from the place object
    const countryShort = place?.address_components?.find((component) =>
      component.types.includes("country")
    )?.short_name;
    setDefaultCountry(countryShort); 
}
    
  };

  const handleChange = (name, value) => {
    setFormDataState((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)
    ) {
      validationErrors.email = "Email is not valid";
    }

    if (!formData.phone) {
      validationErrors.phone = "Phone number is required";
    }

    if (!formData.location?.trim()) {
      validationErrors.location = "Location is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setFormData(formData);
      triggerNextStep();
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={formData.name}
            placeholder="Enter your name..."
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={formData.email}
            placeholder="Enter your email..."
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <Autocomplete
            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            onPlaceSelected={(place) => extractCountryFromLocation(place)}
            className={`form-control ${errors.location ? "is-invalid" : ""}`}
            placeholder="Enter your location..."
          />

          {errors.location && (
            <div className="invalid-feedback">{errors.location}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <PhoneInput
            international
            defaultCountry={defaultCountry}
            countryCallingCodeEditable={!defaultCountry}
            className={`form-control ${
              errors.phone ||
              (formData.phone && !isValidPhoneNumber(formData.phone))
                ? "is-invalid"
                : ""
            }`}
            value={formData.phone}
            onChange={(value) => handleChange("phone", value)}
            placeholder="Enter your number..."
          />
          {(errors.phone ||
            (formData.phone && !isValidPhoneNumber(formData.phone))) && (
            <div className="invalid-feedback">
              {errors.phone || "Invalid phone number"}
            </div>
          )}
        </div>
        <button type="submit" className="btn chat-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

UserDetailsForm.propTypes = {
  triggerNextStep: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default connect(null, { setFormData })(UserDetailsForm);
