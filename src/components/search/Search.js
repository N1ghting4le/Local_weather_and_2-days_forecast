const Search = ({setTown}) => {
    const updateTown = (e) => {
        if (e.code === 'Enter') {
            setTown(e.target.value);
        }
    }

    return (
        <input type="text" placeholder="Enter town name..." onKeyDown={updateTown}/>
    );
};

export default Search;