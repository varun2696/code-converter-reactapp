import React, { useState } from 'react';
import axios from 'axios';

/* Do not make any changes  here */
const baseUrl = "https://rich-gold-codfish-shoe.cyclic.app/codeConverter";
/* ------------- */


const CodeConverter = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const codeQuality = `
  Please provide a code quality assessment for the given code. Consider the following parameters:

  1. Code Consistency: Evaluate the code for consistent coding style, naming conventions, and formatting.
  2. Code Performance: Assess the code for efficient algorithms, optimized data structures, and overall performance considerations.
  3. Code Documentation: Review the code for appropriate comments, inline documentation, and clear explanations of complex logic.
  4. Error Handling: Examine the code for proper error handling and graceful error recovery mechanisms.
  5. Code Testability: Evaluate the code for ease of unit testing, mocking, and overall testability.
  6. Code Modularity: Assess the code for modular design, separation of concerns, and reusability of components.
  7. Code Complexity: Analyze the code for excessive complexity, convoluted logic, and potential code smells.
  8. Code Duplication: Identify any code duplication and assess its impact on maintainability and readability.
  9. Code Readability: Evaluate the code for readability, clarity, and adherence to coding best practices.

  Please provide a summary of the code quality assessment and a report showing the percentage-wise evaluation for each parameter mentioned above.  
  `
  const handleConvert = async () => {
    try {
      setLoading(true)
      const response = await axios.post(baseUrl, {
        data: `Covert this source code \n ${inputCode} \n to ${selectedLanguage}`
      });
      setOutputCode(response.data.convertedCode);
      setLoading(false)
      setErrorMessage('');
    } catch (error) {
      setOutputCode('');
      setErrorMessage(error.response?.data?.error || 'Error converting code.');
    } finally {
      setLoading(false)
    }
  };

  const handleDebug = async () => {
    try {
      setLoading(true)
      const response = await axios.post(baseUrl, {
        data: `Debug this source code \n ${inputCode}`
      });
      setOutputCode(response.data.convertedCode);
      setLoading(false)
      setErrorMessage('');
    } catch (error) {
      setOutputCode('');
      setErrorMessage(error.response?.data?.error || 'Error converting code.');
    } finally {
      setLoading(false)
    }
  };


  const handleCheck = async () => {
    try {
      setLoading(true)
      const response = await axios.post(baseUrl, {
        data: `${inputCode} ${codeQuality}`
      });
      setOutputCode(response.data.convertedCode);
      setLoading(false)
      setErrorMessage('');
    } catch (error) {
      console.log(error);
      setOutputCode('');
      setErrorMessage(error.response?.data?.error || 'Error checking code.');
    } finally {
      setLoading(false)
    }
  };


  return (
    <div className="container">
      <div className="top">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="">Select</option>
          <option value="js">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="c++">C++</option>
        </select>
        <button disabled={!inputCode || !selectedLanguage === true} onClick={handleConvert}>Convert</button>
        <button disabled={!inputCode} onClick={handleDebug}>Debug</button>
        <button disabled={!inputCode} onClick={handleCheck}>Check</button>
      </div>
      <div className="wrapper">
        <div className="left-side">
          <textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Enter your code here"
          />
        </div>
        <div className="right-side">
          {loading ? (
            <div className="loader">Loading...</div>
          ) : (
            <textarea
              value={outputCode}
              onChange={() => { }}
              placeholder="output will be shown here"
            />
          )}
        </div>
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
};

export default CodeConverter;
