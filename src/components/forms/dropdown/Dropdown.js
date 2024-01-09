export const Dropdown = ({ placeholder,query,parameters,setQuery,className }) => {
    const class1 = ' dropdown-toggle text-start pt-2 ps-2 ps-sm-3 pe-5 w-100';
    const class2 = ' dropdown-toggle text-center pt-4 ps-2 ps-sm-3 pe-5 w-100';

    return(
      <div className="dropdown form-floating w-100 min-width-10">
        <button className={className + (query === '' ? class1 : class2)} type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          { query === '' ? placeholder : query }
        </button>
        <label htmlFor="dropdownMenuButton" className="form-label text-muted text-nowrap text-truncate" >
          { query === '' ? '' : placeholder }
        </label>

        <ul className={"dropdown-menu text-center shadow-sm w-100" + (query === '' ? ' visible' : ' hidden')} aria-labelledby="dropdownMenuButton">
          { parameters.map((parameters) => {
            return (<li key={JSON.stringify(parameters)}><button className="dropdown-item" value={ parameters.parameter } onClick={(e) => setQuery(e.target.value)}>{ parameters.parameter }</button></li>);
          })}
        </ul>
      </div>
    )
}