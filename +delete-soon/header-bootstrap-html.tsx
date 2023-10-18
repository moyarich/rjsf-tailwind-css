'use client';

import React from 'react';

export default function Header() {
  return (
    <header
      className="p-3 mb-3 border-bottom border-top"
      style={{ backgroundColor: '#eeeeee' }}
    >
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <div id="desktopMenuContainer" className="col-12">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
            >
              <img
                src="/images/logos/logo-7-medconnect.png"
                alt="MedConnect Logo"
                style={{ width: '260px', marginRight: '25px' }}
              />
            </a>
            <ul
              className="menu nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
              style={{ marginTop: '3px' }}
            >
              <li>
                <div className="dropdown">
                  <a
                    href="/TherapeuticAreas"
                    className="nav-item therapeutic-areas-title dropdown-toggle nav-link px-4 link-dark header-link"
                    role="button"
                    id="ddTAMenuLink"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ textTransform: 'uppercase' }}
                  >
                    Therapeutic Areas
                  </a>
                  <div
                    id="ddTAMenu"
                    className="therapeutic-areas-menu-dropdown dropdown-menu"
                    aria-labelledby="ddTAMenuLink"
                    x-placement="bottom-start"
                    style={{
                      position: 'absolute',
                      transform: 'translate3d(0px, 38px, 0px)',
                      top: '0px',
                      left: '0px',
                      willChange: 'transform',
                      fontSize: '14px',
                    }}
                  >
                    <a
                      style={{
                        fontWeight: 'bold !important',
                        textTransform: 'uppercase',
                      }}
                      className="dropdown-item"
                      role="button"
                      id="ddTA-1"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/TherapeuticArea/1"
                    >
                      Cardiovascular, Renal & Metabolism »
                    </a>
                    <a
                      style={{ textAlign: 'left' }}
                      className="dropdown-item"
                      role="button"
                      id="ddD-1"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Disease/1"
                    >
                      Type 2 Diabetes »
                    </a>
                    <a
                      style={{ textAlign: 'left' }}
                      className="dropdown-item"
                      role="button"
                      id="ddD-2"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Disease/4"
                    >
                      Heart Failure »
                    </a>
                    <a
                      style={{ textAlign: 'left' }}
                      className="dropdown-item"
                      role="button"
                      id="ddD-3"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Disease/5"
                    >
                      Chronic Kidney Disease »
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      style={{
                        fontWeight: 'bold !important',
                        textTransform: 'uppercase',
                      }}
                      className="dropdown-item"
                      role="button"
                      id="ddTA-2"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/TherapeuticArea/2"
                    >
                      Oncology »
                    </a>
                    <a
                      style={{ textAlign: 'left' }}
                      className="dropdown-item"
                      role="button"
                      id="ddD-4"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Disease/11"
                    >
                      Lung Cancer »
                    </a>
                    <a
                      style={{ textAlign: 'left' }}
                      className="dropdown-item"
                      role="button"
                      id="ddD-5"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Disease/12"
                    >
                      Breast Cancer »
                    </a>
                    <a
                      style={{ textAlign: 'left' }}
                      className="dropdown-item"
                      role="button"
                      id="ddD-6"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Disease/14"
                    >
                      Pancreatic Cancer »
                    </a>
                    <a
                      style={{ textAlign: 'left' }}
                      className="dropdown-item"
                      role="button"
                      id="ddD-7"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Disease/15"
                    >
                      Prostate Cancer »
                    </a>
                    <a
                      style={{ textAlign: 'left' }}
                      className="dropdown-item"
                      role="button"
                      id="ddD-15"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Disease/13"
                    >
                      Ovarian Cancer »
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      style={{
                        fontWeight: 'bold !important',
                        textTransform: 'uppercase',
                      }}
                      className="dropdown-item"
                      role="button"
                      id="ddTA-7"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/TherapeuticArea/4"
                    >
                      Rare Diseases »
                    </a>
                    <a
                      style={{ textAlign: 'left' }}
                      className="dropdown-item"
                      role="button"
                      id="ddD-17"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Disease/21"
                    >
                      Neurofibromatosis Type 1 »
                    </a>
                    <a
                      style={{ textAlign: 'left' }}
                      className="dropdown-item"
                      role="button"
                      id="ddD-18"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Disease/22"
                    >
                      Atypical Hemolytic Uremic Syndrome »
                    </a>
                    <a
                      style={{ textAlign: 'left' }}
                      className="dropdown-item"
                      role="button"
                      id="ddD-19"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Disease/23"
                    >
                      Paroxysmal Nocturnal Hemoglobinuria »
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      style={{
                        fontWeight: 'bold !important',
                        textTransform: 'uppercase',
                      }}
                      className="dropdown-item"
                      role="button"
                      id="ddTA-3"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/TherapeuticArea/3"
                    >
                      Respiratory & Immunology »
                    </a>
                    <a
                      style={{ textAlign: 'left' }}
                      className="dropdown-item"
                      role="button"
                      id="ddD-8"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Disease/17"
                    >
                      Asthma »
                    </a>
                    <a
                      style={{ textAlign: 'left' }}
                      className="dropdown-item"
                      role="button"
                      id="ddD-9"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Disease/18"
                    >
                      COPD »
                    </a>
                    <a
                      style={{ textAlign: 'left' }}
                      className="dropdown-item"
                      role="button"
                      id="ddD-10"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Disease/20"
                    >
                      Eosinophilia »
                    </a>
                    <div className="dropdown-divider"></div>
                  </div>
                </div>
              </li>
              <li>
                <div className="dropdown">
                  <a
                    href="/Brands"
                    className="nav-item nav-link px-4 link-dark header-link dropdown-toggle"
                    role="button"
                    id="ddBMenuLink"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ textTransform: 'uppercase' }}
                  >
                    Brands
                  </a>
                  <div
                    id="ddBMenu"
                    className="dropdown-menu"
                    aria-labelledby="ddBMenuLink"
                    x-placement="bottom-start"
                    style={{
                      position: 'absolute',
                      transform: 'translate3d(0px, 38px, 0px)',
                      top: '0px',
                      left: '0px',
                      willChange: 'transform',
                      fontSize: '14px',
                    }}
                  >
                    <a
                      className="dropdown-item"
                      role="button"
                      id="ddB-2"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Brand/181/Fasenra"
                    >
                      Fasenra »
                    </a>
                    <a
                      className="dropdown-item"
                      role="button"
                      id="ddB-1"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Brand/1/Forxiga"
                    >
                      Forxiga »
                    </a>
                    <a
                      className="dropdown-item"
                      role="button"
                      id="ddB-5"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Brand/2/Lynparza"
                    >
                      Lynparza »
                    </a>
                    <a
                      className="dropdown-item"
                      role="button"
                      id="ddB-3"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Brand/153/Soliris"
                    >
                      Soliris »
                    </a>
                    <a
                      className="dropdown-item"
                      role="button"
                      id="ddB-6"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Brand/3/Symbicort"
                    >
                      Symbicort »
                    </a>
                    <a
                      className="dropdown-item"
                      role="button"
                      id="ddB-7"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Brand/118/Tagrisso"
                    >
                      Tagrisso »
                    </a>
                    <a
                      className="dropdown-item"
                      role="button"
                      id="ddB-4"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="/Brand/68/Xigduo"
                    >
                      Xigduo »
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link px-4 link-dark header-link"
                  style={{ textTransform: 'uppercase' }}
                >
                  Events
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/VideoGallery"
                  className="nav-link px-4 link-dark header-link"
                  style={{ textTransform: 'uppercase' }}
                >
                  Videos
                </a>
              </li>
              <li>
                <div className="dropdown">
                  <a
                    className="nav-item nav-link px-4 link-dark header-link dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{ textTransform: 'uppercase' }}
                  >
                    Other Information
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                    x-placement="bottom-start"
                  >
                    <a className="dropdown-item" href="#">
                      Material Request
                    </a>
                    <a
                      className="dropdown-item"
                      href="https://www.azaccess.com.sg/"
                    >
                      Access360 Patient Access Program
                    </a>
                    <a className="dropdown-item" href="#">
                      Societies
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link px-4 link-dark header-link"
                  style={{ textTransform: 'uppercase' }}
                >
                  <i
                    className="bi bi-search"
                    style={{ fontWeight: 'bold' }}
                  ></i>
                </a>
              </li>
            </ul>
            <div className="text-end" style={{ float: 'right' }}>
              <a
                href="/login"
                className="d-block link-dark text-decoration-none"
              >
                <img
                  src="/images/test-login.png"
                  alt="Account Profile Picture"
                  width="52"
                  height="52"
                  className="rounded-circle"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
