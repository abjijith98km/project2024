/** @format */

import SIdebar from "@/components/SIdebar";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";

const index = ({ id }) => {
  const [player, setPlayer] = useState(null);
  const [submitting, setsubmitting] = useState(false);
  const route = useRouter();
  const Name = useRef();
  const Email = useRef();
  const Gender = useRef();
  const Age = useRef();
  const Foot = useRef();
  const Height = useRef();
  const Mother_tongue = useRef();
  const Nationality = useRef();
  const Performance = useRef('');
  const TrainingPerformance = useRef('');
  const Position = useRef();
  const Weight = useRef();
  const Password = useRef("");

  const router = useRouter();
  const [ageValue, setAgeValue] = useState(18);
  const handleChange = (e) => {
    setAgeValue(e.target.value);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login')
      }
    });

  }, [router]);
  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const playerDoc = await getDoc(doc(db, "players", id));
        if (playerDoc.exists()) {
          setPlayer({ id: playerDoc.id, ...playerDoc.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchPlayer();
    console.log("rendered");
  }, []);
  useEffect(() => {
    deliverDate();

    return () => { };
  }, [player]);

  const deliverDate = () => {
    Name.current.value = player?.Name;
    Age.current.value = player?.Age;
    setAgeValue(player?.Age)
    Email.current.value = player?.Email;
    Foot.current.value = player?.Foot;
    Gender.current.value = player?.Gender;
    Height.current.value = player?.Height;
    Password.current.value = player?.Password,
      Mother_tongue.current.value = player?.Mother_tongue;
    Nationality.current.value = player?.Nationality;
    Performance.current.value = player?.Performance;
    TrainingPerformance.current.value = player?.TrainingPerformance;
    Position.current.value = player?.Position;
    Weight.current.value = player?.Weight;

  };
  const submitData = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    const data = {
      Name: Name.current.value,
      Age: Age.current.value,
      Email: Email.current.value,
      Foot: Foot.current.value,
      Gender: Gender.current.value,
      Height: Height.current.value,
      Password: Password.current.value,
      Mother_tongue: Mother_tongue.current.value,
      Nationality: Nationality.current.value,
      Performance: Performance.current.value,
      TrainingPerformance: TrainingPerformance.current.value,
      Position: Position.current.value,
      Weight: Weight.current.value,
    };
    try {
      await setDoc(doc(db, "players", id), data, { merge: true });
      alert("Successfully saved!");
      route.push("/players");
      setsubmitting(false);
    } catch (error) {
      console.error("Error writing document: ", error);
      setsubmitting(false);
    }
  };
  return (
    <>
      <Head>
        <title>Edit player</title>
      </Head>
      <SIdebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg pe-3 pt-5">
        <div className="edit__form">
          <h2>Fill the details</h2>
          {player == null && (
            <div
              className="spinner-border text-primary d-block mx-auto my-5"
              role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}

          <form
            className={`row ${player == null && "d-none"}`}
            onSubmit={(e) => submitData(e)}>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                ref={Name}
                pattern="[A-Za-z.]*"
                title="Only alphabets and dots are allowed. Numbers are not allowed."
                required
              />
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                ref={Email}
                required
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                title="Please enter a valid email address."
              />
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="Password">Password</label>
              <input type="text" id="Password" ref={Password} required />
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="age">Age {Age?.current?.value}</label>
              <input
                type="range"
                min={18}
                max={30}
                id="age"
                ref={Age}
                value={ageValue}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="gender">Gender</label>
              <select name="gender" id="gender" ref={Gender}>
                <option value="Male">Male</option>
              </select>
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="position">Position</label>
              <select name="position" id="position" ref={Position}>
                <option value="Goalkeeper">Goalkeeper</option>
                <option value="Center-Back">Center-Back</option>
                <option value="Full-Back">Full-Back</option>
                <option value="Wing-Back">Wing-Back</option>
                <option value="Midfielders">Midfielders</option>
                <option value="Forwards">Forwards</option>
              </select>
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="language">Mother tongue</label>
              <select name="language" id="language" ref={Mother_tongue}>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Tamil">Tamil</option>
              </select>
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="nationality">Nationality</label>
              <select name="nationality" id="nationality" ref={Nationality}>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="UAE">UAE</option>
              </select>
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="height">
                Height (in feet.)
              </label>
              <input
                type="number"
                min={5.5}
                max={6.11}
                step={0.01}
                id="height"
                ref={Height}
              />
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="weight">Weight (in Kg)</label>
              <input
                type="number"
                min={58}
                max={80}
                step={0.01}
                id="weight"
                ref={Weight}
              />
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="foot">Left foor or right foot</label>
              <select name="foot" id="foot" ref={Foot}>
                <option value="Right">Right</option>
                <option value="Left">Left</option>
              </select>
            </fieldset>
            <fieldset className="col-12 ">
              <label htmlFor="prevperformance">
                Previous match performance
              </label>
              <textarea
                name="prevperformance"
                id="prevperformance"
                ref={Performance}></textarea>
            </fieldset>

            <fieldset className="col-12 ">
              <label htmlFor="prevperformance">
                Previous training session performance
              </label>
              <textarea
                name="prevperformance"
                id="prevperformance"
                ref={TrainingPerformance}></textarea>
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
  const { id } = context.query;
  return {
    props: {
      id: id,
    },
  };
}
