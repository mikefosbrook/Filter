import {useState} from 'react';
import './App.css';
import Data from './data/search-data.json'; // ideally would mimic server request and cover outcome i.e., error, loading, success
import DocumentFilter from './components/DocumentFilter';
import DocumentList from './components/DocumentList';
import Pagination from './components/Pagination';

function App() {

  const [documents, setFilter] = useState(() => {
    return Data.documents;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // The key for each filter type in the Document JSON data has no corresponding value to the navigators
  // We can't rely on the order of the navigators, as they appear in a different order to the filter types
  // We could create three seperate filters rather than use a nested loop ... but the navigators data structure repeats itself.  
  const filterNavigators = {
    ndt : 'niceDocType',
    nat : 'niceAdviceType',
    ngt : 'niceGuidanceType',
  }

  const handleSelect = (event) => {

    const filterValue = event.target.value;
    const filterKey = filterNavigators[event.target.dataset.navigator]; // niceDocType, niceAdviceType or niceGuidanceType
    const filteredResuts = Data.documents.filter( (document) => (document[filterKey].includes(filterValue)) );  

      if(filterValue === '' ) {
        setFilter(Data.documents)
        
      } else {
        setFilter(filteredResuts);
      }
      setCurrentPage(1)

  };
  
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = documents.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
      <div className="container">
        <div className="grid mt--d">
          <div data-g="12">
          <h1>Filters</h1>
          <DocumentFilter
            navigators={Data.navigators}
            handleSelect={handleSelect}
          />
          <p className="lead">{documents.length} documents</p>
          <DocumentList documents={currentPosts} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={documents.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          </div>
        </div>
      </div>
  );
}

// A good test would be to see if the Data contained non existent modifiers/ones with spelling mistakes in the navigators array (main filter options)

export default App;
