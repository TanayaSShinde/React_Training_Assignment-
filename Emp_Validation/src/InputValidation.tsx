import React, { useEffect, useState } from "react";

interface IEmp {
  fname: string;
  lname: string;
}

interface IApiUser {
  firstName: string;
  lastName: string;
}

interface IApiResponse {
  users: IApiUser[];
}

const InputValidation: React.FC = () => {
  const [emp, setEmp] = useState<IEmp>({ fname: "", lname: "" });
  const [emps, setEmps] = useState<IEmp[]>([]);
  const [errors, setErrors] = useState<{ fname?: string; lname?: string }>({});
  const [isEdit, setIsEdit] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState<number | null>(null);

  /* ================= VALIDATION ================= */
  const validateEmp = (emp: IEmp) => {
    const errors: { fname?: string; lname?: string } = {};
    const nameRegex = /^[A-Za-z]+$/; // Only alphabets allowed

    // First Name
    if (!emp.fname.trim()) {
      errors.fname = "First name is required";
    } else if (emp.fname.trim().length < 3) {
      errors.fname = "First name must be at least 3 characters";
    } else if (!nameRegex.test(emp.fname.trim())) {
      errors.fname = "Numbers are not allowed in first name";
    }

    // Last Name
    if (!emp.lname.trim()) {
      errors.lname = "Last name is required";
    } else if (emp.lname.trim().length < 2) {
      errors.lname = "Last name must be at least 2 characters";
    } else if (!nameRegex.test(emp.lname.trim())) {
      errors.lname = "Numbers are not allowed in last name";
    }

    return errors;
  };

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://dummyjson.com/users");
        const data: IApiResponse = await res.json();

        const userData: IEmp[] = data.users.map((u) => ({
          fname: u.firstName,
          lname: u.lastName,
        }));

        setEmps(userData);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  /* ================= HANDLERS ================= */
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEmp((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error dynamically
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name as keyof IEmp];
      return copy;
    });
  };

  const handleSubmit = () => {
    const validationErrors = validateEmp(emp);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    if (isEdit && indexToEdit !== null) {
      setEmps((prev) =>
        prev.map((item, index) =>
          index === indexToEdit ? { ...emp } : item
        )
      );
      setIsEdit(false);
      setIndexToEdit(null);
    } else {
      setEmps((prev) => [...prev, { ...emp }]);
    }

    setEmp({ fname: "", lname: "" });
    setErrors({});
  };

  const handleRemove = (index: number) => {
    setEmps((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setIsEdit(true);
    setIndexToEdit(index);
    setEmp({ ...emps[index] });
  };

  /* ================= UI ================= */
  return (
    <div className="inputvalidation-main">
      <div className="inputvalidation-card">
        <h2>Add Employee Details</h2>

        {/* First Name */}
        <div style={{ width: "100%" }}>
          <label>First Name</label>
          <input
            type="text"
            name="fname"
            value={emp.fname}
            onChange={onTextChange}
            placeholder="Enter first name"
          />
          {errors.fname && (
            <div style={{ color: "red", fontSize: 14 }}>
              {errors.fname}
            </div>
          )}
        </div>

        {/* Last Name */}
        <div style={{ width: "100%", marginTop: 10 }}>
          <label>Last Name</label>
          <input
            type="text"
            name="lname"
            value={emp.lname}
            onChange={onTextChange}
            placeholder="Enter last name"
          />
          {errors.lname && (
            <div style={{ color: "red", fontSize: 14 }}>
              {errors.lname}
            </div>
          )}
        </div>

        <button onClick={handleSubmit} style={{ marginTop: 15 }}>
          {isEdit ? "Update Employee" : "Add Employee"}
        </button>
      </div>

      {/* TABLE */}
      <div style={{ marginTop: 30 }}>
        <h2>Employees List</h2>
        <table border={1} cellPadding={8} width="100%">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name </th>
              <th>Remove</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {emps.map((e, index) => (
              <tr key={`${e.fname}-${e.lname}-${index}`}>
                <td>{e.fname}</td>
                <td>{e.lname}</td>
                <td>
                  <button onClick={() => handleRemove(index)}>
                    ❌
                  </button>
                </td>
                <td>
                  <button onClick={() => handleEdit(index)}>
                    ✏
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InputValidation;