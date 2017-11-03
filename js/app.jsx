import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function() {

    class Input extends React.Component{
        render() {
            return     <input type="text" className="search" placeholder="City or State"/>
        }
    }

    class CitiesList extends React.Component {
        constructor() {
            super();
            this.state = {
                cities: [],
            }
        }

        componentDidMount() {
            const apiCities =' https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
            fetch("https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json")
            .then(r => r.json())
            .then(data => {
                let objects = data;
                this.setState({cities: objects});
                console.log(data);

            });
        }

        render() {
            const cit = this.state.cities.map(city => {
                return <li key={city.rank}>{city.city},{city.state}</li>;
            });
            console.log(this.state.cities);
            return <ul className="cities-list">
                {cit}
            </ul>;

        }


    }

    class Form  extends React.Component{

        render(){
            return <form className="search-form">
                        <Input/>
                        <CitiesList/>
                    </form>

        }
    }








    ReactDOM.render(
        <Form/>, document.getElementById('app'));


});
