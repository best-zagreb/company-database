import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"

const SearchBar = ({posts, setSearchResults}) => {
    const handleSubmit = (e) => e.preventDefault();

    const handleSearchChange = (e) => {
        if(!e.target.value) {
            console.log("tu sam")
            return setSearchResults(posts) //ako nema nista u search baru renderaj samo sve sto je i bilo prije
            
        }

        const resultsArray = posts.filter(post => {
           return  post.nickname.includes(e.target.value) || post.name.includes(e.target.value)
                || post.surname.includes(e.target.value) || post.loginEmail.includes(e.target.value)
        }
        )
        console.log(resultsArray)
        setSearchResults(resultsArray)
    }

    return(
        <header>
            <form className = "search" onSubmit = {handleSubmit}>
                <input 
                    className = "search__input"
                    type = "text"
                    id = "search__bar"
                    onChange = {handleSearchChange}
                />

                <button  id = "search__button">
                    <FontAwesomeIcon icon = {faMagnifyingGlass} />
                </button>
            </form>
        </header>
    )
}

export default SearchBar