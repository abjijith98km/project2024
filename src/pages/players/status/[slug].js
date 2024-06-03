/** @format */

import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../../../../lib/firebase";

const ViewDetails = ({ id }) => {
  const [attendanceList, setattendanceList] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // onAuthStateChanged(auth, (user) => {
    //     if (!user) {
    //         router.push("/login");
    //     }
    // });
  }, [router]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const attendanceDoc = await getDoc(doc(db, "players", id));
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
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg pe-3 pt-5">
        <div className="edit__form m-5">
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
              <h5 className="mb-4">
                <strong>Name: </strong>
                {attendanceList?.Name}
              </h5>
              <div className="row">
                <h6 className="col-12 col-md-6 mb-4">
                  <strong>Email: </strong>
                  {attendanceList?.Email}
                </h6>
                <h6 className="col-12 col-md-6 mb-4">
                  <strong>Age: </strong>
                  {attendanceList?.Age}
                </h6>
                <h6 className="col-12 col-md-6 mb-4">
                  <strong>Gender: </strong>
                  {attendanceList?.Gender}
                </h6>
                <h6 className="col-12 col-md-6 mb-4">
                  <strong>Foot: </strong>
                  {attendanceList?.Foot}
                </h6>
                <h6 className="col-12 col-md-6 mb-4">
                  <strong>Height: </strong>
                  {attendanceList?.Height}
                </h6>
                <h6 className="col-12 col-md-6 mb-4">
                  <strong>Height: </strong>
                  {attendanceList?.Weight}
                </h6>
                <h6 className="col-12 col-md-6 mb-4">
                  <strong>Mother tongue: </strong>
                  {attendanceList?.Mother_tongue}
                </h6>
                <h6 className="col-12 col-md-6 mb-4">
                  <strong>Nationality: </strong>
                  {attendanceList?.Nationality}
                </h6>
                <h6 className="col-12 col-md-6 mb-4">
                  <strong>Position: </strong>
                  {attendanceList?.Position}
                </h6>
                <h6 className="col-12 col-md-12 mb-4">
                  <strong>Previous match performance: </strong>
                  {attendanceList?.Performance}
                </h6>
              </div>
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
