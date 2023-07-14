const Search = ({setTown}) => {
    const updateTown = (e) => {
        if (e.code === 'Enter') {
            setTown(e.target.value);
        }
    }

    return (
        <div style={{'position': 'relative'}}>
            <input type="text" placeholder="Enter town name..." onKeyDown={updateTown}/>
            <img src="https://img.icons8.com/ios/50/search.png" alt="search icon" className="search_icon" onClick={(e) => setTown(e.target.previousElementSibling.value)}/>
        </div>
    );
};

export default Search;