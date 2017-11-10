import React from 'react';
import ReactDOM from 'react-dom';


document.addEventListener('DOMContentLoaded', function() {
const Highlight = require('react-highlighter');
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

    // class HighlightText extends React.Component {
    // }

    class CitiesList extends React.Component {
        constructor() {
            super();
            this.state = {
                cities: [],
                matchArray: [],
                wordToMatch:'',
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

            this.setState({matchArray: matchingArr,
                            wordToMatch:wordToMatch,
                        });


        }

        render() {
            const cit = this.state.matchArray.map(city => {

                return <li key={city.rank}>
                    <Highlight search={this.state.wordToMatch}
                        className="city">{city.city}</Highlight>
                    <Highlight search={this.state.wordToMatch}
                        className="state">{city.state}</Highlight>

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
