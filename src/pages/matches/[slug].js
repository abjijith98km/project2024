/** @format */

import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../lib/firebase";
import SIdebar from "@/components/SIdebar";
import { doc, getDoc } from "firebase/firestore/lite";
import Link from "next/link";

const ViewDetails = ({ id }) => {
    const [attendanceList, setattendanceList] = useState(null);

    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/login");
            }
        });
    }, [router]);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const attendanceDoc = await getDoc(doc(db, "matches", id));
                if (attendanceDoc.exists()) {
                    setattendanceList({ id: attendanceDoc.id, ...attendanceDoc.data() });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        };

        fetchAttendanceData();
    }, []);
    return (
        <>
            <SIdebar />
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg pe-3 pt-5">
                <Link href={'/matches/addnew'}
                    className="btn bg-gradient-info mt-3 mb-4"
                >
                    Add New
                </Link>
                <div className="edit__form">
                    <h2 className="mb-4">Details</h2>
                    {attendanceList == null && (
                        <div
                            className="spinner-border text-primary d-block mx-auto my-5"
                            role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                    {attendanceList !== null && (
                        <>
                            <h5 className="mb-2">{attendanceList?.Name}</h5>
                            <ul className="d-flex flex-wrap p-0 mb-5">
                                <li className="me-5">
                                    <strong>Date: </strong>
                                    {attendanceList?.Date}
                                </li>
                                <li className="me-5">
                                    <strong>Time: </strong>
                                    {attendanceList?.Time}
                                </li>
                                <li className="me-5">
                                    <strong>Attendance: </strong>
                                    {attendanceList?.Attendance}
                                </li>
                            </ul>
                            <h6 className="mb-4">
                                <strong>Player Performance</strong>
                            </h6>
                            {attendanceList?.Players_performance?.map((player, index) => {
                                return (
                                    <div className="row" key={index}>
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-3- mb-2">
                                            <p key={index} className="mb-2">
                                                <strong>Name: </strong>
                                                {player?.Name}
                                            </p>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-3- mb-2">
                                            <p key={index} className="mb-2">
                                                <strong>Performance summary: <br /></strong>
                                                {player?.Performance_summary}
                                            </p>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4 col-xl-3- mb-2">
                                            <p key={index} className="mb-2">
                                                <strong>Player weakness: <br /> </strong>
                                                {player?.Weakness}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            <Link href={`/matches/edit/${attendanceList?.id}`} className="btn bg-gradient-info mt-4">Edit</Link>

                        </>
                    )}
                </div>
            </main>
        </>
    );
};

export default ViewDetails;
export async function getServerSideProps(context) {
    const { slug } = context.query;
    return {
        props: {
            id: slug,
        },
    };
}
