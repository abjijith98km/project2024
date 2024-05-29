/** @format */

import { signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/router";

const SIdebar = () => {
  const router = useRouter();
  const handleSignOut = async (e) => {
    e.preventDefault()
    try {
      await signOut(auth);
      // Clear the session cookie
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl pt-3 pb-5 fixed-start ps-3  "
      id="sidenav-main">
      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"></i>
        <Link
          className="navbar-brand m-0"
          href="/"
        >
          <img
            src="/assets/img/logo-ct-dark.png"
            className="navbar-brand-img h-100"
            alt="main_logo"
          />
          <span className="ms-1 font-weight-bold">Football</span>
        </Link>
      </div>
      <hr className="horizontal dark mt-0" />
      <div
        className="collapse navbar-collapse  w-auto "
        id="sidenav-collapse-main">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link  " href="/players">
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-people-fill"
                  viewBox="0 0 16 16">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                </svg>
              </div>
              <span className="nav-link-text ms-1">Players</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link  " href="/attendance">
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                  <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                </svg>
              </div>
              <span className="nav-link-text ms-1">Attendance</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link  " href="$">
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-people-fill"
                  viewBox="0 0 16 16">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                </svg>
              </div>
              <span className="nav-link-text ms-1">Players</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidenav-footer mx-3 position-absolute bottom-1 w-auto">
        <a href="#" onClick={(e) => handleSignOut(e)} className="nav-link text-body font-weight-bold px-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="red"
            className="bi bi-person-dash-fill"
            viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"
            />
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
          <span className="d-sm-inline d-none ms-2">Sign Out</span>
        </a>
      </div>
    </aside>
  );
};

export default SIdebar;
