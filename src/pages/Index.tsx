import { useState } from "react";

const Index = () => {
  const [userId, setUserId] = useState("");
  const [userKey, setUserKey] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (userId && userKey) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("ERROR!!!! FILL ALL FIELDS!!!!");
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen p-4" style={{ background: "linear-gradient(135deg, #ff00ff, #00ff00, #ffff00, #ff0000)" }}>
        <div className="marquee" style={{ background: "#ff0000", color: "#00ff00", fontSize: "28px", padding: "10px", overflow: "hidden", whiteSpace: "nowrap" }}>
          ⚠️⚠️⚠️ BLOOD TEST RESULTS READY ⚠️⚠️⚠️ DOWNLOAD NOW ⚠️⚠️⚠️ VERY IMPORTANT ⚠️⚠️⚠️
        </div>

        <div className="flex flex-col items-center mt-8">
          <h1 
            className="text-6xl font-bold rainbow-text mb-4"
            style={{ textShadow: "3px 3px #000, -3px -3px #fff, 5px 0 #ff0000" }}
          >
            ✅ LOGIN SUCCESSFUL ✅
          </h1>

          <div 
            className="horrible-border p-8 mt-8"
            style={{ 
              background: "linear-gradient(to bottom, #ffff00, #ff00ff)",
              transform: "rotate(-2deg)",
              width: "80%",
              maxWidth: "600px"
            }}
          >
            <h2 className="text-4xl blink" style={{ color: "#ff0000", textAlign: "center" }}>
              🩸 YOUR BLOOD TEST RESULTS 🩸
            </h2>

            <div className="mt-8 p-4" style={{ background: "#00ff00", border: "5px dotted #0000ff" }}>
              <p style={{ fontSize: "18px", color: "#ff0000" }}>
                <strong>User ID:</strong> {userId}
              </p>
              <p style={{ fontSize: "18px", color: "#0000ff" }}>
                <strong>Date:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <a 
                href="#"
                className="horrible-button shake"
                style={{ 
                  display: "inline-block",
                  textDecoration: "none",
                  color: "#ffff00",
                  fontSize: "28px"
                }}
                onClick={(e) => {
                  e.preventDefault();
                  alert("DOWNLOADING PDF... PLEASE WAIT 47 HOURS!!!");
                }}
              >
                📥 CLICK HERE TO DOWNLOAD PDF 📥
              </a>
            </div>

            <div className="mt-8" style={{ background: "#ff0000", padding: "10px" }}>
              <p className="blink" style={{ color: "#ffff00", fontSize: "20px", textAlign: "center" }}>
                ⚠️ WARNING: DO NOT SHARE YOUR RESULTS ⚠️
              </p>
            </div>

            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Dancing_baby.gif/220px-Dancing_baby.gif"
              alt="Dancing baby"
              style={{ 
                display: "block",
                margin: "20px auto",
                border: "5px solid #ff00ff"
              }}
            />

            <button
              onClick={() => setIsLoggedIn(false)}
              className="horrible-button mt-4"
              style={{ 
                display: "block",
                margin: "0 auto",
                background: "#ff0000",
                color: "#00ff00"
              }}
            >
              🚪 LOGOUT 🚪
            </button>
          </div>

          <div className="mt-8 p-4" style={{ background: "#0000ff", color: "#ffff00" }}>
            <p style={{ fontSize: "14px" }}>
              © 2003 BloodTest Systems Inc. - Best viewed in Internet Explorer 6.0 - 800x600 resolution
            </p>
            <p className="blink" style={{ fontSize: "12px", color: "#ff0000" }}>
              🔊 TURN ON YOUR SPEAKERS FOR BEST EXPERIENCE 🔊
            </p>
          </div>
        </div>

        <div 
          style={{ 
            position: "fixed",
            bottom: "10px",
            right: "10px",
            background: "#ffff00",
            padding: "10px",
            border: "3px solid #ff0000",
            transform: "rotate(5deg)"
          }}
        >
          <p style={{ color: "#ff0000", fontSize: "12px" }}>
            👁️ VISITOR COUNT: 000000042
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4" style={{ background: "linear-gradient(135deg, #00ff00, #ff00ff, #ffff00)" }}>
      <div className="marquee" style={{ background: "#0000ff", color: "#ffff00", fontSize: "24px", padding: "10px", overflow: "hidden", whiteSpace: "nowrap" }}>
        🏥🏥🏥 WELCOME TO BLOOD TEST SEARCH SYSTEM 🏥🏥🏥 ENTER YOUR CREDENTIALS 🏥🏥🏥 100% SECURE 🏥🏥🏥
      </div>

      <div className="flex flex-col items-center mt-8">
        <h1 
          className="text-5xl font-bold rainbow-text"
          style={{ textShadow: "4px 4px #000000" }}
        >
          🩸 BLOOD TEST SEARCH SYSTEM 🩸
        </h1>

        <img 
          src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
          alt="Blood drop"
          className="shake mt-4"
          style={{ width: "100px", height: "100px" }}
        />

        <div 
          className="horrible-border p-8 mt-8"
          style={{ 
            background: "linear-gradient(to bottom, #ff00ff, #00ffff)",
            transform: "rotate(2deg)",
            width: "90%",
            maxWidth: "500px"
          }}
        >
          <h2 className="text-3xl blink" style={{ color: "#ff0000", textAlign: "center", marginBottom: "20px" }}>
            ⚠️ LOGIN REQUIRED ⚠️
          </h2>

          {error && (
            <div 
              className="shake p-4 mb-4"
              style={{ 
                background: "#ff0000",
                color: "#ffff00",
                fontSize: "24px",
                textAlign: "center",
                border: "5px dashed #00ff00"
              }}
            >
              {error}
            </div>
          )}

          <div className="mb-6">
            <label 
              style={{ 
                display: "block",
                color: "#0000ff",
                fontSize: "22px",
                marginBottom: "5px",
                textShadow: "2px 2px #ffff00"
              }}
            >
              👤 USER ID:
            </label>
            <input 
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="horrible-input w-full"
              placeholder="ENTER YOUR ID HERE!!!"
            />
          </div>

          <div className="mb-6">
            <label 
              style={{ 
                display: "block",
                color: "#ff0000",
                fontSize: "22px",
                marginBottom: "5px",
                textShadow: "2px 2px #00ff00"
              }}
            >
              🔑 SECRET KEY:
            </label>
            <input 
              type="password"
              value={userKey}
              onChange={(e) => setUserKey(e.target.value)}
              className="horrible-input w-full"
              placeholder="ENTER YOUR SECRET KEY!!!"
            />
          </div>

          <div className="flex justify-center">
            <button 
              onClick={handleLogin}
              className="horrible-button shake"
            >
              🔓 CLICK TO LOGIN 🔓
            </button>
          </div>

          <div className="mt-6" style={{ textAlign: "center" }}>
            <p style={{ color: "#0000ff", fontSize: "16px" }}>
              ❓ Forgot your key? Too bad! ❓
            </p>
          </div>
        </div>

        <div 
          className="mt-8 p-4"
          style={{ 
            background: "#ffff00",
            border: "4px solid #ff00ff",
            transform: "rotate(-1deg)"
          }}
        >
          <p className="blink" style={{ color: "#ff0000", fontSize: "18px" }}>
            🔒 THIS SYSTEM IS 100% SECURE TRUST US 🔒
          </p>
        </div>

        <table 
          className="mt-8"
          style={{ 
            border: "5px solid #ff00ff",
            background: "#00ff00"
          }}
        >
          <tbody>
            <tr>
              <td style={{ padding: "10px", border: "2px solid #ff0000", background: "#ffff00" }}>
              <span className="blink">🏆 AWARD WINNING</span>
              </td>
              <td style={{ padding: "10px", border: "2px solid #0000ff", background: "#ff00ff" }}>
                <span style={{ color: "#00ff00" }}>✓ HIPAA COMPLIANT*</span>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "2px solid #00ff00", background: "#0000ff" }}>
                <span style={{ color: "#ffff00" }}>🌐 WORKS ON NETSCAPE</span>
              </td>
              <td style={{ padding: "10px", border: "2px solid #ffff00", background: "#ff0000" }}>
                <span style={{ color: "#00ff00" }}>📧 EMAIL US: blood@test.com</span>
              </td>
            </tr>
          </tbody>
        </table>

        <p style={{ fontSize: "10px", color: "#ff0000", marginTop: "20px" }}>
          *not actually HIPAA compliant
        </p>

        <div 
          style={{ 
            position: "fixed",
            bottom: "10px",
            left: "10px",
            background: "#ff0000",
            padding: "5px",
            border: "2px solid #00ff00"
          }}
        >
          <p className="rainbow-text" style={{ fontSize: "10px" }}>
            🕐 Page loaded in 47 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
