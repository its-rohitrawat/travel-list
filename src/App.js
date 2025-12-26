import { use, useState } from "react";


const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 12, packed: false },
];

export default function App(){

    const [items, setitems] = useState([])

    function handleAddItems(item){
        setitems((items) => [...items, item])
    }

    function handleDelItem(id){
        setitems((items) => items.filter((item) => item.id !== id))
    }

    function handleToggleItem(id){
        setitems((items) => items.map((item) => item.id === id ? {...item, packed: !item.packed} : item))
    }
        return( <div className="app">
            <Logo />
            <Form onAddItems = {handleAddItems}/>
            <PackingList  items ={items} onDelItem = {handleDelItem} onToggleItem = {handleToggleItem}/>
            <Stats items={items} />
        </div>
            
        )
}

function Logo(){
    return <h1>🌴FAR AWAY👜</h1>
}

function Form({onAddItems}){

    const [description, setdescription] = useState("")
    const [quantity, setquantity] = useState(1)

    function handleform(e){
        e.preventDefault();

        if(!description) return;

        const newItem = {description, quantity , packed: false, id: Date.now()}
        console.log(newItem)

        onAddItems(newItem)
        
        setdescription("")
        setquantity(1)
    }
    
    return <form className="add-form" onSubmit={handleform}>
        <h3>What do you need for your trip?</h3>
        <select value={quantity} onChange={(e) => setquantity(Number(e.target.value))}>
                {Array.from({ length: 20 }, (_, i) => (
                <option key={i} value={i + 1}>
                {i + 1}
                </option>
            ))}
            </select>
        <input type="text" placeholder="item..." value={description} onChange={(e) => setdescription(e.target.value)}></input>
        <button>Add</button>
    </form>
}

function PackingList({items, onDelItem , onToggleItem} ){
     return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDelItem={onDelItem}
            onToggleItem={onToggleItem}  
          />
        ))}
      </ul>
    </div>
  );
}



function Item({ item , onDelItem, onToggleItem}){
    return <li> 
            <input type='checkbox' value={item.packed} onChange={() => onToggleItem(item.id)} /> 
             <span style={item.packed ? {textDecoration: "line-through"} : {}}>
            {item.description} {item.quantity}
            </span>
            <button onClick={()=> onDelItem(item.id)}>❌</button>
        </li>
}

function Stats({items}){
    if(!items.length)
        return (<p className="stats"> 
        <em>Start adding items to your packing list 😇.</em>
        </p>)

    const numItems = items.length
    const packeditems = items.filter((item) => item.packed).length
    const percentage = Math.round((packeditems / numItems * 100))

    return <footer className="stats">
        <em>
            {percentage === 100 ? "you are ready to go for your trip ✈️" : 
            ` You have ${numItems} number of items in your list, and you already packed ${packeditems} (${percentage}%)`
            }
           
        </em>
    </footer>
}