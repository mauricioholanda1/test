/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * @returns an array of arrays containing items.
 */
function assignLanes(items) {
    const lanes = [];
    const sorted = [...items].sort((a,b) => new Date(a.start) - new Date(b.start));

    for (const item of sorted) {
        let placed = false;
        for (const lane of lanes) {
            const last = lane[lane.length - 1];
            if (new Date(last.end) <= new Date(item.start)) {
                lane.push(item);
                placed = true;
                break;
            }
        }
        if (!placed) lanes.push([item]);
    }

    return lanes.flatMap((laneItems,laneIndex) =>
        laneItems.map((item) => ({ ...item,lane: laneIndex }))
    );
}

export { assignLanes };
