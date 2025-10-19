import React from 'react'
import type { Workout } from '../../types'

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
      {workout.name} - {new Date(workout.date).toLocaleDateString()}
      <button onClick={handleUpdate}>Edit</button>

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
          

      <button onClick={handleDelete}>Delete</button>
      
      
    </div>
    
    </>
  )
}

export default WorkoutCard