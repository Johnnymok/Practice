import React, {useState, useEffect} from 'react';
import { Link , useParams} from "react-router-dom";

function Detail() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const { param } = useParams();

    useEffect(() => {
        let url = "https://raw.githubusercontent.com/Johnnymok/Practice/johnny/data.json"
        fetch(url)
          .then(res => res.json())
          .then((result) => {
              setIsLoaded(true);
              setItems(result.products);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])

    const getPrice =(index) =>{
        try{
            return items[index].price.formattedValue
        }catch(e){
            return "Error! no price found!"
        }

    }

    const veriUrl = (url, index) =>{
        if(index === param ){
            return <img src={url} alt={""}/>
        }
        else{ 
            return null
        }
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <div>
                    {items.map((product, index) => {
                        return (
                            <div>
                                {product.images && product.images.map((image) => veriUrl(image.url, index.toString()))}
                            </div>
                        )
                    })}
                    <p>ID: {items[param].code}</p>
                    <p>NAME: {items[param].name}</p>
                    <p>DESCRIPTION: {items[param].description}</p>
                    <p>PRICE: {getPrice(param)}</p>
                </div>
                <Link className="btn btn-primary" to={'/'}>Back</Link>
            </div>
        )
    }
}

export default Detail;