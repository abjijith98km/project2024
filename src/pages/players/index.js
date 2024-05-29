/** @format */

import SIdebar from "@/components/SIdebar";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../lib/firebase";
import { collection, getDoc, getDocs } from "firebase/firestore/lite";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

const index = () => {
  const [players, setPlayers] = useState(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login')
      }
    });

  }, [router]);
  useEffect(() => {
    const fetchPlayers = async () => {
      const querySnapshot = await getDocs(collection(db, "players"));
      const playersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlayers(playersList);
    };

    fetchPlayers();
  }, []);

  return (
    <>
      <SIdebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg pe-3 pt-5">
        <Link href={'/players/add'}
          className="btn bg-gradient-info mt-3 mb-4"
          >
          Add New
        </Link>
        <div className="card mb-4">
          <div className="card-header pb-0">
            <h6>All PLayers</h6>
          </div>
          <div className="card-body px-0 pt-0 pb-2">
            <div className="table-responsive p-0">
              <table className="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Name
                    </th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Email
                    </th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Position
                    </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Age
                    </th>
                    <th className="text-secondary opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                  {players == null && (
                    <tr>
                      <td colSpan={5}>
                        <div
                          className="spinner-border text-primary d-block mx-auto my-5"
                          role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  )}

                  {players?.map((player, index) => {
                    return (
                      <tr key={player.id}>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm">{player.Name}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div className="d-flex flex-column justify-content-center">
                              <p className="text-xs text-secondary mb-0">
                                {player.Email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-xs font-weight-bold mb-0">
                            {player.Position}
                          </p>
                        </td>

                        <td className="align-middle text-center">
                          <span className="text-secondary text-xs font-weight-bold">
                            {player.Age}
                          </span>
                        </td>
                        <td className="align-middle">
                          <Link
                            href={`/players/edit/${player.id}`}
                            className="text-secondary font-weight-bold text-xs"
                            data-toggle="tooltip"
                            data-original-title="Edit user">
                            Edit
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default index;
