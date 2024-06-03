/** @format */

import { addDoc, collection } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { db } from "../../../../lib/firebase";

const index = () => {
  const [submitting, setsubmitting] = useState(false);
  const Name = useRef("");
  const Email = useRef("");
  const Gender = useRef("Male");
  const Age = useRef("");
  const Foot = useRef("Right");
  const Height = useRef("");
  const Mother_tongue = useRef("");
  const Nationality = useRef("USA");
  const Position = useRef("");
  const Weight = useRef("");
  const router = useRouter();
  const handleSubmitData = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    const data = {
      Name: Name.current.value,
      Age: Age.current.value,
      Email: Email.current.value,
      Foot: Foot.current.value,
      Gender: Gender.current.value,
      Height: Height.current.value,
      Mother_tongue: Mother_tongue.current.value,
      Nationality: Nationality.current.value,
      Position: Position.current.value,
      Weight: Weight.current.value,
    };
    try {
      const docRef = await addDoc(collection(db, "players"), data);
      const docId = docRef.id; // Get the ID of the saved document
      alert(
        "Application submitted! Our admin will get in touch with you. Please save this URL to check your updates/Status " +
          `/players/status/${docId}`
      );
      setsubmitting(false);
      router.push(`/players/status/${docId}`); // Redirect to the document's URL using its ID
    } catch (error) {
      console.error("Error adding document: ", error);
      setsubmitting(false);
    }
  };
  return (
    <>
      <section className="registration__form h-screen d-flex justify-content-center align-items-center">
        <div className="edit__form m-5" style={{ maxWidth: 800 }}>
          <h2>Enter your details below</h2>
          <form className={`row`} onSubmit={(e) => handleSubmitData(e)}>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" ref={Name} required />
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" ref={Email} required />
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="age">Age</label>
              <input type="number" id="age" ref={Age} required />
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="gender">Gender</label>
              <select name="gender" id="gender" ref={Gender} required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Not Disclosed">Not Disclosed</option>
              </select>
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="position">Poition</label>
              <input type="text" id="position" ref={Position} required />
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="language">Mother tongue</label>
              <input type="text" id="language" ref={Mother_tongue} required />
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="nationality">Nationality</label>
              <select
                name="nationality"
                id="nationality"
                ref={Nationality}
                required>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="UAE">UAE</option>
              </select>
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="height">Height (in feet.)</label>
              <input type="text" id="height" ref={Height} required />
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="weight">Weight (in Kg)</label>
              <input type="text" id="weight" ref={Weight} required />
            </fieldset>
            <fieldset className="col-12 col-md-6">
              <label htmlFor="foot">Left foor or right foot</label>
              <select name="foot" id="foot" ref={Foot} required>
                <option value="Right">Right</option>
                <option value="Left">Left</option>
              </select>
            </fieldset>
            <fieldset className="col-12 mb-0">
              <button
                className="btn bg-gradient-info mt-3 d-flex align-items-center"
                type="submit">
                Submit
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
      </section>
    </>
  );
};

export default index;
