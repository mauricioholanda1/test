import React from "react";

const Modal = ({ modalData,setModalData,handleSave }) => {
    if (!modalData) return null;

    // Styles
    const overlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const modalStyle = {
        position: "relative",
        backgroundColor: "#fff",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        zIndex: 1000,
        width: "400px",
        maxWidth: "90%",
        boxSizing: "border-box",
    };

    const headerStyle = {
        marginBottom: "16px",
        textAlign: "center",
        color: "#333",
    };

    const labelStyle = {
        display: "block",
        marginBottom: "10px",
        color: "#555",
    };

    const inputStyle = {
        display: "block",
        marginTop: "5px",
        marginBottom: "10px",
        width: "100%",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box",
    };

    const buttonContainerStyle = {
        display: "flex",
        justifyContent: "space-between",
    };

    const saveButtonStyle = {
        padding: "10px 20px",
        backgroundColor: "#0056b3",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
    };

    const cancelButtonStyle = {
        padding: "10px 20px",
        backgroundColor: "#ccc",
        color: "#000",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
    };

    return (
        <div style={overlayStyle} onClick={() => setModalData(null)}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <h3 style={headerStyle}>Edit Item</h3>
                <label style={labelStyle}>
                    Name:
                    <input
                        type="text"
                        value={modalData.name}
                        onChange={(e) =>
                            setModalData({ ...modalData,name: e.target.value })
                        }
                        style={inputStyle}
                    />
                </label>
                <label style={labelStyle}>
                    Start Date:
                    <input
                        type="date"
                        value={modalData.start}
                        onChange={(e) =>
                            setModalData({ ...modalData,start: e.target.value })
                        }
                        style={inputStyle}
                    />
                </label>
                <label style={labelStyle}>
                    End Date:
                    <input
                        type="date"
                        value={modalData.end}
                        onChange={(e) =>
                            setModalData({ ...modalData,end: e.target.value })
                        }
                        style={inputStyle}
                    />
                </label>
                <div style={buttonContainerStyle}>
                    <button
                        onClick={handleSave}
                        style={saveButtonStyle}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#004494")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setModalData(null)}
                        style={cancelButtonStyle}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#bbb")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#ccc")}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;