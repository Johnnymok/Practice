import { Component } from "react";
import React from "react";
import { Link } from "react-router-dom";

class Main extends Component{
    constructor(props){
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          items: [],
          previewcode: "",
          previewprice: "",
          showI: [],
          selectI: [],
          selected: "",
          index: "",
          willShow: false,
      };
    }

    componentDidMount(){
        let url = "https://raw.githubusercontent.com/Johnnymok/Practice/johnny/data.json"
        fetch(url)
        .then(res => res.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                items: result.products
            })
        },
        (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          })
        
    }

    preview(index){
        try{
            this.setState({
                previewprice: this.state.items[index].price.formattedValue
            })
        }catch(e){
            console.log("Error")
            this.setState({
                previewprice: "Error occur!"
            })
        }finally{
            this.setState({
                previewcode: this.state.items[index].code,
            })
            if(this.state.showI.includes(index)){
                const id = this.state.showI.indexOf(index)
                this.state.showI.splice(id, 1);
            }
            else{
                this.state.showI.push(index)
            }
        }
    }  

    select(index){
        this.setState({
            selected: !this.state.selected
        })
        if(this.state.selectI.includes(index)){
            const id = this.state.selectI.indexOf(index)
            this.state.selectI.splice(id, 1);
        }
        else{
            this.state.selectI.push(index)
        }
    }

    getPrice(index){
        try{
            return this.state.items[index].price.formattedValue
        }catch(e){
            return "Error! no price found!"
        }

    }

    veriname(name){
        if(name == null){
            return "This product has no name"
        }
        else
            return name
    }

    showList(){
        this.setState({
            willShow: !this.state.willShow
        })
    }

    returnList(){
        let arr = this.state.selectI;
        let lists = [];

        for(let i=0;i<arr.length;i++){
            lists.push(<li>{this.state.items[arr[i]].name}</li>)
        }

        return (
            <ol>
                {lists}
            </ol>
        )
    }

    deSelect(){
        this.setState({
            selectI: []
        })
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Loading...</div>;
        } else {
            return (
                <>
                <div>
                    {items.map((product, index) => {
                        return(
                        <div key={index} className="column card" style={{ backgroundColor: this.state.selectI.includes(index) ? 'grey' : ''}}>
                            {product.images && product.images.map((image) => <img src={image.url} alt={product.name}/>)}
                            <span><b>{this.veriname(product.name)}</b></span><br></br>
                            <span>
                                <button className="btn btn-primary" onClick={() => this.preview(index)}>Preview</button> <></>
                                <Link to={`/${index}`} className="btn btn-primary">Detail</Link>
                            </span>
                            <span>
                                {this.state.showI.includes(index) ? (
                                    <>
                                        <p>{items[index].code}</p>
                                        <p>{this.getPrice(index)}</p>
                                        <button className="btn btn-primary" onClick={() => this.select(index)}>Select</button>
                                    </>
                                ) : null}
                            </span>
                        </div>
                        )
                    })}
                    <div className="column card">
                        <h1>Selected List</h1>
                        <span>
                            <button className="btn btn-primary" onClick={() => this.showList()}>{this.state.willShow ? "Hide Selected Items" : "Show Selected Items"}</button>
                        </span>
                        <span>
                            {this.state.willShow ? (
                                <>
                                    {this.returnList()}
                                    <button className="btn btn-primary" onClick={() => this.deSelect()}>DeSelect All</button>
                                </>
                            ) : null}
                        </span>
                    </div>
                </div>
                </>
            )
        }
    }
}    
export default Main;