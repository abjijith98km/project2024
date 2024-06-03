import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../lib/firebase';
import SIdebar from '@/components/SIdebar';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore/lite';
import Head from 'next/head';

const index = () => {
    const router = useRouter();
    const [attendanceList, setattendanceList] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/login')
            }
        });

    }, [router]);


    useEffect(() => {
        const fetchAttendanceList = async () => {
            const querySnapshot = await getDocs(collection(db, "attendance"));
            const attendancelist = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setattendanceList(attendancelist);
        };

        fetchAttendanceList();
    }, []);
    return (
        <>
            <Head>
                <title>Training session</title>
            </Head>
            <SIdebar />
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg pe-3 pt-5">
                <Link href={'/attendance/addnew'}
                    className="btn bg-gradient-info mt-3 mb-4"
                >
                    Add New
                </Link>
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>Training sessions</h6>
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
                                            Date
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Time
                                        </th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Attendance
                                        </th>
                                        <th className="text-secondary opacity-7"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceList == null && (
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

                                    {attendanceList?.map((player, index) => {
                                        return (
                                            <tr key={player?.id}>
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
                                                                {player.Date}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-xs font-weight-bold mb-0">
                                                        {player.Time}
                                                    </p>
                                                </td>

                                                <td className="align-middle text-center">
                                                    <span className="text-secondary text-xs font-weight-bold">
                                                        {player.Attendance}
                                                    </span>
                                                </td>
                                                <td className="align-middle">
                                                    <Link
                                                        href={`/attendance/${player.id}`}
                                                        className="text-secondary font-weight-bold text-xs"
                                                        data-toggle="tooltip"
                                                        data-original-title="Edit user">
                                                        View
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
    )
}

export default index