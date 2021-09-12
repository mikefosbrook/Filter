import {useState} from 'react';
import './App.css';
import Data from './data/search-data.json'; // ideally would mimic server request and cover outcome i.e., error, loading, success
import DocumentFilter from './components/DocumentFilter';
import DocumentList from './components/DocumentList';
import Pagination from './components/Pagination';

function App() {

  const [documents, setFilter] = useState(() => {
    console.log('I run once');
    return Data.documents;
  } );
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
    const filteredResuts = Data.documents.filter( (document) => (document[filterKey].includes(filterValue) ) );

    console.log(typeof Data.documents);
    console.log(documents)
    console.log(filteredResuts);

    setFilter(filteredResuts);
  };
  
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = documents.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <DocumentFilter 
        navigators={Data.navigators}
        handleSelect={handleSelect} 
      /> 
      <DocumentList documents={currentPosts} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={documents.length}
        paginate={paginate}
      />       
    </div>
  );
}

//show document count x of 100 (documents.length)

//navigators can be used to set the names in the options to seperate the presentation code from the data

// A good test would be to see if the Data contained non existent modifiers/ones with spelling mistakes in the navigators array (main filter options)

export default App;
