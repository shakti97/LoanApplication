import React, { Component } from 'react';
import api from '../globalConst';
import { withRouter } from 'react-router-dom';

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { loans: [] };
    }
    Logout = () => {
        console.log('Logout');
        localStorage.clear();
        this.props.history.push('/');
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

                    <h4>Admin Home</h4>
                    <br />
                    <div>
                        <center><table className="paleBlueRows">
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>LoanReason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.loans.map((loan, i) =>
                                    <tr key={loan.loanId}>
                                        <td>{loan.amount}</td>
                                        <td>{loan.LoanReason}</td>
                                        {loan.status === "Pending" && <td><button className='btn btn-warning'>Pending</button></td>}
                                        {loan.status === "Rejected" && <td><button className='btn btn-danger'>Rejected</button></td>}
                                        {loan.status === "Approved" && <td><button className='btn btn-success'>Approved</button></td>}
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
export default withRouter(AdminPanel);