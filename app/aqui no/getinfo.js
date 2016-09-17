import React from 'react'; 


export default class Getinfo extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            data : 'Hola, soy un estado',
            place: '',
            data_ : '',
            showResults: false
        };
    }
    componentWillMount(){
        if(window.id){
            fetch('http://localhost:8080/api/loaduser/'+window.id)
            .then((response) => {
                return response.json();
            })
            .then((data2) => {
                this.setState({ place: data2.recentplace });
                this.getDataPlease();
            });
        }
    }
    getDataPlease(){
        //fetch('http://localhost:8080/test')
        fetch('http://localhost:8080/search/'+this.state.place)
        .then((response) => {
            return response.json();
        })
        .then((data2) => {
            this.setState({ data_ : data2, showResults: true });
            fetch('http://localhost:8080/api/loaduser2/'+window.id+'/'+this.state.place,{
                method: 'POST'
            })
            .then((response) => {
                return response.json();
            });
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
  _handleKeyPress(e) {
    if (e.key === 'Enter') {
        this.getDataPlease();
    }
  }
    render() {
        return(
            <div>
                <div>{window.places}</div>
                <div className="searchDiv">
                <input 
                    type="text"
                    value={this.state.place}
                    onChange={this.handleChange.bind(this)}
                    onKeyPress={this._handleKeyPress.bind(this)}
                />
                <button onClick={this.getDataPlease.bind(this)} value={this.state.place}>Data it!</button>
                </div>
                { this.state.showResults ? <Results results={this.state.data_} /> : null }
            </div>
        );
    }
}

class Results extends React.Component {
    constructor(props){
        super(props)
        this.state = { active: false, places: [], arr: [] };
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
    componentWillReceiveProps(){
        this.fetchData();
    }
    componentWillMount(){
                //fetch('http://localhost:8080/test')
        this.fetchData();
    }
    fetchData(){
        if(window.id){
            fetch('http://localhost:8080/api/load/'+window.id)
            .then((response) => {
                return response.json();
            })
            .then((data2) => {
                var dataf = data2.userdata;
                this.setState({ places: dataf.places });
                var thearray = [];
                this.props.results.businesses.map((asd) => {
                    asd.assisting = false;
                    asd.going = 0;
                    dataf.places.forEach(function(qwer) {
                        if(qwer === asd.id) asd.assisting = true;
                    });
                    data2.placedata.forEach((asdf) => {
                        if(asdf.place_id === asd.id) asd.going = asdf.going;
                    });
                   thearray.push(asd);
                });
                this.setState({ arr: thearray });
            })
            .catch(() => {
                console.log("no user to fetch");
            })
        }
        else{
            fetch('http://localhost:8080/api/load2')
            .then((response) => {
                return response.json();
            })
            .then((data2) => {
                var thearray = [];
                this.props.results.businesses.map((asd) => {
                    asd.assisting = false;
                    asd.going = 0;
                    data2.forEach((asdf) => {
                        if(asdf.place_id === asd.id) asd.going = asdf.going;
                    });
                   thearray.push(asd);
                });
                this.setState({ arr: thearray });
            
            });
        }
    }
    HandleClick(index, _id){
        //e.preventDefault();
        if(window.id){
            var aux = this.state.arr;
            var that = this;
            var qwerty = new FormData();
            var aux2 = { place: _id };
            qwerty.append("place", _id);

            if(aux[index].assisting){ //true
                fetch('http://localhost:8080/api/post/'+window.id+'/'+_id,{
                    method: 'delete',
                    body: JSON.stringify(aux2),
                    asd: _id
                })
                .then(function() {
                    aux[index].assisting ^= true; 
                    aux[index].going -= 1;
                    that.setState({ arr: aux });
                });
            }
            else{
                fetch('http://localhost:8080/api/post/'+window.id+'/'+_id,{
                    method: 'post',
                    body: qwerty             
                })
                .then(function() {
                    aux[index].assisting ^= true; 
                    aux[index].going += 1;
                    that.setState({ arr: aux });
                });
            }
        }
    }
    render() {
        var rows = [];
        return(
            <div>
                <table className="results">
                    <tbody>
                    {
                        this.state.arr.map((asd, index) => {
                        return(
                                <Result 
                                    assist={asd.assisting}
                                    index={index}
                                    key={index}
                                    img_url={asd.image_url}
                                    name_={asd.name}
                                    snippet={asd.snippet_text}
                                    place_id={asd.id}
                                    going={asd.going}
                                    handleClick={this.HandleClick.bind(this, index, asd.id)}
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
        const assistans = ' ('+this.props.going+' assistans)';
        const assisting = this.props.assist ? 'Going!!'+assistans : 'Going?'+assistans;
        const theclass = this.props.assist ? 'btn btn-success' : 'btn btn-primary';

        return(
            <tr key={aux.index}>
                <th>
                    <img src={aux.img_url}/>
                </th>
                <th>
                    <h3>{aux.name_}</h3>
                    <p>{aux.snippet}</p>
                    <button
                        className={theclass}
                        onClick={this.props.handleClick}>{assisting}</button>
                </th>
            </tr>
        );
    }
}

