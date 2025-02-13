import React from "react";
import "../../adminCss/email/offerTemplate.css";
import { makeApi } from "../../api/callApi";

const OfferPage = () => {
  const sendOfferEmails = async () => {
    await makeApi("/api/send-mail-to-all-users", "POST", {
      template: `
          <html>
            <body>
              <h1>Special Offer!</h1>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfYZhSQxxDyy4Y7iwh-eAKsfOHDzv3WR9upjnES9Pm2w&s" alt="Offer" />
              <p>Don't miss out on our exclusive sale. Limited time offer!</p>
            </body>
          </html>
        `,
    })
      .then((response) => {
        console.log("Offer email sent successfully");
      })
      .catch((error) => {
        console.error("Error sending offer email:", error);
      });
  };

  return (
    <div className="offer-container">
      <h1>Special Offer!</h1>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfYZhSQxxDyy4Y7iwh-eAKsfOHDzv3WR9upjnES9Pm2w&s"
        alt="Offer"
      />
      <p>Don't miss out on our exclusive sale. Limited time offer!</p>
      <button onClick={sendOfferEmails}>Send Offer Email</button>
    </div>
  );
};

export default OfferPage;
