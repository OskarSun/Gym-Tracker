import React from 'react'
import type { Workout } from '../../types'
import { Link } from 'react-router-dom';

type Props = {
  workout: Workout;
  onDelete: (id: number) => void;
  onUpdate: (id: number, name: string) => void;
  
}

const WorkoutCard = ({workout, onDelete, onUpdate}: Props) => {
  const [name, setName] = React.useState<string>("");
  const [showForm, setShowForm] = React.useState<boolean>(false); // Both card and homepage have showForm. Consider making a reusable component later.
                                                                  // Consider using a modal for editing as well.

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete the workout "${workout.name}"?`)) {
      onDelete(workout.id);
    }
  }

  const handleUpdate = () => {
    setShowForm(!showForm);
  }
  return (
    <>
    <div>
      <Link to={`/workout/${workout.id}`}>
      {workout.name} - {new Date(workout.date).toLocaleDateString()}
      </Link>
      <button onClick={handleUpdate}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <div> 
        {showForm && (  
        <div>
          <input
            placeholder="Workout name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button onClick={() => {onUpdate(workout.id, name)
            setShowForm(false);
          }}>Update</button>
        </div>
        )}

      </div>
          
    </div>
    
    </>
  )
}

export default WorkoutCard