import React, { Component } from 'react';
import api from '../globalConst';

class Lender extends Component {
    constructor(props) {
        super(props);
        this.state = { loans: [], loansApproved: "" }
    }
    Logout = () => {
        console.log('Logout');
        localStorage.clear();
        this.props.history.push('/');
    }
    Reject = (event) => {
        console.log('want to approve ', event.target.name);
        fetch(api + '/rejectLoan', {
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('sessionId'),
                'userId': localStorage.getItem('userId')
            },
            method: "PUT",
            body: JSON.stringify({ id: event.target.name })
        }).then((res) => {
            res.json().then((data) => {
                console.log("data", data);
                if (data.SuccessfullyRejected) {
                    alert('Rejected Successfully');
                    this.componentWillMount();
                }
                else if (!data.isAuth) {
                    this.Logout();
                }
            })
        }).catch((err) => {
            console.log('err in Rejection loane', err);
        })
    }
    Approve = (event) => {
        console.log('want to approve ', event.target.name);
        fetch(api + '/approveLoan', {
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('sessionId'),
                'userId': localStorage.getItem('userId')
            },
            method: "PUT",
            body: JSON.stringify({ id: event.target.name })
        }).then((res) => {
            res.json().then((data) => {
                console.log("data", data);
                if (data.SuccessfullyApproved) {
                    alert('Approved Successfully');
                    this.componentWillMount();
                }
                else if (!data.isAuth) {
                    this.Logout();
                }
            })
        }).catch((err) => {
            console.log('err in approving loane', err);
        })
    }
    fetchLoans() {
        console.log('lender component will mount ');
        fetch(api + '/fetchAllLoans', {
            method: "GET",
            headers: {
                authToken: localStorage.getItem('sessionId'),
                userId: localStorage.getItem('userId')
            }
        }).then((res) => {
            res.json().then((data) => {
                console.log(data);
                if (data.loans) {
                    this.setState({
                        loans: data.loans
                    })
                }
                else if (!data.isAuth) {
                    this.Logout();
                }
            })
        }).catch((err) => {
            console.log('err in fetch all loans ', err);
        })
    }
    componentWillMount() {
        console.log('this.props.location', this.props.location);
        let routes = localStorage.getItem('routes');
        let path = this.props.location.pathname;
        var legal = routes.includes(path)
        legal && this.fetchLoans();
        !legal && this.Logout();

    }
    render() {
        return (
            <div>
                <div>
                    <div style={{ float: 'right', marginRight: "2em" }}> <button className="btn btn-danger" onClick={this.Logout}>LogOut</button> </div>

                    <h4>Lender Home</h4>
                    <br />
                    <div>
                        <center><table className="paleBlueRows">
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>LoanReason</th>
                                    <th>PayLoan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.loans.map((loan, i) =>
                                    <tr key={loan.loanId}>
                                        <td>{loan.amount}</td>
                                        <td>{loan.status}</td>
                                        <td>{loan.LoanReason}</td>
                                        {loan.status === "Pending" && <td><button name={loan.loanId} className="btn btn-warning" onClick={this.Approve}>Approve</button><button name={loan.loanId} className="btn btn-warning" onClick={this.Reject}>Reject</button></td>}
                                        {loan.status === "Rejected" && <td><span className='btn btn-danger'>Rejected</span></td>}
                                        {loan.status === "Approved" && <td><span className='btn btn-success'>Approved</span></td>}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        </center>

                    </div>

                </div>
            </div>
        )
    }

}
export default Lender;