import React from "react";

const Modal = ({ modalData, setModalData, handleSave }) => {
    if (!modalData) return null;

    return (
        <div
            style={{
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
            }}
            onClick={() => setModalData(null)}
        >
            <div
                style={{
                    position: "relative",
                    backgroundColor: "#fff",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    borderRadius: "8px",
                    zIndex: 1000,
                    width: "400px",
                    maxWidth: "90%",
                    boxSizing: "border-box",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h3 style={{ marginBottom: "16px", textAlign: "center", color: "#333" }}>
                    Edit Item
                </h3>
                <label style={{ display: "block", marginBottom: "10px", color: "#555" }}>
                    Name:
                    <input
                        type="text"
                        value={modalData.name}
                        onChange={(e) =>
                            setModalData({ ...modalData, name: e.target.value })
                        }
                        style={{
                            display: "block",
                            marginTop: "5px",
                            marginBottom: "10px",
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            boxSizing: "border-box",
                        }}
                    />
                </label>
                <label style={{ display: "block", marginBottom: "10px", color: "#555" }}>
                    Start Date:
                    <input
                        type="date"
                        value={modalData.start}
                        onChange={(e) =>
                            setModalData({ ...modalData, start: e.target.value })
                        }
                        style={{
                            display: "block",
                            marginTop: "5px",
                            marginBottom: "10px",
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            boxSizing: "border-box",
                        }}
                    />
                </label>
                <label style={{ display: "block", marginBottom: "10px", color: "#555" }}>
                    End Date:
                    <input
                        type="date"
                        value={modalData.end}
                        onChange={(e) =>
                            setModalData({ ...modalData, end: e.target.value })
                        }
                        style={{
                            display: "block",
                            marginTop: "5px",
                            marginBottom: "10px",
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            boxSizing: "border-box",
                        }}
                    />
                </label>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button
                        onClick={handleSave}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#0056b3",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setModalData(null)}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#ccc",
                            color: "#000",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;