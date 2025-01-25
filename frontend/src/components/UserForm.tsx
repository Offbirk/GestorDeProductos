import React from "react";
import { useState } from "react";

const UserForm = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
      })
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(values)
    };

    return(
    <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
        <button type="submit">Submit</button>
    </form>
    );
};

export default UserForm;