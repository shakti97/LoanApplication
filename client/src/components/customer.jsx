import React, { Component } from 'react';
import api from '../globalConst';
import '../CSS/Customer.css';

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loans: [],
            totalMoneyReceived: ''
        }
    }
    Logout = () => {
        console.log('Logout');
        localStorage.clear();
        this.props.history.push('/');
    }
    requestNewLoan() {
        console.log('requestNew Loan');
        let userDetails = {
            amount: this.refs.amount.value,
            LoanReason: this.refs.reason.value,
        }
        console.log(userDetails);
        fetch(api + '/requestLoan', {
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('sessionId'),
                'userId': localStorage.getItem('userId')
            },
            method: "POST",
            body: JSON.stringify(userDetails),
            credentials: 'include'
        }).then((res) => {
            res.json().then((data) => {
                console.log("data ", data);
                if (data.loanRequestSuccess) {
                    alert("loan request success");
                    this.componentWillMount();
                } else if (!data.isAuth) {
                    this.Logout();
                }
            })
        }).catch((err) => {
            console.log('err in response ', err);
        })
    }
    fetchLoans=()=>{
        console.log(' fetch loans ');
        fetch(api + "/getLoan", {
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('sessionId'),
                'userId': localStorage.getItem('userId')
            },
            method: "GET"
        }).then((res) => {
            res.json().then((data) => {
                console.log("data ", data);
                if (data.loans) {
                    this.setState({ loans: data.loans })
                } else if (!data.isAuth) {
                    this.Logout();
                }
            })
        }).catch((res) => {
            console.log('catch error ', res);
        })
    }
    componentWillMount() {
        console.log('this.props.location', this.props.location);
        let routes = localStorage.getItem('routes');
        let path = this.props.location.pathname;
        var legal=routes.includes(path)
        legal && this.fetchLoans();
        !legal && this.Logout();
    }
    render() {
        return (

            <div>
                <div style={{ float: 'right', marginRight: "2em" }}> <button className="btn btn-danger" onClick={this.Logout}>LoginOut</button> </div>

                <h4>Customer Home</h4>
                <br />
                <div>
                    <div className='row '>
                        <div className='col-lg-8'></div>
                        <div className='col-lg-1'><button type="button" className="btn btn-primary" data-toggle="modal" data-target='#exampleModal'>New Loan</button>
                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel"><div>NewLoan</div></h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="pb-3"><input type="text" className="form-control" name="" placeholder="enter amount" ref="amount" /></div>
                                            <div className="pb-3"><input type="text" className="form-control" name="" placeholder="enter description" ref="reason" /></div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={this.requestNewLoan.bind(this)} data-dismiss="modal">Request Loan</button>
                                        </div>
                                    </div>
                                </div>
                            </div></div>
                        <div className="col-lg-3"></div></div>
                    <center><table className="paleBlueRows">
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>LoanReason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.loans.map((loan, i) =>
                                <tr key={loan._id}>
                                    <td>{loan.amount}</td>
                                    <td>{loan.status}</td>
                                    <td>{loan.LoanReason}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </center>

                </div>

            </div>
        )
    }
}
export default Customer;