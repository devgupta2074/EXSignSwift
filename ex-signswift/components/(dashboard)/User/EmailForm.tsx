"use client";
import { useState } from "react";
import Link from "next/link";
// import ""

// import styles from "./globals.css";

const EmailForm = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [inputs, setInputs] = useState({ subject: "", email_body: "" });

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const sendEmail = async () => {
    try {
      const response = await fetch("/api/welcome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "ag213@snu.edu.in" }), // Change the email address as needed
      });

      if (response.ok) {
        setEmailSent(true);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(inputs);
    // alert(inputs.username + inputs.age);
    await sendEmail();
  };

  return (
    <main className="main-conatiner">
      <div className="heading">Hello MAIN</div>
      <Link href="#" onClick={sendEmail} className="link">
        {emailSent ? "Email Sent!" : "Send Email"}
      </Link>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">Enter Email Subject:</label>
        <input
          type="text"
          name="subject"
          value={inputs.subject || ""}
          onChange={handleChange}
          className="input"
        />
        <label className="label">Enter Email message:</label>

        <textarea
          name="email_body"
          value={inputs.email_body}
          onChange={handleChange}
        />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </main>
  );
};

export default EmailForm;
