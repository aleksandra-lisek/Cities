import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function() {

    class Input extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                value: ''
            };
        }

        handleChange = (event) => {

            this.setState({
                value: event.target.value
            }, () => {
                this.props.upDate(this.state.value);
            });
        }

        render() {
            return <input onKeyUp={this.handleChange.bind(this)} type="text" className="search" placeholder="City or State"/>
        }
    }

    class CitiesList extends React.Component {
        constructor() {
            super();
            this.state = {
                cities: [],
                matchArray: []
            }
        }

        componentDidMount() {
            const apiCities = ' https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
            fetch(apiCities).then(r => r.json()).then(data => {
                let objects = data;
                this.setState({cities: objects});

            });
        }

        findMatches = (wordToMatch) => {

            const matchingArr = this.state.cities.filter(place => {
                const regex = new RegExp(wordToMatch, 'gi');
                return place.city.match(regex) || place.state.match(regex);
            });

            this.setState({matchArray: matchingArr})

        }

        render() {
            const cit = this.state.matchArray.map(city => {
                return <li key={city.rank}>
                    <span className="city">{city.city}
                    </span>
                    <span className="state">  {city.state}</span>
                </li>;
            });

            return <form className="search-form">
                <Input upDate={this.findMatches}/>
                <ul className="cities-list">
                    {cit}
                </ul>
            </form>
        }

    }

    ReactDOM.render(
        <CitiesList/>, document.getElementById('app'));

});
