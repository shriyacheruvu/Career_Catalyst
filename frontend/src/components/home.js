import React from 'react';
import { Link } from 'react-router-dom';


export function HomePage ()  {
  return (
    <div>
      {/* Header */}
       <header className="main_menu">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand main_logo" href="#">
                  <img src="#" alt="logo" />
                </a>
                
                

                <div
                  className="collapse navbar-collapse main-menu-item"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      
                      <a className="nav-link" href="#">
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Contact
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        #
                      </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="#">
                          #
                        </a>
                        <a className="dropdown-item" href="#">
                          #
                        </a>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown1"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        #
                      </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown1">
                        <a className="dropdown-item" href="#">
                          #
                        </a>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        #
                      </a>
                    </li>
                  </ul>
                </div>
                <Link to="/login" className="d-none d-sm-block btn_1 home_page_btn">
                  Login
                </Link>
              </nav> 
            </div>
          </div>
        </div>
      </header> 
      {/* Header part end */}

      {/* Banner */}
      <section className="banner_part">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-5">
              <div className="banner_img d-none d-lg-block">
                <img src="img/banner_img.png" alt="Banner" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="banner_text">
                <div className="banner_text_iner">
                  <h1>Career Catalyst</h1>
                  <p>Where Talent meets Opportunities</p>
                  <Link to="/cards" className="btn_2">
                  Register
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="review_part padding_bottom">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md-6 col-lg-6">
              <div className="review_img">
                <img src="img/review_bg.png" alt="Review Background" />
              </div>
            </div>
            <div className="col-md-6 col-lg-5">
              <div className="review">
               
                
                {/* Repeat review */}
                <div className="review_part_text">
                  <h2>
                  Where Talent meets Opportunities
                  </h2>
                  <p>
                    Saw shall light. Us their to place had creepeth day night
                    great wher appear to. Hath, called, sea called, gathering
                    wherein open make living Female itself gathering man. Waters
                    and, two. Bearing. Saw she'd all let she'd lights abundantly
                    blessed.
                  </p>
                  <h3>
                    Mitchel Jeferson, <span>CEO of softking</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

