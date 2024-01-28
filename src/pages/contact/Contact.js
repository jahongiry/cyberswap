import React from "react";
import { Link } from "react-router-dom";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-section container">
      <div className="contactUs">
        <div className="contact-title">
          <h2>Biz bilan bog'lanish uchun</h2>
        </div>
        <div className="contact-box">
          {/* Form */}
          <div className="contact contact-form">
            <h3>Send a Message</h3>
            <form>
              <div className="formBox">
                <div className="row50">
                  <div className="inputBox">
                    <span>First Name</span>
                    <input type="text" placeholder="Azimjon" />
                  </div>
                  <div className="inputBox">
                    <span>Last Name</span>
                    <input type="text" placeholder="Jalilov" />
                  </div>
                </div>

                <div className="row50">
                  <div className="inputBox">
                    <span>Email</span>
                    <input type="email" placeholder="forexample@email.com" />
                  </div>
                  <div className="inputBox">
                    <span>Mobile</span>
                    <input type="text" placeholder="+998 ** *** **  **" />
                  </div>
                </div>

                <div className="row100">
                  <div className="inputBox">
                    <span>Biz bilan bog'lanishdan maqsadingiz</span>
                    <textarea placeholder="Write your message here..."></textarea>
                  </div>
                </div>

                <div className="row100">
                  <div className="inputBox">
                    <button className="btn" type="submit"><span>Send</span></button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* info Box */}
          <div className="contact info">
            <h3>Contact Info</h3>
            <div className="infoBox">
              <div>
                <span>
                  <ion-icon className="location"></ion-icon>
                </span>
                <p>
                  Namangan viloyat, Namangan shahar, King street
                </p>
              </div>
              <div>
                <span>
                  <ion-icon className="mail"></ion-icon>
                </span>
                <Link to="mailto:loremipsum@email.com">loremipsum@email.com</Link>
              </div>
              <div>
                <span>
                  <ion-icon className="call"></ion-icon>
                </span>
                <Link to="tel:+999899******">+998** *** ** **</Link>
              </div>

              {/* social media links */}
              <ul className="sci">
                <li>
                  <Link to="#">
                    <ion-icon className="logo-facebook"></ion-icon>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <ion-icon className="logo-twitter"></ion-icon>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <ion-icon className="logo-linkedin"></ion-icon>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <ion-icon className="logo-instagram"></ion-icon>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Map */}
          <div className="contact map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d760.7296714613573!2d71.683115469632!3d40.99136689820956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4f1ce6f138eb%3A0x3e52b70b6bcb557b!2sALGORITM%20-%20education%20centre%20(Lola%20branch)!5e1!3m2!1sen!2s!4v1705996363953!5m2!1sen!2s" width="600" height="450" allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="our location"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
