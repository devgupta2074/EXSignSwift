"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MarketChart from "@/components/charts/DocumentChart";

export default function() {
    const { data: session } = useSession();
    const [allDocs, setAllDocs] = useState(0);
    const [draft,setDraft ] = useState(0);
    const [pending,setPending] = useState(0);
    const [completed,setCompleted] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (session?.user?.id) {
                    const response = await axios.post("http://localhost:3000/api/stats/documentCounts", {
                        id: session.user.id
                    });
                    setAllDocs(response.data.count);
                    setDraft(response.data.draft);
                    setPending(response.data.pending);
                    setCompleted(response.data.completed);

                }
            } catch (error) {
                console.error("Error fetching document count:", error);
            }
        };

        if (session) {
            fetchData();
        }
    },[session]);

    return (
        <div>
            <h1>Total Documents : {allDocs}</h1>
            <h1>Draft Documents : {draft}</h1>
            <h1>pending Documents : {pending}</h1>
            <h1>completed  Documents : {completed}</h1>


            <MarketChart />
        </div>
    );
}
