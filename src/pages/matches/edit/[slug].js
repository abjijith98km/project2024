/** @format */

import SIdebar from "@/components/SIdebar";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore/lite";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../../lib/firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

const index = ({ id }) => {
  const [submitting, setsubmitting] = useState(false);
  const [recordedPerformance, setrecordedPerformance] = useState([
    { Name: "", Performance_summary: "", Weakness: "" },
  ]);
  const [attendanceList, setattendanceList] = useState(null);

  const route = useRouter();

  const Name = useRef("");
  const SessionDate = useRef("");
  const Time = useRef("");
  const Attendance = useRef("");

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
  useEffect(() => {
    if (attendanceList !== null) {
      deliverData();
    }
    return () => {
    }
  }, [attendanceList])

  const deliverData = () => {
    Name.current.value = attendanceList?.Name;
    Time.current.value = attendanceList?.Time;
    Attendance.current.value = attendanceList?.Attendance;
    setrecordedPerformance(attendanceList?.Players_performance)
    // let date = new Date(attendanceList?.Date.split('/')[2], attendanceList?.Date.split('/')[1], attendanceList?.Date.split('/')[0]) 
    // console.log(new Date(attendanceList?.Date.split('/')[2], attendanceList?.Date.split('/')[1], attendanceList?.Date.split('/')[0]));
    SessionDate.current.value = attendanceList?.Date
  }

  const submitData = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    const data = {
      Name: Name.current.value,
      Time: Time.current.value,
      Attendance: Attendance.current.value,
      Players_performance: recordedPerformance,
      Date: SessionDate.current.value,
    };
    try {
      await setDoc(doc(db, "matches", id), data, { merge: true });
      alert("Successfully saved!");
      route.push("/matches");
      setsubmitting(false);
    } catch (error) {
      console.error("Error writing document: ", error);
      setsubmitting(false);
    }
  };
  const addRowToPerformanceLog = (e) => {
    e.preventDefault();
    setrecordedPerformance([
      ...recordedPerformance,
      { Name: "", Performance_summary: "", Weakness: "" },
    ]);
  };
  const removeCurrentRow = (e, index) => {
    e.preventDefault();
    let temprow = recordedPerformance;
    let tempindex = index;
    let updatedrow = temprow.filter((p, index) => {
      if (index !== tempindex) {
        return p;
      }
    });
    setrecordedPerformance(updatedrow);
  };
  const handleFieldUpdateplayerName = (e, index) => {
    e.preventDefault();
    let tempindex = index;
    let tempdata = recordedPerformance;
    let tempdataUpdated = tempdata?.map((p, index) => {
      if (index == tempindex) {
        p.Name = e.target.value;
        return p;
      } else {
        return p;
      }
    });
    setrecordedPerformance(tempdataUpdated);
  };
  const handleFieldUpdateplayerPerformance = (e, index) => {
    e.preventDefault();
    let tempindex = index;
    let tempdata = recordedPerformance;
    let tempdataUpdated = tempdata?.map((p, index) => {
      if (index == tempindex) {
        p.Performance_summary = e.target.value;
        return p;
      } else {
        return p;
      }
    });
    setrecordedPerformance(tempdataUpdated);
  };
  const handleFieldUpdateplayerWeakness = (e, index) => {
    e.preventDefault();
    let tempindex = index;
    let tempdata = recordedPerformance;
    let tempdataUpdated = tempdata?.map((p, index) => {
      if (index == tempindex) {
        p.Weakness = e.target.value;
        return p;
      } else {
        return p;
      }
    });
    setrecordedPerformance(tempdataUpdated);
  };

  return (
    <>
      <Head>
        <title>Edit match</title>
      </Head>
      <SIdebar />

      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg pe-3 pt-5">
        <Link href={'/matches/addnew'}
          className="btn bg-gradient-info mt-3 mb-4"
        >
          Add New
        </Link>
        <div className="edit__form">
          <h2>Fill the details</h2>
          {attendanceList == null && (
            <div
              className="spinner-border text-primary d-block mx-auto my-5"
              role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <form className={`row ${attendanceList == null && "d-none"}`} onSubmit={(e) => submitData(e)}>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="name">Name of the session</label>

              <input type="text" id="name" ref={Name} required />
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="date">Date</label>
              <input type="text" id="date" ref={SessionDate} required />
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="time">Time</label>
              <input type="text" id="time" ref={Time} required />
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="attendance">
                Attendance (Number of players attended out of total)
              </label>
              <input type="text" id="attendance" ref={Attendance} />
            </fieldset>
            <fieldset className="col-12 ">
              <label htmlFor="language">Recorded performance</label>
              {/* <input type="text" id="language" ref={Mother_tongue} /> */}
              {recordedPerformance?.map((p, index) => {
                return (
                  <div className="row" key={index}>
                    <fieldset className="col-12 col-lg-4">
                      <label htmlFor="playerName">Player name:</label>
                      <input
                        type="text"
                        id="playerName"
                        name="playerName"
                        value={p?.Name}
                        onChange={(e) => handleFieldUpdateplayerName(e, index)}
                      />
                      <button
                        type="button"
                        className="btn bg-danger text-white mt-2"
                        onClick={(e) => removeCurrentRow(e, index)}>
                        Remove
                      </button>
                    </fieldset>
                    <fieldset className="col-12 col-lg-4">
                      <label htmlFor="playerPerformance">
                        Player Performance:
                      </label>
                      <textarea
                        type="text"
                        id="playerPerformance"
                        name="playerPerformance"
                        value={p?.Performance_summary}
                        onChange={(e) =>
                          handleFieldUpdateplayerPerformance(e, index)
                        }
                      />
                    </fieldset>
                    <fieldset className="col-12 col-lg-4">
                      <label htmlFor="playerWeakness">Player weakness:</label>
                      <textarea
                        type="text"
                        id="playerWeakness"
                        name="playerWeakness"
                        value={p?.Weakness}
                        onChange={(e) =>
                          handleFieldUpdateplayerWeakness(e, index)
                        }
                      />
                    </fieldset>
                  </div>
                );
              })}
              <button
                type="button"
                className="btn bg-gradient-info"
                onClick={(e) => addRowToPerformanceLog(e)}>
                Add Row
              </button>
            </fieldset>

            <fieldset className="col-12 mb-0">
              <button
                className="btn bg-gradient-info mt-3 d-flex align-items-center"
                type="submit">
                Save
                {submitting && (
                  <div
                    className="spinner-border text-white d-block ms-3"
                    role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </main>
    </>
  );
};

export default index;
export async function getServerSideProps(context) {
  const { slug } = context.query;
  return {
    props: {
      id: slug,
    },
  };
}
