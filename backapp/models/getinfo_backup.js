import React from 'react'; 


export default class Getinfo extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            data : 'Hola, soy un estado',
            place: 'Santiago',
            data_ : '',
            showResults: false
        };
    }
    getDataPlease(){
        //fetch('http://localhost:8080/test')
        fetch('http://localhost:8080/search/'+this.state.place)
        .then((response) => {
            return response.json();
        })
        .then((data2) => {
            console.log(data2);
            this.setState({ data_ : data2, showResults: true });
        })
    }
    changeState(){
        this.setState({
            data: 'Me cambiaron....',
            showResults: true
        });
    }
  handleChange(e) {
    this.setState({ place: e.target.value });
  }
    render() {
        return(
            <div>
                <div>Holaza: {window.places}</div>
                <div className="searchDiv">
                <input 
                    type="text"
                    value={this.state.place}
                    onChange={this.handleChange.bind(this)}
                />
                <button onClick={this.getDataPlease.bind(this)}>Data it!</button>
                </div>
                { this.state.showResults ? <Results results={this.state.data_} /> : null }
            </div>
        );
    }
}

class Results extends React.Component {
    constructor(props){
        super(props)
        this.state = { active: false, places: [], going: [] };
    }
    /*
    componentWillMount(){
        fetch('http://localhost:8080/search/santiago')
        .then((response) => {
            return response.json();
        })
        .then((data2) => {
            console.log(data2);
            this.setState({ 
                active: true,
            });
        })
    }
    */
    componentWillMount(){
                //fetch('http://localhost:8080/test')
        fetch('http://localhost:8080/api/load/'+window.id)
        .then((response) => {
            return response.json();
        })
        .then((data2) => {
            console.log('data fetched: '+data2);
            this.setState({ places: data2.places });
        })
        .catch(() => {
            console.log("no user to fetchj");
        })
    }

    placeState(place_id){
        //console.log(this.state.places);
        var theArray = this.state.places;
        var aux = false;
        theArray.forEach(function(elem){
            if(elem === place_id){ 
                //console.log("yay! true value!");
                aux = true; }
        });
        //console.log("rendered after u.u");
        return aux;
    }
    HandleClick(key){
        /*Idea de esto, es cambiar la prop de "assist", y realizar las operaciones
        *   En la base de datos.
        * */ 

    }
    render() {
        var rows = [];
        return(
            <div>
                <table className="results">
                    <tbody>
                    {
                        this.props.results.businesses.map((asd, index) => {
                        return(
                                <Result 
                                    //assist={this.placeState(asd.id)}                                    
                                    assist={this.state.going[index]}
                                    index={index}
                                    key={index}
                                    img_url={asd.image_url}
                                    name_={asd.name}
                                    snippet={asd.snippet_text}
                                    place_id={asd.id}
                                    //clickPlace={}
                                    //theplaces={this.state.places}
                                />
                        );
                    })} 
                    </tbody>
                </table>
                </div>
        );
    }
}

class Result extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            assist: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState({ assist: !this.state.assist });
    }
    render() {
        const aux = this.props;
        const assisting = this.props.assist ? 'Going!!' : 'Going?';
        const theclass = this.props.assist ? 'btn btn-success' : 'btn btn-primary';

        return(
            <tr key={aux.index}>
                <th>
                    <img src={aux.img_url}/>
                </th>
                <th>
                    <h3>{aux.name_}</h3>
                    <p>{aux.snippet}</p> <span>{aux.place_id}</span>
                    <button
                        className={theclass}
                        onClick={this.handleClick}>{assisting}</button>
                </th>
            </tr>
        );
    }
}

