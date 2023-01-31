import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";

const Backdrop = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #000000e1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
`;

const Content = styled(motion.div)`
  /* width: clamp(50%, 700px, 90%); */
  /* height: min(50%, 300px); */

  width: fit-content;
  height: fit-content;

  background-color: #f6f5f5;

  padding: 20px;

  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h1 {
    margin: 0;
  }

  > p {
    font-size: 1.2rem;
    text-align: center;

    > span {
      color: #9ca9b2;
      font-weight: 600;
    }
  }

  .modal_button {
    margin: 0 10px;
    padding: 5px 10px;

    border: 2px solid transparent;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    background-color: #9ca9b2;
    color: #f6f5f5;

    &:hover {
      background-color: #f6f5f5;
      border: 2px solid #9ca9b2;
      color: #9ca9b2;
    }
  }
`;

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

interface Props {
  handleClose: () => void;
  modalOpen: boolean;
  wpm: number;
  accuracy: number;
}

export default function Modal(props: Props) {
  const { modalOpen, handleClose, wpm, accuracy } = props;
  return (
    <AnimatePresence
      // Disable any initial animations on children that
      // are present when the component is first rendered
      initial={false}
      // Only render one component at a time.
      // The exiting component will finish its exit
      // animation before entering component is rendered
      // exitBeforeEnter={true}
      // Fires when all exiting nodes have completed animating out
      onExitComplete={() => null}
    >
      {modalOpen && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <Content
            onClick={(e) => e.stopPropagation()}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h1>Type Test Finished!</h1>
            <p>
              Your speed was <span>{wpm} WPM</span> with
              <span> {accuracy}%</span> accuracy!
            </p>

            <div className="modal_button" onClick={handleClose}>
              Try Again!
            </div>
          </Content>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}
