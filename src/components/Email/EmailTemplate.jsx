import React from "react";

const EmailTemplate = ({ otpDigits }) => {
  console.log("otpDigits:", otpDigits);
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "15px",
        backgroundColor: "#1A212D",
        borderRadius: "0px",
        backdropFilter: "blur(10px)",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
        marginTop: "20px",
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <h1
          style={{
            color: "#9E77ED",
            margin: "0",
            textAlign: "center",
            fontSize: "24px",
          }}
        >
          DO.er
        </h1>
      </div>
      <div style={{ textAlign: "center", padding: "10px" }}>
        <table cellSpacing="0" cellPadding="0" border="0" align="center">
          <tbody>
            <tr>
              {otpDigits.map((digit, index) => (
                <React.Fragment key={index}>
                  <td
                    style={{
                      border: "2px solid #9E92DC",
                      borderRadius: "15px",
                      width: "50px",
                      height: "50px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      backgroundColor: "rgba(158, 146, 220, 0.2)",
                      textAlign: "center",
                    }}
                  >
                    {digit}
                  </td>
                  {index < otpDigits.length - 1 && (
                    <td style={{ width: "5px" }}></td>
                  )}
                </React.Fragment>
              ))}
            </tr>
          </tbody>
        </table>
        <p style={{ color: "white", fontSize: "14px", marginTop: "10px" }}>
          Use the above OTP to authenticate in your DO.er account.
        </p>
        <p style={{ color: "white", fontSize: "14px" }}>
          This OTP will expire in 2 minutes.
        </p>
        <p style={{ color: "white", fontSize: "14px" }}>
          If you didn't request this OTP, please ignore this email.
        </p>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px", color: "#888" }}>
        <p>&copy; 2023 DO.er. All rights reserved.</p>
      </div>
    </div>
  );
};

export default EmailTemplate;
