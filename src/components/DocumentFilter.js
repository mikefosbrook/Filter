const DocumentFilter = ({ navigators, handleSelect }) => {
  // It would be useful to test that the Select Option values exist in the document data for niceDocType, niceAdviceType and niceGuidanceType
  // It is assumed that this seperation exists for a reason to prevent CMS updates creating unintended values
  // It is also assumed that at the CMS end there is some form of validation by re-using the navigators so documents could be tagged using pre-determined values - rather than typed - values.
  // Alternatively, the select options could be generated based on actual data by generating unique arrays and using sort() - however, the label would then be closely tied with the value, and if there were a data entry error or a duplicate this would appear in the front end, and be triggered by a data update (by a content author using a CMS) and not an update to the logic/presentation code.
  // In terms of User Experience, it could be beneficial to only return filter options that exist, unless it was intended that a user can search for things to see they don't exist - but it would be better if these were shown but disabled.
  // As an improvement, get unique arrays for each select and add disabled="disabled" to each option.
  return (
    <div className="filter-list">
      <h1>Filter options</h1>
      {navigators.map((navigator, i) => (
        <div className="filter-wrapper" key={i}>
          <label htmlFor={`id_select_${navigator.shortName}`}>
            {navigator.displayName}
          </label>
          <select
            onChange={handleSelect}
            id={`id_select_${navigator.shortName}`}
            data-navigator={navigator.shortName}
          >
            <option value=""></option>
            {navigator.modifiers.map((modifier, j) => (
              <option value={modifier.displayName} key={j}>
                {modifier.displayName}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
    // a Submit button rather than on change would be more efficient in the event of there being masses of data, but not having to press submiit provides instant feedback
    // slight issue in using reset, in so far as keyboad navigation might inadvertantly clear the selections.
  );
};

export default DocumentFilter;
