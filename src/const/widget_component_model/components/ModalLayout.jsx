import { forwardRef } from "react";

const ModalLayout =
  forwardRef <
  HTMLDivElement >
  (({ showModel, setShowModelStatus, children }, ref) => {
    return (
      <main>
        <section>
          <div
            ref={ref}
            className=" overflow-y-scroll no-scrollbar "
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: 850,
              maxHeight: 580,
              bgcolor: "#fff",
              boxShadow: 60,
              outline: "none",
            }}
          >
            {children}
          </div>
        </section>
      </main>
    );
  });

export default ModalLayout;
