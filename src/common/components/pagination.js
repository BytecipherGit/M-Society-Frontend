import React from "react";

const Pagination = ({
  nPages,
  currentPage,
  setCurrentPage,
  data,
  totalDatacount,
}) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  console.log(totalDatacount);
  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 0) setCurrentPage(currentPage - 1);
  };
  return (
    <>
      <div className="paginationBox">
        <div className="row">
          <div className="col-md-6">
            <p className="paginatext">{`Showing ${
              currentPage * data.length + 1
            } to ${
              data?.length * (pageNumbers + +1)
            } of ${totalDatacount} entries`}</p>
          </div>
          <div className="col-md-6">
            <ul>
              <li
                className={currentPage <= 0 ? "disabled not-change" : ""}
                onClick={prevPage}
              >
                Prev
              </li>
              {pageNumbers.map((pgNumber) => (
                <li
                  key={pgNumber}
                  className={currentPage + 1 === pgNumber ? "active" : ""}
                  onClick={() => setCurrentPage(pgNumber - 1)}
                >
                  {pgNumber}
                </li>
              ))}

              <li
                className={
                  currentPage >= nPages - 1 ? "disabled not-change" : ""
                }
                onClick={nextPage}
              >
                Next
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a
              className={`page-link ${
                currentPage <= 0 ? "disabled not-change" : ""
              }`}
              onClick={prevPage}
              href="#"
            >
              Previous
            </a>
          </li>
          {pageNumbers.map((pgNumber) => (
            <li
              key={pgNumber}
              className={`page-item ${
                currentPage + 1 == pgNumber ? "active" : ""
              } `}
            >
              <a
                onClick={() => setCurrentPage(pgNumber - 1)}
                className="page-link"
                href="#"
              >
                {pgNumber}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className={`page-link ${
                currentPage >= nPages - 1 ? "disabled not-change" : ""
              }`}
              onClick={nextPage}
              href="#"
            >
              Next
            </a>
          </li>
        </ul>
      </nav> */}
    </>
  );
};

export default Pagination;