import React, { useState, useEffect } from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { listCatalogItems } from './graphql/queries';
import { createCatalogItem as createItem } from './graphql/mutations';


const initialItemState = { title: '', description: '', reservePriceEnabled: false };

function App() {

  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState(initialItemState);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const apiData = await API.graphql({ query: listCatalogItems });
    setItems(apiData.data.listCatalogItems.items);
  }

  async function createItem() {
    if (!formData.title || !formData.description) return;
    await API.graphql({ query: createItem, variables: { input: formData } });
    setItems([ ...items, formData ]);
    setFormData(initialItemState);
  }

  return (
    <div className="App">
      <h1>Catalog Items</h1>
        <input  
          onChange={e => setFormData({ ...formData, 'title': e.target.value})}
          placeholder="Item Title"
          value={formData.title}
        />
        <input
          onChange={e => setFormData({ ...formData, 'description': e.target.value})}
          placeholder="Item Description"
          value={formData.description}
        />
        <button onClick={createItem}>Create Item</button>
        <div style={{marginBottom: 30}}>
          {
            items.map(item => (
              <div key={item.id || item.name}>
                <h2>{item.name}</h2>
                <p>{item.title}</p>
                <p>{item.description}</p>
                <p>{item.reservePriceEnabled}</p>
              </div>
            ))
          }
        </div>
    </div>
  );
}

export default App;
