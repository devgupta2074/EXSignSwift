"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import axios from "axios";
import Loader from "./Loader";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

// import ""

// import styles from "./globals.css";

const EmailForm = ({
  userId,
  recipient,
}: {
  userId: string;
  recipient: any;
}) => {
  const [emailSent, setEmailSent] = useState(false);
  const [inputs, setInputs] = useState({ subject: "", email_body: "" });
  const [loading, setLoading] = useState(false);

  // const [receptient, setReceptient] = React.useState<IReceptient[]>([]);
  const router = useRouter();

  // useEffect(() => {
  //   const fetchRecepients = async () => {
  //     const result = await axios.post(
  //       "http://localhost:3000/api/document/getreceptient",
  //       docId
  //     );
  //     const receptientres = result?.data;

  //     receptientres?.result?.map((item: any) => {
  //       const res = {
  //         name: item.name,
  //         email: item.email,
  //       };
  //       setReceptient((prev) => [...prev, res]);
  //     });
  //   };
  //   fetchRecepients();
  // }, [docId, userId]);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const mails = recipient?.map((email: any) => email.email);
  console.log("mails", mails);
  console.log("recipient", recipient.item);
  const check = recipient.map((item: any) => item);
  console.log("check", check);
  const sendEmail = async () => {
    console.log(recipient, "check by arc now");
    const emails = recipient.map((item: any) => item.email);
    console.log(emails);
    try {
      const response = await fetch("/api/emailsent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emails,
          subject: inputs.subject,
          email_body: inputs.email_body,
        }), // Change the email address as needed
      });

      if (response) {
        setEmailSent(true);
        setLoading(false);
        router.push(`/user/${userId}`);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(inputs);
    // alert(inputs.username + inputs.age);
    await sendEmail();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
        <Loader />
      </div>
    );
  }

  return (
    <main className="email-main">
      {/* <div className="heading">Hello MAIN</div>
      <Link href="#" onClick={sendEmail} className="link">
        {emailSent ? "Email Sent!" : "Send Email"}
      </Link> */}
      <form onSubmit={handleSubmit} className="email-form">
        <h1 className="form-head-text"> Add Subject</h1>
        <p className="form-description">
          Add subject and body for the email you want to send{" "}
        </p>
        <hr />

        <label className="email-form-label">Subject</label>
        <input
          type="text"
          name="subject"
          value={inputs.subject || ""}
          onChange={handleChange}
          className="email-subject border-2 border-gray-600"
        />
        <label className="email-form-label">Email message</label>

        <textarea
          name="email_body"
          value={inputs.email_body}
          onChange={handleChange}
          className="email-body border-2 border-gray-600"
          rows={5}
          cols={50}
        />
        {loading ? (
          <Button
            disabled
            className=" bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors w-full"
          >
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            className=" bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors w-full"
            type="button"
            onClick={handleSubmit}
          >
            Send Email
          </Button>
        )}
      </form>
      <div>
        <p className="text-muted-foreground text-sm text-black">
          Step <span>4 of 4</span>
        </p>
        <div className="relative h-1  rounded-full mb-2">
          <div className="absolute left-0 top-0 h-full bg-rose-500 w-full"></div>
        </div>
      </div>
    </main>
  );
};

export default EmailForm;
