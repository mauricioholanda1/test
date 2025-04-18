import React,{ useMemo,useState } from "react";
import { assignLanes } from "./assignLanes";
import Modal from "./components/Modal";
import timelineItems from "./timelineItems";
import { differenceInDays,generateRandomColor } from "./utils";

const Timeline = () => {
  const [zoom,setZoom] = useState(80);
  const [modalData,setModalData] = useState(null);
  const [items,setItems] = useState(timelineItems);

  const itemColors = useMemo(() => {
    const colors = {};
    items.forEach((item) => {
      colors[item.id] = generateRandomColor();
    });
    return colors;
  },[items]);

  const itemsWithLanes = useMemo(() => assignLanes(items),[items]);

  const minDate = useMemo(
    () =>
      itemsWithLanes.reduce(
        (min,item) =>
          new Date(item.start) < min ? new Date(item.start) : min,
        new Date(itemsWithLanes[0]?.start)
      ),
    [itemsWithLanes]
  );

  const maxDate = useMemo(
    () =>
      itemsWithLanes.reduce(
        (max,item) =>
          new Date(item.end) > max ? new Date(item.end) : max,
        new Date(itemsWithLanes[0]?.end)
      ),
    [itemsWithLanes]
  );

  const adjustedMinDate = new Date(minDate);
  adjustedMinDate.setDate(adjustedMinDate.getDate());

  const adjustedMaxDate = new Date(maxDate);
  adjustedMaxDate.setDate(adjustedMaxDate.getDate() + 10);

  const totalDays = differenceInDays(adjustedMaxDate,adjustedMinDate) + 1;

  const handleSave = () => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === modalData.id ? { ...item,...modalData } : item
      )
    );
    setModalData(null);
  };

  // Styles
  const containerStyle = {
    padding: "16px",
  };

  const zoomButtonContainerStyle = {
    marginBottom: "16px",
    display: "flex",
    gap: "8px",
  };

  const zoomButtonStyle = {
    padding: "10px 20px",
    cursor: "pointer",
    backgroundColor: "#0056b3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease",
  };

  const timelineContainerStyle = {
    position: "relative",
    border: "1px solid #ccc",
    height: "400px",
    overflowX: "auto",
    padding: "16px",
    boxSizing: "border-box",
  };

  const verticalLineStyle = (left) => ({
    position: "absolute",
    left,
    top: 20,
    height: "calc(100% - 20px)",
    width: "1px",
    backgroundColor: "#ddd",
  });

  const dateLabelStyle = (left,zoom) => ({
    position: "absolute",
    left: left - zoom / 2,
    top: 0,
    transform: "translateX(-50%)",
    fontSize: "10px",
    color: "#666",
  });

  const timelineItemStyle = (item,itemColors,left,width) => ({
    position: "absolute",
    backgroundColor: itemColors[item.id],
    color: "#fff",
    fontSize: "12px",
    borderRadius: "4px",
    padding: "4px 8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    top: item.lane * 50 + 20,
    left,
    width,
    cursor: "pointer",
  });

  const timelineItemTextStyle = {
    fontSize: "10px",
    marginTop: "4px",
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <div style={containerStyle}>
      {/* Zoom Buttons */}
      <div style={zoomButtonContainerStyle}>
        <button
          onClick={() => setZoom(zoom * 1.2)}
          style={zoomButtonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#004494")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#0056b3")}
        >
          Zoom +
        </button>
        <button
          onClick={() => setZoom((prevZoom) => Math.max(prevZoom / 1.2,40))}
          style={zoomButtonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#004494")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#0056b3")}
        >
          Zoom -
        </button>
      </div>

      {/* Timeline */}
      <div style={timelineContainerStyle}>
        {/* Vertical lines */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `calc(${totalDays * zoom}px)`,
            pointerEvents: "none",
          }}
        >
          {Array.from({ length: totalDays }).map((_,dayIndex) => {
            const currentDate = new Date(adjustedMinDate);
            currentDate.setDate(currentDate.getDate() + dayIndex);

            const left = dayIndex * zoom;

            const formattedDate = currentDate.toLocaleDateString("en-GB",{
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            return (
              <div key={dayIndex}>
                <div style={dateLabelStyle(left,zoom)}>{formattedDate}</div>
                <div style={verticalLineStyle(left)} />
              </div>
            );
          })}
        </div>

        {/* Timeline items */}
        {itemsWithLanes.map((item,index) => {
          const offsetDays = differenceInDays(item.start,adjustedMinDate);
          const durationDays = differenceInDays(item.end,item.start);

          const left = offsetDays * zoom;
          const width = Math.max(
            durationDays * zoom,
            item.name.length * 8 + 10
          );

          return (
            <div
              key={index}
              style={timelineItemStyle(item,itemColors,left,width)}
              onClick={() => setModalData(item)}
            >
              <div>{item.name}</div>
              <div style={timelineItemTextStyle}>
                <span>{item.start}</span>
                <span>{item.end}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <Modal
        modalData={modalData}
        setModalData={setModalData}
        handleSave={handleSave}
      />
    </div>
  );
};

export default Timeline;