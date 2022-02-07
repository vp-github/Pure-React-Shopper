import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Nav from './Nav'
import './App.css'
import ItemPage from './ItemPage';
import { items } from './static-data';
import CartPage from './CartPage';

const App = () => {
  const [activeTab, setActiveTab] = useState('items');
  const [cart, setCart] = useState([]);

  //Add to Cart
  const addToCart = (item) => {
    cart.push(item);
    setCart(cart)
    // setCart((prevCart) => [...prevCart, item])
  }

  //Remove From Cart
  const removeItem = (item) => {
    let index = cart.findIndex((i) => i.id===item.id)
    if(index >=0 ){
      setCart((cart) => {
        const copy = [...cart]
        copy.splice(index, 1)
        return copy
      })
    }
  }

  return (
    <div className="App">
      <Nav activeTab={activeTab} onTabChange={setActiveTab}/>
      <main className="App-content">
        <Content tab={activeTab} onAddToCart={addToCart} onRemoveItem={removeItem} cart={summarizeCart(cart)}/>
        {/* <div>{cart.length} items</div> */}
      </main>
    </div>
  )
}

const Content = ({tab, onAddToCart, onRemoveItem, cart}) => {
  switch(tab){
    default:
    case 'items': return <ItemPage items={items} onAddToCart={onAddToCart}/>
    case 'cart' : return <CartPage items={cart} onAddOne={onAddToCart} onRemoveOne={onRemoveItem}/>
  }
}

const summarizeCart = (cart) => {
  const groupedItems = cart.reduce((summary, item) => {
    summary[item.id] = summary[item.id] || {
      ...item, 
      count: 0,
    }
    summary[item.id].count++
    return summary
  }, {})
  return Object.values(groupedItems)
}

ReactDOM.render(<App />, document.querySelector('#root'))
