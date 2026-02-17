function CalendarHeader({ month, year, onPrev, onNext }) {
  return (
    <div className="d-flex align-items-center justify-content-between mb-4">
      <button className="btn btn-outline-secondary" onClick={onPrev}>
        ←
      </button>

      <h4 className="mb-0">
        {month} {year}
      </h4>

      <button className="btn btn-outline-secondary" onClick={onNext}>
        →
      </button>
    </div>
  );
}

export default CalendarHeader;
