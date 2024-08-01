import React, { useState } from "react";
import { connect } from "react-redux";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import Review from "./Review";
import UserDetails from "./UserDetails";
import uroAvathar from "../../urologo.jpg";
import { setFormData } from "../../redux/action";
import HeaderComponent from "./Header";
import Meet from "./Meet";

const SimpleForm = ({ name, setFormData }) => {
  const [chatbotKey, setChatbotKey] = useState(Date.now());
  const [chatOpen, setChatOpen] = useState(false);
  const [end, setEnd] = useState(false);
  const theme = {
    background: "#f5f8fb",
    fontFamily: "none",
    headerBgColor: "#6e48aa",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#6e48aa",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };

  const optionStyle = {
    width: "200px",
    minHeight: "30px",
    padding: "0px",
    backgroundColor: "#f5f8fb",
    color: "black",
    border: "1px solid #6610f2",
  };

  let customStyle = {
    marginTop: "20px",
  };

  if (name) {
    customStyle = {
      ...customStyle,
      display: "none",
    };
  }

  const handleEnd = ({ steps }) => {
    setEnd(true);
    const documentDetails = {};
    if (steps) {
      Object.keys(steps).forEach((key) => {
        if (
          key !== "start" &&
          key !== "review" &&
          key !== "confirm" &&
          steps[key].value
        ) {
          documentDetails[key] = steps[key].value;
        }
      });
    }
    const reduxState = JSON.parse(localStorage.getItem("reduxState")) || {};
    const summary = { ...reduxState, ...documentDetails };
    localStorage.removeItem("reduxState");
    console.log("Summary:", summary);
  };

  const handleClear = () => {
    localStorage.removeItem("rsc_cache");
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
    });

    setChatbotKey(Date.now());
    setChatOpen(true);
  };

  const handleClose = () => {
    if (end) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
      });
    }
    setEnd(false)
    setChatbotKey(Date.now());
    setChatOpen(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        key={chatbotKey}
        floating={true}
        cache={true}
        headerComponent={
          <HeaderComponent onClose={handleClose} onRestart={handleClear} />
        }
        bubbleOptionStyle={optionStyle}
        opened={chatOpen}
        customStyle={customStyle}
        customDelay={1500}
        headerTitle={"UROGULF Support"}
        botAvatar={uroAvathar}
        steps={[
          {
            id: "1",
            message: "Hii, Welcome to UROGULF!",
            trigger: "start",
          },
          {
            id: "start",
            user: true,
            
            trigger: "enter-details",
          },

          {
            id: "enter-details",
            message: "Please enter your details.",
            trigger: "user-details",
          },
          {
            id: "user-details",
            component: <UserDetails />,
            waitAction: true,
            trigger: "documentType",
          },
          {
            id: "documentType",
            message: `Thank you! What kind of service do you need?`,
            trigger: "services",
          },
          {
            id: "services",
            options: [
              {
                value: "Certificate Attestation",
                label: "Certificate Attestation",
                trigger: "Attestation",
              },
              {
                value: "DataFlow verification",
                label: "DataFlow verification",
                trigger: "Doc",
              },
              {
                value: "ICAS Canada",
                label: "ICAS Canada",
                trigger: "7",
              },
            ],
          },
          {
            id: "Attestation",
            message: `What kind of certificate do you want to attest?`,
            trigger: "Attestation Type",
          },
          {
            id: "Attestation Type",
            options: [
              {
                value: "Degree Certificate",
                label: "Degree Certificate",
                trigger: "5",
              },
              {
                value: "Marriage Certificate",
                label: "Marriage Certificate",
                trigger: "5",
              },
              {
                value: "Birth Certificate",
                label: "Birth Certificate",
                trigger: "5",
              },
            ],
          },
          {
            id: "Doc",
            message: `What kind of document do you want to verify?`,
            trigger: "Doc Type",
          },
          {
            id: "Doc Type",
            options: [
              {
                value: "Financial",
                label: "Financial",
                trigger: "6",
              },
              {
                value: "Employment",
                label: "Employment",
                trigger: "6",
              },
              {
                value: "Work Permit",
                label: "Work Permit",
                trigger: "6",
              },
            ],
          },

          {
            id: "5",
            message: "In which country do you need the document attested?",
            trigger: "Country",
          },
          {
            id: "6",
            message: "In which country do you want to verify the document?",
            trigger: "Country",
          },
          {
            id: "Country",
            options: [
              { value: "India", label: "India", trigger: "7" },
              { value: "Kuwait", label: "Kuwait", trigger: "7" },
              { value: "Bahrain", label: "Bahrain", trigger: "7" },
              { value: "UAE", label: "UAE", trigger: "7" },
              { value: "Saudi Arabia", label: "Saudi Arabia", trigger: "7" },
              { value: "Qatar", label: "Qatar", trigger: "7" },
              { value: "Oman", label: "Oman", trigger: "7" },
            ],
          },

          {
            id: "7",
            message:
              "Thank you! We will review the information provided. Please wait a moment.",
            trigger: "review",
          },
          {
            id: "review",
            component: <Review />,
            asMessage: true,
            trigger: "confirmation",
          },
          {
            id: "confirmation",
            message: "Do you confirm the details provided?",
            trigger: "confirm",
          },
          {
            id: "confirm",
            options: [
              { value: "yes", label: "Yes", trigger: "confirmationYes" },
              { value: "no", label: "No", trigger: "updateDetails" },
            ],
          },
          {
            id: "confirmationYes",
            message:
              "Thank you for confirming! If you're interested,schedule a meeting with us",
            trigger: "meet",
          },
          {
            id: "meet",

            component: <Meet />,
            asMessage: true,
            end: true,
          },

          {
            id: "updateDetails",
            message: "Please select to update choosen service?",
            trigger: "updated",
          },
          {
            id: "updated",
            options: [
              {
                value: "Services",
                label: "Services",
                trigger: "services",
              },
            ],
          },
        ]}
        handleEnd={handleEnd}
      />
    </ThemeProvider>
  );
};

export default connect((state) => state.formData, { setFormData })(SimpleForm);
