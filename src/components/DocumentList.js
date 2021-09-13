import { DateTime } from "luxon";

const DocumentList = ({ documents }) => {
  if(documents.length === 0 ) {
    return (
      <p>Filter selection returned no results.</p>
    )
  }
  
  return (
    <div>
    <ul className="list--unstyled" role="region" aria-label="Listed documents">
      {documents.map((document) => (
       <article className="card" key={document.id}>
          <header className="card__header">
            <p className="card__heading"><a href={document.url}>{document.title}</a></p>
          </header>
          <time dateTime={document.lastUpdated}>
            Last updated on{' '}
            {DateTime.fromISO(document.lastUpdated).toLocaleString(
              DateTime.DATE_FULL
            )}
          </time>
        </article>
      ))}
    </ul>
    </div>
  );
};

export default DocumentList;
