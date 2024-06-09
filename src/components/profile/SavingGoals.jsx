import { Component } from 'react';

export default class SavingGoals extends Component {
  state = {
    goals: [
      { id: 1, name: 'Save for a house', amountSaved: 15000, targetAmount: 50000, deadline: '31-Dec-2025' },
    ],
    newGoal: { name: '', amountSaved: '', targetAmount: '', deadline: '' },
    editingGoal: null,
    showForm: false,
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      newGoal: { ...prevState.newGoal, [name]: value }
    }));
  };

  addGoal = () => {
    this.setState(prevState => ({
      goals: [...prevState.goals, { ...prevState.newGoal, id: Date.now() }],
      newGoal: { name: '', amountSaved: '', targetAmount: '', deadline: '' },
      showForm: false,
    }));
  };

  deleteGoal = (id) => {
    this.setState(prevState => ({
      goals: prevState.goals.filter(goal => goal.id !== id)
    }));
  };

  editGoal = (goal) => {
    this.setState({
      newGoal: goal,
      editingGoal: goal.id,
      showForm: true,
    });
  };

  saveEditedGoal = () => {
    this.setState(prevState => ({
      goals: prevState.goals.map(goal => 
        goal.id === prevState.editingGoal ? { ...prevState.newGoal, id: goal.id } : goal
      ),
      newGoal: { name: '', amountSaved: '', targetAmount: '', deadline: '' },
      editingGoal: null,
      showForm: false,
    }));
  };

  toggleForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm,
      newGoal: { name: '', amountSaved: '', targetAmount: '', deadline: '' },
      editingGoal: null,
    }));
  };

  render() {
    const { goals, newGoal, showForm, editingGoal } = this.state;

    return (
      <div className="card card-info">
        <div className="card-header">
          <h3 className="card-title">Saving Goals</h3>
        </div>
        <div className="card-body">
          {!showForm && (
            <>
              <ul className="list-group list-group-unbordered mb-3">
                {goals.map(goal => (
                  <li key={goal.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <b>Goal: </b>{goal.name}<br />
                      <b>Amount Saved: </b>${goal.amountSaved.toLocaleString()}<br />
                      <b>Target Amount: </b>${goal.targetAmount.toLocaleString()}<br />
                      <b>Deadline: </b>{goal.deadline}
                    </div>
                    <div>
                      <button className="btn btn-sm btn-primary mr-2" onClick={() => this.editGoal(goal)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => this.deleteGoal(goal.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary" onClick={this.toggleForm}>Add New Goal</button>
            </>
          )}
          {showForm && (
            <div>
              <h5>{editingGoal ? 'Edit Goal' : 'Add New Goal'}</h5>
              <div className="form-group">
                <label>Goal</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newGoal.name}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Amount Saved</label>
                <input
                  type="number"
                  className="form-control"
                  name="amountSaved"
                  value={newGoal.amountSaved}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Target Amount</label>
                <input
                  type="number"
                  className="form-control"
                  name="targetAmount"
                  value={newGoal.targetAmount}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input
                  type="date"
                  className="form-control"
                  name="deadline"
                  value={newGoal.deadline}
                  onChange={this.handleInputChange}
                />
              </div>
              <button className="btn btn-success" onClick={editingGoal ? this.saveEditedGoal : this.addGoal}>
                {editingGoal ? 'Save Changes' : 'Add Goal'}
              </button>
              <button className="btn btn-secondary ml-2" onClick={this.toggleForm}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
