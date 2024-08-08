import { downloadMap, uploadMap } from "../../services/mapHandling";
import "./MapFileHandler.css";

const MapHandler = () => {
  const handleUpload = () => {
    // Implement upload logic
    // Get file from user
    let csv_raw: string = "";

    console.log("Upload");
  };

  const handleDownload = () => {
    // Implement download logic
    downloadMap();
    console.log("Download");
  };

  return (
    <div className="download-upload-container">
      <p className="download-upload-text">Download or upload map</p>
      <div className="flex flex-row justify-center items-center">
        <button
          onClick={handleUpload}
          className="button-circle bg-ss-blue-grotto"
        >
          <svg
            width="26"
            height="27"
            viewBox="0 0 42 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.16895 31.5109V36.5109C1.16895 37.8369 1.69573 39.1087 2.63341 40.0464C3.57109 40.9841 4.84286 41.5109 6.16895 41.5109H36.1689C37.495 41.5109 38.7668 40.9841 39.7045 40.0464C40.6422 39.1087 41.1689 37.8369 41.1689 36.5109V31.5109M11.1689 11.5109L21.1689 1.51086M21.1689 1.51086L31.1689 11.5109M21.1689 1.51086V31.5109"
              stroke="#0C2D48"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={handleDownload}
          className="button-circle bg-ss-blue-grotto"
        >
          <div className=" br-rado"></div>
          <svg
            width="26"
            height="27"
            viewBox="0 0 42 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.16895 31.5109V36.5109C1.16895 37.8369 1.69573 39.1087 2.63341 40.0464C3.57109 40.9841 4.84286 41.5109 6.16895 41.5109H36.1689C37.495 41.5109 38.7668 40.9841 39.7045 40.0464C40.6422 39.1087 41.1689 37.8369 41.1689 36.5109V31.5109M31.1689 21.5109L21.1689 31.5109M21.1689 31.5109L11.1689 21.5109M21.1689 31.5109V1.51086"
              stroke="#0C2D48"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <style>{`
                .button-circle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 10px; /* Adjust the space between buttons */
                    width: 60px; /* Width of the button */
                    height: 60px; /* Height of the button, equal to width for circle */
                    border-radius: 50%; /* Make it circular */
                    border: none; /* Remove border */
                    cursor: pointer; /* Change cursor on hover */
                }

                .button-circle svg {
                    transition: transform 0.2s ease; /* Smooth transition for click */
                }

                .button-circle:active svg {
                    transform: scale(0.9); /* Slightly scale down the icon when clicked */
                }
            `}</style>
    </div>
  );
};

export default MapHandler;
