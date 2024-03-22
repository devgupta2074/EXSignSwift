"use client"
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"




export default function EmailTemp() {
    const [emailSent, setEmailSent] = useState(false);

    const sendEmail = async () => {
        try {
            const response = await fetch("/api/emailsent", {
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

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>Hello MAIN</div>
            <Button>Click me</Button>
            <Link href="#" onClick={sendEmail}>
                {emailSent ? "Email Sent!" : "Send Email"}
            </Link>
        </main>
    );
}
