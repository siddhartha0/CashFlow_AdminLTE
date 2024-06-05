import  { Component } from 'react';

export default class SavingGoals extends Component {
    render() {
        return (
            <div className="card card-info">
                <div className="card-header">
                    <h3 className="card-title">Saving Goals</h3>
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-unbordered mb-3">
                        <li className="list-group-item">
                            <b>Goal</b> <a className="float-right">Save for a house</a>
                        </li>
                        <li className="list-group-item">
                            <b>Amount Saved</b> <a className="float-right">$15,000</a>
                        </li>
                        <li className="list-group-item">
                            <b>Target Amount</b> <a className="float-right">$50,000</a>
                        </li>
                        <li className="list-group-item">
                            <b>Deadline</b> <a className="float-right">31-Dec-2025</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}


