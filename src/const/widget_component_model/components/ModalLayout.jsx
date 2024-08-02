import React from "react";

const ModalLayout = React.forwardRef(({ children, size, color }, ref) => {
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
            width: size === "small" ? 380 : 500,
            maxHeight: 580,
            backgroundColor: color,
            boxShadow: 60,
            outline: "none",
            zIndex: 999,
          }}
        >
          {children}
        </div>
      </section>
    </main>
  );
});

ModalLayout.displayName = "ModalLayout";

export default ModalLayout;
