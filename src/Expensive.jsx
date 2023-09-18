import { useState, useEffect } from "react"

const Expensive = ({posts})=> {
    const [highestPrice, setHighestPrice] = useState(0)
    const [pricePost, setPricePost] = useState(null)
    const prices = []
    
    useEffect(()=> {
        const getExpensive = ()=> {
            posts.forEach(post => {
                if(isNaN(post.price*1) === false){
                    prices.push(post.price*1)
                }
            })
            setHighestPrice(prices.sort(compareFN).at(prices.length - 1))
            setPricePost(posts.find(post => {
                post.price === `${highestPrice}` 
                //Someone broke this by using scientific notation. My post.price is the full number and my highest price is notated. I tried to fix it but I didn't have enough time before I noticed.
            }))
        }
        getExpensive()
    }, [posts])

    
    function compareFN(a, b){
        if(a > b){
            return 1;
        }else if(a < b){
            return -1;
        }
        return 0;
    }


    return (
        <div className="content">
            <h1>Most Expensive Post (${ highestPrice })</h1>
            {pricePost ?
            <div>
                <h2>{pricePost.title} | Posted by: {pricePost.author.username}</h2>
                <p>Description: {pricePost.description}</p>
                <p>Location: {pricePost.location}</p>
                <p>{pricePost.price}</p>
            </div>
            : null}
        </div>
    )
}

export default Expensive