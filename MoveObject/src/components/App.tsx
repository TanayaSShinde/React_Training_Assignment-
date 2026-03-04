import React, { Component } from "react";
import "./Basic1.css";

interface IEmp {
  fname: string;
  lname: string;
}

interface IState {
  emp: IEmp;
  emps: IEmp[];
  error: string;
}

class Basic1 extends Component<{}, IState> {
  state: IState = {
    emp: { fname: "", lname: "" },
    emps: [],
    error: "",
  };

  OnTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState((prevState) => ({
      emp: { ...prevState.emp, [name]: value },
    }));
  };

  Add = () => {
    const { fname, lname } = this.state.emp;

    if (!fname.trim() && !lname.trim()) {
      return this.setState({
        error: "First Name and Last Name are required",
      });
    }

    if (!fname.trim()) {
      return this.setState({ error: "First Name is required" });
    }

    if (!lname.trim()) {
      return this.setState({ error: "Last Name is required" });
    }

    this.setState((prevState) => ({
      emps: [...prevState.emps, { ...prevState.emp }],
      emp: { fname: "", lname: "" },
      error: "",
    }));
  };

  Remove = (index: number) => {
    this.setState((prevState) => ({
      emps: prevState.emps.filter((_, i) => i !== index),
    }));
  };

  Edit = (index: number) => {
    this.setState((prevState) => {
      const selected = prevState.emps[index];

      return {
        emp: selected,
        emps: prevState.emps.filter((_, i) => i !== index),
      };
    });
  };

  render() {
    const { emp, emps, error } = this.state;

    return (
      <div className="container">
        <div className="card">
          <h2 className="heading">Employee Form</h2>

          <label className="label">First Name</label>
          <input
            type="text"
            name="fname"
            value={emp.fname}
            onChange={this.OnTextChange}
            className="input"
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            name="lname"
            value={emp.lname}
            onChange={this.OnTextChange}
            className="input"
          />

          <button className="addBtn" onClick={this.Add}>
            Add Employee
          </button>

          {error && <div className="error">{error}</div>}
        </div>

        {emps.length > 0 && (
          <div className="tableCard">
            <h2 className="heading">Employees List</h2>

            <table className="table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {emps.map((e, index) => (
                  <tr key={`${e.fname}-${e.lname}-${index}`}>
                    <td>{e.fname}</td>
                    <td>{e.lname}</td>
                    <td>
                      <button
                        className="editBtn"
                        onClick={() => this.Edit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="removeBtn"
                        onClick={() => this.Remove(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default Basic1;