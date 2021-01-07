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
      <header className="App-header">
        <h1>Catalog Items</h1>

        
      </header>
    </div>
  );
}

export default App;
