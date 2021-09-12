import { DateTime } from "luxon";

const DocumentList = ({ documents }) => {
  return (
    <div className="document-list">
      {documents.map((document) => (
        <article className="document-preview" key={document.id}>
          <h2>{document.title}</h2>
          <time dateTime={document.lastUpdated}>
            Last updated on{" "}
            {DateTime.fromISO(document.lastUpdated).toLocaleString(
              DateTime.DATE_FULL
            )}
          </time>
        </article>
      ))}
    </div>
  );
};

export default DocumentList;
