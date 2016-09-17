import React from 'react';

export default class OneClass extends React.Component {
	constructor() {
		super();
		// Initial state of the component
        this.state = {filterText: ''}
    }
    handleUserInput(filterText) {
    	// When there's a change in the state, the component and all its 
    	// sub-components get updated.
        this.setState({filterText: filterText});
    }
    render() {
      return ( 
          <div>
          <p>asdfdsaf</p>
            <SearchPlace/>
            <OtherClass/>
        </div>
      );
    }
}


class SearchPlace extends React.Component {
	handleChange() {
        this.props.onUserInput(
            this.refs.placeText.value
        );
    }
	render(){
		return (
            <form action="/search">
                <input 
                	type="text" 
                	placeholder="Place to go?" 
                	ref="placeText"
                    name="place"
                	value= {this.props.filterText}
                	onChange= {this.handleChange.bind(this)} 

                />
                <input 
                    className="btn btn-primary" 
                    type="submit" 
                    value="Go!" 
                /> 
            </form>
        );
	}
}



class OtherClass extends React.Component {
    constructor(props){
        super(props)
        this.state = { data : [] };
    }
  /*CompontentWillMount: Instrucciones que son ejecutadas, antes que el render se ejecute*/
    componentWillMount(){ 
      // Asi hago el "fetch" de las api, utilizando el json devuelto.
        fetch('http://fcctop100.herokuapp.com/api/fccusers/top/alltime')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({ data : data })
        })
    }
    render() {
        return (
            <div>
                <p>Y yo un parafo depre... matenme </p>
                <h2>Top Score: All Time</h2>
                {food[0].image_url}
                <table>
                {
                    food.map((asd, index) => {
                    return(<tr key={index}>
                        <td> <img src={ asd.image_url }></img> </td>
                        <td>
                            <h3>{ asd.name }</h3>
                            <p>{asd.snippet_text}</p>
                            <button>Going?</button>
                        </td>
                    </tr>);
                })}
                </table>
            </div>
        );
    }
}

// comentar en react: se hace con el {/*  */}
