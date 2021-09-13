const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav role="navigation" aria-label="Pagination">
      <ul className="list--unstyled">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} 
                href="!#" 
                className={`${(number === currentPage) ? "current-page" : ""}`}
                {... (number === currentPage) ? {'aria-current': 'page'} : {}}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;