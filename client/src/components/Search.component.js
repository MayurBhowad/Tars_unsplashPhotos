import React from 'react'

const Search = ({ searchByString }) => {
    const [stringToSearch, setStringToSearch] = React.useState();

    function settingSearchString(e) {
        e.preventDefault();
        setStringToSearch(e.target.value);
    }

    function setSearchByString(e) {
        e.preventDefault();
        console.log(e.target.value);
    }

    return (
        <div onSubmit={e => searchByString(e, stringToSearch)} className="search">
            <form className="search-form">
                <input className="search-input" type="search" onChange={e => settingSearchString(e)}
                    placeholder="Search Unsplash's library of over 1 million photos" />
                <input className="btn btn-search" type="submit" value="search" />
            </form>
        </div>
    )
}

export default Search
