const Welcome = () => {
  return (
    <>
      <style>{`
        h1 {
          padding: 0px;
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html, body {
          height: 100%;
        }
        .welcome-body {
          font-family: "Segoe UI", sans-serif;
          background-color: white;
          display: flex;
          text-align: center;
          justify-content: center;
          align-items: center;
          height: 100vh;
          overflow: hidden;
        }
        span {
          position: relative;
          top: 20px;
          color: #fff;
          display: inline-block;
          font-size: 5rem;
          text-shadow: 0 1px 0 #b7b7b7, 0 2px 0 #b7b7b7, 0 3px 0 #b7b7b7,
            0 4px 0 #b7b7b7, 0 5px 0 #b7b7b7, 0 6px 0 transparent,
            0 7px 0 transparent, 0 8px 0 transparent, 0 9px 0 transparent,
            0 10px 10px rgba(0, 0, 0, 0.5);
          animation: anim 0.9s 0.4s ease infinite alternate;
        }
        h1 span:nth-child(1) { animation-delay: 0.1s; }
        h1 span:nth-child(2) { animation-delay: 0.2s; }
        h1 span:nth-child(3) { animation-delay: 0.3s; }
        h1 span:nth-child(4) { animation-delay: 0.4s; }
        h1 span:nth-child(5) { animation-delay: 0.5s; }
        h1 span:nth-child(6) { animation-delay: 0.6s; }
        h1 span:nth-child(7) { animation-delay: 0.7s; }
        h1 span:nth-child(8) { animation-delay: 0.8s; }

        @keyframes anim {
          100% {
            top: -20px;
            text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
              0 5px 0 #ccc, 0 6px 0 #ccc, 0 7px 0 #ccc, 0 8px 0 #ccc,
              0 9px 0 #ccc, 0 60px 30px rgba(0, 0, 0, 0.3);
          }
        }
      `}</style>
      <div className="welcome-body">
        <h1>
          <span>W</span>
          <span>E</span>
          <span>L</span>
          <span>C</span>
          <span>O</span>
          <span>M</span>
          <span>E</span>
          <span>!</span>
        </h1>
      </div>
    </>
  );
};

export default Welcome;
