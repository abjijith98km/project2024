/** @format */

import Head from "next/head";
import Image from "next/image";
import SIdebar from "@/components/SIdebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, auth } from "../../lib/firebase";

export default function Home() {
  // const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login')
      }
    });

  }, [router]);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <SIdebar />
      <>
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg pe-3 pt-5">
          <div className="card overflow-hidden">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-lg-6">
                  <div className="d-flex flex-column h-100">
                    <p className="mb-1 pt-2 text-bold">Welcome</p>
                    <h5 className="font-weight-bolder">Players Dashboard</h5>
                    <p className="mb-5">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Animi perferendis ipsa cumque?
                    </p>
                    {/* <a className="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto" href="javascript:;">
                    Read More
                    <i className="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                  </a> */}
                  </div>
                </div>
                <div className="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
                  <div className="bg-gradient-primary border-radius-lg h-100">
                    <img
                      src="/assets/img/shapes/waves-white.svg"
                      className="position-absolute h-100 w-50 top-0 d-lg-block d-none"
                      alt="waves"
                    />
                    <div className="position-relative d-flex align-items-center justify-content-center h-100">
                      <img
                        className="w-100 position-relative z-index-2 pt-4"
                        src="/assets/img/illustrations/rocket-white.png"
                        alt="rocket"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    </>
  );
}
// export const getServerSideProps = async ({ req, res }) => {
//   // const auth = getAuth(app);
//   const user = auth.currentUser;

//   if (!user) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/auth.user
//       const uid = user.uid;
//       console.log(uid);
//       // ...
//     } else {
//       // User is signed out
//       // ...
//     }
//   });

//   return {
//     props: {}, // No additional props required for this page
//   };
// };