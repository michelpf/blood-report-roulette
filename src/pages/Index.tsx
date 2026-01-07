import { useState, useRef, useEffect } from "react";

const VALID_IDS = ["12345678", "PATIENT01", "TEST2024", "SKEANURE"];

const Index = () => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [userKey, setUserKey] = useState("");
  const [confirmKey, setConfirmKey] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [loadingPage, setLoadingPage] = useState(0);
  const PAGES_TO_LOAD = 500;
  const [submitClicks, setSubmitClicks] = useState(0);

  // While isLoading is true, animate loadingPage from 1..PAGES_TO_LOAD over the same duration as the loader
  useEffect(() => {
    if (!isLoading) {
      setLoadingPage(0);
      return;
    }

    const duration = 6000; // matches handleStep3 timeout
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(1, elapsed / duration);
      const page = Math.min(PAGES_TO_LOAD, Math.max(1, Math.ceil(pct * PAGES_TO_LOAD)));
      setLoadingPage(page);
      if (elapsed >= duration) {
        // ensure final state
        setLoadingPage(PAGES_TO_LOAD);
        return true;
      }
      return false;
    };

    // Run at ~60fps
    let rafId: number | null = null;
    const frame = () => {
      if (!tick()) {
        rafId = requestAnimationFrame(frame);
      }
    };
    frame();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isLoading]);

  const handleStep1 = () => {
    if (!userId) {
      setError("Error Code: USR_001 - Field cannot be empty");
      return;
    }
    if (userId.length < 8) {
      setError("Error Code: USR_002 - Invalid format (minimum 8 characters)");
      return;
    }
    if (!VALID_IDS.includes(userId.toUpperCase())) {
      setError("Error Code: USR_003 - User ID not found in database");
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
    // Require the user to click Submit 4 times before proceeding
    const next = submitClicks + 1;
    setSubmitClicks(next);
    if (next < 4) {
      // show English message until user reaches 4 clicks
      setError("The exam is not ready yet. Please try again.");
      return;
    }

    // On the 4th click proceed
    setError("");
    setSubmitClicks(0);
    setIsLoading(true);
    // progress animation runs for 6000ms; keep loader visible 2s more before showing report
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 8000);
  };

  const generateDotMatrixResults = () => {
    const testDate = new Date(Date.now() - 86400000 * 14);
    const patientAge = 42;

    return (
      <div className="dot-matrix paper-feed p-6 text-xs overflow-auto max-h-[600px] border border-[#999]" ref={resultsRef}>
        {/* Header */}
        <pre className="whitespace-pre-wrap">
          {`================================================================================
                    CENTRAL LABORATORY DIAGNOSTIC SERVICES
                      AUTOMATED BLOOD ANALYSIS REPORT
                              CONFIDENTIAL
================================================================================

DOCUMENT ID: RPT-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}
PRINT DATE: ${new Date().toLocaleString()}
PRINTER: DOT-MATRIX-STATION-14 (INK LEVEL: 23%)
PAPER: CONTINUOUS FEED #442-A (REMAINING: 847 SHEETS)

--------------------------------------------------------------------------------
                              PATIENT INFORMATION
--------------------------------------------------------------------------------

PATIENT ID............: ${userId.toUpperCase()}
PATIENT NAME..........: JOHN SMITH
DATE OF BIRTH.........: 03/11/1962
GENDER................: MALE
BLOOD TYPE............: O+ (CONFIRMED VIA TEST #BT-7721)
COLLECTION DATE.......: ${testDate.toLocaleDateString()} ${testDate.toLocaleTimeString()}
COLLECTION SITE.......: LEFT ARM, ANTECUBITAL FOSSA
PHLEBOTOMIST..........: J. MARTINEZ (ID: PHB-4421)
TUBE TYPE.............: PURPLE TOP (EDTA), RED TOP (NO ADDITIVE)
SPECIMEN CONDITION....: ACCEPTABLE
FASTING STATUS........: YES (12 HOURS REPORTED)
PROCESSING LAB........: CENTRAL LAB - BUILDING C, FLOOR 2
ANALYZER USED.........: BECKMAN-COULTER DXH-9000 (SERIAL: BC-2019-4421)
CALIBRATION DATE......: ${new Date(Date.now() - 86400000 * 3).toLocaleDateString()}
QC STATUS.............: PASSED (LOT: QC-2024-0142)

================================================================================
                           PAGE ${currentPage} OF 512
================================================================================

`}
        </pre>



        <div className="perforation"></div>

        <pre className="whitespace-pre-wrap">
          {`================================================================================
                    COMPLETE BLOOD COUNT (CBC) WITH DIFFERENTIAL
================================================================================

TEST                    RESULT      UNITS       REFERENCE RANGE     FLAG
--------------------------------------------------------------------------------`}
        </pre>

        <pre className="whitespace-pre-wrap abnormal-high">
          {`IRON, SERUM             287         ug/dL       60-170              **HIGH**`}
        </pre>
        <pre className="whitespace-pre-wrap abnormal-high">
          {`FERRITIN                892         ng/mL       20-250              **HIGH**`}
        </pre>
        <pre className="whitespace-pre-wrap abnormal-high">
          {`TRANSFERRIN SATURATION  68          %           20-50               **HIGH**`}
        </pre>
        <pre className="whitespace-pre-wrap">
          {`TIBC                    245         ug/dL       250-400             NORMAL
HEMOGLOBIN              14.2        g/dL        13.5-17.5           NORMAL
HEMATOCRIT              42.1        %           38.8-50.0           NORMAL
RBC COUNT               4.82        M/uL        4.35-5.65           NORMAL
MCV                     87.3        fL          80.0-100.0          NORMAL
MCH                     29.5        pg          27.0-33.0           NORMAL
MCHC                    33.7        g/dL        32.0-36.0           NORMAL
RDW                     13.2        %           11.5-14.5           NORMAL
WBC COUNT               7.2         K/uL        4.5-11.0            NORMAL
NEUTROPHILS             58          %           40-70               NORMAL
LYMPHOCYTES             32          %           20-40               NORMAL
MONOCYTES               6           %           2-8                 NORMAL
EOSINOPHILS             3           %           1-4                 NORMAL
BASOPHILS               1           %           0-1                 NORMAL
PLATELET COUNT          245         K/uL        150-400             NORMAL
MPV                     9.8         fL          7.5-11.5            NORMAL`}
        </pre>

        <div className="perforation"></div>

        <pre className="whitespace-pre-wrap">
          {`================================================================================
                    REFERENCE RANGES BY AGE GROUP - IRON STUDIES
================================================================================

AGE GROUP               IRON (ug/dL)    FERRITIN (ng/mL)    TIBC (ug/dL)
--------------------------------------------------------------------------------
NEWBORN (0-1 MO)        100-250         25-200              100-400
INFANT (1-12 MO)        40-100          50-200              100-400
CHILD (1-12 YRS)        50-120          7-140               250-400
ADOLESCENT (13-18 YRS)  50-160          12-150              250-400
ADULT MALE (19-64 YRS)  60-170          20-250              250-400 
ADULT FEMALE (19-64 YRS)50-150          10-150              250-400
ELDERLY (65+ YRS)       40-150          15-200              200-370

--------------------------------------------------------------------------------
                    CLINICAL NOTES - IRON OVERLOAD INDICATORS
--------------------------------------------------------------------------------

*** ATTENTION REVIEWING PHYSICIAN ***

PATIENT SHOWS ELEVATED IRON MARKERS (** HEAVY METAL **) CONSISTENT WITH POSSIBLE:
- HEMOCHROMATOSIS (HEREDITARY OR ACQUIRED)
- CHRONIC LIVER DISEASE
- MULTIPLE BLOOD TRANSFUSIONS
- EXCESSIVE IRON SUPPLEMENTATION
- HEMOLYTIC ANEMIA

RECOMMEND:
1. HFE GENE TESTING (C282Y, H63D MUTATIONS)
2. LIVER FUNCTION PANEL IF NOT ALREADY PERFORMED
3. CONSIDER HEPATIC IRON CONCENTRATION (MRI)
4. DIETARY CONSULTATION FOR IRON INTAKE REDUCTION
5. FOLLOW-UP IN 4-6 WEEKS WITH REPEAT IRON STUDIES

REFERENCE: AASLD PRACTICE GUIDELINES 2019, SECTION 4.2.1
SEE ATTACHED: FORM HEM-442 (HEMOCHROMATOSIS SCREENING PROTOCOL)

`}
        </pre>

        <div className="perforation"></div>

        <pre className="whitespace-pre-wrap">
          {`================================================================================
                         COMPREHENSIVE METABOLIC PANEL
================================================================================

TEST                    RESULT      UNITS       REFERENCE RANGE     FLAG
--------------------------------------------------------------------------------
GLUCOSE, FASTING        98          mg/dL       70-100              NORMAL
BUN                     18          mg/dL       7-20                NORMAL
CREATININE              1.1         mg/dL       0.7-1.3             NORMAL
eGFR                    82          mL/min      >60                 NORMAL
SODIUM                  141         mEq/L       136-145             NORMAL
POTASSIUM               4.2         mEq/L       3.5-5.0             NORMAL
CHLORIDE                102         mEq/L       98-106              NORMAL
CO2                     24          mEq/L       23-29               NORMAL
CALCIUM                 9.4         mg/dL       8.5-10.5            NORMAL`}
        </pre>
        <pre className="whitespace-pre-wrap abnormal-high">
          {`AST (SGOT)              52          U/L         10-40               **HIGH**
ALT (SGPT)              67          U/L         7-56                **HIGH**`}
        </pre>
        <pre className="whitespace-pre-wrap">
          {`ALKALINE PHOSPHATASE    78          U/L         44-147              NORMAL
BILIRUBIN, TOTAL        0.9         mg/dL       0.1-1.2             NORMAL
PROTEIN, TOTAL          7.2         g/dL        6.0-8.3             NORMAL
ALBUMIN                 4.1         g/dL        3.4-5.4             NORMAL
GLOBULIN                3.1         g/dL        2.0-3.5             NORMAL

--------------------------------------------------------------------------------
                    NOTE: ELEVATED LIVER ENZYMES
--------------------------------------------------------------------------------

ELEVATED AST/ALT MAY BE ASSOCIATED WITH (** HIGH BAND **):
- IRON OVERLOAD (SEE ABOVE - CORRELATION SUSPECTED)
- HEPATOCELLULAR INJURY
- NON-ALCOHOLIC FATTY LIVER DISEASE (NAFLD)
- MEDICATION EFFECTS

RECOMMEND HEPATOLOGY CONSULTATION IF VALUES PERSIST.
REFERENCE: ACG CLINICAL GUIDELINE 2017, TABLE 3

`}
        </pre>

        <div className="perforation"></div>



        <pre className="whitespace-pre-wrap">
          {`================================================================================
        AMBULONECROENCEPHALOPATHY PANEL
================================================================================

TEST                     RESULT      UNITS       REFERENCE RANGE     FLAG
--------------------------------------------------------------------------------`}
        </pre>
        <pre className="whitespace-pre-wrap abnormal-high">
          {`AMBULONECROENCEPHALOPATHY  POSITIVE    N/A         NEGATIVE            **ABNORMAL**`}
        </pre>


        <pre className="whitespace-pre-wrap">{`
CLINICAL INTERPRETATION:
  The result is reported as POSITIVE for ambulonecroencephalopathosis markers. Correlate with clinical findings and consider urgent neurology referral for further evaluation and confirmatory testing.

`}
        </pre>

        <div className="perforation"></div>

        <pre className="whitespace-pre-wrap">
          {`================================================================================
                              LIPID PANEL
================================================================================

TEST                    RESULT      UNITS       REFERENCE RANGE     FLAG
--------------------------------------------------------------------------------
CHOLESTEROL, TOTAL      198         mg/dL       <200                NORMAL
TRIGLYCERIDES           145         mg/dL       <150                NORMAL
HDL CHOLESTEROL         52          mg/dL       >40                 NORMAL
LDL CHOLESTEROL (CALC)  117         mg/dL       <100                BORDERLINE
VLDL CHOLESTEROL        29          mg/dL       5-40                NORMAL
CHOLESTEROL/HDL RATIO   3.8                     <5.0                NORMAL

--------------------------------------------------------------------------------
                    CARDIOVASCULAR RISK ASSESSMENT
--------------------------------------------------------------------------------

10-YEAR ASCVD RISK SCORE: 4.2% (LOW RISK)
FRAMINGHAM RISK SCORE: 6% (LOW RISK)
REYNOLDS RISK SCORE: 5.1% (LOW RISK)

RISK FACTORS IDENTIFIED:
[X] AGE > 40 YEARS
[ ] DIABETES MELLITUS
[ ] HYPERTENSION
[ ] SMOKING HISTORY
[ ] FAMILY HISTORY OF PREMATURE CVD

RECOMMENDATION: MAINTAIN HEALTHY LIFESTYLE. RECHECK LIPIDS IN 5 YEARS.
REFERENCE: ACC/AHA GUIDELINES 2019

`}
        </pre>

        <div className="perforation"></div>

        <pre className="whitespace-pre-wrap">
          {`================================================================================
                         THYROID FUNCTION PANEL
================================================================================

TEST                    RESULT      UNITS       REFERENCE RANGE     FLAG
--------------------------------------------------------------------------------
TSH                     2.45        mIU/L       0.45-4.50           NORMAL
FREE T4                 1.2         ng/dL       0.8-1.8             NORMAL
FREE T3                 3.1         pg/mL       2.3-4.2             NORMAL
T3 UPTAKE               32          %           24-39               NORMAL
THYROGLOBULIN AB        <1.0        IU/mL       <4.0                NORMAL
TPO ANTIBODY            12          IU/mL       <35                 NORMAL

INTERPRETATION: EUTHYROID. NO THYROID DYSFUNCTION DETECTED.

`}
        </pre>

        <div className="perforation"></div>

        <pre className="whitespace-pre-wrap">
          {`================================================================================
                    VITAMIN AND MINERAL PANEL
================================================================================

TEST                    RESULT      UNITS       REFERENCE RANGE     FLAG
--------------------------------------------------------------------------------
VITAMIN D, 25-OH        32          ng/mL       30-100              NORMAL
VITAMIN B12             445         pg/mL       200-900             NORMAL
FOLATE, SERUM           12.5        ng/mL       >3.0                NORMAL
MAGNESIUM               2.0         mg/dL       1.7-2.2             NORMAL
PHOSPHORUS              3.5         mg/dL       2.5-4.5             NORMAL
ZINC                    85          ug/dL       60-120              NORMAL`}
        </pre>
        <pre className="whitespace-pre-wrap abnormal-high">
          {`COPPER                  165         ug/dL       70-140              **HIGH**`}
        </pre>

        <pre className="whitespace-pre-wrap">
          {`
--------------------------------------------------------------------------------
                    NOTE: ELEVATED COPPER LEVELS
--------------------------------------------------------------------------------

ELEVATED COPPER MAY BE SEEN IN:
- WILSON'S DISEASE (PARADOXICALLY LOW IN SOME CASES)
- INFLAMMATION/INFECTION (ACUTE PHASE REACTANT)
- ESTROGEN THERAPY
- PREGNANCY
- HEPATOBILIARY DISEASE

CONSIDER: 24-HOUR URINE COPPER, CERULOPLASMIN IF CLINICALLY INDICATED

`}
        </pre>

        <div className="perforation"></div>

        <pre className="whitespace-pre-wrap">
          {`================================================================================
                    URINALYSIS (PERFORMED CONCURRENTLY)
================================================================================

PHYSICAL EXAMINATION:
  COLOR................: YELLOW
  APPEARANCE...........: CLEAR
  SPECIFIC GRAVITY.....: 1.020 (REF: 1.005-1.030)

CHEMICAL EXAMINATION:
  pH...................: 6.0 (REF: 4.5-8.0)
  PROTEIN..............: NEGATIVE
  GLUCOSE..............: NEGATIVE
  KETONES..............: NEGATIVE
  BLOOD................: NEGATIVE
  BILIRUBIN............: NEGATIVE
  UROBILINOGEN.........: NORMAL
  NITRITE..............: NEGATIVE
  LEUKOCYTE ESTERASE...: NEGATIVE

MICROSCOPIC EXAMINATION:
  RBC..................: 0-2 /HPF (REF: 0-2)
  WBC..................: 0-2 /HPF (REF: 0-5)
  BACTERIA.............: NONE SEEN
  EPITHELIAL CELLS.....: FEW
  CASTS................: NONE SEEN
  CRYSTALS.............: NONE SEEN

INTERPRETATION: NORMAL URINALYSIS

`}
        </pre>

        <div className="perforation"></div>

        <pre className="whitespace-pre-wrap">
          {`================================================================================
                    ADDITIONAL STATISTICAL DATA
================================================================================

LABORATORY QUALITY METRICS FOR THIS SPECIMEN:
  HEMOLYSIS INDEX......: 0 (ACCEPTABLE <50)
  LIPEMIA INDEX........: 0 (ACCEPTABLE <100)
  ICTERUS INDEX........: 0 (ACCEPTABLE <20)
  PROCESSING TIME......: 2.4 HOURS (TARGET: <4 HOURS)
  REPEAT RATE..........: 0% (THIS SPECIMEN)

INSTRUMENT PERFORMANCE (LAST 24 HOURS):
  TESTS PERFORMED......: 14,421
  QC FAILURES..........: 0
  CRITICAL VALUES......: 12
  REPEAT ANALYSES......: 1.2%

LABORATORY ACCREDITATION:
  CAP NUMBER...........: 1234567-01
  CLIA NUMBER..........: 12D3456789
  STATE LICENSE........: LAB-2019-4421
  ISO 15189 STATUS.....: CERTIFIED (EXP: 12/2025)

`}
        </pre>

        <div className="perforation"></div>

        <pre className="whitespace-pre-wrap">
          {`================================================================================
                    HISTORICAL COMPARISON (IF AVAILABLE)
================================================================================

TEST                    CURRENT     PREVIOUS    PREVIOUS-2   TREND
                        ${testDate.toLocaleDateString().substring(0, 5)}       ${new Date(Date.now() - 86400000 * 180).toLocaleDateString().substring(0, 5)}       ${new Date(Date.now() - 86400000 * 365).toLocaleDateString().substring(0, 5)}
--------------------------------------------------------------------------------
IRON, SERUM             287 H       245 H       198          ↑↑ INCREASING
FERRITIN                892 H       654 H       312          ↑↑ INCREASING
HEMOGLOBIN              14.2        14.5        14.1         → STABLE
AST                     52 H        45 H        38           ↑ INCREASING
ALT                     67 H        51          42           ↑ INCREASING

TREND ANALYSIS: PROGRESSIVE IRON ACCUMULATION NOTED OVER 12 MONTHS
ACTION REQUIRED: SEE CLINICAL NOTES ABOVE

`}
        </pre>

        <div className="perforation"></div>

        <pre className="whitespace-pre-wrap">
          {`================================================================================
                    BILLING AND ADMINISTRATIVE INFORMATION
================================================================================

CPT CODES BILLED:
  85025 - CBC WITH DIFFERENTIAL.......................... $45.00
  80053 - COMPREHENSIVE METABOLIC PANEL.................. $65.00
  80061 - LIPID PANEL.................................... $55.00
  84443 - TSH............................................ $38.00
  84439 - FREE T4........................................ $42.00
  83540 - IRON, SERUM.................................... $28.00
  82728 - FERRITIN....................................... $35.00
  83550 - TIBC........................................... $32.00
  84466 - TRANSFERRIN.................................... $38.00
  82310 - CALCIUM........................................ $18.00
  84550 - URIC ACID...................................... $22.00
  81001 - URINALYSIS, AUTOMATED.......................... $15.00
  
SUBTOTAL.................................................. $433.00
PROCESSING FEE............................................ $12.50
SPECIMEN HANDLING......................................... $8.00
RUSH PROCESSING (IF APPLICABLE)........................... $0.00
--------------------------------------------------------------------------------
TOTAL CHARGES............................................. $453.50

INSURANCE: [SEE SEPARATE EOB - FORM INS-442]
PATIENT RESPONSIBILITY: [PENDING INSURANCE PROCESSING]

`}
        </pre>

        <div className="perforation"></div>

        <pre className="whitespace-pre-wrap">
          {`================================================================================
                         LEGAL DISCLAIMERS
================================================================================

THIS REPORT IS INTENDED FOR THE ORDERING PHYSICIAN AND PATIENT ONLY.
UNAUTHORIZED DISCLOSURE IS PROHIBITED UNDER HIPAA REGULATIONS
(45 CFR PARTS 160 AND 164).

RESULTS HAVE BEEN ELECTRONICALLY VERIFIED BY:
  MEDICAL TECHNOLOGIST: S. JOHNSON, MT(ASCP) - ID: MT-8821
  PATHOLOGIST REVIEW (ABNORMALS): R. CHEN, MD - ID: PATH-2201
  VERIFICATION DATE: ${new Date(Date.now() - 86400000 * 13).toLocaleDateString()} 14:32:01 EST

CRITICAL VALUE NOTIFICATION:
  NOT APPLICABLE FOR THIS SPECIMEN

AMENDED REPORT:
  NO AMENDMENTS

REFERENCE LABORATORY:
  NOT APPLICABLE - ALL TESTING PERFORMED IN-HOUSE

LIMITATIONS OF TESTING:
  - RESULTS SHOULD BE INTERPRETED IN CLINICAL CONTEXT
  - REFERENCE RANGES ARE POPULATION-BASED AND MAY VARY
  - SOME MEDICATIONS MAY INTERFERE WITH TEST RESULTS
  - HEMOLYSIS, LIPEMIA, OR ICTERUS MAY AFFECT ACCURACY

================================================================================
                              END OF REPORT
                           PAGE ${currentPage} OF 512
================================================================================

    FOR QUESTIONS REGARDING THIS REPORT, CONTACT:
    LABORATORY CUSTOMER SERVICE: 1-800-555-0199
    FAX: 1-800-555-0198
    EMAIL: LABRESULTS@HOSPITAL.GOV
    
    HOURS: MONDAY-THURSDAY 9:00 AM - 11:00 AM EST ONLY
    RESPONSE TIME: 5-7 BUSINESS DAYS
    
    TO REQUEST PAPER COPIES, COMPLETE FORM REQ-442 AND MAIL TO:
    CENTRAL LABORATORY SERVICES
    P.O. BOX 4421
    HEALTHCARE CITY, ST 00000-0000
    
    ALLOW 6-8 WEEKS FOR PROCESSING

================================================================================
         *** PRINTED ON RECYCLED PAPER - PLEASE CONSIDER THE ENVIRONMENT ***
================================================================================

[THIS PAGE INTENTIONALLY LEFT 73% BLANK FOR FILING PURPOSES]



`}
        </pre>

        {/* Page navigation */}
        <div className="mt-4 flex items-center justify-between border-t border-[#999] pt-4">
          <div className="text-[10px] text-[#666]">
            Viewing page {currentPage} of 512 pages
          </div>
          <div className="flex gap-2">
            <button
              className="system-button"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              &lt;&lt; Prev
            </button>
            <input
              type="number"
              value={currentPage}
              onChange={(e) => setCurrentPage(Math.min(512, Math.max(1, parseInt(e.target.value) || 1)))}
              className="system-input w-16 text-center"
              min={1}
              max={512}
            />
            <button
              className="system-button"
              onClick={() => setCurrentPage(Math.min(512, currentPage + 1))}
              disabled={currentPage === 512}
            >
              Next &gt;&gt;
            </button>
            <button
              className="system-button"
              onClick={() => setCurrentPage(512)}
            >
              Last
            </button>
          </div>
        </div>
      </div>
    );
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
          <span className="text-sm font-bold">LABORATORY TEST SYSTEM</span>
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

        {/* Valid IDs hint - badly placed */}
        <div className="text-[9px] text-[#999] mb-2">
          Demo IDs for testing: 12345678, PATIENT01, TEST2024 (any password works)
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
                {step === 4 ? "Blood Test Results - View/Print" : `Authentication Process - Step ${step} of 4`}
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
                  <div className="text-sm text-[#666]">Loading Page {loadingPage} of {PAGES_TO_LOAD}</div>
                  <div className="mx-auto mt-3 w-128 h-2 bg-[#eee] border border-black overflow-hidden">
                    <div
                      role="progressbar"
                      aria-valuemin={1}
                      aria-valuemax={PAGES_TO_LOAD}
                      aria-valuenow={loadingPage}
                      aria-label={`Loading page ${loadingPage} of ${PAGES_TO_LOAD}`}
                      className="h-2 bg-[#36a3f7]"
                      style={{ width: `${Math.round((loadingPage / PAGES_TO_LOAD) * 100)}%` }}
                    />
                  </div>
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
                    <p className="mb-2">1. DEFINITIONS. &quot;System&quot; refers to the Blood Test Search System v2.4.1 and all associated subsystems, modules, and interfaces. &quot;User&quot; refers to any individual or entity accessing the System. &quot;Data&quot; refers to any information retrieved, stored, or processed by the System.</p>
                    <p className="mb-2">2. ACCEPTANCE. By clicking &quot;I Accept&quot; below, User agrees to be bound by these Terms and Conditions, the Privacy Policy (Form PP-2019-A), the Data Use Agreement (Form DUA-442), and all applicable federal, state, and local regulations pertaining to the handling of medical information.</p>
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

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold">Laboratory Report - Dot Matrix Print Preview</span>
                      <div className="flex gap-2">
                        <button
                          className="system-button"
                          onClick={() => window.print()}
                        >
                          Print Report
                        </button>
                        <button
                          className="system-button"
                          onClick={() => alert("PDF generation requires Adobe Acrobat 6.0 or higher. Please install from CD-ROM included with Form BT-442A.")}
                        >
                          Export PDF
                        </button>
                      </div>
                    </div>

                    {generateDotMatrixResults()}
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
                        setCurrentPage(1);
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
