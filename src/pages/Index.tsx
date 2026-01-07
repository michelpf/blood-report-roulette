import { useState } from "react";

const Index = () => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [userKey, setUserKey] = useState("");
  const [confirmKey, setConfirmKey] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStep1 = () => {
    if (!userId) {
      setError("Error Code: USR_001 - Field cannot be empty");
      return;
    }
    if (userId.length < 8) {
      setError("Error Code: USR_002 - Invalid format");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleStep2 = () => {
    if (!userKey) {
      setError("Error Code: KEY_001 - Field cannot be empty");
      return;
    }
    if (userKey !== confirmKey) {
      setError("Error Code: KEY_003 - Values do not match");
      return;
    }
    setError("");
    setStep(3);
  };

  const handleStep3 = () => {
    if (!acceptTerms) {
      setError("Error Code: TRM_001 - Required field");
      return;
    }
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Top info bar */}
      <div className="info-bar px-2 py-1 flex justify-between">
        <span>Session: {Math.random().toString(36).substring(7).toUpperCase()}</span>
        <span>Server Time: {new Date().toISOString()}</span>
        <span>Module: BTSV2.4.1-PROD</span>
      </div>

      {/* Header */}
      <div className="bg-[#336699] text-white px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">■</span>
          <span className="text-sm font-bold">BLOOD TEST SEARCH SYSTEM</span>
          <span className="text-xs ml-4">v2.4.1</span>
        </div>
      </div>

      {/* Navigation breadcrumb - confusing */}
      <div className="bg-[#eee] border-b border-[#ccc] px-4 py-1 text-xs">
        <span className="text-[#666]">
          Home &gt; Services &gt; Lab &gt; Search &gt; Authentication &gt; Step {step} of 4
        </span>
      </div>

      {/* Unnecessary tabs */}
      <div className="flex border-b border-[#999] bg-[#ddd]">
        <div className="px-4 py-1 text-xs border-r border-[#999] bg-[#f5f5f5] border-b-0">
          Standard Search
        </div>
        <div className="px-4 py-1 text-xs border-r border-[#999] text-[#666]">
          Advanced Search
        </div>
        <div className="px-4 py-1 text-xs border-r border-[#999] text-[#666]">
          Batch Search
        </div>
        <div className="px-4 py-1 text-xs text-[#666]">
          Admin
        </div>
      </div>

      <div className="p-4">
        {/* Warning that's always there */}
        <div className="warning-box p-2 mb-4">
          <strong>NOTICE:</strong> System maintenance scheduled for 02/30/2024 00:00-00:00 UTC. 
          Please save your work frequently. For assistance contact ext. 4521 (Mon-Thu 9am-11am only).
        </div>

        <div className="flex gap-4">
          {/* Left sidebar - useless */}
          <div className="w-48 shrink-0">
            <div className="form-section p-2 mb-2">
              <div className="text-xs font-bold mb-2 border-b border-[#999] pb-1">Quick Links</div>
              <ul className="text-xs space-y-1">
                <li><a href="#" className="text-[#336699] underline">FAQ (PDF, 47 pages)</a></li>
                <li><a href="#" className="text-[#336699] underline">User Manual v1.2</a></li>
                <li><a href="#" className="text-[#336699] underline">Contact Form</a></li>
                <li><a href="#" className="text-[#336699] underline">System Status</a></li>
                <li><a href="#" className="text-[#999]">Deprecated: Old Portal</a></li>
              </ul>
            </div>
            <div className="form-section p-2">
              <div className="text-xs font-bold mb-2 border-b border-[#999] pb-1">System Info</div>
              <div className="text-[10px] text-[#666] space-y-1">
                <p>Browser: Compatible</p>
                <p>Cookies: Enabled</p>
                <p>JavaScript: Yes</p>
                <p>Last Login: Never</p>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="form-section p-4">
              <div className="text-sm font-bold mb-4 border-b border-[#999] pb-2">
                Authentication Process - Step {step} of 4
              </div>

              {error && (
                <div className="bg-[#ffeeee] border border-[#cc0000] p-2 mb-4">
                  <span className="error-text">{error}</span>
                  <span className="text-[9px] text-[#666] ml-2">
                    (Ref: {Date.now()})
                  </span>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-8">
                  <div className="text-sm text-[#666]">Processing request...</div>
                  <div className="text-xs text-[#999] mt-2">Please do not close this window or press the back button.</div>
                  <div className="text-xs text-[#999] mt-1">This may take up to 5 minutes.</div>
                </div>
              )}

              {!isLoading && step === 1 && (
                <div>
                  <p className="text-xs text-[#666] mb-4">
                    Please enter your User Identification Number (UID) to proceed with the authentication process. 
                    Your UID was provided in your registration confirmation letter (Form BT-442A).
                  </p>

                  <div className="mb-4">
                    <label className="field-label block mb-1">
                      User Identification Number (UID) <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="system-input w-64"
                      maxLength={20}
                    />
                    <div className="help-text mt-1">
                      Format: 8-20 alphanumeric characters. Case-sensitive.
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button className="system-button" disabled>
                      &lt; Previous
                    </button>
                    <button className="system-button" onClick={handleStep1}>
                      Continue &gt;
                    </button>
                    <button className="system-button ml-auto" onClick={() => setUserId("")}>
                      Clear Form
                    </button>
                  </div>
                </div>
              )}

              {!isLoading && step === 2 && (
                <div>
                  <p className="text-xs text-[#666] mb-4">
                    Enter your Access Key and confirm it in the second field. 
                    Access Key was sent separately via postal mail.
                  </p>

                  <div className="mb-4">
                    <label className="field-label block mb-1">
                      Access Key <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="password"
                      value={userKey}
                      onChange={(e) => setUserKey(e.target.value)}
                      className="system-input w-64"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="field-label block mb-1">
                      Confirm Access Key <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="password"
                      value={confirmKey}
                      onChange={(e) => setConfirmKey(e.target.value)}
                      className="system-input w-64"
                    />
                    <div className="help-text mt-1">
                      Re-enter your Access Key exactly as shown on your letter.
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button className="system-button" onClick={() => setStep(1)}>
                      &lt; Previous
                    </button>
                    <button className="system-button" onClick={handleStep2}>
                      Continue &gt;
                    </button>
                    <button className="system-button ml-auto" onClick={() => { setUserKey(""); setConfirmKey(""); }}>
                      Clear Form
                    </button>
                  </div>
                </div>
              )}

              {!isLoading && step === 3 && (
                <div>
                  <p className="text-xs text-[#666] mb-4">
                    Please review and accept the Terms and Conditions before proceeding.
                  </p>

                  <div className="bg-white border border-[#999] p-2 h-32 overflow-y-scroll text-[10px] text-[#666] mb-4">
                    <p className="mb-2"><strong>TERMS AND CONDITIONS OF USE</strong></p>
                    <p className="mb-2">1. DEFINITIONS. "System" refers to the Blood Test Search System v2.4.1 and all associated subsystems, modules, and interfaces. "User" refers to any individual or entity accessing the System. "Data" refers to any information retrieved, stored, or processed by the System.</p>
                    <p className="mb-2">2. ACCEPTANCE. By clicking "I Accept" below, User agrees to be bound by these Terms and Conditions, the Privacy Policy (Form PP-2019-A), the Data Use Agreement (Form DUA-442), and all applicable federal, state, and local regulations pertaining to the handling of medical information.</p>
                    <p className="mb-2">3. AUTHORIZED USE. User agrees to use the System only for its intended purpose. Unauthorized access attempts will be logged and reported to the appropriate authorities. Session timeout occurs after 2 minutes of inactivity.</p>
                    <p className="mb-2">4. LIABILITY. The System provider assumes no liability for any damages arising from the use or inability to use the System, including but not limited to lost data, system downtime, or inaccurate results...</p>
                    <p>[Content continues for 47 more pages]</p>
                  </div>

                  <div className="mb-4">
                    <label className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="mt-1"
                      />
                      <span className="text-xs text-[#666]">
                        I have read, understood, and agree to the Terms and Conditions, Privacy Policy, 
                        Data Use Agreement, and all applicable regulations. <span className="required-asterisk">*</span>
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button className="system-button" onClick={() => setStep(2)}>
                      &lt; Previous
                    </button>
                    <button className="system-button" onClick={handleStep3}>
                      Submit &gt;
                    </button>
                  </div>
                </div>
              )}

              {!isLoading && step === 4 && (
                <div>
                  <div className="bg-[#eeffee] border border-[#009900] p-3 mb-4">
                    <span className="text-xs text-[#006600]">
                      Authentication successful. Reference: AUTH-{Date.now()}
                    </span>
                  </div>

                  <p className="text-xs text-[#666] mb-4">
                    Your blood test results are available for download. Please note that downloaded 
                    files are encrypted and require Adobe Reader 9.0 or higher.
                  </p>

                  <div className="border border-[#999] bg-white p-3 mb-4">
                    <table className="w-full text-xs">
                      <tbody>
                        <tr className="border-b border-[#eee]">
                          <td className="py-1 text-[#666]">Patient ID:</td>
                          <td className="py-1">{userId}</td>
                        </tr>
                        <tr className="border-b border-[#eee]">
                          <td className="py-1 text-[#666]">Test Date:</td>
                          <td className="py-1">{new Date(Date.now() - 86400000 * 14).toLocaleDateString()}</td>
                        </tr>
                        <tr className="border-b border-[#eee]">
                          <td className="py-1 text-[#666]">Report Type:</td>
                          <td className="py-1">Complete Blood Count (CBC)</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-[#666]">File Size:</td>
                          <td className="py-1">2.4 MB (PDF)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      href="#"
                      className="system-button inline-block text-center"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Download will begin shortly. Please check your downloads folder. If download does not start, please disable your popup blocker and try again.");
                      }}
                    >
                      Download Report (PDF)
                    </a>
                    <span className="text-[9px] text-[#999]">
                      Right-click and select "Save As" if download doesn't start automatically
                    </span>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#ccc]">
                    <button
                      className="system-button"
                      onClick={() => {
                        setStep(1);
                        setUserId("");
                        setUserKey("");
                        setConfirmKey("");
                        setAcceptTerms(false);
                      }}
                    >
                      Start New Search
                    </button>
                  </div>
                </div>
              )}

              {/* Form footer - confusing */}
              <div className="mt-6 pt-4 border-t border-[#ccc] text-[9px] text-[#999]">
                <span className="required-asterisk">*</span> Required fields. 
                All fields are case-sensitive. 
                Session expires in 2 minutes. 
                Form ID: BT-AUTH-{step}-2024
              </div>
            </div>
          </div>

          {/* Right sidebar - also useless */}
          <div className="w-40 shrink-0">
            <div className="form-section p-2 mb-2">
              <div className="text-xs font-bold mb-2 border-b border-[#999] pb-1">Need Help?</div>
              <div className="text-[10px] text-[#666] space-y-2">
                <p>Call: 1-800-555-0199</p>
                <p className="text-[9px]">(Mon-Thu 9am-11am EST)</p>
                <p>Fax: 1-800-555-0198</p>
                <p>Email: support@bloodtest-legacy-system.gov</p>
                <p className="text-[9px]">(Response time: 5-7 business days)</p>
              </div>
            </div>
            <div className="form-section p-2">
              <div className="text-xs font-bold mb-2 border-b border-[#999] pb-1">Tips</div>
              <ul className="text-[10px] text-[#666] space-y-1 list-disc pl-3">
                <li>Use Internet Explorer 8+</li>
                <li>Enable cookies</li>
                <li>Disable popup blocker</li>
                <li>Print Form BT-442A</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#336699] text-white text-[10px] px-4 py-2 mt-8">
        <div className="flex justify-between">
          <span>© 2024 Department of Health Services. All rights reserved.</span>
          <span>Privacy Policy | Terms of Use | Accessibility | Sitemap</span>
        </div>
      </div>

      <div className="bg-[#eee] text-[9px] text-[#666] px-4 py-1 border-t border-[#ccc]">
        System Version 2.4.1 Build 4421 | Database: PROD-EAST-2 | Load: 47% | Last Updated: 01/15/2019
      </div>
    </div>
  );
};

export default Index;
