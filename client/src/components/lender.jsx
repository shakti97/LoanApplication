import React, { Component } from 'react';
import api from '../globalConst';

class Lender extends Component{
    constructor(props){
        super(props);
        this.state={loans : [], loansApproved : ""}
    }
    componentWillMount(){
        console.log('lender component will mount ');
        fetch(api+'/fetchAllLoans',{
            method : "GET",
            headers :{
                sessionId : localStorage.getItem('sessionId'),
                userId : localStorage.getItem('userId')
            }
        }).then((res)=>{
            res.json().then((data)=>{
                console.log(data);
            })
        }).catch((err)=>{
            console.log('err in fetch all loans ',err);
        })
    }
    render(){
        return (
            <div>
                <div>
                <div style={{ float: 'right' ,marginRight : "2em"}}> <button className="btn btn-danger">LoginOut</button> </div>

                <h4>Lender Home</h4>
                <br />
                <div>
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
            </div>
        )
    }

}
export default Lender;