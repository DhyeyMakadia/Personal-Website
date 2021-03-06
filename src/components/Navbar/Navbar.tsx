import React, { createRef, useEffect, useState } from "react";

/* eslint-disable */
export default function Navbar() {
  const [hamDataVisible, setHamDataVisible] = useState<boolean>(false);
  const [mobileMenu, setMobileMenu] = useState<string>("hide");
  const [mobileMenuOpenCount, setMobileMenuOpenCount] =
    useState<boolean>(false);
  const [navbarStyle, setNavbarStyle] = useState<any>({ top: "0" });
  const [prevScrollpos, setPrevScrollpos] = useState(0);
  const [currentScrollpos, setCurrentScrollpos] = useState(0);
  const wrapper: any = createRef();
  const btnWrapper: any = createRef();

  window.onscroll = function () {
    setCurrentScrollpos(window.pageYOffset);
    if (prevScrollpos >= currentScrollpos) {
      setNavbarStyle({ top: "0" });
    } else {
      setNavbarStyle({ top: "-80px" });
    }
    setPrevScrollpos(currentScrollpos);
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        wrapper.current &&
        !wrapper.current.contains(event.target) &&
        !btnWrapper.current.contains(event.target)
      ) {
        handleHamClick();
      }
    }
    if (hamDataVisible) {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [mobileMenuOpenCount]);

  const handleHamClick = () => {
    if (hamDataVisible === true) {
      setHamDataVisible(false);
      setMobileMenu("hide");
      document.body.style.overflow = "unset";
      let blur = document.querySelectorAll(".canAlsoBlur");
      blur.forEach((element) => {
        element.classList.remove("blur-bg");
      });
    } else {
      setHamDataVisible(true);
      setMobileMenu("show");
      document.body.style.overflow = "hidden";
      let blur = document.querySelectorAll(".canAlsoBlur");
      blur.forEach((element) => {
        element.classList.add("blur-bg");
      });
      setMobileMenuOpenCount(!mobileMenuOpenCount);
    }
  };

  const Scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView(true);
  };

  const handleScroll = (id: string, View: string) => {
    View === "mobileView" && handleHamClick();
    Scroll(id);
  };

  return (
    <header id="header">
      <nav id="navbar" className="navbar navbar-expand-md" style={navbarStyle}>
        <button
          className="navbar-toggler ham-button"
          ref={btnWrapper}
          id="ham-button"
          data-visible={hamDataVisible}
          aria-expanded="false"
          onClick={handleHamClick}
        >
          <div className="ham-burger"></div>
        </button>

        <a
          className="navbar-brand canAlsoBlur"
          onClick={() => handleScroll("hero", "desktopView")}
        >
          <svg
            id="logo"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 511.988 511.988"
            className=""
          >
            <g>
              <g xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m414.6 0c-20.029 0-36.265 16.237-36.265 36.265v129.302c-34.596-28.058-77.797-43.352-122.341-43.31-107.453 0-194.866 87.419-194.866 194.866s87.419 194.866 194.866 194.866 194.866-87.42 194.866-194.867v-280.857c0-20.026-16.233-36.262-36.26-36.265zm-158.606 439.468c-67.564 0-122.335-54.771-122.335-122.335s54.771-122.335 122.335-122.335 122.335 54.771 122.335 122.335c-.079 67.531-54.804 122.256-122.335 122.335z"
                  fill="currentColor"
                  stroke="currentColor"
                  data-original="#000000"
                ></path>
              </g>
            </g>
          </svg>
        </a>

        <div className="collapse navbar-collapse text-right">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a
                className="nav-link about-nav-link"
                onClick={() => handleScroll("about", "desktopView")}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link experiences-nav-link"
                onClick={() => handleScroll("experiences", "desktopView")}
              >
                Experiences
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link work-nav-link"
                onClick={() => handleScroll("work", "desktopView")}
              >
                Work
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link contact-nav-link"
                onClick={() => handleScroll("contact", "desktopView")}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div
          className={`left fade ${mobileMenu}`}
          ref={wrapper}
          id="mobileModal"
          role="dialog"
          aria-labelledby="sidenavModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="d-flex flex-column align-items-center justify-content-center h-100">
                  <a
                    id="mb-about"
                    onClick={() => handleScroll("about", "mobileView")}
                  >
                    About
                  </a>
                  <a
                    id="mb-experiences"
                    onClick={() => handleScroll("experiences", "mobileView")}
                  >
                    Experiences
                  </a>
                  <a
                    id="mb-work"
                    onClick={() => handleScroll("work", "mobileView")}
                  >
                    Work
                  </a>
                  <a
                    id="mb-contact"
                    onClick={() => handleScroll("contact", "mobileView")}
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
