"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  // To get & show data
  const [getData, setGetData] = useState([]);

  async function loadData() {
    try {
      const response = await axios.get("http://65.1.201.225/api/Role");
      setGetData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  //   For search Roles
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterRoles = getData.filter((roles) =>
    roles.roleName && roles.roleName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  //   To Handle form and post request

  const [addRole, setAddRole] = useState(
    {
      roleName: "",
      description: "",
      createdBy: "",
      createdDate: "",
      modifiedBy: "",
      modifiedDate: "",
      activeStatus: "",
    },
  );

  const handleRole = (e) => {
    setAddRole({
      ...addRole,
      [e.target.name]: e.target.value,
    });
    // console.log(addRole)
  };

  const submitRole = async (e) => {
    e.preventDefault();
    alert("Role added successfully");
    // console.log(`Sending ${addRole} to DataBase`)
    try {
      const response = await axios.post("http://65.1.201.225/api/Role", {
        ...addRole,
        createdDate: new Date(addRole.createdDate).toISOString(),
        modifiedDate: new Date(addRole.modifiedDate).toISOString(),
        isActive: addRole.activeStatus === "true",
      });
      console.log(response.data);
      setGetData((prevData) => [...prevData, response.data]);
      setAddRole({
        roleName: "",
        description: "",
        createdBy: "",
        createdDate: "",
        modifiedBy: "",
        modifiedDate: "",
        activeStatus: true,
      });
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

//   To Delete the Role

  const deleteRole = async (roleId) => {
    try {
        await axios.delete(`http://65.1.201.225/api/Role/${roleId}`);
        setGetData((prevData) => prevData.filter(role => role.id !== roleId));
        alert("Role deleted successfully");
    } catch (error) {
        console.error("Error deleting role:", error);
    }
  }

//   To Edit The Role

// const changeRole = (role) => {
//     setAddRole({
//       roleName: role.roleName,
//       description: role.roleDescription,
//       createdBy: role.createdBy,
//       createdDate: role.createdDate,
//       modifiedBy: role.modifiedBy,
//       modifiedDate: role.modifiedDate,
//       activeStatus: role.isActive ? "true" : "false",
//     });
//     alert("Role updated successfully");
//   };

const editRole = async (roleId) => {
    try {
        const newResponse = await axios.put(`http://65.1.201.225/api/Role/${roleId}`, {
        ...addRole,
        createdDate: new Date(addRole.createdDate).toISOString(),
        modifiedDate: new Date(addRole.modifiedDate).toISOString(),
        isActive: addRole.activeStatus === "true",
      });
      console.log(newResponse.data);
      
      setGetData((prevData) =>
      prevData.map((role) => (role.id === roleId ? newResponse.data : role))
      );
      
      alert("Role updated successfully");

      setAddRole({
        roleName: "",
        description: "",
        createdBy: "",
        createdDate: "",
        modifiedBy: "",
        modifiedDate: "",
        activeStatus: true,
      });
     
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };
  


  return (
    <>
      <div className="bg-white text-zinc-800 h-auto flex justify-start items-center flex-col gap-10 pt-10 pb-20">
        <form
          action=""
          className="text-gray-700 flex justify-center items-center flex-col w-[100vw] md:w-[50vw]"
        >
          <input
            type="text"
            onChange={handleRole}
            value={addRole.roleName || ""}
            name="roleName"
            id="roleName"
            className="border-2 text-zinc-900 m-2 rounded-md p-2 px-4 w-[50%]"
            placeholder="Role Name"
          />

          <input
            type="text"
            onChange={handleRole}
            value={addRole.description || ""}
            name="description"
            id="description"
            className="border-2 text-zinc-900 m-2 rounded-md p-2 px-4 w-[50%]"
            placeholder="Role Description"
          />

          <input
            type="text"
            onChange={handleRole}
            value={addRole.createdBy || ""}
            name="createdBy"
            id="createdBy"
            className="border-2 text-zinc-900 m-2 rounded-md p-2 px-4 w-[50%]"
            placeholder="Created By"
          />

          <label htmlFor="createdDate" className="font-semibold w-[50%]">
            Created Date
          </label>

          <input
            type="datetime-local"
            onChange={handleRole}
            value={addRole.createdDate || ""}
            name="createdDate"
            id="createdDate"
            className="border-2 text-zinc-900 m-2 rounded-md p-2 px-4 w-[50%]"
            placeholder="Created Date"
          />

          <input
            type="text"
            onChange={handleRole}
            value={addRole.modifiedBy || ""}
            name="modifiedBy"
            id="modifiedBy"
            className="border-2 text-zinc-900 m-2 rounded-md p-2 px-4 w-[50%]"
            placeholder="Modified By"
          />

          <label htmlFor="modifiedDate" className="font-semibold w-[50%]">
            Modified Date
          </label>
          
          <input
            type="datetime-local"
            onChange={handleRole}
            value={addRole.modifiedDate || ""}
            name="modifiedDate"
            id="modifiedDate"
            className="border-2 text-zinc-900 m-2 rounded-md p-2 px-4 w-[50%]"
            placeholder="Modified Date"
          />

          <input
            type="text"
            onChange={handleRole}
            value={addRole.activeStatus || ""}
            name="activeStatus"
            id="activeStatus"
            className="border-2 text-zinc-900 m-2 rounded-md p-2 px-4 w-[50%]"
            placeholder="Active Status"
          />

          <button onClick={submitRole} className="border-2 text-zinc-900 m-2 rounded-md p-2 px-4 w-[50%]">
            Submit
          </button>

        </form>

        <input type="search" value={searchTerm} onChange={handleSearchChange} name="" id="" placeholder="Search Role" className="border-2 border-zinc-800 outline-none text-zinc-900 m-2 rounded-md p-2 px-4 w-[50%]"/>

        <table>
          <thead>
            <tr>
              <th className="text-center p-4">Sr.No.</th>
              <th className="text-center p-4">Role Name</th>
              <th className="text-center p-4">Role Description</th>
              <th className="text-center p-4">Created By</th>
              <th className="text-center p-4">Created Date</th>
              <th className="text-center p-4">Modified Date</th>
              <th className="text-center p-4">Modified By</th>
              <th className="text-center p-4">Is Active</th>
            </tr>
          </thead>
          <tbody>
            {
                filterRoles.map((role, i) => {
                    return (
                        <tr key={i}>
                        <td className="text-center p-2"> {role.id} </td>
                        <td className="text-center p-2"> {role.roleName} </td>
                        <td className="text-center p-2"> {role.roleDescription} </td>
                        <td className="text-center p-2"> {role.createdBy} </td>
                        <td className="text-center p-2"> {role.createdDate} </td>
                        <td className="text-center p-2"> {role.modifiedBy} </td>
                        <td className="text-center p-2"> {role.modifiedDate} </td>
                        <td className="text-center p-2">
                            {role.isActive ? "Yes" : "No"}
                        </td>
                        <button onClick={() => deleteRole(role.id)} className="border-2 text-zinc-900 m-2 rounded-md p-1 px-3 ">
                            Remove
                        </button>
                        <button onClick={() => editRole(role.id)} className="border-2 text-zinc-900 m-2 rounded-md p-1 px-3 ">
                            Edit
                        </button>
                        </tr>
                    );
                })
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
