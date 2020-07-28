import * as React from 'react';
import SearchResult from './SearchResult';
import SongContainer from './SongContainer';
import Footer from './Footer';
import { connect } from 'react-redux';
import jump from 'jump.js';
import { searchSongs } from '../actions';

interface IHomeComponentProps {

}

interface IHomeProps extends IHomeComponentProps {
  loadingSearch: boolean;
  showResults: boolean;
  searchSongs: (query: string, location: string) => void;
}

const Home: React.FC<IHomeProps> = (props): JSX.Element => {
  const [userInput, setUserInput] = React.useState('');
  const [userCountry, setUserCountry] = React.useState('US');

  const {
    loadingSearch,
    searchSongs,
    showResults
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name === 'userInput') {
      setUserInput(e.target.value)
    } else {
      setUserCountry(e.target.value);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    jump('.songContainer', {
      a11y: true
    });

    searchSongs(userInput, userCountry);
    setUserInput('');
  }
  return (
    <>
      <div className="searchPage">
        <h1>Music Thing. <span>A Playlist Generator.</span></h1>
        <form role="search" aria-labelledby="search" onSubmit={handleSubmit}>
          <div className="countryInput">

            <label>Please select your country:</label>

            <div className="radio">
              <span>
                <input type="radio"
                  name="userCountry"
                  id="us"
                  value="US"
                  checked={userCountry === 'US'}
                  onChange={handleChange} />
                <label htmlFor="us">US</label>
              </span>
            </div>

            <div className="radio">
              <span>
                <input type="radio"
                  name="userCountry"
                  id="canada"
                  value="CA"
                  onChange={handleChange}
                  checked={userCountry === 'CA'} />
                <label htmlFor="canada">Canada</label>
              </span>
            </div>
          </div>


          {/* end of country input*/}

          <label htmlFor="userInput">What are you searching for?</label>
          <input
            id="userInput"
            name="userInput"
            value={userInput}
            onChange={handleChange}
            type="text"
            placeholder="Enter artist, song or music genre" />
          {/* end of text input */}

          <input type="submit" value="Search" />
        </form>
      </div>

      <div className="search" id="search">
        <div className="wrapper">
          {showResults && <SearchResult />}
          {
            loadingSearch
              ? <p>Loading...</p>
              : <SongContainer />
          }
        </div>
        <Footer />
      </div>
    </>
  )
}

const mapStateToProps = ({ songs }) => {
  return {
    loadingSearch: songs.get('loadingSearch'),
    showResults: songs.get('showResults'),
  }
}
export default connect(mapStateToProps, { searchSongs })(Home);