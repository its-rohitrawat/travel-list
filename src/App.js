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
        return( <div className="app">
            <Logo />
            <Form onAddItems = {handleAddItems}/>
            <PackingList  items ={items} onDelItem = {handleDelItem}/>
            <Stats />
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

function PackingList({items, onDelItem} ){
    return <div className="list">
        <ul>
            {items.map((item) => (<Item item={item} onDelItem={onDelItem} key={item.id}/>))}
        </ul>
    </div>

}

function Item({ item , onDelItem}){
    return <li> 
             <span style={item.packed ? {textDecoration: "line-through"} : {}}>
            {item.description} {item.quantity}
            </span>
            <button onClick={()=> onDelItem(item.id)}>❌</button>
        </li>
}

function Stats(){
    return <footer className="stats">
        <em>
            You have X number of items in your list, and you already packed X (X%)
        </em>
    </footer>
}