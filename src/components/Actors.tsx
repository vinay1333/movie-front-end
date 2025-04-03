import React, { useState, useEffect } from 'react';
import { API_URL } from "../config";

// Define types for actors and the response
interface Actor {
  id: number;
  firstName: string;
  lastName: string;
}

const Actors: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Fetch actors from the API
  const fetchActors = async (query: string = '') => {
    const response = await fetch(`${API_URL}/actors?name=${query}`);
    const data = await response.json();
    setActors(data);
  };

  useEffect(() => {
    fetchActors(); // Fetch all actors initially
  }, []);

  // Throttling helper function
  const throttle = (callback: Function, delay: number) => {
    let lastTime = 0;
    return function (...args: any[]) {
      const now = new Date().getTime();
      if (now - lastTime >= delay) {
        callback(...args);
        lastTime = now;
      }
    };
  };

  // Handle search with throttling
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Optimistic UI Update: Immediately update the list with the current query
    setActors((prevActors) => {
      return prevActors.filter((actor) => 
        actor.firstName.toLowerCase().includes(query.toLowerCase()) ||
        actor.lastName.toLowerCase().includes(query.toLowerCase())
      );
    });

    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear previous timeout
    }

    // Use throttling to delay API request until the user stops typing for a short period
    const newTimeout = setTimeout(() => {
      fetchActors(query); // Fetch filtered actors from the server
    }, 300); // Set a reasonable delay for throttling, like 300ms

    setDebounceTimeout(newTimeout);
  };

  // Handle add actor
  const handleAddActor = async () => {
    await fetch(`${API_URL}/actors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName }),
    });
    fetchActors();
    setShowAddModal(false);
  };

  // Handle update actor
  const handleUpdateActor = async () => {
    if (selectedActor) {
      await fetch(`${API_URL}/actors/${selectedActor.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName }),
      });
      fetchActors();
      setShowEditModal(false);
    }
  };

  // Handle delete actor
  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/actors/${id}`, { method: 'DELETE' });
    setShowDeletePrompt(false);
    fetchActors(); // Refresh the list after deletion
  };

  return (
    <div>
      {/* Search Bar */}
      <input 
        type="text" 
        placeholder="Search for an actor" 
        value={searchQuery} 
        onChange={handleSearch} 
      />
      {/* Add Actor Button */}
      <button onClick={() => setShowAddModal(true)}>Add Actor</button>

      {/* Actors List */}
      <ul className='actors-list'>
        {actors.map((actor) => (
          <li key={actor.id}>
            {actor.firstName} {actor.lastName}
            <button onClick={() => {
              setSelectedActor(actor);
              setFirstName(actor.firstName);
              setLastName(actor.lastName);
              setShowEditModal(true);
            }}>Edit</button>
            <button onClick={() => { setSelectedActor(actor); setShowDeletePrompt(true); }}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Add Actor Modal */}
      {showAddModal && (
        <div className="modal">
          <h2>Add Actor</h2>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            placeholder="First Name" 
          />
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            placeholder="Last Name" 
          />
          <button onClick={handleAddActor}>Add</button>
          <button onClick={() => setShowAddModal(false)}>Close</button>
        </div>
      )}

      {/* Edit Actor Modal */}
      {showEditModal && selectedActor && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Actor</h2>
            <div className="form-group">
              <label>First Name:</label>
              <input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                placeholder="First Name" 
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                placeholder="Last Name" 
              />
            </div>
            <div className="modal-actions">
              <button onClick={handleUpdateActor}>Save</button>
              <button onClick={() => setShowEditModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Actor Prompt */}
      {showDeletePrompt && selectedActor && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this actor?</p>
            <div className="modal-actions">
              <button onClick={() => handleDelete(selectedActor.id)}>Yes</button>
              <button onClick={() => setShowDeletePrompt(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Actors;

















