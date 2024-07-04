import React from "react";
import "./header.css";
import {
  FaChartLine,
  FaBook,
  FaLanguage,
  FaClock,
  FaUserShield,
  FaCogs,
  FaMobileAlt,
  FaLifeRing,
} from "react-icons/fa";

const sectionStyle = {
  paddingTop: "2rem",
  paddingBottom: "2rem",
};

const iconStyle = {
  fontSize: "3rem",
  color: "#007bff",
};

const teamStyle = {
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  objectFit: "cover",
};

const MainContent = () => (
  <div className="container-fluid">
    <div id="home" style={{ ...sectionStyle, height: "100vh" }}>
      <div className="row">
        <div className="col-md-6 d-flex flex-column align-items-end justify-content-center">
          <h1 className="text-primary">
            Welcome to <br />
            Cash Flow Management System
          </h1>
          <p className="text-muted">
            "Revenue is vanity, profit is sanity, but cash is king."
          </p>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-start">
          <img
            src="/assets/cashflow.png"
            alt="Cash Flow Management"
            style={{
              maxWidth: "100%",
              height: "500px",
              border: "1px solid white",
            }}
          />
        </div>
      </div>
    </div>

    <div id="about" style={sectionStyle}>
      <h2 className="text-center mb-5" style={{ color: "black" }}>
        What We Provide
      </h2>
      <div className="row mt-3 text-center">
        <div className="col-md-4 mb-4">
          <FaChartLine style={iconStyle} />
          <h4 className="mt-2">Expense Tracking</h4>
          <p>Monitor your spending habits with detailed expense tracking.</p>
        </div>
        <div className="col-md-4 mb-4">
          <FaBook style={iconStyle} />
          <h4 className="mt-2">Income Management</h4>
          <p>
            Effortlessly manage your income sources and plan for the future.
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <FaLanguage style={iconStyle} />
          <h4 className="mt-2">Budget Planning</h4>
          <p>
            Create and stick to budgets that align with your financial goals.
          </p>
        </div>
      </div>
      <div className="row mt-3 text-center">
        <div className="col-md-4 mb-4">
          <FaClock style={iconStyle} />
          <h4 className="mt-2">Financial Reporting</h4>
          <p>
            Generate comprehensive financial reports to get a clear picture of
            your financial status.
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <FaUserShield style={iconStyle} />
          <h4 className="mt-2">Cash Flow Forecasting</h4>
          <p>
            Predict your future cash flow based on historical data and planned
            expenses.
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <FaCogs style={iconStyle} />
          <h4 className="mt-2">Debt Management</h4>
          <p>Keep track of your debts and payments.</p>
        </div>
      </div>
      <div className="row mt-3 text-center">
        <div className="col-md-4 mb-4">
          <FaMobileAlt style={iconStyle} />
          <h4 className="mt-2">Mobile Access</h4>
          <p>
            Access your financial data on the go with our mobile-friendly
            platform.
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <FaLifeRing style={iconStyle} />
          <h4 className="mt-2">Customer Support</h4>
          <p>We're here to assist you with any questions or issues.</p>
        </div>
        <div className="col-md-4 mb-4">
          <FaChartLine style={iconStyle} />
          <h4 className="mt-2">Investment Tracking</h4>
          <p>Keep track of your investments and monitor their performance.</p>
        </div>
      </div>
    </div>

    <div style={sectionStyle}>
      <div className="row mt-5">
        <div className="col">
          <h2 className="text-center mb-5" style={{ color: "black" }}>
            Why Choose Us
          </h2>
        </div>
      </div>
      <div className="row mt-3 text-center">
        <div className="col-md-4 mb-4">
          <FaChartLine style={iconStyle} />
          <h4 className="mt-2">Easy to Use</h4>
          <p>
            Our system is designed to be user-friendly, making financial
            management hassle-free.
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <FaUserShield style={iconStyle} />
          <h4 className="mt-2">Secure</h4>
          <p>
            We prioritize the security of your financial data with advanced
            encryption techniques.
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <FaCogs style={iconStyle} />
          <h4 className="mt-2">Customizable</h4>
          <p>
            Tailor the system to fit your specific financial needs with
            customizable features.
          </p>
        </div>
      </div>
      <div className="row mt-3 text-center">
        <div className="col-md-4 mb-4">
          <FaMobileAlt style={iconStyle} />
          <h4 className="mt-2">Mobile Friendly</h4>
          <p>
            Access your financial data on the go with our mobile-friendly
            platform.
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <FaLifeRing style={iconStyle} />
          <h4 className="mt-2">24/7 Support</h4>
          <p>
            Our customer support is available 24/7 to assist you with any issues
            or questions.
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <FaClock style={iconStyle} />
          <h4 className="mt-2">Real-Time Updates</h4>
          <p>
            Get real-time updates on your financial status and stay informed
            about your cash flow.
          </p>
        </div>
      </div>
    </div>

    <div id="team" style={sectionStyle}>
      <div className="row">
        <div className="col">
          <h2 className="text-center mb-5" style={{ color: "black" }}>
            Meet Our Team
          </h2>
        </div>
      </div>
      <div className="row mt-3 text-center">
        <div className="col-md-4 mb-4">
          <img
            src="/assets/sambridh.jpeg"
            alt="Team Member"
            style={teamStyle}
          />
          <h4 className="mt-2">Sambridh</h4>
          <p>CEO</p>
        </div>
        <div className="col-md-4 mb-4">
          <img
            src="/assets/siddhart.jpeg"
            alt="Team Member"
            style={teamStyle}
          />
          <h4 className="mt-2"> Siddhart</h4>
          <p>CTO</p>
        </div>
        <div className="col-md-4 mb-4">
          <img src="/assets/abhi.jpeg" alt="Team Member" style={teamStyle} />
          <h4 className="mt-2">Abhi</h4>
          <p>CFO</p>
        </div>
        <div className="col-md-4 mb-4">
          <img src="/assets/Luja.jpeg" alt="Team Member" style={teamStyle} />
          <h4 className="mt-2"> Luja</h4>
          <p>COO</p>
        </div>
        <div className="col-md-4 mb-4">
          <img src="/assets/prabek.jpeg" alt="Team Member" style={teamStyle} />
          <h4 className="mt-2">Prabek</h4>
          <p>Marketing Head</p>
        </div>
        <div className="col-md-4 mb-4">
          <img src="/assets/sajana.jpeg" alt="Team Member" style={teamStyle} />
          <h4 className="mt-2">Sajana</h4>
          <p>Marketing Head</p>
        </div>
      </div>
    </div>
  </div>
);

export default MainContent;
