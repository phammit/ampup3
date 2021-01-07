import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage } from 'aws-amplify';
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
    const itemsFromAPI = apiData.data.listCatalogItems.items;
    await Promise.all(itemsFromAPI.map(async item => {
      if (item.image) {
        const image = await Storage.get(item.image);
        item.image = image;
      }
      return item;
    }))
    setItems(apiData.data.listCatalogItems.items);
  }

  async function createItem() {
    if (!formData.title || !formData.description) return;
    await API.graphql({ query: createItem, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setItems([ ...items, formData ]);
    setFormData(initialItemState);
  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name});
    await Storage.put(file.name, file);
    fetchItems();
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
        <input
          type="file"
          onChange={onChange}
        />
        <button onClick={createItem}>Create Item</button>
        <div style={{marginBottom: 30}}>
          {
            items.map(item => (
              <div key={item.id || item.name}>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <p>{item.reservePriceEnabled}</p>
                {
                  item.image && <img src={item.image} style={{width: 400}} />
                }
              </div>
            ))
          }
        </div>
    </div>
  );
}

export default App;
