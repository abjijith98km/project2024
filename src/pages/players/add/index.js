/** @format */

import SIdebar from "@/components/SIdebar";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../../lib/firebase";

const index = ({ id }) => {
    // const [player, setPlayer] = useState(null);
    const [submitting, setsubmitting] = useState(false);
    const route = useRouter();

    const Name = useRef("");
    const Email = useRef("");
    const Gender = useRef("Male");
    const Age = useRef("");
    const Foot = useRef("Right");
    const Height = useRef("");
    const Mother_tongue = useRef("");
    const Nationality = useRef("USA");
    const Performance = useRef("");
    const Position = useRef("");
    const Weight = useRef("");

    useEffect(() => {
        // const fetchPlayer = async () => {
        //     try {
        //         const playerDoc = await getDoc(doc(db, "players", id));
        //         if (playerDoc.exists()) {
        //             setPlayer({ id: playerDoc.id, ...playerDoc.data() });
        //         } else {
        //             console.log("No such document!");
        //         }
        //     } catch (error) {
        //         console.error("Error fetching document: ", error);
        //     }
        // };

        // fetchPlayer();
        console.log("rendered");
    }, []);
    // useEffect(() => {
    //     deliverDate();

    //     return () => { };
    // }, [player]);

    // const deliverDate = () => {
    //     Name.current.value = player?.Name;
    //     Age.current.value = player?.Age;
    //     Email.current.value = player?.Email;
    //     Foot.current.value = player?.Foot;
    //     Gender.current.value = player?.Gender;
    //     Height.current.value = player?.Height;
    //     Mother_tongue.current.value = player?.Mother_tongue;
    //     Nationality.current.value = player?.Nationality;
    //     Performance.current.value = player?.Performance;
    //     Position.current.value = player?.Position;
    //     Weight.current.value = player?.Weight;
    // };
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
            Mother_tongue: Mother_tongue.current.value,
            Nationality: Nationality.current.value,
            Performance: Performance.current.value,
            Position: Position.current.value,
            Weight: Weight.current.value,
        };
        // try {
        //     await setDoc(doc(db, "players", id), data, { merge: true });
        //     alert("Document successfully written!");

        // } catch (error) {
        //     console.error("Error writing document: ", error);
        //     setsubmitting(false);
        // }


        try {
            const docRef = await addDoc(collection(db, "players"), data);
            alert("Data saved ");
            setsubmitting(false);
            route.push("/players");
        } catch (error) {
            console.error("Error adding document: ", error);
            setsubmitting(false);
        }
    };
    return (
        <>
            <SIdebar />
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg pe-3 pt-5">
                <div className="edit__form">
                    <h2>Fill the details</h2>

                    <form
                        className={`row`}
                        onSubmit={(e) => submitData(e)}>
                        <fieldset className="col-12 col-md-6">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" ref={Name} />
                        </fieldset>
                        <fieldset className="col-12 col-md-6">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" ref={Email} />
                        </fieldset>
                        <fieldset className="col-12 col-md-6">
                            <label htmlFor="age">Age</label>
                            <input type="number" id="age" ref={Age} />
                        </fieldset>
                        <fieldset className="col-12 col-md-6">
                            <label htmlFor="gender">Gender</label>
                            <select name="gender" id="gender" ref={Gender}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Not Disclosed">Not Disclosed</option>
                            </select>
                        </fieldset>
                        <fieldset className="col-12 col-md-6">
                            <label htmlFor="position">Poition</label>
                            <input type="text" id="position" ref={Position} />
                        </fieldset>
                        <fieldset className="col-12 col-md-6">
                            <label htmlFor="language">Mother tongue</label>
                            <input type="text" id="language" ref={Mother_tongue} />
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
                            <label htmlFor="height">Height (in feet.)</label>
                            <input type="text" id="height" ref={Height} />
                        </fieldset>
                        <fieldset className="col-12 col-md-6">
                            <label htmlFor="weight">Weight (in Kg)</label>
                            <input type="text" id="weight" ref={Weight} />
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
