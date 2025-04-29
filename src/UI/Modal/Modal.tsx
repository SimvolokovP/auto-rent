import {
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import useMeasure from "react-use-measure";
import styles from "./Modal.module.scss";

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
}

const Modal: FC<ModalProps> = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const [isFull, setIsFull] = useState<boolean>(false);

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className={styles.modal__overlay}
        >
          <motion.div
            id="drawer"
            className={`${styles.modal__drawer} ${
              isFull && styles.modal__drawerFull
            }`}
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className={styles.modal__drawer__handle}>
              <button
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className={`${styles.handle}`}
              ></button>
            </div>
            <div className={styles.modal__drawer__content}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Modal;
