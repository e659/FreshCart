import React from "react";
import back from "../../Assets/images/bg-card-back.png";
import front from "../../Assets/images/bg-card-front.png";
import "./payment.scss";
export default function Payment() {
  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col-md-4">
            <div class="leftSide">
              <div class="cards">
                <div class="frontCard">
                  <img class="frontImg" src={front} alt="card" />
                  <div class="point"></div>
                  <div class="circit"></div>
                  <div class="frontCardInfo py-2 px-3">
                    <h1 class="fs-4" id="cardNumber">
                      0000 0000 0000 0000
                    </h1>
                    <div class="d-flex justify-content-between">
                      <p class="cardName">EMAN SHALAPY</p>
                      <span id="date">
                        <span id="month">00</span>
                        <span>/</span>
                        <span id="year">00</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="cardBack">
                  <img class="backImg" src={back} alt="card" />
                  <div class="backInfo">
                    <span id="cvv">000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <form class="row g-3 w-25 form">
            <div class="col-md-12">
                <label for="inputname" class="form-label">
                 Email
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputname"
                  placeholder="e.g emanshalapy@gamil.com"
                />
              </div>
              <div class="col-md-12">
                <label for="inputname" class="form-label">
                  CARDHOLDER NAME
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputname"
                  placeholder="e.g Eman Shalapy"
                />
              </div>
              <div class="col-md-12">
                <label for="inputnumber" class="form-label">
                  CARD NUMBER
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="inputnumber"
                  placeholder="e.g 1234 5678 9123 0000"
                />
              </div>
              <div class="col-md-3">
                <label for="inputmonth" class="form-label">
                  EXP DATE
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="inputmonth"
                  placeholder="MM"
                />
              </div>
              <div class="col-md-3">
                <label for="inputyear" class="form-label">
                  (MM/YY)
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="inputyear"
                  placeholder="YY"
                />
              </div>
              <div class="col-md-6">
                <label for="inputCvv" class="form-label">
                  CVC
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="inputcvc"
                  placeholder="e.g 123"
                />
              </div>

              <div class="col-12 mt-4">
                <button
                  type="submit"
                  class="btn btn-primary w-100 confirmBtn py-2"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
