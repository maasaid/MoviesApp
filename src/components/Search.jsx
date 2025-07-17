import 'react';
const Search = ({searchItem, setSearchItem}) => {
    return (
        <div className='search'>
            <div>
                <img src="./Vector.svg" alt="The search icon" />
                <input
                    type="text"
                    placeholder='Search for a movie, series or actor'
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                />
            </div>
            
        </div>
    )
}
export default Search;